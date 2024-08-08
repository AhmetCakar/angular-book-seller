import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const API_URL = `${environment.BASE_URL}/api/authentication/`

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient) {
    let storageUser;
    const storageUserAsStr = this.isBrowser() ? localStorage.getItem('currentUser') : null;
    if (storageUserAsStr) {
      storageUser = JSON.parse(storageUserAsStr);
    }

    this.currentUserSubject = new BehaviorSubject<User>(storageUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(user: User): Observable<any> {
    return this.http.post<any>(API_URL+'sign-in', user).pipe(
      map(response => {
        if (response && this.isBrowser()) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
        }
        return response;
      })
    );
  }

  register(user: User): Observable<any> {
    return this.http.post(API_URL + 'sign-up', user);
  }

  logOut() {
    if (this.isBrowser()) {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(new User());
  }
}
