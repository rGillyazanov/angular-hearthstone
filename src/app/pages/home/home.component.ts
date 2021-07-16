import { Component, OnInit } from '@angular/core';
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { IAllCards } from "../../store/cards/cards-state.model";
import { CardsState } from "../../store/cards/cards.state";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Select(CardsState.data) allCards$: Observable<IAllCards[]>

  constructor() { }

  ngOnInit(): void {
  }

  setCardImage(idCard: string) {
    return `https://art.hearthstonejson.com/v1/render/latest/ruRU/256x/${idCard}.png`;
  }

}
