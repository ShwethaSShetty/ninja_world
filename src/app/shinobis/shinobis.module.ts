import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShinobiListComponent } from './components/shinobi-list/shinobi-list.component';
import { ShinobiDetailsComponent } from './components/shinobi-details/shinobi-details.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ 
    ShinobiListComponent,
    ShinobiDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ShinobiListComponent,
    ShinobiDetailsComponent
  ]
})
export class ShinobisModule { }
