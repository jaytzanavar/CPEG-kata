import { ChangeDetectionStrategy, Component, Input, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatButton } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'cpeg-room-card',
  standalone: true,
  imports: [MatCardModule, MatProgressBarModule, MatDividerModule, MatButton, RouterModule],
  templateUrl: './room-card.component.html',
  styleUrl: './room-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoomCardComponent {
  @Input() roomNo?: number | string;
  @Input() availabilities?: any;


  constructor(private router: Router) {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
    const valueChange = changes['todayAvailabilities'];
    // If no change occured then valueChanges will be undefined.
    if (valueChange) {
      this.availabilities = changes['todayAvailabilities'].currentValue
    }
  }




}
