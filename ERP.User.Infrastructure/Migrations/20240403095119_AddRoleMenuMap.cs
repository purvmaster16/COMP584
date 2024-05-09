using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ERP.User.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddRoleMenuMap : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RoleMenuMap",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    MenuMasterId = table.Column<int>(type: "int", nullable: false),
                    AllowView = table.Column<bool>(type: "bit", nullable: false),
                    AllowInsert = table.Column<bool>(type: "bit", nullable: false),
                    AllowEdit = table.Column<bool>(type: "bit", nullable: false),
                    AllowDelete = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoleMenuMap", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RoleMenuMap_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RoleMenuMap_MenuMasters_MenuMasterId",
                        column: x => x.MenuMasterId,
                        principalTable: "MenuMasters",
                        principalColumn: "MenuMasterId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RoleMenuMap_MenuMasterId",
                table: "RoleMenuMap",
                column: "MenuMasterId");

            migrationBuilder.CreateIndex(
                name: "IX_RoleMenuMap_RoleId",
                table: "RoleMenuMap",
                column: "RoleId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RoleMenuMap");
        }
    }
}
