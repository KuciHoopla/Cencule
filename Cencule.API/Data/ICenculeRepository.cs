using System.Collections.Generic;
using System.Threading.Tasks;
using Cencule.API.Helpers;
using Cencule.API.Models;

namespace Cencule.API.Data
{
    public interface ICenculeRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<List<User>> GetUsers();
        Task<User> GetUser(int id);
        Task<Photo> GetPhoto(int id);
        Task<Blog> GetBlog(int id);
        Task<List<Photo>> GetPhotos();
        Task<List<Lake>> GetLakes();

        Task<List<Blog>> GetBlogs();
        Task<Photo> GetMainPhotoFromUser(int userId);
        Task<Message> GetMessage(int id);
        Task<IEnumerable<Message>> GetMessagesForUser(int userId);

        Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId);

    }
}