import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { AuthenticationService } from '../../service/authentication.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, FontAwesomeModule, RouterLink, RouterLinkActive],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  user: User = new User();
  faUser = faUserCircle;
  errorMessage: string = '';

  constructor(private authenticationService: AuthenticationService, private router: Router) { }
  
  ngOnInit(): void {
    if (this.authenticationService.currentUserValue?.id) {
      this.router.navigate(['/profile']);
      return;
    }
  }

  register() {
    this.authenticationService.register(this.user).subscribe(data => {
      this.router.navigate(['/login']);
    }, err => {
      if (err?.status === 409) {
        this.errorMessage = 'Username already exist.';
      } else {
        this.errorMessage = 'Unexpected error occurred. Error is: ' + err?.errorMessage;
        console.log(err);
      }
    })
  }

}
