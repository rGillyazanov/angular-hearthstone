import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Actions, Select, Store } from "@ngxs/store";
import { GetCardInfo } from "../../../store/card/card.actions";
import { Observable, Subject } from "rxjs";
import { CardState } from "../../../store/card/card.state";
import { CardsService } from "../../../shared/services/cards/cards.service";
import { ICard, ICostCard } from "../../../store/card/card-state.model";

import { BootstrapService } from "../../../shared/services/bootstrap.service";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnDestroy {

  destroy$ = new Subject<boolean>();

  @Select(CardState.loading) loadingCard$: Observable<boolean>;
  @Select(CardState.loaded) loadedCard$: Observable<boolean>;
  @Select(CardState.card) card$: Observable<ICard>;

  costOfCard: ICostCard;

  constructor(private route: ActivatedRoute,
              private actions: Actions,
              private store: Store) {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.store.dispatch(new GetCardInfo(+params['id']));
      }
    });

    this.card$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(card => {
      this.costOfCard = CardsService.getCostOfCard(card?.rarity?.id);

      BootstrapService.initTooltip();
    });
  }

  setCardImage(idCard: string) {
    return CardsService.setCardImage(idCard);
  }

  cardTagReplace(text: string) {
    return CardsService.cardTagReplace(text);
  }

  heroesList(heroes: Array<{ name: string }>) {
    return heroes.map(hero => hero.name).join(',');
  }

}
