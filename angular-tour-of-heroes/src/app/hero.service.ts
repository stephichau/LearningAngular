import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
// Specifically for services
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { MessageService } from './message.service';

@Injectable()
export class HeroService {

  constructor(private http: HttpClient, private messageService: MessageService) { 
    /*
    MessageService works as service-in-service: inject MessageService in HeroService that
    injects it in HeroComponent 
    */
  }
  getHeroes(): Observable<Hero[]> { // Should be async, but in tutorial returns Observable
    this.messageService.add( "HeroService: heroes fetched!" );
    return of(HEROES);
  }

}
