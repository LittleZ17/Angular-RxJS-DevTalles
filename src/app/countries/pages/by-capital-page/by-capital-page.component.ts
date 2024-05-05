import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent {
  countries: Country[];

  constructor( private readonly _countrySrv: CountriesService ){
    this.countries = []
  }

  searchByCapital(value: string): void{
    this._countrySrv.searchByCapital(value).subscribe(countries => {
      this.countries = countries
    });
    console.log({value})
  }



}
