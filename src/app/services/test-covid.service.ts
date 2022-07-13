import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrlGrails } from 'src/environments/environment';
import { Test } from '../models/test';

@Injectable({
  providedIn: 'root',
})
export class TestCovidService {
  configUrl = apiUrlGrails;

  constructor(private http: HttpClient) {}

  getTests() {
    return this.http.get<Test[]>(this.configUrl + 'test');
  }

  getTest(id: number) {
    return this.http.get<Test>(this.configUrl + 'test/' + id);
  }
}