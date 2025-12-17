```typescript
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { TowersComponent } from './components/towers/towers';
import { UnitsComponent } from './components/units/units';
import { MyBookingsComponent } from './components/my-bookings/my-bookings';
import { AmenitiesComponent } from './components/amenities/amenities';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'towers', component: TowersComponent, canActivate: [authGuard] },
    { path: 'units/:towerId', component: UnitsComponent, canActivate: [authGuard] },
    { path: 'amenities', component: AmenitiesComponent, canActivate: [authGuard] },
    { path: 'my-bookings', component: MyBookingsComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: '/login' }
];
```
