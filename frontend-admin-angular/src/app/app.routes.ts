import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { DashboardComponent } from './components/dashboard/dashboard';
import { ManageTowersComponent } from './components/manage-towers/manage-towers';
import { ManageUnitsComponent } from './components/manage-units/manage-units';
import { ManageAmenitiesComponent } from './components/manage-amenities/manage-amenities';
import { BookingsComponent } from './components/bookings/bookings';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [adminGuard] },
    { path: 'towers', component: ManageTowersComponent, canActivate: [adminGuard] },
    { path: 'units', component: ManageUnitsComponent, canActivate: [adminGuard] },
    { path: 'amenities', component: ManageAmenitiesComponent, canActivate: [adminGuard] },
    { path: 'bookings', component: BookingsComponent, canActivate: [adminGuard] },
    { path: '**', redirectTo: '/login' }
];
