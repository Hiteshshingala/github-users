import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponse, IUser } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://api.github.com/search';

  constructor(private http: HttpClient) {}

  getUsers(
    currentPage: number,
    itemsPerPage: number,
    filterByUserName?: string,
    filterByName?: string,
    filterByLogin?: string,
  ): Observable<IResponse<IUser>> {
    let url = `${this.apiUrl}/users`;
    let params = [];
    params.push(`page=${currentPage}`);
    params.push(`per_page=${itemsPerPage}`);
    if (filterByUserName || filterByName || filterByLogin) {
      const filters = [filterByUserName, filterByName, filterByLogin].filter(
        (filter) => !!filter,
      );
      params.push(`q=${filters.join(' OR ')}`);
      url += `?${params.join('&')}`;
    } else {
      params.push(`q=a`);
      url += `?${params.join('&')}`;
    }
    return this.http.get<IResponse<IUser>>(url);
  }
}
