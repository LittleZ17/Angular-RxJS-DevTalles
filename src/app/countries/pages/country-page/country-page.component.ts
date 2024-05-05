import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

  country?: Country

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly countriesSrv: CountriesService,
    private readonly router: Router
  ) { }


  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.countriesSrv.searchByCode(id))
      )
      .subscribe((country) => {
        if (!country) return this.router.navigateByUrl('')

        return this.country = country;
        // return;
      });
  }

}
