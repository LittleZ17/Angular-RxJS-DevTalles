import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

    private readonly _apiUrl = 'https://restcountries.com/v3.1';

    public cacheStore: CacheStore = {
        byCapital: {term: '', countries: []},
        byCountry: {term: '', countries: []},
        byRegion: {region: '', countries: []},
    }

    constructor(private http: HttpClient) {}

    private getCountriesRequest(url: string): Observable<Country[]>{
        return this.http.get<Country[]>(url)
        .pipe(
            catchError( () => of([]) ),
            delay(200)
        )
    }

    searchByCode( code: string ): Observable<Country | null>{
        return this.http.get<Country[]>(`${this._apiUrl}/alpha/${code}`).pipe(
            map( (countries: Country[]) => countries.length > 0 ? countries[0] : null ),
            // catchError( (error) => of([]) )
        )
    };
    
    searchByCapital( term: string ): Observable<Country[]>{
        const url = `${this._apiUrl}/capital/${term}`;
        return this.getCountriesRequest(url)
        .pipe(
            tap( countries => this.cacheStore.byCapital = { term, countries } )
        );
    };

    searchByRegion( region: Region ): Observable<Country[]>{
        const url = `${this._apiUrl}/region/${region}`;
        return this.getCountriesRequest(url)
        .pipe(
            tap( countries => this.cacheStore.byRegion = { region, countries } )
        );;
    };

    searchByCountry( term: string ): Observable<Country[]>{
        const url = `${this._apiUrl}/name/${term}`;
        return this.getCountriesRequest(url)
        .pipe(
            tap( countries => this.cacheStore.byCountry = { term, countries } )
        );;
    };
}