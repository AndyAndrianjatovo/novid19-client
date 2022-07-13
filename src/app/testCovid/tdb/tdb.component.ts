import { Component, OnInit } from '@angular/core';
import { Centre } from 'src/app/models/centre';
import { Lieu } from 'src/app/models/lieux';
import { Test } from 'src/app/models/test';
import { Vaccin } from 'src/app/models/vaccin';
import { CentreService } from 'src/app/services/centre.service';
import { ELEMENT_DATA } from 'src/app/services/lieux.service';
import { TestCovidService } from 'src/app/services/test-covid.service';
import { VaccinService } from 'src/app/services/vaccin.service';

@Component({
  selector: 'app-tdb',
  templateUrl: './tdb.component.html',
  styleUrls: ['./tdb.component.scss'],
})
export class TdbComponent implements OnInit {
  resultats: any = [];

  tests: Test[] = [];
  testsPositif: Test[] = [];
  vaccins: Vaccin[] = [];
  centres: Centre[] = [];
  lieux: Lieu[] = [];

  constructor(
    private testService: TestCovidService,
    private vaccinService: VaccinService,
    private centreService: CentreService
  ) {}

  ngOnInit(): void {
    this.getAllTests();
    this.getAllVaccins();
    this.getAllCentres();
    this.getAllLieux();
  }

  getAllTests() {
    this.testService.getTests().subscribe((data: Test[]) => {
      this.tests = data;
      this.testsPositif = data.filter((test) => test.etat_test === 1);
      this.resultats.push({ name: 'Test effectué', value: this.tests.length });
      this.resultats.push({
        name: 'Cas positif',
        value: this.testsPositif.length,
      });
    });
  }

  getAllVaccins() {
    this.vaccinService.getVaccins().subscribe((data: Vaccin[]) => {
      this.vaccins = data;
      this.resultats.push({
        name: 'Doses de vaccin administrées',
        value: this.vaccins.length,
      });
    });
  }

  getAllCentres() {
    this.centreService.getCentres().subscribe((data: Centre[]) => {
      this.centres = data;
      this.resultats.push({
        name: 'Nombre de centre',
        value: this.centres.length,
      });
    });
  }

  getAllLieux() {
    this.lieux = ELEMENT_DATA;
    this.resultats.push({
      name: 'Nombre de lieux',
      value: this.lieux.length,
    });
  }
}
