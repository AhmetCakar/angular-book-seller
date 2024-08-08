import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  signInForm = this.fb.group({
    username: [''],
    password: ['']
  });

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  onSubmit(): void {
    this.http.post('http://localhost:8080/api/authentication/sign-in', this.signInForm.value)
      .subscribe({
        next: (response: any) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/profile']); // İstediğiniz bir rota
        },
        error: err => console.error('Error:', err)
      });
  }
}
