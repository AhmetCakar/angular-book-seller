import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { AuthenticationService } from './authentication.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestBaseService {

  protected currentUser: User = new User();

  constructor(protected authService: AuthenticationService, protected http: HttpClient) {
    this.authService.currentUser.subscribe(data =>{
      this.currentUser = data;
    });
   }

   get getHeaders(): HttpHeaders{
    const token = this.authService.currentUserValue?.token;
    return new HttpHeaders(
      {
        authorization: 'Bearer ' + this.currentUser?.token,
        "Content-Type": "application/json; charset=UTF-8"
      }
    );
   }
}
