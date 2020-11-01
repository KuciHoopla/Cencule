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
    [Route("api/blog/update/{id}")]
    [ApiController]

    public class BlogUpdateController : ControllerBase
    {
        private readonly ICenculeRepository _repo;
        private readonly IMapper _mapper;
        public BlogUpdateController(ICenculeRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;

        }

        [HttpPut]
        public async Task<IActionResult> UptdateBlog(int id, BlogForUpdateDto blogForUpdateDto)
        {
            // if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            //     return Unauthorized();

            var blogFromRepo = await _repo.GetBlog(id);

            _mapper.Map(blogForUpdateDto, blogFromRepo); //this gonna execute the mapping, write update from Dto to repo

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating blog {id} failed on save");
        }

    }
}
