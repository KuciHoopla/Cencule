using System;
using System.Collections.Generic;
using System.Security.Claims;
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
        private readonly IMapper _mapper;
        public UsersController(ICenculeRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;

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

    }
}
