import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailLieuxComponent } from './lieux/detail-lieux/detail-lieux.component';
import { ListeComponent } from './lieux/liste/liste.component';
import { CarteComponent } from './testCovid/carte/carte.component';
import { ResultatsComponent } from './testCovid/resultats/resultats.component';
import { TdbComponent } from './testCovid/tdb/tdb.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'carte', component: CarteComponent },
  { path: 'place', component: ListeComponent },
  { path: 'place/:id', component: DetailLieuxComponent },
  { path: 'tdb', component: TdbComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
