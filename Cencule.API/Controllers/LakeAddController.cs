using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Cencule.API.Data;
using Cencule.API.Dtos;
using Cencule.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cencule.API.Controllers
{
    [Authorize]
    [Route("/api/lakes/{userId}")]
    [ApiController]
    public class LakeAddController : ControllerBase
    {
        private readonly ICenculeRepository _repo;
        private readonly IMapper _mapper;

        public LakeAddController(ICenculeRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;

        }

        [HttpPost]
        public async Task<IActionResult> AddLake(int userId,
        LakeForCreationDTO lakeForCreationDTO)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            lakeForCreationDTO.DateAdded = System.DateTime.Now;

            var lake = _mapper.Map<Lake>(lakeForCreationDTO);

            _repo.Add(lake);
            if (await _repo.SaveAll())
                return NoContent();

            return BadRequest("Nepodarilo sa pridat jazero");

        }




    }
}