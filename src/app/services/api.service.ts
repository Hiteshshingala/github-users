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
    filterByUserName?: string,
    filterByEmail?: string,
    filterById?: string,
  ): Observable<IResponse<IUser>> {
    let url = `${this.apiUrl}/users`;
    if (filterByUserName || filterByEmail || filterById) {
      const filters = [filterByUserName, filterByEmail, filterById].filter(
        (filter) => !!filter,
      );
      const combinedFilters = filters.join('+');
      url += `?per_page=200&q=${combinedFilters}`;
    } else {
      url += `?per_page=200&q=Q`;
    }
    return this.http.get<IResponse<IUser>>(url);
  }
}
