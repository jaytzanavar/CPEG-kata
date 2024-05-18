
using Newtonsoft.Json;

namespace BookingApi.Data
{
    public class BookingRepository : IBookingRepository
    {
        public async void AddBooking(Booking newBooking)
        {
            string jsonData = await File.ReadAllTextAsync("bookingsTimeTable.json");
            IEnumerable<Booking>? bookings = JsonConvert.DeserializeObject<IEnumerable<Booking>>(jsonData);
            var updateBooking = bookings.FirstOrDefault(b => b.Id == newBooking.Id);

            if (updateBooking != null)
            {
                updateBooking.IsAvailable = false;
                updateBooking.UserId = newBooking.UserId;
            }
            else
            {
                Console.WriteLine("Booking not found.");
                return;
            }

          
            string updatedJsonData = JsonConvert.SerializeObject(bookings);
            await File.WriteAllTextAsync("bookingsTimeTable.json", updatedJsonData);
        }

        public async Task<IEnumerable<Booking>> GetAllBookings()
        {
            string jsonData = await File.ReadAllTextAsync("bookingsTimeTable.json");
            IEnumerable<Booking>? bookings = JsonConvert.DeserializeObject<IEnumerable<Booking>>(jsonData);
            if (bookings == null)
            {
                return Enumerable.Empty<Booking>(); ;
            }
            return bookings;

        }



        public Booking GetBooking(int bookingId)
        {
            throw new NotImplementedException();
        }
    }
}
