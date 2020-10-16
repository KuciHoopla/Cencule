using System;

namespace Cencule.API.Models
{
    public class Blog
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public string PublicId { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        public string MainUrl { get; set; }
        public string UserName { get; set; }
    }
}