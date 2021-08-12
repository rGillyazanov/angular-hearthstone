import { Component, Input, OnInit } from '@angular/core';
import { ICard } from "../../store/card/card-state.model";
import { CardsService } from "../../shared/services/cards/cards.service";
import { ICardInDeck } from "../store/deck/deck-state.model";

@Component({
  selector: 'app-list-of-cards-in-deck',
  templateUrl: './list-of-cards-in-deck.component.html',
  styleUrls: ['./list-of-cards-in-deck.component.scss']
})
export class ListOfCardsInDeckComponent implements OnInit {

  @Input() cards: ICardInDeck[] | null;

  constructor() { }

  ngOnInit(): void {
  }

  setImageCard(idCard: string) {
    return CardsService.setCardImage(idCard);
  }
}
