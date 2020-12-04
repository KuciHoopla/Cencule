using System;

namespace Cencule.API.Models
{
    public class Lake
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Temperature { get; set; }
        public DateTime DateAdded { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        public string MainUrl { get; set; }
        public string UserName { get; set; }
    }
}