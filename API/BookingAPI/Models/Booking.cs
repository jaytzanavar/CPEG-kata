public class Booking
{
    public Guid Id { get; set; }
    public int RoomId { get; set; }
    public DateTime StartTime { get; set; }
    public bool IsAvailable { get; set; }
    public Guid? UserId { get; set; }

}