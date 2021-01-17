using System;
using System.ComponentModel.DataAnnotations;

namespace Cencule.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        [StringLength(30, MinimumLength = 12, ErrorMessage = "Dlzka hesla minimalne 12 pismen a max 30")]

        public string Password { get; set; }
        [Required]

        public string Gender { get; set; }
        [Required]

        public string KnownAs { get; set; }
        [Required]

        public DateTime DateOfBirth { get; set; }
        [Required]

        public string City { get; set; }
        [Required]

        public string Country { get; set; }
        public int Admin { get; set; }


        public DateTime Created { get; set; }

        public DateTime LastActive { get; set; }

        public UserForRegisterDto()
        {
            Created = DateTime.Now;
            LastActive = DateTime.Now;
        }
    }
}