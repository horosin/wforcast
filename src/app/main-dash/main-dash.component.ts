import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { WeatherService } from '../weather.service'
import { ForecastTableItem } from '../forecast-table/forecast-table-datasource'

@Component({
  selector: 'app-main-dash',
  templateUrl: './main-dash.component.html',
  styleUrls: ['./main-dash.component.css']
})
export class MainDashComponent implements OnInit {

  forecastData: Observable<ForecastTableItem[]>;
  meanPressure: any;
  meanHumidity: any;
  meanTemperature: any;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private weatherService: WeatherService) {}

  ngOnInit() {
    this.forecastData = this.weatherService.getForecast(1).pipe(map((x:any) => x.list));
    this.calcMeanValues()
  }

  calcMeanValues() {
    this.forecastData.subscribe(data => {
      this.meanPressure = data.reduce(
        (accumulator, val) => accumulator + val.main.pressure, 0) / data.length;
      this.meanHumidity = data.reduce(
        (accumulator, val) => accumulator + val.main.humidity, 0) / data.length;
      this.meanTemperature = data.reduce(
        (accumulator, val) => accumulator + val.main.temp, 0) / data.length;
    })
  }
}
