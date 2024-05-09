using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ERP.User.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddMenuMasterFKToModulePermissionsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Modules",
                table: "ModulePermissions");

            migrationBuilder.AddColumn<int>(
                name: "MenuMasterId",
                table: "ModulePermissions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ModulePermissions_MenuMasterId",
                table: "ModulePermissions",
                column: "MenuMasterId");

            migrationBuilder.AddForeignKey(
                name: "FK_ModulePermissions_MenuMasters_MenuMasterId",
                table: "ModulePermissions",
                column: "MenuMasterId",
                principalTable: "MenuMasters",
                principalColumn: "MenuMasterId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ModulePermissions_MenuMasters_MenuMasterId",
                table: "ModulePermissions");

            migrationBuilder.DropIndex(
                name: "IX_ModulePermissions_MenuMasterId",
                table: "ModulePermissions");

            migrationBuilder.DropColumn(
                name: "MenuMasterId",
                table: "ModulePermissions");

            migrationBuilder.AddColumn<string>(
                name: "Modules",
                table: "ModulePermissions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
