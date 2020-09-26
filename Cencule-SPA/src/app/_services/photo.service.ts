import { Injectable } from '@angular/core';
import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PaginatedResult } from '../_models/pagination';
import { delay, map, share } from 'rxjs/operators';
import { Message } from '../_models/message';
import { PhotoWall } from '../_models/photoWall';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPhotos(): Observable<PhotoWall[]> {
      return this.http
      .get<PhotoWall[]>(this.baseUrl + 'photos').pipe(share(), delay(2000)); 
      
  }
}

