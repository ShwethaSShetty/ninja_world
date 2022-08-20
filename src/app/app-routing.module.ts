import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShinobiDetailsComponent } from './shinobis/components/shinobi-details/shinobi-details.component';
import { ShinobiListComponent } from './shinobis/components/shinobi-list/shinobi-list.component';

const routes: Routes = [
  { path: '', redirectTo:'/shinonbi', pathMatch: 'full'},
  { path: 'shinonbi', component: ShinobiListComponent },
  { path: 'shinobi-detail/:id', component: ShinobiDetailsComponent },
  { path: '**', redirectTo:'/shinonbi'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
