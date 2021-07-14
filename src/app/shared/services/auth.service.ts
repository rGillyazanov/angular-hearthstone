import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { IUser } from "../../auth/store/auth/auth-state.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  login(data: { email: string, password: string }): Observable<{ access_token: string, user: IUser }> {
    return this.http.post<{ access_token: string, user: IUser }>('/api/auth/login', data);
  }

  register(data: {
    name: string,
    email: string;
    password: string,
    password_confirmation: string
  }): Observable<{ status: number, message: string }> {
    return this.http.post<{ status: number, message: string }>('/api/auth/registration', data);
  }

  logout(token: string | null): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ token }`
    });

    return this.http.post('/api/auth/logout', {}, {
      headers: headers
    });
  }
}
