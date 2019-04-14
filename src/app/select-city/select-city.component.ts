import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {countries} from './countries';
import {Country} from '@app/shared';


@Component({
  selector: 'app-select-city',
  templateUrl: './select-city.component.html',
  styleUrls: ['./select-city.component.scss']
})
export class SelectCityComponent implements OnInit {

  @Input('city') city: string;
  @Input('country') country: Country;
  @Output() changeCity: EventEmitter<{city: string, country: Country}> = new EventEmitter();
  myControl = new FormControl();
  options: Country[] = countries;
  filteredOptions: Observable<Country[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith<string | Country>(''),
        map(value => {
          if (!(typeof value === 'string')) this.country = value;
          return value;
        }),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice()),
      );
    this.myControl.setValue(this.country)
  }

  displayFn(country?: Country): string | undefined {
    return country ? country.name : undefined;
  }

  private _filter(name: string): Country[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  seeForecast() {
    this.changeCity.emit({
      city: this.city,
      country: this.country
    })
  }
}
