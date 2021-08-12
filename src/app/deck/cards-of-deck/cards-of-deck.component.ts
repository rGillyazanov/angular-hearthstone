import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Hero } from "../../shared/models/filters-types";
import { ICard } from "../../store/card/card-state.model";
import { Select, Store } from "@ngxs/store";
import { DeckState } from "../store/deck/deck.state";
import { Deck } from "../models/deck";
import { GetCardsOfHero, GetHeroOfDeck } from "../store/deck/deck.actions";
import { ICardInDeck } from "../store/deck/deck-state.model";

@Component({
  selector: 'app-cards-of-deck',
  templateUrl: './cards-of-deck.component.html',
  styleUrls: ['./cards-of-deck.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsOfDeckComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  heroId: number;
  deck: Deck;

  @Select(DeckState.cards) cards$: Observable<ICardInDeck[]>;
  @Select(DeckState.cardsOfHeroLoading) cardsLoading$: Observable<boolean>;
  @Select(DeckState.cardsOfHeroLoaded) cardsLoaded$: Observable<boolean>;

  @Select(DeckState.hero) hero$: Observable<Hero>;
  @Select(DeckState.heroOfDeckLoading) heroLoading$: Observable<boolean>;
  @Select(DeckState.heroOfDeckLoaded) heroLoaded$: Observable<boolean>;

  constructor(private router: ActivatedRoute,
              private store: Store) {
    this.router.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      this.heroId = params['id'];
      this.getHero(this.heroId);
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  getHero(id: number) {
    this.store.dispatch(new GetHeroOfDeck(id)).pipe(
      takeUntil(this.destroy$)
    ).subscribe(hero => {
      console.log(hero);
      this.deck = new Deck(hero);

      this.store.dispatch(new GetCardsOfHero(id));
      console.log(this.deck);
    });
  }

}
