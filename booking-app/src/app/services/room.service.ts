import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Room } from '../models/room';
import { environment } from '../../environements/environment';
import { Observable, from, of } from 'rxjs';
import { Booking } from '../models/booking';
import { BookingTimetable } from '../models/bookingTimetable';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  BASE_URL = `${environment.baseUrl}/${environment.version}/`;
  constructor(private http: HttpClient) { }

  getRooms(): Observable<Array<Room>> {
    return from([[{ id: '1', todayAvailabilities: 2 }, { id: '2', todayAvailabilities: 5 }]])
  }

  getRoomSlots(id: number): Observable<number> {
    return this.http.get<number>(`${this.BASE_URL}roomSlots/${id}`)
  }

  getAvailabilitiesForRoom(room: string, week?: number): Observable<any> {
    return this.http.get<Array<Room>>(`${this.BASE_URL}rooms/${room}?week=${week}`)



    // try
    //return this.http.get<Room>(`${this.BASE_URL}/room/${id}`);
    // catch
  }

  bookRoom(book: any): Observable<Booking> {
    return this.http.post<Booking>(`${this.BASE_URL}book`, { ...book });
  }

}
