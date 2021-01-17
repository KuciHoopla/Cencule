import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PhotoWall } from '../_models/photoWall';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPhotos(): Observable<PhotoWall[]> {
    return this.http.get<PhotoWall[]>(this.baseUrl + 'photos');
  }
}
