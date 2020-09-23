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

    [Route("/api/photos")]
    [ApiController]
    public class PhotosWallController : ControllerBase
    {
        private readonly ICenculeRepository _repo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinerySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;

        public PhotosWallController(ICenculeRepository repo, IMapper mapper,
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
        public async Task<IActionResult> GetPhotos()
        {
            var photos = await _repo.GetPhotos();
          
            return Ok(photos);
        }

    }
}