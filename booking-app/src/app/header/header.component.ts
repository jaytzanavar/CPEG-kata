import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar'; 

@Component({
  selector: 'cpeg-header',
  standalone: true,
  imports: [MatToolbarModule, NgOptimizedImage],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
