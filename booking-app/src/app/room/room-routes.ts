import { Routes } from "@angular/router";

export const RoomRoute: Routes =
    [{
        path: '',
        loadComponent: () => import('./room.component').then(r => r.RoomComponent)
    }, 
    
    {
        path: 'subscribe',
        loadComponent: () => import('../book-room-slot/book-room-slot.component').then(r => r.BookRoomSlotComponent)
    }

    ]