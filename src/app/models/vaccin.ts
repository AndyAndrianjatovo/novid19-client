import { CarteVaccination } from './carte-vaccination';
import { Centre } from './centre';

export interface Vaccin {
  id_vaccin: number;
  nom_vaccin: string;
  centre_id: number;
  date_vaccin: Date;
  carte_id: number;
}

export interface VaccinToDisplay {
  id_vaccin: number;
  nom_vaccin: string;
  centre: Centre;
  date_vaccin: Date;
  carte: CarteVaccination;
}
