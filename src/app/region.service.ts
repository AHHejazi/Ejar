import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { Iregion, IregionVM } from './region/region';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RegionService {


  private RegionUrl = 'http://localhost:51586/api/Values/Region';  // URL to web api

  private AddRegionUrl = 'http://localhost:51586/api/Values/PostRegion';  // URL to web api

  private deleteRegionUrl = 'http://localhost:51586/api/Values/DeleteRegionsById/';  // URL to web api

  constructor(private http: HttpClient) 
  { 
    
  }

  
 
  getRegionById(id:string): Observable<Iregion> {
    const url = "http://localhost:51586/api/Values/GetRegionsById/";
    return this.http.get<Iregion>(`${url}/${id}`).pipe(
      tap(_ => this.log(`fetched region id=${id}`)),
      catchError(this.handleError<Iregion>(`getregion id=${id}`))
    );
  }

  addRegion (region: Iregion) {
    let body = JSON.stringify(region);
     this.http.post<Iregion>(this.AddRegionUrl, body, httpOptions)
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured");
        }
      );

  }
  
  
  deleteRegion (regionid:Guid) :Observable<any> {
   return this.http.get(this.deleteRegionUrl+regionid.toString()) 

  }

  getRegions(params:HttpParams): Observable<IregionVM> {
    return this.http.get<IregionVM>(this.RegionUrl,{params})
    .pipe( tap(IregionVM => this.log('fetched region')),
    catchError(this.handleError<IregionVM>('getRegions')))
  }

   /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a regionService message with the MessageService */
  private log(message: string) {
    console.log(`regionService: ${message}`);
  }
}
