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


  cardsize = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return {
          doubleWidth: 1
        };
      }
      return {
        doubleWidth: 2
      };
    })
  );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private weatherService: WeatherService) {}

  ngOnInit() {
    this.update();
  }

  update() {
    this.forecastData = this.weatherService.getForecast(this.city, this.country.alpha2).pipe(map((x:any) => x.list));
    this.forecastData.subscribe(() => this.calcMeanValues())
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
