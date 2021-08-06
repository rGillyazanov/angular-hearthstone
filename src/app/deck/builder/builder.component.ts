import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { Hero } from "../../shared/models/filters-types";
import { HeroesState } from "../../store/heroes/heroes.state";

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuilderComponent implements OnInit {
  @Select(HeroesState.heroes) heroes$: Observable<Hero[]>;

  constructor() { }

  ngOnInit(): void {
  }

}
