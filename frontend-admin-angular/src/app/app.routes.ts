import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { DashboardComponent } from './components/dashboard/dashboard';
import { ManageTowersComponent } from './components/manage-towers/manage-towers';
import { ManageUnitsComponent } from './components/manage-units/manage-units';
import { ManageAmenitiesComponent } from './components/manage-amenities/manage-amenities';
import { BookingsComponent } from './components/bookings/bookings';
import { LayoutComponent } from './components/layout/layout.component';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [adminGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'towers', component: ManageTowersComponent },
            { path: 'units', component: ManageUnitsComponent },
            { path: 'amenities', component: ManageAmenitiesComponent },
            { path: 'bookings', component: BookingsComponent }
        ]
    },
    { path: '**', redirectTo: '/login' }
];
