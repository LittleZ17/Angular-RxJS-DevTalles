import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit{

  public countries: Country[];
  public isLoading = false;
  public initialValue: string = '';

  constructor( private readonly _countrySrv: CountriesService ){
    this.countries = []
  }

  ngOnInit(): void {
    this.countries = this._countrySrv.cacheStore.byCapital.countries;
    this.initialValue = this._countrySrv.cacheStore.byCapital.term;
  }

  searchByCapital(value: string): void{
    this.isLoading = true;
    this._countrySrv.searchByCapital(value).subscribe(countries => {
      this.countries = countries;
      this.isLoading = false;
    });
    console.log({value})
  }



}
