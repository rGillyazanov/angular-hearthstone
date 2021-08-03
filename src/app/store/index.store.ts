import { CardsState } from "./cards/cards.state";
import { HeroesState } from "./heroes/heroes.state";
import { RaceState } from "./race/race.state";
import { RarityState } from "./rarity/rarity.state";
import { TypeState } from "./type/type.state";
import { MechanicState } from "./mechanic/mechanic.state";
import { CardsFilterState } from "./cards-filter/cards-filter.state";
import { PackSetState } from "./packSet/packSet.state";
import { CardState } from "./card/card.state";

export const storeAppModule = [
  HeroesState,
  RaceState,
  RarityState,
  TypeState,
  PackSetState,
  MechanicState,
  CardsFilterState,
  CardsState,
  CardState
];
