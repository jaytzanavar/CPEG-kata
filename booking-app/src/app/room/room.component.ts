import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RoomSchedulerComponent } from '../room-scheduler/room-scheduler.component';
import { AsyncSubject, BehaviorSubject, ReplaySubject, Subject, from, map, of, switchMap, tap } from 'rxjs';
import { RoomService } from '../services/room.service';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'cpeg-room',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatIconModule, RoomSchedulerComponent],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})
export class RoomComponent implements OnInit {
  activateRouter = inject(ActivatedRoute)
  ser = inject(RoomService)
  id?: string;

  auth_token = "adadasdasdasdasdas";

  sourceSubject = new Subject();
  bSubject = new BehaviorSubject<string>('hello')
  replayS = new ReplaySubject(2);
  asyncS = new AsyncSubject<string>(); // Complete!!! 

  private handleSubject() {
    this.sourceSubject.subscribe(it => console.log(it))
  }

  private handleBehaviorSub() {
    this.bSubject.subscribe(it => console.log(it))
  }

  private handleReplayS() {
    this.replayS.next(' THis a replay value from past')
    this.replayS.next(' THis a replay value from past 2')
    this.replayS.next(' THis a replay value from past 3')
    this.replayS.subscribe(it => console.log(it))
  }

  private handleAsyncS() {

    this.asyncS.subscribe(it => console.log(it))
  }





  ngOnInit() {
    this.id = this.activateRouter.snapshot.params['id']
    // this.obs$.pipe(
    //   switchMap(id =>
    //     this.ser.getAvailabilitiesForRoom('1').pipe(
    //     )
    //   )
    // ).subscribe(
    //   { next: (res) => console.log(res) }
    // )this.sourceSubject.next(' A Value')
    this.sourceSubject.next(' A Value')
    // this.handleSubject()

    // this.handleBehaviorSub();
    // this.handleReplayS();
    this.handleAsyncS();
    this.asyncS.next(' THis a replay value from past')
    this.asyncS.next(' THis a replay value from past 2')
    this.asyncS.next(' THis a replay value from past 3')
    this.asyncS.complete()

  }

  obs$ = of(1, 2, 3, 4)


}
