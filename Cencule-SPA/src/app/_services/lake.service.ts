import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LakeWall } from '../_models/lakeWall';

@Injectable({
  providedIn: 'root',
})
export class LakeService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getLakes(): Observable<LakeWall[]> {
    return this.http.get<LakeWall[]>(this.baseUrl + 'lakes');
  }
}
