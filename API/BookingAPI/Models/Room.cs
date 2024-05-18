public class Room
{
    public int Id { get; set; }
    public required string Name { get; set; }

    public List<Booking>? Bookings { get; set; }

}