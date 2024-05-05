import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent {

  countries: Country[];

  constructor( 
    private readonly _countrySrv: CountriesService,
  ){
    this.countries = []
  }

  searchByCapital(value: string): void{
    this._countrySrv.searchByCountry(value).subscribe(countries => {
      this.countries = countries
    });
    console.log({value})
  }
}
