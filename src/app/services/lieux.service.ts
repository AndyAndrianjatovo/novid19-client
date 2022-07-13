import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrlNode } from 'src/environments/environment';
import { Lieu } from '../models/lieux';

@Injectable({
  providedIn: 'root',
})
export class LieuxService {
  configUrl = apiUrlNode;

  constructor(private http: HttpClient) {}

  getLieux() {
    return this.http.get<Lieu[]>(this.configUrl + 'test');
  }

  getLieu(id: number) {
    return this.http.get<Lieu>(this.configUrl + 'test/' + id);
  }
}

export const ELEMENT_DATA: Lieu[] = [
  {
    id_lieu: 1,
    nom_lieu: 'Dité',
    adresse_lieu: 'La City Ankorondrano, Antananarivo 101 Madagascar',
    coordonnees_lieu: '47.5190399, -18.8751833',
    statut_lieu: 2,
  },
  {
    id_lieu: 2,
    nom_lieu: 'La Varangue',
    adresse_lieu:
      '17 Rue Printsy Ratsimamanga 17 Rue Printsy Ratsimamanga, Antananarivo 101 Madagascar',
    statut_lieu: 2,
    coordonnees_lieu: '47.5228506,-18.9118862',
  },
  {
    id_lieu: 3,
    nom_lieu: 'Le Louvre Hôtel & Spa',
    adresse_lieu: 'Jardin Antaninarenina, Antananarivo',
    statut_lieu: 2,
    coordonnees_lieu: '47.5226527,-18.9102878',
  },
  {
    id_lieu: 4,
    nom_lieu: 'O2 Resto lounge Bar',
    adresse_lieu: 'Lot I V G 203',
    statut_lieu: 2,
    coordonnees_lieu: '47.5163863,-18.8992409',
  },
  {
    id_lieu: 5,
    nom_lieu: 'Le Centell Hotel & Spa',
    adresse_lieu: 'Immeuble Aloe, Antanimena Antananarivo Antananarivo, 101',
    statut_lieu: 2,
    coordonnees_lieu: '47.5164915,-18.8992866',
  },
  {
    id_lieu: 6,
    nom_lieu: 'Tartines Et Chocolats',
    adresse_lieu: '4HC6+2PR, Antananarivo',
    statut_lieu: 2,
    coordonnees_lieu: '47.5595682,-18.8798924',
  },
];
