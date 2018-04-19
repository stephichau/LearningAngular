import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
// import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  /* Code commented after __prunning__
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };
  heroes = HEROES;
  selectedHero: Hero; // declare type
  */
  heroes: Hero[];
  constructor(private heroService: HeroService) { // Add service with privateHeroService
  }

  ngOnInit() { // Use this instead of constructor
    this.getHeroes();
  }

  /* onSelect(hero: Hero): void {
    this.selectedHero = hero; // assign hero to variable
  } */

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe( heroes => this.heroes = heroes ); // Arrow func
  }
}
