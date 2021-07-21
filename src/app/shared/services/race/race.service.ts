import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Race } from "../../models/filters-types";
import { IResponseServer } from "../../models/iresponse-server";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  constructor(private http: HttpClient) { }

  getRacesList(): Observable<Race[]> {
    return this.http.get<IResponseServer>('/api/races').pipe(
      map(response => (response.data as Race[]))
    );
  }
}
