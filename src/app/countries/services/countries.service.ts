import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({providedIn: 'root'})
export class CountriesService {

    private readonly _apiUrl = 'https://restcountries.com/v3.1';

    constructor(private http: HttpClient) {}

    searchByCode( code: string ): Observable<Country | null>{
        return this.http.get<Country[]>(`${this._apiUrl}/alpha/${code}`).pipe(
            map( (countries: Country[]) => countries.length > 0 ? countries[0] : null ),
            // catchError( (error) => of([]) )
        )
    };
    
    searchByCapital( term: string ): Observable<Country[]>{
        return this.http.get<Country[]>(`${this._apiUrl}/capital/${term}`).pipe(
            catchError( (error) => of([]) )
        )
    };

    searchByRegion( term: string ): Observable<Country[]>{
        return this.http.get<Country[]>(`${this._apiUrl}/region/${term}`).pipe(
            catchError( (error) => of([]) )
        )
    };

    searchByCountry( term: string ): Observable<Country[]>{
        return this.http.get<Country[]>(`${this._apiUrl}/name/${term}`).pipe(
            catchError( (error) => of([]) )
        )
    };


}