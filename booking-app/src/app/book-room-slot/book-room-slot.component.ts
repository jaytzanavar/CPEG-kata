import { ChangeDetectionStrategy, Component, ViewEncapsulation, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoomService } from '../services/room.service';
import { BehaviorSubject, catchError, finalize, of, tap } from 'rxjs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'cpeg-book-room-slot',
  standalone: true,
  providers: [provideNativeDateAdapter(), DatePipe],
  imports: [MatCardModule, MatFormFieldModule, ReactiveFormsModule, AsyncPipe, FormsModule, MatInputModule, MatProgressSpinnerModule, RouterModule, MatIconModule, MatDatepickerModule, MatButtonModule, MatSnackBarModule,
    JsonPipe],
  templateUrl: './book-room-slot.component.html',
  styleUrl: './book-room-slot.component.scss',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class BookRoomSlotComponent {
  activateRouter = inject(ActivatedRoute)
  router = inject(Router)
  location = inject(Location)
  fb = inject(FormBuilder)
  roomService = inject(RoomService)
  snackBar = inject(MatSnackBar)
  datePipe = inject(DatePipe)
  id?: string;
  slot: any;
  form!: FormGroup;
  error: string | null = null
  loadingSubject = new BehaviorSubject<boolean>(false);


  ngOnInit() {
    this.id = this.activateRouter.snapshot.params['id']

    let state = this.location.getState() as { slot: any };
    console.log("the state")
    console.log(state)
    if (state && typeof state === 'object') {
      this.slot = state['slot']
      console.log(this.slot)
    }

    this.form = this.fb.group(
      {
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        birthDate: ['', Validators.required],
      }
    )
  }

  bookTime() {
    const formValues = {
      ...this.form.value,
      birthDate: this.datePipe.transform(this.form.value.birthDate, 'yyyy-MM-dd HH:mm:ss')
    }
    let bookForm = {
      roomId: this.id,
      ...formValues,
      bookingDateTime: this.slot.startTime
    }
    this.loadingSubject.next(true)



    this.roomService.bookRoom({ ...bookForm }).
      pipe(

        catchError(err => { return of(err) }),
        finalize(() => {
          this.loadingSubject.next(false)
          const url = `room/${this.id}`
          this.router.navigateByUrl(url)
        })
      ).subscribe(
        {
          next: res => this.showSnackBarSuccess(parseInt(this.id ? this.id : '0', 10)),
          error: er => console.error(er),

        }
      )

  }

  private showSnackBarSuccess(id: number): void {
    this.snackBar.open(`User booked room ${id} successfully`, "OK", {
      duration: 2000, // Duration in milliseconds
      panelClass: ['green-snackbar']
    });
    // this.location.back()
  }

}
