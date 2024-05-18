namespace BookingApi.services
{
    public interface IBookingService
    {
        Task<IEnumerable<GrouppedBooking>> GetRoomAvailabilityForWeek(int roomId, int? week);
        Task<int> GetSlotsForToday(int roomId);

        Task<Booking> CreateRoomBooking(Booking booking);


    }

}