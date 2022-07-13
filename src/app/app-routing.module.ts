import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListeComponent } from './lieux/liste/liste.component';
import { CarteComponent } from './testCovid/carte/carte.component';
import { TdbComponent } from './testCovid/tdb/tdb.component';

const routes: Routes = [
  { path: '', component: TdbComponent },
  { path: 'carte', component: CarteComponent },
  { path: 'place', component: ListeComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
