import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonutChartComponent } from './donutChart.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DonutChartComponent],
  exports: [DonutChartComponent]
})
export class ChartsModule { }
