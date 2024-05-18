using BookingApi;
using BookingApi.Data;
using BookingApi.services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddTransient<IUserRepositiory, UserRepository>();
builder.Services.AddTransient<IUserService, UserService>();
builder.Services.AddTransient<IBookingRepository, BookingRepository>();
builder.Services.AddTransient<IBookingService, BookingService>();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();

var app = builder.Build();

app.UseCors(policy => policy
    .WithOrigins("http://localhost:4200") // Add allowed origins
    .AllowAnyMethod()
    .AllowAnyHeader()
    .AllowCredentials()
);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/v1/rooms", async (IBookingService bookingService, ILogger<Program> _logger) =>
{
    _logger.Log(LogLevel.Information, "Getting all room bookings");


}).WithName("GetRoomBookings");

app.MapGet("/v1/roomSlots/{id:int}", async (int id, IBookingService bookingService, ILogger<Program> _logger) =>
{
    _logger.Log(LogLevel.Information, "Getting all room bookings");

    return await bookingService.GetSlotsForToday(id);


}).WithName("GetRoomSlotsToday");

app.MapGet("/v1/rooms/{id:int}", async (int id, IBookingService bookingService, HttpRequest request) =>
{

    if (request.Query.TryGetValue("week", out var weekValue) && int.TryParse(weekValue, out var week))
    {
        // if (!weekValue.IsNullOrEmpty())
        // {
        return await bookingService.GetRoomAvailabilityForWeek(id, int.Parse(weekValue));
        // }

    }
    return await bookingService.GetRoomAvailabilityForWeek(id, 0);


}).WithName("GetRoomBooking");

app.MapPost("/v1/book", async ([FromBody] BookingDTO booking, IBookingService bookingService, IUserService userService) =>
{

    var user = await userService.GetUserByEmail(booking.Email);
    if (user == null)
    {
        var newUser = new User
        {
            Id = Guid.NewGuid(),
            FirstName = booking.FirstName,
            LastName = booking.LastName,
            Email = booking.Email,
            BirthDate = booking.BookingDateTime
        };

        var createdUser = await userService.CreateUser(newUser);

        var newBooking = new Booking
        {
            RoomId = booking.RoomId,
            StartTime = booking.BookingDateTime,
            IsAvailable = false,
            UserId = createdUser.Id
        };

        var createdBooking = await bookingService.CreateRoomBooking(newBooking);
    }
    else
    {
        var newBooking = new Booking
        {
            RoomId = booking.RoomId,
            StartTime = booking.BookingDateTime,
            IsAvailable = false,
            UserId = user.Id
        };

        await bookingService.CreateRoomBooking(newBooking);
    }

}).WithName("CreateRoomBooking").Produces<BookingDTO>(201).Produces(400);



string filePath = "bookingsTimeTable.json";

var dataSeeder = new BookingDataSeeder();
dataSeeder.SeedBookings(filePath);

app.Run();


