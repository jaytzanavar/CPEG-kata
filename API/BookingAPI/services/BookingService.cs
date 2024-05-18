using BookingApi.Data;

namespace BookingApi.services
{
    public class BookingService : IBookingService
    {
        private readonly IBookingRepository context;

        public BookingService(IBookingRepository repo)
        {
            context = repo;
        }

        public async Task<int> GetSlotsForToday(int roomId)
        {
            var Today = DateTime.Today;
            var getAllBookings = await context.GetAllBookings();
            var availableDates = getAllBookings
                .Where(b => b.RoomId == roomId && b.StartTime.Day == Today.Day && b.StartTime.Month == Today.Month && b.StartTime.Year == Today.Year && b.IsAvailable == true)
                .ToList();

            return availableDates.Count();
        }



        public async Task<IEnumerable<GrouppedBooking>> GetRoomAvailabilityForWeek(int roomId, int? week = 0)
        {
            var Today = DateTime.Today;

            var getAllBookings = await context.GetAllBookings();
            int batchSize = 5;
            int batchIndex = (week ?? 0) * 5;
            var endDate = Today.AddDays(10 * (batchIndex + 1));
            var availableDates = getAllBookings
                .Where(b => b.RoomId == roomId && b.StartTime >= Today && b.StartTime < endDate)
                .ToList();

            var mappedData = availableDates
            .GroupBy(booking => booking.StartTime.Date)
            .Select(group =>
            {
                return new GrouppedBooking
                {
                    Date = group.Key.ToString("MM/dd/yyyy"),
                    Data = group.Select(booking => new Booking
                    {
                        Id = booking.Id,
                        StartTime = booking.StartTime,
                        RoomId = booking.RoomId,
                        UserId = booking.UserId,
                        IsAvailable = booking.IsAvailable
                    }).ToList()
                };
            }).ToList().Skip(batchIndex).Take(5);



            var batchedData = mappedData;
            return batchedData;
        }

        public async Task<Booking> CreateRoomBooking(Booking booking)
        {
            var getAllBookings = await context.GetAllBookings();

            var Today = DateTime.Today;
            var bookingSlot = getAllBookings
                .Where(b => b.RoomId == booking.RoomId && b.StartTime >= booking.StartTime && b.StartTime < booking.StartTime.AddMinutes(30))
                .ToList();


            if (bookingSlot.First() != null)
            {
                var bookRoom = new Booking
                {
                    Id = bookingSlot.First().Id,
                    UserId = booking.UserId,
                    StartTime = booking.StartTime,
                    IsAvailable = booking.IsAvailable,
                    RoomId = booking.RoomId
                };
                context.AddBooking(bookRoom);
                return bookingSlot.First();

            }
            return null;
        }


    }

}
