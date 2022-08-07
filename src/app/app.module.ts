import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListeComponent } from './lieux/liste/liste.component';
import { TdbComponent } from './testCovid/tdb/tdb.component';
import { AngularMaterialModule } from 'src/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ResultatsComponent } from './testCovid/resultats/resultats.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { CarteComponent } from './testCovid/carte/carte.component';
import { ResultatsDetailsComponent } from './testCovid/resultats/resultats-details/resultats-details.component';
import { HomeComponent } from './home/home.component';
import { DetailLieuxComponent } from './lieux/detail-lieux/detail-lieux.component';

@NgModule({
  declarations: [
    AppComponent,
    ListeComponent,
    TdbComponent,
    ResultatsComponent,
    CarteComponent,
    ResultatsDetailsComponent,
    HomeComponent,
    DetailLieuxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxChartsModule,
    NgxQRCodeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
