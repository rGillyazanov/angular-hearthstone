import { ChangeDetectionStrategy, Component, DoCheck, Input, OnInit } from '@angular/core';
import { Hero } from "../../../shared/models/filters-types";

@Component({
  selector: 'app-show-heroes',
  templateUrl: './show-heroes.component.html',
  styleUrls: ['./show-heroes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowHeroesComponent implements OnInit, DoCheck {

  @Input() heroes: Hero[];

  constructor() { }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.heroes = this.heroes?.filter(hero => hero.name !== 'NEUTRAL');
  }

  overHeroImg($event: MouseEvent) {
    const el = ($event.target as HTMLImageElement);
    const src = el.src;
    el.setAttribute('src', src.replace('static', 'hover'));
  }

  outHeroImg($event: MouseEvent) {
    const el = ($event.target as HTMLImageElement);
    const src = el.src;
    el.setAttribute('src', src.replace('hover', 'static'));
  }
}
