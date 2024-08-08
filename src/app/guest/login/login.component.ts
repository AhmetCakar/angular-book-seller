

import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import {faUserCircle} from "@fortawesome/free-solid-svg-icons";
import { AuthenticationService } from '../../service/authentication.service';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, FontAwesomeModule, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  user: User = new User();
  faUser = faUserCircle;
  errorMessage: string = "";

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    if (this.authenticationService.currentUserValue?.id) {
      this.router.navigate(['/profile']);
      return;
    }
  }

  login() {
    this.authenticationService.login(this.user).subscribe(data => {
      this.router.navigate(['/profile']);
    }, err => {
      this.errorMessage = 'Username or password is incorrect.';
      console.log(err);
    })
  }

}