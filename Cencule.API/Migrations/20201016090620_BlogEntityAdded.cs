using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Cencule.API.Migrations
{
    public partial class BlogEntityAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.CreateTable(
                name: "Blogs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Url = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Title = table.Column<string>(nullable: true),
                    DateAdded = table.Column<DateTime>(nullable: false),
                    PublicId = table.Column<string>(nullable: true),
                    UserId = table.Column<int>(nullable: false),
                    MainUrl = table.Column<string>(nullable: true),
                    UserName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Blogs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Blogs_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Blogs_UserId",
                table: "Blogs",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Blogs");

            migrationBuilder.DropColumn(
                name: "Notes",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "MainUrl",
                table: "Photos");

            migrationBuilder.DropColumn(
                name: "UserName",
                table: "Photos");

            migrationBuilder.AddColumn<string>(
                name: "LookingFor",
                table: "Users",
                type: "TEXT",
                nullable: true);
        }
    }
}
