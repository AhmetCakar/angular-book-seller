import { Injectable } from '@angular/core';
import { RequestBaseService } from './request-base.service';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { Purchase } from '../model/purchase.model';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

const API_URL = `${environment.BASE_URL}/api/purchase-history`;


@Injectable({
  providedIn: 'root'
})
export class PurchaseService extends RequestBaseService {

  constructor(authenticationService: AuthenticationService, http: HttpClient) {
    super(authenticationService, http);
  }

  savePurchase(purchase: Purchase): Observable<any> {
    return this.http.post(API_URL, purchase, {headers: this.getHeaders});
  }

  getAllPurchaseItems(): Observable<any> {
    return this.http.get(API_URL, {headers: this.getHeaders});
  }
}
