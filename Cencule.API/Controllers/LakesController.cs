using System.Threading.Tasks;
using AutoMapper;
using Cencule.API.Data;
using Microsoft.AspNetCore.Mvc;
using Cencule.API.Dtos;
using System.Collections;

namespace Cencule.API.Controllers
{
    [Route("/api/lakes")]
    [ApiController]


    public class LakesController : ControllerBase
    {
        private readonly ICenculeRepository _repo;
        private readonly IMapper _mapper;

        public LakesController(ICenculeRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;

        }

        [HttpGet()]
        public async Task<IActionResult> GetLakes()
        {
            var lakes = await _repo.GetLakes();
            var lakesForWall = new ArrayList();

            foreach (var lake in lakes)
            {
                var lakeWall = _mapper.Map<LakeForReturnDTO>(lake);
                var user = await _repo.GetUser(lakeWall.UserId);
                var userToReturn = _mapper.Map<UserForListDTO>(user);
                lakeWall.UserName = userToReturn.KnownAs;
                lakeWall.MainUrl = userToReturn.PhotoUrl;
                lakesForWall.Add(lakeWall);

            };

            return Ok(lakesForWall);
        }

    }
}