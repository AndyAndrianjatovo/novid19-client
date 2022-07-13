import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrlGrails } from 'src/environments/environment';
import { Vaccin } from '../models/vaccin';

@Injectable({
  providedIn: 'root',
})
export class VaccinService {
  configUrl = apiUrlGrails;

  constructor(private http: HttpClient) {}

  getVaccins() {
    return this.http.get<Vaccin[]>(this.configUrl + 'vaccin');
  }

  getVaccin(id: number) {
    return this.http.get<Vaccin>(this.configUrl + 'vaccin/' + id);
  }
}
