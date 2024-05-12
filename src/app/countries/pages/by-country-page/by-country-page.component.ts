import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent implements OnInit{

  public countries: Country[];
  public initialValue: string = '';
  public isLoading: boolean = false;
  

  constructor( 
    private readonly _countrySrv: CountriesService,
  ){
    this.countries = [];
  }

  ngOnInit(): void {
    this.countries = this._countrySrv.cacheStore.byCountry.countries;
    this.initialValue = this._countrySrv.cacheStore.byCountry.term;
  }

  searchByCapital(value: string): void{
    this.isLoading = true;
    this._countrySrv.searchByCountry(value).subscribe(countries => {
      this.countries = countries;
      this.isLoading = false;
    });
  }
}
