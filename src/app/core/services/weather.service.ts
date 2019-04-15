import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apiKey = '641822ad83b29be482edd1f185e7802c';

  constructor(private http: HttpClient) { }

  getForecast(city: string, country: string) {
    return this.http.get(
      `http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&APPID=${this.apiKey}`);
  }
}
