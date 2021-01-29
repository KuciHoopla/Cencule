using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Cencule.API.Data;
using Cencule.API.Dtos;
using Cencule.API.Helpers;
using Cencule.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cencule.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]

    public class UsersController : ControllerBase
    {
        private readonly ICenculeRepository _repo;
        private readonly IAuthRepository _repoAuth;
        private readonly IAuthRepository _mail;
        private bool veryfication = false;



        private readonly IMapper _mapper;
        public UsersController(ICenculeRepository repo, IMapper mapper, IAuthRepository repoAuth, IAuthRepository mail)
        {
            _mapper = mapper;
            _repo = repo;
            _repoAuth = repoAuth;
            _mail = mail;


        }
        [HttpGet()]
        public async Task<IActionResult> GetUsers([FromQuery] UserParams userParams)
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var userFromRepo = await _repo.GetUser(currentUserId);
            userParams.UserId = currentUserId;



            var users = await _repo.GetUsers();
            var usersToReturn = _mapper.Map<IEnumerable<UserForListDTO>>(users);


            return Ok(usersToReturn);
        }


        [HttpGet("{id}", Name = "GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);
            var userToReturn = _mapper.Map<UserForDetailedDTO>(user);

            return Ok(userToReturn);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForUpdateDto userForUpdateDto)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repo.GetUser(id);

            _mapper.Map(userForUpdateDto, userFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Uloženie zmien člena {id} zlyhalo");
        }

        [HttpPut("{id}/{idToBlock}")]
        public async Task<IActionResult> BlockUser(int id, int idToBlock, UserForUpdateDto userForUpdateDto)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userFromRepo = await _repo.GetUser(idToBlock);

            _mapper.Map(userForUpdateDto, userFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Uloženie zmien člena {idToBlock} zlyhalo");
        }

        [HttpGet("veryfication/{name}/{password}")]
        public async Task<IActionResult> Veryfication(string name, string password)
        {
            var UserFromRepo = await _repoAuth.Login(name.ToLower(), password);
            if (UserFromRepo != null)
            {
                this.veryfication = true;
                return Ok(new { this.veryfication });
            }
            else
            {
                return Ok(new { this.veryfication });
            }
        }




        [HttpPut("change/{id}/{newPassword}/{veryfication}")]
        public async Task<IActionResult> ChangePassword(int id, string newPassword, string veryfication)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            if (veryfication == "ok")
            {
                var userFromRepo = await _repo.GetUser(id);
                var userWithNewPassword = await _repoAuth.ChangePassword(userFromRepo, newPassword);

                _mapper.Map(userWithNewPassword, userFromRepo);

                if (await _repo.SaveAll())
                    return Ok();

                throw new Exception($"Uloženie zmien člena {userFromRepo.KnownAs} zlyhalo");
            }
            else
            {
                return NoContent();
            }
        }

    }
}
