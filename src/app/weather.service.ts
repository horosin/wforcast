import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getForecast(city: Number) {
    return this.http.get('http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=641822ad83b29be482edd1f185e7802c')
  }
}
