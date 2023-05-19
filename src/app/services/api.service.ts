import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponse, IUser } from '../interface'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://api.github.com/search';

  constructor(private http: HttpClient) {}

  getUsers(filter1?: string, filter2?: string, filter3?: string): Observable<IResponse<IUser>> {
    let url = `${this.apiUrl}/users`;
    if (filter1 || filter2 || filter3) {
        const filters = [filter1, filter2, filter3].filter(filter => !!filter);
        const combinedFilters = filters.join('+');
        url += `?q=${combinedFilters}`;
    } else {
        url += `?q=Q`;
    }
    return this.http.get<IResponse<IUser>>(url);
  }
}