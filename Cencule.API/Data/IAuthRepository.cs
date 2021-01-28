using System.Threading.Tasks;
using Cencule.API.Models;

namespace Cencule.API.Data
{
    public interface IAuthRepository
    {
        Task<User> Register(User user, string password);
        Task<User> ChangePassword(User user, string password);
        Task<int> UserEmail(string username);
        Task<User> Login(string username, string password);
        Task<bool> UserExists(string username);
        Task<bool> Email(string body);




    }
}