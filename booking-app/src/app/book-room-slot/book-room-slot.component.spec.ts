import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookRoomSlotComponent } from './book-room-slot.component';

describe('BookRoomSlotComponent', () => {
  let component: BookRoomSlotComponent;
  let fixture: ComponentFixture<BookRoomSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookRoomSlotComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookRoomSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
