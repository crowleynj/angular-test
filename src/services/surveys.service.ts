import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Survey } from '../models/survey';

@Injectable({providedIn: 'root'})
export class SurveysService {
  baseUrl: string;
  headers = new HttpHeaders();

  constructor(private http: HttpClient) {
    this.baseUrl = 'https://techtestapi1.azurewebsites.net/survey';
    this.headers = this.headers.set('X-API-KEY', 'crowleynj@gmail.com');
  }

  getSurveyById(id: string): Observable<Survey> {
    return this.http.get<Survey>(`${this.baseUrl}/${id}`, {headers: this.headers});
  }

  updateSurveyById(id: string, data: Survey): Observable<Survey> {
    return this.http.put<Survey>(`${this.baseUrl}/${id}`, data, {headers: this.headers});
  }
}
