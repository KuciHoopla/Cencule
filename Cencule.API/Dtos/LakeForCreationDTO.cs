using System;
using Cencule.API.Models;

namespace Cencule.API.Dtos
{
    public class LakeForCreationDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Temperature { get; set; }
        public DateTime DateAdded { get; set; }
        public int UserId { get; set; }
        public string MainUrl { get; set; }
        public string UserName { get; set; }
    }
}