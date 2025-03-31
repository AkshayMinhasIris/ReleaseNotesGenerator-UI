import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'  
  
})
export class ApiService {

//private backendApiUrl = "https://neuralnexusapi-d9gfd0ddebcnbhd4.centralindia-01.azurewebsites.net/"
private backendApiUrl = 'https://localhost:44378/'; // Your backend API//
 
  constructor(private http: HttpClient) {
   
  }
   

  getPullRequests(): Observable<any[]> {
    debugger;
    return this.http.get<any[]>(this.backendApiUrl + "api/GitHub/pull-requests");
  }
 
  

  generateReport(prs: any[]): Observable<any> {
    debugger;
    return this.http.post<any>(this.backendApiUrl + "api/ReleaseNotes/generate", prs);
  }
}