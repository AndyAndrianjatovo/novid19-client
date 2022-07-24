import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Centre } from 'src/app/models/centre';
import { Personne } from 'src/app/models/personne';
import { Test, TestToDisplay } from 'src/app/models/test';
import { CentreService, FAKE_CENTRE } from 'src/app/services/centre.service';
import {
  FAKE_PERSONNES,
  PersonneServiceService,
} from 'src/app/services/personne-service.service';
import {
  FAKE_TESTS,
  TestCovidService,
} from 'src/app/services/test-covid.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ResultatsDetailsComponent } from './resultats-details/resultats-details.component';

@Component({
  selector: 'app-resultats',
  templateUrl: './resultats.component.html',
  styleUrls: ['./resultats.component.scss'],
})
export class ResultatsComponent implements OnInit, AfterViewInit {
  test: Test[] = [];
  personnes: Personne[] = [];
  centres: Centre[] = [];
  testToDisplay: TestToDisplay[] = [];
  displayedColumns: string[] = [
    'personne',
    'date_test',
    'etat_test',
    'centre',
    'mail',
    'adresse',
    'sexe',
  ];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(
    private testService: TestCovidService,
    private personneService: PersonneServiceService,
    private centreService: CentreService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // this.getTestToDisplay();
    this.getTestToDisplayFake();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getTestToDisplayFake() {
    this.test = FAKE_TESTS;
    this.centres = FAKE_CENTRE;
    this.personnes = FAKE_PERSONNES;
    this.test.forEach((test) => {
      var personneTemp = this.personnes.find(
        (pers) => pers.id_personne === test.personne_id
      );
      var centreTemp = this.centres.find(
        (centre) => centre.id_centre === test.centre_id
      );
      this.testToDisplay.push({
        id_test: test.id_test,
        date_test: test.date_test,
        etat_test: test.etat_test,
        personne: personneTemp!,
        centre: centreTemp!,
      });
      this.dataSource = new MatTableDataSource<TestToDisplay>(
        this.testToDisplay
      );
    });
  }

  getTestToDisplay() {
    this.testService.getTests().subscribe((data: Test[]) => {
      this.test = data;
      this.centreService.getCentres().subscribe((data: Centre[]) => {
        this.centres = data;
        this.personneService.getPersonnes().subscribe((data: Personne[]) => {
          this.personnes = data;
          this.test.forEach((test) => {
            var personneTemp = this.personnes.find(
              (pers) => pers.id_personne === test.personne_id
            );
            var centreTemp = this.centres.find(
              (centre) => centre.id_centre === test.centre_id
            );
            this.testToDisplay.push({
              id_test: test.id_test,
              date_test: test.date_test,
              etat_test: test.etat_test,
              personne: personneTemp!,
              centre: centreTemp!,
            });
            this.dataSource = new MatTableDataSource<TestToDisplay>(
              this.testToDisplay
            );
          });
        });
      });
    });
  }

  getStatuts(etat: number) {
    return this.testService.getStatutTest(etat);
  }

  getSexe(sexe: number) {
    switch (sexe) {
      case 1:
        return 'Homme';
      case 2:
        return 'Femme';
      default:
        return 'Inconnu';
    }
  }

  checkTest(element: TestToDisplay) {
    console.log(element);
    this.dialog.open(ResultatsDetailsComponent, {
      width: '1000px',
      data: { testToDisplay: element },
    });
  }
}
