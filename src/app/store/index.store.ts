import { CardsState } from "./cards/cards.state";
import { HeroesState } from "./heroes/heroes.state";
import { RaceState } from "./race/race.state";
import { RarityState } from "./rarity/rarity.state";
import { TypeState } from "./type/type.state";
import { MechanicState } from "./mechanic/mechanic.state";

export const storeAppModule = [
  CardsState,
  HeroesState,
  RaceState,
  RarityState,
  TypeState,
  MechanicState
];
