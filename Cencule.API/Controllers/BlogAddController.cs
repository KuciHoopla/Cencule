using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Cencule.API.Data;
using Cencule.API.Dtos;
using Cencule.API.Helpers;
using Cencule.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Cencule.API.Controllers
{
    [Authorize]
    [Route("/api/blog/{userId}")]
    [ApiController]
    public class BlogAddController : ControllerBase
    {
        private readonly ICenculeRepository _repo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinerySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;

        public BlogAddController(ICenculeRepository repo, IMapper mapper,
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

        [HttpGet("{id}", Name = "GetBlog")]
        public async Task<IActionResult> GetBlog(int id)
        {
            var blogFromRepo = await _repo.GetBlog(id);
            var blog = _mapper.Map<BlogForReturnDto>(blogFromRepo);
            return Ok(blog);
        }

        [HttpPost]
        public async Task<IActionResult> AddBlog(int userId,
        [FromForm] BlogForCreationDTO blogForCreationDTO, string description)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var file = blogForCreationDTO.File;
            var uploadResult = new ImageUploadResult();


            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                    };
                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }

            blogForCreationDTO.Url = uploadResult.Url.ToString();
            blogForCreationDTO.PublicId = uploadResult.PublicId;
            blogForCreationDTO.Description = description;

            blogForCreationDTO.UserId = userId;
            blogForCreationDTO.DateAdded = System.DateTime.Now;


            var blog = _mapper.Map<Blog>(blogForCreationDTO);


            _repo.Add(blog);


            if (await _repo.SaveAll())
            {
                var blogToReturn = _mapper.Map<BlogForReturnDto>(blog);
                return CreatedAtRoute("GetBlog", new { userId = userId, id = blog.Id, description = description }, blogToReturn);
            }
            return BadRequest("Colud not add the blog");

        }




    }
}