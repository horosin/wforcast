import { LayoutModule } from '@angular/cdk/layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material.module';
import { ForecastTableComponent } from '../../components/forecast-table/forecast-table.component';
import { SelectCityComponent } from '../../components/select-city/select-city.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';


import { MainDashComponent } from './main-dash.component';

describe('MainDashComponent', () => {
  let component: MainDashComponent;
  let fixture: ComponentFixture<MainDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ForecastTableComponent,
        SelectCityComponent,
        MainDashComponent
      ],
      imports: [
        NoopAnimationsModule,
        HttpClientTestingModule,
        FormsModule, ReactiveFormsModule,
        MaterialModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
