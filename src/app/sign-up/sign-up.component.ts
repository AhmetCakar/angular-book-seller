import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent {
  signUpForm = this.fb.group({
    username: [''],
    password: ['']
  });

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  onSubmit(): void {
    this.http.post('http://localhost:8080/api/authentication/sign-up', this.signUpForm.value)
      .subscribe({
        next: () => this.router.navigate(['/sign-in']),
        error: err => console.error('Error:', err)
      });
  }
}
