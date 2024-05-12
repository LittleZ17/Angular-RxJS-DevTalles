import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';

import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/region.type';


@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent implements OnInit {

  countries: Country[];
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;
  public initialValue: string = ''

  constructor(private readonly _countrySrv: CountriesService){
    this.countries = []
  }

  ngOnInit(): void {
    this.countries = this._countrySrv.cacheStore.byRegion.countries;
    this.selectedRegion = this._countrySrv.cacheStore.byRegion.region;
  }

  searchByRegion( term: Region ){
    this.selectedRegion = term;

    this._countrySrv.searchByRegion(term).subscribe( countries => {
      this.countries = countries;
    })
  }

}
