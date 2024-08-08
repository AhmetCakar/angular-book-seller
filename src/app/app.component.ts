import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './service/authentication.service';
import { User } from './model/user.model';
import { Role } from './model/role.enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-book-seller';

  currentUser: User = new User;

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.authenticationService.currentUser.subscribe(data => {
      this.currentUser = data;
    });
  }

  isAdmin() {
    return this.currentUser?.role === Role.ADMIN;
  }

  logOut() {
    this.authenticationService.logOut();
    this.router.navigate(['/login']);
  }
}
