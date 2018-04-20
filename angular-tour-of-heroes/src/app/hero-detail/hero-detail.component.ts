import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common'; // Angular's way to interact with browser
import { ActivatedRoute } from '@angular/router'; // Holds information of the route; { id: X}

import { HeroService } from '../hero.service';

import { Hero } from '../hero';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero; // Recibe hero como input desde heroes-component
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {
  }
  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    /*
      + before this (+this) casts returnded value to a number
      .route.snapshot: static image of route information
      paramMap: dictionary of parameters; .get method same as Python's dict().get(Key)
    */
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe( hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }
  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

}
