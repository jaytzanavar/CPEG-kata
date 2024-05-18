import { Booking } from "./booking";

export interface BookingTimetable {
    date: string;
    data: Array<Booking>;
}