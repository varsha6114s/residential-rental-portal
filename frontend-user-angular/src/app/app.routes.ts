import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { TowersComponent } from './components/towers/towers';
import { UnitsComponent } from './components/units/units';
import { MyBookingsComponent } from './components/my-bookings/my-bookings';
import { AmenitiesComponent } from './components/amenities/amenities';
import { LayoutComponent } from './components/layout/layout.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [authGuard],
        children: [
            { path: 'towers', component: TowersComponent },
            { path: 'units/:towerId', component: UnitsComponent },
            { path: 'amenities', component: AmenitiesComponent },
            { path: 'my-bookings', component: MyBookingsComponent }
        ]
    },
    { path: '**', redirectTo: '/login' }
];
