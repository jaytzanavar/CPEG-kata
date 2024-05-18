namespace BookingApi.Data
{
    public interface IUserRepositiory
    {
        Task<User> GetUser(string email);
        Task AddUser(User user);
    }
}