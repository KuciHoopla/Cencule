import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserStatistics } from '../_models/userStatistics';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getStats(id): Observable<UserStatistics> {
    return this.http.get<UserStatistics>(
      this.baseUrl + 'users/' + id + '/messages' + '/stats'
    );
  }
}
