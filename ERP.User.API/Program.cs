using ERP.Helper.CustomMiddleware;
using ERP.User.Application.Repositories;
using ERP.User.Application.Repositories.Interfaces;
using ERP.User.Domain.Models;
using ERP.User.Infrastructure;
using ERP.User.Infrastructure.Data;
using ERP.User.Infrastructure.DbInitializer;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Serilog;
using System.Configuration;
using System.Data;

namespace ERP.User.API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            //Serilog Implementation

            Log.Logger = new LoggerConfiguration().CreateBootstrapLogger();

            builder.Host.UseSerilog(((ctx, lc) => lc
           .ReadFrom.Configuration(ctx.Configuration)));

            // Add services to the container.
            builder.Services.AddDbContext<ApplicationDbContext>(options =>
                        options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

             builder.Services.AddIdentity<Domain.Models.User, IdentityRole>(options =>
   {
       // Configure Identity options
       options.User.RequireUniqueEmail = true; // Require unique email addresses
   })
.AddEntityFrameworkStores<ApplicationDbContext>()
.AddDefaultTokenProviders();
          
            builder.Services.AddControllers();

            builder.Services.AddAuthorization();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddRouting(options => options.LowercaseUrls = true);
            builder.Services.AddScoped<IUserRepository, UserRepository>();
            builder.Services.AddScoped<JwtTokenService>();
            builder.Services.AddScoped<IModulePermissionRepository, ModulePermissionRepository>();
            builder.Services.AddScoped<IMenuMasterRepository, MenuMasterRepository>();
            builder.Services.AddScoped<IUserRoleManagementRepository, UserRoleManagementRepository>();
            builder.Services.AddScoped<IRoleRepository, RoleRepository>();
            builder.Services.AddScoped<IAuthRepository, AuthRepository>();

            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder.AllowAnyOrigin()
                           .AllowAnyMethod()
                           .AllowAnyHeader();

                });
            });



            var app = builder.Build();

            #region Default Data Sync and Update Script
            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                try
                {
                    var context = services.GetRequiredService<ApplicationDbContext>();
                    DbInitialization dbInitialization = new DbInitialization(context);
                    dbInitialization.IntitializeAsync(services).Wait();
                }
                catch (Exception ex)
                {
                    var Logger = services.GetRequiredService<ILogger<Program>>();
                    Logger.LogError(ex, "An error occurred while seeding the database.");
                    throw ex;
                }
            }
            #endregion

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            app.UseHttpsRedirection();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseMiddleware<ExceptionHandlingMiddleware>();
            app.MapControllers();

            app.Run();
        }
    }
}
