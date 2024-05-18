class BookingDTO
{
    public int Id { get; set; }

    public int RoomId { get; set; }

    public required string FirstName { get; set; }
    public required string LastName { get; set; }

    public required string Email { get; set; }
    public DateTime DateOfBirth { get; set; }

    public DateTime BookingDateTime { get; set; }
}