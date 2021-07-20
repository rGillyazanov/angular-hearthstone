import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { IAllCards } from "../../store/cards/cards-state.model";
import { CardsState } from "../../store/cards/cards.state";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  @Select(CardsState.data) allCards$: Observable<IAllCards[]>;
  @Select(CardsState.currentPage) currentPage$: Observable<number>;
  @Select(CardsState.total) total$: Observable<number>;

  constructor() {
  }

  ngOnInit(): void {
  }
}
