using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ERP.User.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class adduserroleidinuserrolemanagement : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "UserRoleId",
                table: "AspNetUserRoles",
                type: "uniqueidentifier",
                nullable: false,
                defaultValueSql: "NEWID()");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserRoleId",
                table: "AspNetUserRoles");
        }
    }
}
