import { Component, OnInit } from '@angular/core';
import { Centre } from 'src/app/models/centre';
import { Lieu } from 'src/app/models/lieux';
import { Test } from 'src/app/models/test';
import { Vaccin } from 'src/app/models/vaccin';
import { CentreService, FAKE_CENTRE } from 'src/app/services/centre.service';
import { ELEMENT_DATA, LieuxService } from 'src/app/services/lieux.service';
import {
  FAKE_TESTS,
  TestCovidService,
} from 'src/app/services/test-covid.service';
import { FAKE_VACCINS, VaccinService } from 'src/app/services/vaccin.service';

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
    // this.getAllTests();
    // this.getAllVaccins();
    // this.getAllCentres();
    // this.getAllLieux();
    this.getAllTestsFake();
    this.getAllVaccinsFake();
    this.getAllCentresFake();
    this.getAllLieuxFake();
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
  getAllTestsFake() {
    // this.testService.getTests().subscribe((data: Test[]) => {
    this.tests = FAKE_TESTS;
    this.testsPositif = FAKE_TESTS.filter((test) => test.etat_test === 1);
    FAKE_TESTS.forEach((element) => {
      var a = FAKE_TESTS.filter((test) => test.date_test === element.date_test);
      // console.log(element.date_test.toLocaleDateString(), a.length);
      this.multi[0].series.push({
        name: element.date_test.toLocaleDateString(),
        value: a.length,
      });
    });

    console.log(this.multi);
    var te = this.groupByKey(this.multi[0].series, 'name');

    console.log(te['01/02/2022'].length);

    this.multi[0].series = [];

    FAKE_TESTS.forEach((element) => {
      this.multi[0].series.push({
        name: te[element.date_test.toLocaleDateString()][0].name,
        value: te[element.date_test.toLocaleDateString()].length,
      });
    });

    console.log(this.multi);

    this.resultats.push({ name: 'Test effectué', value: this.tests.length });
    this.resultats.push({
      name: 'Cas positif',
      value: this.testsPositif.length,
    });
    // });
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

  getAllVaccinsFake() {
    this.vaccins = FAKE_VACCINS;
    this.resultats.push({
      name: 'Doses de vaccin administrées',
      value: this.vaccins.length,
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

  getAllCentresFake() {
    this.centres = FAKE_CENTRE;
    this.resultats.push({
      name: 'Nombre de centre',
      value: this.centres.length,
    });
  }

  getAllLieux() {
    // this.lieux = ELEMENT_DATA;

    this.lieuxService.getLieux().subscribe((data: any) => {
      this.lieux = data.docs;
      this.resultats.push({
        name: 'Nombre de lieux',
        value: this.lieux.length,
      });
    });
  }

  getAllLieuxFake() {
    this.lieux = ELEMENT_DATA;
    this.resultats.push({
      name: 'Nombre de lieux',
      value: this.lieux.length,
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
