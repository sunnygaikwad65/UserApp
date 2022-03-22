import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) { }

  public getAll() {
    return this.httpClient.get(`${environment.API_URL}/users`);
  }

  public getById(id: string) {
    return this.httpClient.get(`${environment.API_URL}/users/${id}`);
  }

  public updateUser(id: string, body: any) {
    return this.httpClient.patch(`${environment.API_URL}/users/${id}`, body);
  }
  public deleteUser(id: string) {
    return this.httpClient.delete(`${environment.API_URL}/users/${id}`);
  }

  public addUser(body: any) {
    return this.httpClient.post(`${environment.API_URL}/users`, body);
  }

}
