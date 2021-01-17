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
using System.Collections;

namespace Cencule.API.Controllers
{
    [Authorize]
    [Route("/api/delete/{userId}/{id}")]
    public class UserDeleteController : ControllerBase
    {
        private readonly ICenculeRepository _repo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinerySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;

        public UserDeleteController(ICenculeRepository repo, IMapper mapper,
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



        [HttpDelete]
        public async Task<IActionResult> DeleteUserAll(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();
            var user = await _repo.GetUser(userId);

            if (user.Admin != 1)
            {
                return Unauthorized();
            }

            var messagesFromRepo = await _repo.GetMessagesForUser(id);
            var photosFromRepo = await _repo.GetPhotos();
            var lakesFromRepo = await _repo.GetLakes();
            var blogsFromRepo = await _repo.GetBlogs();
            var userFromRepo = await _repo.GetUser(id);



            foreach (var message in messagesFromRepo)
            {
                if (message.RecipientId == id || message.SenderId == id)
                {
                    _repo.Delete(message);
                }
            }

            foreach (var lake in lakesFromRepo)
            {
                if (lake.UserId == id)
                {
                    _repo.Delete(lake);
                }
            }

            foreach (var blog in blogsFromRepo)
            {
                if (blog.UserId == id)
                {
                    _repo.Delete(blog);
                }
            }

            foreach (var photo in photosFromRepo)
            {
                if (photo.UserId == id)
                {
                    if (photo.PublicId != null)
                    {
                        var deleteParams = new DeletionParams(photo.PublicId);

                        var result = _cloudinary.Destroy(deleteParams);

                        if (result.Result == "ok")
                            _repo.Delete(photo);

                    }

                    if (photo.PublicId == null)
                    {
                        _repo.Delete(photo);

                    }



                }
            }

            _repo.Delete(userFromRepo);


            if (await _repo.SaveAll())
                return Ok();

            return BadRequest("Chyba pri vymazavani uzivatela");
        }
    }
}