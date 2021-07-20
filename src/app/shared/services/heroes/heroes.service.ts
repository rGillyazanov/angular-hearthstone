import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Hero } from "../../models/heroes/hero";
import { IResponseServer } from "../../models/iresponse-server";

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private http: HttpClient) { }

  getHeroesList(): Observable<Hero[]> {
    return this.http.get<IResponseServer>('/api/heroes').pipe(
      map(response => (response.data as Hero[]))
    );
  }
}
