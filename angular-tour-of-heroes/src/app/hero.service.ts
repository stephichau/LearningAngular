import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hero } from './hero';
// import { HEROES } from './mock-heroes';

// Specifically for services
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes';
  constructor(private http: HttpClient, private messageService: MessageService) {
    /*
    MessageService works as service-in-service: inject MessageService in HeroService that
    injects it in HeroComponent
    */
  }

  /* GET all heroes */
  getHeroes(): Observable<Hero[]> { // Should be async, but in tutorial returns Observable
    return this.http.get<Hero[]>(this.heroesUrl)
          .pipe(
            tap(heroes => this.log('Heroes fetched!')),
            catchError(this.handleError('getHeroes', []))
          );
  }

  /* GET hero by id */
  getHero( id: number ): Observable<Hero> {
    /*
      ` `: it's like str().format() in Python
    */
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`Hero ${id} fetched`)),
      catchError(this.handleError<Hero>(`getHero id = ${id}`))
    );
  }

  /* 404 */
  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  /** POST **/
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap((h: Hero) => this.log(`Created hero id=${h.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      );
  }

  /** PUT **/
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap(_ => this.log(`Updated hero ${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );
  }

  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, httpOptions)
      .pipe(
        tap(_ => this.log(`Hero ${id} deleted`)),
        catchError(this.handleError<Hero>('deleteHero'))
      );
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    const searchUrl = this.heroesUrl + `/?name=${term}`;
    return this.http.get<Hero[]>(searchUrl)
      .pipe(
        tap(_ => this.log(`Found heroes matching ${term}`)),
        catchError(this.handleError<Hero[]>('searchHero', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

}
