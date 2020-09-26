import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable, of } from 'rxjs';
import { PhotoService } from '../_services/photo.service';
import { PhotoWall } from '../_models/photoWall';



@Injectable({
  providedIn: 'root'
})
export class PhotosResolver implements Resolve<PhotoWall[]> {
  
  constructor(private photoService: PhotoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
  Observable<PhotoWall[]> | Promise<PhotoWall[]> | PhotoWall[] {
    return this.photoService.getPhotos();
  }
}
