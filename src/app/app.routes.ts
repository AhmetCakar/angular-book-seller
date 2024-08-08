import { Routes } from '@angular/router';
import { HomeComponent } from './guest/home/home.component';
import { RegisterComponent } from './guest/register/register.component';
import { AdminComponent } from './admin/admin/admin.component';
import { ProfileComponent } from './user/profile/profile.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { UnauthorizedComponent } from './error/unauthorized/unauthorized.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './guest/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { Role } from './model/role.enum';

export const routes: Routes = [
    { path: '', redirectTo:'home', pathMatch: "full" },
    { path: 'home', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'sign-in', component: SignInComponent },

    { path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.ADMIN, Role.USER]}
      },
    
      { path: 'admin',
        component: AdminComponent,
        canActivate: [AuthGuard],
        data: {roles: [Role.ADMIN]}
      },
    { path: '404', component: NotFoundComponent },
    { path: '401', component: UnauthorizedComponent },
    { path: '**', component: NotFoundComponent },
    
];
