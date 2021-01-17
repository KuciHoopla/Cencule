using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using Cencule.API.Data;
using Cencule.API.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Cencule.API.Dtos;
using System.Collections;
using Microsoft.AspNetCore.Cors;
using System.Collections.Generic;
using System.Security.Claims;

namespace Cencule.API.Controllers
{
    [Route("/api/home/users")]
    [ApiController]

    public class UserBlogController : ControllerBase
    {
        private readonly ICenculeRepository _repo;
        private readonly IMapper _mapper;

        public UserBlogController(ICenculeRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;

        }

        [HttpGet()]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _repo.GetUsers();
            var usersToReturn = _mapper.Map<IEnumerable<UserForBlogDto>>(users);

            return Ok(usersToReturn);
        }
    }
}