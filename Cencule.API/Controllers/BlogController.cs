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

namespace Cencule.API.Controllers
{
    [Route("/api/blog")]
    [ApiController]

    
    public class BlogController : ControllerBase
    {
        private readonly ICenculeRepository _repo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinerySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;

        public BlogController(ICenculeRepository repo, IMapper mapper,
                                IOptions<CloudinerySettings> cloudinaryConfig)
        {
            _cloudinaryConfig = cloudinaryConfig;
            _mapper = mapper;
            _repo = repo;


            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret);
            _cloudinary = new Cloudinary(acc);

        }
        
        [HttpGet]
        public async Task<IActionResult> GetBlogs()
        {
            var blogs = await _repo.GetBlogs();
            var blogsForWall = new ArrayList();

            foreach (var blog in blogs)
            {
                var blogForWall = _mapper.Map<BlogForWallDTO>(blog);
                var user = await _repo.GetUser(blogForWall.UserId);
                var userToReturn = _mapper.Map<UserForListDTO>(user);
                blogForWall.UserName = userToReturn.KnownAs;
                blogForWall.MainUrl = userToReturn.PhotoUrl;
                blogsForWall.Add(blogForWall);

            };
            
            return Ok(blogsForWall);
        }

    }
}