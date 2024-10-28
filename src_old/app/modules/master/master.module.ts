import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MultiSelectModule } from 'primeng/multiselect';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    TableModule,
    FormsModule,
    InputSwitchModule,
    MultiSelectModule
  ]
})
export class MasterModule { }
