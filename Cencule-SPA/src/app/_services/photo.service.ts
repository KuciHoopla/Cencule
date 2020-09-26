import { Injectable } from '@angular/core';
import { CoreEnvironment } from '@angular/compiler/src/compiler_facade_interface';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Photos } from '../_models/photos';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';
import { Message } from '../_models/message';
import { PhotoWall } from '../_models/photoWall';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPhotos(){
      return this.http
      .get<Photos>(this.baseUrl + 'photos')
      
      
  }
}

