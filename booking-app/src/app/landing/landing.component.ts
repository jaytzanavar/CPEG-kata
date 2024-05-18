import { Component } from '@angular/core';
import { RoomCardComponent } from '../room-card/room-card.component';
import { RoomService } from '../services/room.service';
import { BehaviorSubject, Observable, combineLatest, finalize } from 'rxjs';
import { Room } from '../models/room';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'cpeg-landing',
  standalone: true,
  imports: [RoomCardComponent, CommonModule, MatProgressSpinnerModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  slots!: Observable<[number, number]>;
  rooms = [0, 1];
  roomAvailabilities?: Observable<String>;
  loadingSubject = new BehaviorSubject<boolean>(true);

  constructor(private roomService: RoomService) {
    this.loadingSubject.next(true);

  }
  ngOnInit() {
    this.slots = combineLatest([
      this.roomService.getRoomSlots(0),
      this.roomService.getRoomSlots(1)
    ]).pipe(
      finalize(() => this.loadingSubject.next(false))
    )

  }
}
