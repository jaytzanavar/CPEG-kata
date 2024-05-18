using Newtonsoft.Json;

namespace BookingApi.Data
{


    public class BookingDataSeeder
    {
        public void SeedBookings(string filePath)
        {
            if (!File.Exists(filePath))
            {
                List<Booking> bookings = GenerateBookings();
                SaveToJson(bookings, filePath);
            }

        }

        private List<Booking> GenerateBookings()
        {
            List<Booking> bookings = new List<Booking>();

            for (int roomIT = 0; roomIT < 2; roomIT++)
            {
                DateTime currentDate = DateTime.Today;
                DateTime endDate = currentDate.AddDays(365);
                while (currentDate <= endDate)
                {
                    if (currentDate.DayOfWeek != DayOfWeek.Saturday && currentDate.DayOfWeek != DayOfWeek.Sunday)
                    {
                        for (int i = 0; i < 10; i++)
                        {
                            DateTime startTime = currentDate.Date.AddHours(8).AddMinutes(i * 30);
                            bookings.Add(new Booking { Id = Guid.NewGuid(), RoomId = roomIT, StartTime = startTime, IsAvailable = true, UserId = null });
                        }

                    }
                    currentDate = currentDate.AddDays(1);
                }

            }

            return bookings;
        }

        private void SaveToJson(List<Booking> bookings, string filePath)
        {
            string jsonData = JsonConvert.SerializeObject(bookings, Formatting.Indented);
            File.WriteAllText(filePath, jsonData);
        }
    }
}