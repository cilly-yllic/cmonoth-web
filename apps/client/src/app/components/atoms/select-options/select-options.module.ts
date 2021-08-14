import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { SelectOptionsComponent } from './select-options.component';
import { ExtractModule } from '~pipes/extract/extract.module'



@NgModule({
  declarations: [SelectOptionsComponent],
  imports: [
    CommonModule,
    // ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    ExtractModule
  ],
  exports: [SelectOptionsComponent]
})
export class SelectOptionsModule { }
