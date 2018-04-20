import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }

  /* Pushes new term into Observable stream */
  search(term: string): void {
    this.searchTerms.next(term);
  }

  /* ngOnInit pipes searchTerms and reduces number of calls to searchHeroes */
  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(300), // Wait 300ms to consider term
      distinctUntilChanged(), // Changes until term is different from last
      switchMap((term: string) => this.heroService.searchHeroes(term)) // Preserves requests order
    );
  }

}
