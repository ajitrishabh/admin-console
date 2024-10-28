import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TableModule,
    InputNumberModule,
    DialogModule,
    ButtonModule,
  ],
  exports:[InputNumberModule, DialogModule, ButtonModule, TableModule]
})
export class SharedModule { }
