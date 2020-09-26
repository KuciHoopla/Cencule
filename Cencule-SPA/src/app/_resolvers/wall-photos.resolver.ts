import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';

import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError, subscribeOn } from 'rxjs/operators';
import { PhotoService } from '../_services/photo.service';
import { PhotoWall } from '../_models/photoWall';
import { Photos } from '../_models/photos';


@Injectable()
export class WallPhotosResolver implements Resolve<Photos> {
  constructor(
    private photoService: PhotoService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Photos> {
    // tslint:disable-next-line: no-string-literal
    return this.photoService.getPhotos();
  }
}
