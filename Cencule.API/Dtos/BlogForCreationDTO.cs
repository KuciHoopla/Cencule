using System;
using Microsoft.AspNetCore.Http;

namespace Cencule.API.Dtos
{
    public class BlogForCreationDTO
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public int UserId { get; set; }
        public string PublicId { get; set; }
        public IFormFile File { get; set; }

        public void BlogForCreationDto()
        {
            DateAdded = DateTime.Now;
        }
    }
}