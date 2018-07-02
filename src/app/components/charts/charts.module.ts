import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonutChartComponent } from './donutChart.component';
import { SimpleChartComponent } from './simpleChart.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DonutChartComponent, SimpleChartComponent],
  exports: [DonutChartComponent, SimpleChartComponent]
})
export class ChartsModule { }
