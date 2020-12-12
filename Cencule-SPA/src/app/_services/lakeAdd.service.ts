import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LakeWall } from '../_models/lakeWall';
import { LakeUpdate } from '../_models/lakeUpdate';

@Injectable({
  providedIn: 'root',
})
export class LakeAddService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  postLake(userId: number, lakeUpdate: LakeUpdate) {
    return this.http.post<LakeUpdate>(
      this.baseUrl + 'lakes/' + userId,
      lakeUpdate
    );
  }
}
