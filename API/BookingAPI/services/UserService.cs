
using BookingApi.Data;

namespace BookingApi.services
{
    public class UserService : IUserService
    {
        private readonly IUserRepositiory context;

        public UserService(IUserRepositiory repo)
        {
            context = repo;
        }

        async Task<User> IUserService.GetUserByEmail(string email)
        {
            return await context.GetUser(email);

        }



        async Task<User> IUserService.CreateUser(User user)
        {
            var newUser = new User
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Id = Guid.NewGuid(),
                BirthDate = user.BirthDate
            };

            await context.AddUser(newUser);
            return newUser;
        }
    }
}