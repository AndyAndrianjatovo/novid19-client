import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TestToDisplay } from 'src/app/models/test';
import { TestCovidService } from 'src/app/services/test-covid.service';

@Component({
  selector: 'app-resultats-details',
  templateUrl: './resultats-details.component.html',
  styleUrls: ['./resultats-details.component.scss'],
})
export class ResultatsDetailsComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private testService: TestCovidService
  ) {}

  ngOnInit(): void {}
  getStatuts(etat: number) {
    return this.testService.getStatutTest(etat);
  }
}

export interface DialogData {
  testToDisplay: TestToDisplay;
}
