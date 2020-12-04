using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Cencule.API.Migrations
{
    public partial class LakesEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.CreateTable(
                name: "Lakes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: true),
                    Temperature = table.Column<string>(nullable: true),
                    DateAdded = table.Column<DateTime>(nullable: false),
                    UserId = table.Column<int>(nullable: false),
                    MainUrl = table.Column<string>(nullable: true),
                    UserName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lakes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Lakes_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Lakes_UserId",
                table: "Lakes",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Lakes");








        }
    }
}
