import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Type } from "../../models/filters-types";
import { IResponseServer } from "../../models/iresponse-server";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(private http: HttpClient) { }

  getTypesList(): Observable<Type[]> {
    return this.http.get<IResponseServer>('/api/types').pipe(
      map(response => (response.data as Type[]))
    );
  }
}
