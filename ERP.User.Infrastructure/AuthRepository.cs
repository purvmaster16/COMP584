using ERP.User.Application.Repositories.Interfaces;
using ERP.User.Infrastructure.Data;
using Users = ERP.User.Domain.Models.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ERP.User.Domain.Models.ViewModels;

namespace ERP.User.Infrastructure
{
    public class AuthRepository : IAuthRepository
    {
        private readonly ApplicationDbContext _context;
        public AuthRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<UserAuthDisplayDTO> GetDetailsByUserId(string userId)
        {
            var query = from au in _context.Users
                        join aur in _context.UserRoles on au.Id equals aur.UserId
                        join ar in _context.Roles on aur.RoleId equals ar.Id
                        join mp in _context.ModulePermissions on ar.Id equals mp.RoleId into mpJoin
                        from mp in mpJoin.DefaultIfEmpty()
                        join mm in _context.MenuMasters on mp.MenuMasterId equals mm.MenuMasterId into mmJoin
                        from mm in mmJoin.DefaultIfEmpty()
                        where au.Id == userId
                        group new { au, ar, mp, mm } by new { au.Id, au.UserName } into g
                        select new UserAuthDisplayDTO
                        {
                            UserId = g.Key.Id,
                            UserName = g.Key.UserName,
                            RoleIds = g.Select(x => x.ar.Id).Distinct().ToList(),
                            RoleNames = g.Select(x => x.ar.Name).Distinct().ToList(),
                            MenuIds = g.Where(x => x.mm != null).Select(x => x.mm.MenuMasterId).ToList(),
                            MenuNames = g.Where(x => x.mm != null).Select(x => x.mm.Name).ToList()
                        };

            return await query.FirstOrDefaultAsync();


        }
    }
}
