namespace BookingApi.Data
{
    public interface IBookingRepository
    {
        Task<IEnumerable<Booking>> GetAllBookings();
        Booking GetBooking(int bookingId);
        void AddBooking(Booking booking);


    }
}
