import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { AuthGuard } from './modules/authentication/auth.guard';
import { UserImagesComponent } from './views/user-images/user-images.component';
import { AppInfoComponent } from './views/app-info/app-info.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
        canActivate: [AuthGuard] 
    },
     { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
     { path: 'images', component: UserImagesComponent, canActivate: [AuthGuard] },
     { path: 'appinfo', component: AppInfoComponent,  },
 
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);