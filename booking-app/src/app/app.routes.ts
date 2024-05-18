import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        loadComponent: () => import('./landing/landing.component').then(c => c.LandingComponent),
        pathMatch: "full"

    },
    {
        path: "room/:id",
        // loadComponent: () => import ('./room/room.component').then(c=> c.RoomComponent),
        loadChildren: () =>
            import('./room/room-routes').then(routes => routes.RoomRoute)

    }
];
