import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AboutPageComponent } from './pages/about-page/about-page.component';
import { MainDashComponent } from './pages/main-dash/main-dash.component';
import { ForecastTableComponent } from './components/forecast-table/forecast-table.component';
import { SelectCityComponent } from './components/select-city/select-city.component';

@NgModule({
  declarations: [
    AboutPageComponent,
    ForecastTableComponent,
    SelectCityComponent,
    MainDashComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    AboutPageComponent,
    MainDashComponent,
    ForecastTableComponent,
    SelectCityComponent
  ]
})
export class ForecastModule { }
