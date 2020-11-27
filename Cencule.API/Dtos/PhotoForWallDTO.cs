using System;

namespace Cencule.API.Dtos
{
    public class PhotoForWallDTO
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMain { get; set; }
        public int UserId { get; set; }
        public string MainUrl { get; set; }
        public string UserName { get; set; }
        public string Blocked { get; set; }




    }
}