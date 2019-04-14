import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { WeatherService } from '../weather.service'
import { ForecastTableItem } from '../forecast-table/forecast-table-datasource'
import { Country } from '../select-city/select-city.component'

@Component({
  selector: 'app-main-dash',
  templateUrl: './main-dash.component.html',
  styleUrls: ['./main-dash.component.css']
})
export class MainDashComponent implements OnInit {

  country: Country = {
    name: 'United Kingdom',
    alpha2: 'UK'
  };
  city: string = 'London';
  forecastData: Observable<ForecastTableItem[]>;
  meanPressure: any;
  meanHumidity: any;
  meanTemperature: any;
  doubleWidth: number = 2;
  tableVisible: boolean = false;
  errorMessage: boolean = false;

  cardsize = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        this.doubleWidth = 1;
      }
      this.doubleWidth = 2;
    })
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private weatherService: WeatherService) {}

  ngOnInit() {
    this.update();
  }

  update() {
    this.tableVisible = false;
    this.errorMessage = false;
    this.forecastData = this.weatherService.getForecast(this.city, this.country.alpha2).pipe(map((x:any) => x.list));
    this.forecastData.subscribe(
      (data) => {
        this.calcMeanValues();
        this.tableVisible = true;
      },
      (error) => {
        this.errorMessage = true;
      }
    );
  }

  updateCity(event) {
    this.city = event.city;
    this.country = event.country;
    console.log(this.city, this.country)
    this.update();
  }

  calcMeanValues() {
    this.forecastData.subscribe(data => {
      this.meanPressure = data.reduce(
        (accumulator, val) => accumulator + val.main.pressure, 0) / data.length;
      this.meanHumidity = data.reduce(
        (accumulator, val) => accumulator + val.main.humidity, 0) / data.length;
      this.meanTemperature = data.reduce(
        (accumulator, val) => accumulator + val.main.temp, 0) / data.length;
      console.log(this.meanHumidity)
    })
  }
}
