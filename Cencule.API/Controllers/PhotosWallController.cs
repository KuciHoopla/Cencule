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
            var photosForWall = new ArrayList();

            foreach (var photo in photos)
            {
                var photoWall = _mapper.Map<PhotoForWallDTO>(photo);
                var user = await _repo.GetUser(photoWall.UserId);
                var userToReturn = _mapper.Map<UserForListDTO>(user);
                photoWall.UserName = userToReturn.KnownAs;
                photoWall.MainUrl = userToReturn.PhotoUrl;
                photosForWall.Add(photoWall);

            };
            
            return Ok(photosForWall);
        }

    }
}