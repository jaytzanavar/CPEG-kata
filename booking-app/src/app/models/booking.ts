import { User } from "./user";

export interface Booking {
    id: number;
    startDateTime: string;
    userBooked?: User | null;
    bookingSlot: number;
    roomId: number;
    isAvailable: boolean;

}