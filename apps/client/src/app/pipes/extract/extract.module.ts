import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtractPipe } from './extract.pipe';



@NgModule({
  declarations: [ExtractPipe],
  imports: [
    CommonModule
  ],
  exports: [ExtractPipe]
})
export class ExtractModule { }
