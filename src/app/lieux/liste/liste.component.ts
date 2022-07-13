import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Lieu, LieuWithQrCode } from 'src/app/models/lieux';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  NgxQrcodeElementTypes,
  NgxQrcodeErrorCorrectionLevels,
} from '@techiediaries/ngx-qrcode';
import { ELEMENT_DATA } from 'src/app/services/lieux.service';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss'],
})
export class ListeComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nom_lieu', 'adresse_lieu', 'statut_lieu'];
  dataSource = new MatTableDataSource<Lieu>(ELEMENT_DATA);
  public myAngularxQrCode: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  constructor() {
    this.myAngularxQrCode = 'tutsmake.com';
  }

  ngOnInit(): void {}
}
