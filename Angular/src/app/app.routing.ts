import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { PensioncalculatorComponent } from './_pensioncalculator/pensioncalculator.component';
import { PensiondetailsComponent } from './_pensiondetails/pensiondetails.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent, pathMatch:'full'},
    {path: 'view-pension', component: HomeComponent, canActivate: [AuthGuard] },
    {path: 'get-pension', component: PensiondetailsComponent ,canActivate: [AuthGuard] },
    { path: 'calculatepension/:aadharNumber', component:PensioncalculatorComponent,canActivate:[AuthGuard]},
{ path: 'login', component: LoginComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);