using Cencule.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Cencule.API.Data
{
    public class DataContext : DbContext

    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Lake> Lakes { get; set; }

        public DbSet<Photo> Photos { get; set; }
        public DbSet<Blog> Blogs { get; set; }

        public DbSet<Message> Messages { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {


            builder.Entity<Message>()
                .HasOne(m => m.Sender)
                .WithMany(m => m.MessagesSent)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Message>()
                .HasOne(m => m.Recipient)
                .WithMany(m => m.MessagesReceived)
                .OnDelete(DeleteBehavior.Restrict);
        }

    }
}