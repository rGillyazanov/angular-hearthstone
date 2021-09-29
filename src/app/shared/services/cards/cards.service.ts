import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { CardsStateModel } from "../../../store/cards/cards-state.model";
import { CardsFilterStateModel } from "../../../store/cards-filter/cards-filter-state.model";
import { map } from "rxjs/operators";
import { ICostCard } from "../../../store/card/card-state.model";

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  constructor(private http: HttpClient) {
  }

  static setCardImage(idCard: string): string {
    return `https://art.hearthstonejson.com/v1/render/latest/ruRU/256x/${ idCard }.png`;
  }

  private static setFilteredParameters(parameters: CardsFilterStateModel | undefined) {
    const filteredParameters: { [x: string]: string; } = {};

    if (parameters === undefined) return filteredParameters;

    if (parameters.heroes) {
      filteredParameters['hero_id'] = parameters.heroes.toString();
    }
    if (parameters.rarity) {
      filteredParameters['rarity_id'] = parameters.rarity.toString();
    }
    if (parameters.type) {
      filteredParameters['type_id'] = parameters.type.toString();
    }
    if (parameters.race) {
      filteredParameters['race_id'] = parameters.race.toString();
    }
    if (parameters.packSet) {
      filteredParameters['packset_id'] = parameters.packSet.toString();
    }
    if (parameters.mechanic) {
      filteredParameters['mechanics'] = parameters.mechanic.toString();
    }
    if (parameters.cost?.on) {
      filteredParameters['cost'] = parameters.cost.value.toString();
    }
    if (parameters.attack?.on) {
      filteredParameters['attack'] = parameters.attack.value.toString();
    }
    if (parameters.health?.on) {
      filteredParameters['health'] = parameters.health.value.toString();
    }
    if (parameters.sortBy?.value) {
      filteredParameters['sort'] = JSON.stringify(parameters.sortBy.value);
    }

    return filteredParameters;
  }

  getCards(page?: number, parameters?: CardsFilterStateModel): Observable<CardsStateModel> {
    if (parameters) {
      return this.getFilteredOfCards(parameters, page);
    }

    let params = new HttpParams();

    if (page) {
      params = params.append('page', page);
    }

    return this.http.get<CardsStateModel>('/api/cards', {
      params: params
    }).pipe(
      map(response => response.data as any)
    );
  }

  getFilteredOfCards(parameters: CardsFilterStateModel, page?: number): Observable<CardsStateModel> {
    let params = new HttpParams().appendAll(CardsService.setFilteredParameters(parameters));

    if (page) {
      params = params.append('page', page);
    }

    return this.http.get<CardsStateModel>('/api/cards/search', {
      params: params
    }).pipe(
      map(response => response.data as any)
    );
  }

  getCard(id: number): Observable<any> {
    return this.http.get<any>('/api/card/' + id).pipe(
      map(response => response.data as any)
    )
  }

  static cardTagReplace(text: string): string {
    return text?.replace("#", "").replace("$", "").replace("[x]", "");
  }

  static getCostOfCard(rarityId: number | undefined): ICostCard {
    let costCommon = 0, costGold = 0;
    switch (rarityId) {
      case 1:
        costCommon = 50;
        costGold = costCommon * 8;
        break;
      case 2:
        costCommon = 100;
        costGold = costCommon * 8;
        break;
      case 3:
        costCommon = 400;
        costGold = costCommon * 4;
        break;
      case 4:
        costCommon = 1600;
        costGold = costCommon * 2;
        break;
    }

    return {
      common: costCommon,
      gold: costGold
    };
  }
}
