import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {BaseService} from "./base.service";
import { ConfigService } from '../utils/config.service';
import { Observable,BehaviorSubject } from 'rxjs';
import { catchError, map,tap } from 'rxjs/operators';
import { UserRegistration } from '../models/user.registration.interface';



@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  baseUrl: string = '';

  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private loggedIn = false;

  constructor(private http: Http, private configService: ConfigService) {
    super();
    this.loggedIn = !!localStorage.getItem('auth_token');
    // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
    // header component resulting in authed user nav links disappearing despite the fact user is still logged in
    this._authNavStatusSource.next(this.loggedIn);
    this.baseUrl = configService.getApiURI();
  }

    register(email: string, password: string, firstName: string, lastName: string,location: string): Observable<UserRegistration> {
    let body = JSON.stringify({ email, password, firstName, lastName,location });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

  
    return this.http.post(this.baseUrl + "/accounts", body, options).pipe(
      tap((serRegistration: UserRegistration) => this.log(`added hero w/ id=${serRegistration.email}`)),
    catchError(this.handleError<UserRegistration>('getRegions')));
  }  



   login(userName, password) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post(
      this.baseUrl + '/auth/login',
      JSON.stringify({ userName, password }),{ headers }
      ).pipe(tap(res => { localStorage.setItem('auth_token',res.json().auth_token)
        this.loggedIn = true;
        this._authNavStatusSource.next(true);
        return true;
      }),catchError(this.handleError("error")))
      
    //)
  }

  

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
    this._authNavStatusSource.next(false);
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  facebookLogin(accessToken:string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let body = JSON.stringify({ accessToken });  
    return this.http
      .post(
      this.baseUrl + '/externalauth/facebook', body, { headers }
    ).pipe(tap(res => { localStorage.setItem('auth_token',res.json().auth_token)
        this.loggedIn = true;
        this._authNavStatusSource.next(true);
        return true;
      }),catchError((this.handleError("error"))))
  
}
}
