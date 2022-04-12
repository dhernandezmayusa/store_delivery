import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { InternalResponse } from '../models/internalResponse';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // Define API Fachada
  url = 'http://localhost:17760/api';


  constructor(private http: HttpClient) { }

  //  Generar JWT
  authorized(): Observable<InternalResponse> {
    return this.http.post<InternalResponse>(`${this.url}/authorization/generateToken`, '')
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method
  get(jwt: string, controller: string, method: string, parameters: string = ''): Observable<InternalResponse> {
    return this.http.get<InternalResponse>(`${this.url}/${controller}/${method}?${parameters}`,
      { headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt } })
      .pipe(retry(1), catchError(this.handleError));
  }

  getUrl(_url: string, parameters: string = ''): Observable<InternalResponse> {
    return this.http.get<any>(`${_url}?${parameters}`,).pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API post() method
  post(jwt: string, controller: string, method: string, model: any): Observable<InternalResponse> {
    return this.http.post<InternalResponse>(`${this.url}/${controller}/${method}`, JSON.stringify(model),
      { headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt } })
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API put() method
  put(jwt: string, controller: string, method: string, model: any): Observable<InternalResponse> {
    return this.http.put<InternalResponse>(`${this.url}/${controller}/${method}`, model,
      { headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt } })
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API delete() method
  delete(jwt: string, controller: string, method: string): Observable<InternalResponse> {
    return this.http.delete<InternalResponse>(`${this.url}/${controller}/${method}`,
      { headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt } })
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) { errorMessage = error.error.message; }
    else { errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`; }
    return throwError(errorMessage);
  }

}
