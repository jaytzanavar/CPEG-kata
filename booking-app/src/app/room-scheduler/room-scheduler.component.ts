import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RoomService } from '../services/room.service';
import { Booking } from '../models/booking';
import { Observable, Subscription } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'cpeg-room-scheduler',
  standalone: true,
  imports: [MatCardModule, CommonModule, DatePipe, MatIconModule, MatButtonModule],
  templateUrl: './room-scheduler.component.html',
  styleUrl: './room-scheduler.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomSchedulerComponent implements OnInit {
  @Input() roomId!: string;
  booking$?: Observable<any>;
  booking: any = [];
  subscription?: Subscription;
  currentWeek = 0;
  constructor(private roomService: RoomService, private router: Router) {

  }

  ngOnInit() {
    this.booking$ = this.roomService.getAvailabilitiesForRoom(this.roomId)


  }
  selectSlot(slot: Booking) {
    if (slot.isAvailable) {
      const url = `room/${this.roomId}/subscribe`
      this.router.navigateByUrl(url, { state: { slot: slot } })
    }
  }

  nextWeek() {
    this.currentWeek += 1;
    this.booking$ = this.roomService.getAvailabilitiesForRoom(this.roomId, this.currentWeek)
  }

  prevWeek() {
    this.currentWeek -= 1;
    this.booking$ = this.roomService.getAvailabilitiesForRoom(this.roomId, this.currentWeek)
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe()
  }
}
