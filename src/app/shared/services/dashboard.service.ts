import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ConfigService } from '../utils/config.service';
import { tap, catchError, map } from 'rxjs/operators';
import { HomeDetails } from '../models/home.details.interface';
import { Observable } from 'rxjs';
import { Http,Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends BaseService {

  baseUrl: string = ''; 

  constructor(private http: Http, private configService: ConfigService) {
     super();
     this.baseUrl = configService.getApiURI();
  }

  getHomeDetails(): Observable<HomeDetails> {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let authToken = localStorage.getItem('auth_token');
      headers.append('Authorization', `Bearer ${authToken}`);
  
    return this.http.get(this.baseUrl + "/dashboard/home",{headers}).pipe(
      map((response) => response.json())
      ,catchError(this.handleError(""))
      );
  }  
}
