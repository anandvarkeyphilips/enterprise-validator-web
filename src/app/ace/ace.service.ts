import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AceService {

  constructor(private http: HttpClient) { }

  public validate(inputMessage: string, url: string): Observable<any> {
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(url, {
      inputMessage
    },
      { headers: header }).pipe(
        catchError((err) => {
          return throwError(err);
        })
      );
  }
}
