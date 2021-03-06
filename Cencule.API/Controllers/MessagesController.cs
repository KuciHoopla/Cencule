using System;
using System.Collections;
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
    [Route("api/users/{userId}/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        private readonly ICenculeRepository _repo;
        private readonly IMapper _mapper;
        public MessagesController(ICenculeRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;

        }

        [HttpGet("{id}", Name = "GetMessage")]

        public async Task<IActionResult> GetMessage(int userId, int id)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var messageFromRepo = await _repo.GetMessage(id);

            if (messageFromRepo == null)
                return NotFound();

            return Ok(messageFromRepo);
        }

        [HttpGet]   //get messages from user
        public async Task<IActionResult> GetMessagesForUser(int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var messagesFromRepo = await _repo.GetMessagesForUser(userId);

            var messages = _mapper.Map<IEnumerable<MessageToReturnDto>>(messagesFromRepo);

            return Ok(messages);
        }

        [HttpGet("stats")]   // get number of messages from user
        public async Task<IActionResult> GetUserStats(int userId)
        {

            var stats = await _repo.GetStats(userId);
            var statsDto = _mapper.Map<StatisticDTO>(stats);

            return Ok(statsDto);
        }


        [HttpGet("thread/{recipientId}")]
        public async Task<IActionResult> GetMessageThread(int userId, int recipientId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var messageFromRepo = await _repo.GetMessageThread(userId, recipientId);

            var GetMessageThread = _mapper.Map<IEnumerable<MessageToReturnDto>>(messageFromRepo);

            return Ok(GetMessageThread);
        }

        [HttpPost]

        public async Task<IActionResult> CreateMessage(int userId,
        MessageForCreationDto messageForCreationDto)
        {
            var sender = await _repo.GetUser(userId);
            if (sender.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            messageForCreationDto.SenderId = userId;

            var recipient = await _repo.GetUser(messageForCreationDto.RecipientId);

            if (recipient == null)
                return BadRequest("Could not find user");


            var message = _mapper.Map<Message>(messageForCreationDto);
            _repo.Add(message);



            if (await _repo.SaveAll())
            {
                var messageToreturn = _mapper.Map<MessageToReturnDto>(message);
                return CreatedAtRoute("GetMessage",
                new { userId, id = message.Id }, messageToreturn);
            }


            throw new Exception("Creating the message failed on save");
        }


        [HttpPost("{id}")]

        public async Task<IActionResult> DeleteMessage(int id, int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var messageFromRepo = await _repo.GetMessage(id);

            if (messageFromRepo.SenderId == userId)
                messageFromRepo.SenderDeleted = true;

            if (messageFromRepo.RecipientId == userId)
                messageFromRepo.RecipientDeleted = true;

            if (messageFromRepo.RecipientDeleted && messageFromRepo.SenderDeleted)
                _repo.Delete(messageFromRepo);

            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception("Error deleting a message");

        }

        [HttpPost("{id}/read")]

        public async Task<IActionResult> MarkAsRead(int id, int userId)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var message = await _repo.GetMessage(id);

            if (message.RecipientId != userId)
                return Unauthorized();

            message.IsRead = true;
            message.DateRead = DateTime.Now;

            await _repo.SaveAll();

            return NoContent();


            throw new Exception("Error deleting a message");

        }

    }
}