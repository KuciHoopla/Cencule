using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Cencule.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Cencule.API.Data
{
    public class AuthRepository : IAuthRepository
    {


        private readonly DataContext _context;
        public AuthRepository(DataContext context)
        {
            _context = context;

        }


        public async Task<User> Login(string username, string password)
        {
            var user = await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.Username == username);

            if (username == null)
                return null;
            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            return user;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmoc = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computeHash = hmoc.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computeHash.Length; i++)
                {
                    if (computeHash[i] != passwordHash[i])
                        return false;
                }
            }
            return true;
        }

        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;

        }

        public async Task<User> ChangePassword(User user, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            return user;

        }



        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmoc = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmoc.Key;
                passwordHash = hmoc.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }

        }

        public async Task<bool> UserExists(string username)
        {
            if (await _context.Users.AnyAsync(x => x.Username == username))
                return true;

            return false;
        }

        public async Task<int> UserId(string username)
        {
            try
            {
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
                return user.Id;
            }
            catch (Exception) { }

            return -1;

        }


        public async Task<bool> Email(string body)
        {
            try
            {
                MailMessage message = new MailMessage();
                SmtpClient smtp = new SmtpClient();
                message.From = new MailAddress("");
                message.To.Add(new MailAddress(""));
                message.Subject = "Cencule - Zmena hesla";
                message.IsBodyHtml = true; //to make message body as html  
                message.Body = body;
                smtp.Port = 587;
                smtp.Host = "smtp.gmail.com"; //for gmail host  
                smtp.EnableSsl = true;
                smtp.UseDefaultCredentials = false;
                smtp.Credentials = new NetworkCredential("", "");
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtp.Send(message);
            }
            catch (Exception) { }

            return true;
        }
    }
}