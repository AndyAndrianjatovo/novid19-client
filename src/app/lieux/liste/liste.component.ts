import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Lieu, LieuWithToDisplay } from 'src/app/models/lieux';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  NgxQrcodeElementTypes,
  NgxQrcodeErrorCorrectionLevels,
} from '@techiediaries/ngx-qrcode';
import { ELEMENT_DATA, LieuxService } from 'src/app/services/lieux.service';
import { Centre } from 'src/app/models/centre';
import { CentreService, FAKE_CENTRE } from 'src/app/services/centre.service';
import {
  FAKE_HISTORIQUES,
  HistoriqueService,
} from 'src/app/services/historique.service';
import { Historique } from 'src/app/models/historique';
import { Test } from 'src/app/models/test';
import {
  TestCovidService,
  FAKE_TESTS,
} from 'src/app/services/test-covid.service';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss'],
})
export class ListeComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'nom_lieu',
    'adresse_lieu',
    'nbPassages',
    'nbPositive',
    'statut_lieu',
  ];
  lieux: Lieu[] = [];
  dataSource: any;
  centres: Centre[] = [];
  historiques: Historique[] = [];
  lieuxToDisplay: LieuWithToDisplay[] = [];
  tests: Test[] = [];
  testsPositif: Test[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor(
    private lieuxService: LieuxService,
    private centreService: CentreService,
    private historiqueService: HistoriqueService,
    private testService: TestCovidService
  ) {}

  ngOnInit(): void {
    // this.getAllLieux();
    // this.getAllCentres();
    this.getAllLieuxFake();
    this.getAllCentresFake();
    this.getAllTestsFake();
    this.getAllHistoriqueFake();
  }

  getStatuts(statut: number) {
    switch (statut) {
      case 1:
        return 'Sain';
      case 2:
        return 'Infecté';

      default:
        return 'Inconnu';
    }
  }
  getAllLieux() {
    // this.lieux = ELEMENT_DATA;

    this.lieuxService.getLieux().subscribe((data: any) => {
      this.lieux = data.docs;
      this.dataSource = new MatTableDataSource<Lieu>(this.lieux);
    });
  }
  getAllLieuxFake() {
    this.lieux = ELEMENT_DATA;
    this.dataSource = new MatTableDataSource<Lieu>(this.lieux);
  }
  getAllCentres() {
    this.centreService.getCentres().subscribe((data: Centre[]) => {
      this.centres = data;
    });
  }

  getAllCentresFake() {
    this.centres = FAKE_CENTRE;
  }

  getAllHistorique() {
    this.historiqueService.getHistoriques().subscribe((data: any) => {
      this.historiques = data.docs;
    });
  }

  getAllHistoriqueFake() {
    this.historiques = FAKE_HISTORIQUES;
    this.getLieuxToDisplay();
    this.dataSource = new MatTableDataSource<LieuWithToDisplay>(
      this.lieuxToDisplay
    );
  }

  getLieuxToDisplay() {
    this.lieuxToDisplay = [];
    var nbPositive = 0;
    this.lieux.forEach((lieu: Lieu) => {
      var historiqueLieux: Historique[] = this.historiques.filter(
        (historique) => {
          return historique.lieu_id === lieu._id;
        }
      );
      // console.log('ato ambony');
      this.testsPositif.forEach((test: Test) => {
        historiqueLieux.forEach((historique: Historique) => {
          // console.log('ato am foreach');
          if (test.personne_id === historique.personne_id) {
            if (
              this.historiqueService.checkIfMayBe(historique, test.date_test)
            ) {
              nbPositive++;
            }
          }
        });
      });
      // console.log('ato am ivelany next');
      if (nbPositive > 0) {
        lieu.statut_lieu = 2;
      } else {
        lieu.statut_lieu = 1;
      }
      this.lieuxToDisplay.push({
        _id: lieu._id,
        nom_lieu: lieu.nom_lieu,
        adresse_lieu: lieu.adresse_lieu,
        statut_lieu: lieu.statut_lieu,
        coordonnees_lieu: lieu.coordonnees_lieu,
        nbPassages: historiqueLieux.length,
        nbPositive: nbPositive,
      });
    });
  }

  getAllTests() {
    this.testService.getTests().subscribe((data: Test[]) => {
      this.tests = data;
      this.testsPositif = data.filter((test) => test.etat_test === 1);
    });
  }

  getAllTestsFake() {
    this.tests = FAKE_TESTS;
    this.testsPositif = FAKE_TESTS.filter((test) => test.etat_test === 1);
  }
}
