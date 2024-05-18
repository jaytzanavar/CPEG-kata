namespace BookingApi.services
{
    public interface IUserService
    {
        Task<User> GetUserByEmail(string email);

        Task<User> CreateUser(User user);

    }

}