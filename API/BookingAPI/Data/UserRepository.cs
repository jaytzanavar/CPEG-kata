using Newtonsoft.Json;

namespace BookingApi.Data
{
    public class UserRepository : IUserRepositiory
    {

        public async Task AddUser(User user)
        {
            string usersData = await File.ReadAllTextAsync("userDataTable.json");
            List<User>? users = JsonConvert.DeserializeObject<List<User>>(usersData) ?? new List<User>();


            bool userExist = users.Any(u => u.Id == user.Id);
            if (!userExist)
            {

                users.Add(user);

                string updatedJsonData = JsonConvert.SerializeObject(users);


                await File.WriteAllTextAsync("userDataTable.json", updatedJsonData);
            }
            else
            {

                throw new InvalidOperationException("User already exists.");
            }

        }

        public async Task<User> GetUser(string email)
        {
            string usersData = await File.ReadAllTextAsync("userDataTable.json");
            List<User>? users = JsonConvert.DeserializeObject<List<User>>(usersData) ?? new List<User>();
            if (users.Count > 0)
            {
                return users.Find(u => u.Email == email);

            }
            return null;

        }


    }

}