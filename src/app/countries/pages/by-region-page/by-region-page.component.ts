import { Component } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent {

  countries: Country[]

  constructor(private readonly _countriesSrv: CountriesService){
    this.countries = []
  }

  searchByRegion( term: string ){
    this._countriesSrv.searchByCountry(term).subscribe( countries => {
      this.countries = countries;
    })
  }

}
