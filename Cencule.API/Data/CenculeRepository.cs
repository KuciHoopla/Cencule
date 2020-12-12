using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cencule.API.Helpers;
using Cencule.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Cencule.API.Data
{
    public class CenculeRepository : ICenculeRepository
    {
        private readonly DataContext _context;
        public CenculeRepository(DataContext context)
        {
            _context = context;

        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }



        public async Task<Photo> GetMainPhotoFromUser(int userId)
        {
            return await _context.Photos.Where(u => u.UserId == userId).FirstOrDefaultAsync(p => p.IsMain);
        }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await _context.Photos.FirstOrDefaultAsync(p => p.Id == id);
            return photo;
        }

        public async Task<Blog> GetBlog(int id)
        {
            var blog = await _context.Blogs.FirstOrDefaultAsync(b => b.Id == id);
            return blog;
        }

        public async Task<List<Photo>> GetPhotos()
        {
            var wallPhotos = _context.Photos.OrderByDescending(p => p.DateAdded)
                .ToListAsync();
            return await wallPhotos;
        }

        public async Task<List<Lake>> GetLakes()
        {
            var wallLakes = _context.Lakes.OrderByDescending(p => p.DateAdded)
                .ToListAsync();
            return await wallLakes;
        }

        public async Task<List<Blog>> GetBlogs()
        {
            var wallBlogs = _context.Blogs.OrderByDescending(b => b.DateAdded)
                .ToListAsync();
            return await wallBlogs;
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(u => u.Id == id);

            return user;
        }



        public async Task<List<User>> GetUsers()
        {
            return await _context.Users.Include(p => p.Photos).OrderByDescending(u => u.Created)
                 .ToListAsync(); ;


        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Message> GetMessage(int id)
        {
            return await _context.Messages.FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task<IEnumerable<Message>> GetMessagesForUser(int userId)
        {
            var messages = await _context.Messages
                .Include(u => u.Sender).ThenInclude(p => p.Photos)
                .Include(u => u.Recipient).ThenInclude(p => p.Photos)
                .Where(m => m.RecipientId == userId && m.RecipientDeleted == false
                    || m.SenderId == userId && m.SenderDeleted == false)
                .OrderByDescending(m => m.MessageSent)
                .ToListAsync();
            return messages;
        }

        public async Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId)
        {
            var messages = await _context.Messages
                .Include(u => u.Sender).ThenInclude(p => p.Photos)
                .Include(u => u.Recipient).ThenInclude(p => p.Photos)
                .Where(m => m.RecipientId == userId && m.RecipientDeleted == false && m.SenderId == recipientId
                    || m.RecipientId == recipientId && m.SenderId == userId && m.SenderDeleted == false)
                .OrderByDescending(m => m.MessageSent)
                .ToListAsync();
            return messages;
        }
    }
}