import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AgentStatus } from '../enums/agent-status.enum';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SainoService {
    constructor(private http: HttpClient) { }
    
    getEmployeeStatus(name:string, ic:string): Observable<any> {
      name = name.replace(/ /g, '%20');
      return this.http.get<any>(`https://demo2020.365hr.com.my:8091/api/Employee/GetEmployeeStatus?Name=${name}&IC=${ic}`)
        .pipe(
          catchError(this.handleError<any[]>('getEmployeeStatus', []))
        )
    }
  
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
          console.error(`${operation} failed: ${error.message}`);
          // Prevent application from completely erroring out.
          return of(result as T);
        };
      }  

}