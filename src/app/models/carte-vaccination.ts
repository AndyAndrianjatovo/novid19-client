import { Personne } from './personne';

export interface CarteVaccination {
  id_carte: number;
  personne_id: number;
}

export interface CarteVaccinationToInsert {
  personne_id: number;
}

export interface CarteVaccinationToDisplay {
  id_carte: number;
  personne: Personne;
}
