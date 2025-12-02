import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Survey } from '../models/survey';

@Injectable({providedIn: 'root'})
export class SurveysService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'https://techtestapi1.azurewebsites.net/survey';
  }

  getSurveyById(id: string): Observable<Survey> {
    let headers = new HttpHeaders();
    headers = headers.set('X-API-KEY', 'crowleynj@gmail.com');
    return this.http.get<Survey>(`${this.baseUrl}/${id}`, {headers: headers});
  }
}
