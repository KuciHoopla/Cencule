import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Photo } from '../_models/photo';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  baseUrl = environment.apiUrl;
  values: any;

  constructor(private http: HttpClient) {}

  getPhotos(){
    return this.http
      .get(this.baseUrl + 'photos').subscribe(response => {
        this.values = response;
      });
  }


}
