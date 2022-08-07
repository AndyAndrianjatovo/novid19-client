import { Component, OnInit } from '@angular/core';
import { Centre } from 'src/app/models/centre';
import { Lieu } from 'src/app/models/lieux';
import { Test } from 'src/app/models/test';
import { Vaccin } from 'src/app/models/vaccin';
import { CentreService } from 'src/app/services/centre.service';
import {  LieuxService } from 'src/app/services/lieux.service';
import {
  
  TestCovidService,
} from 'src/app/services/test-covid.service';
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

  multi = [
    {
      name: 'Test',
      series: [
        {
          name: '',
          value: 0,
        },
      ],
    },
  ];
  view: [number, number] = [1400, 300];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = false;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Nombre de test';
  timeline: boolean = true;

  constructor(
    private testService: TestCovidService,
    private vaccinService: VaccinService,
    private centreService: CentreService,
    private lieuxService: LieuxService
  ) {}

  ngOnInit(): void {
    this.getAllTests();
    this.getAllVaccins();
    this.getAllCentres();
    this.getAllLieux();
  }

  getAllTests() {
    this.testService.getTests().subscribe((data: any) => {
      this.tests = data.docs;
      this.testsPositif = data.docs.filter((test:Test) => test.etat_test === 1);
      this.resultats.push({ name: 'Test effectué', value: this.tests.length });
      this.resultats.push({
        name: 'Cas positif',
        value: this.testsPositif.length,
      });
    });
  }

  getAllVaccins() {
    this.vaccinService.getVaccins().subscribe((data: any) => {
      this.vaccins = data.docs;
      this.resultats.push({
        name: 'Doses de vaccin administrées',
        value: this.vaccins.length,
      });
    });
  }

  getAllCentres() {
    this.centreService.getCentres().subscribe((data: any) => {
      this.centres = data.docs;
      this.resultats.push({
        name: 'Nombre de centre',
        value: this.centres.length,
      });
    });
  }

  getAllLieux() {

    this.lieuxService.getLieux().subscribe((data: any) => {
      this.lieux = data.docs;
      this.resultats.push({
        name: 'Nombre de lieux',
        value: this.lieux.length,
      });
    });
  }

  groupByKey(array: any[], key: string) {
    return array.reduce((hash, obj) => {
      if (obj[key] === undefined) return hash;
      return Object.assign(hash, {
        [obj[key]]: (hash[obj[key]] || []).concat(obj),
      });
    }, {});
  }
}
