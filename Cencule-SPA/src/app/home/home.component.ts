import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { environment } from 'src/environments/environment';
import { Photos } from '../_models/photos';

import { PhotoWall } from '../_models/photoWall';
import { PhotoService } from '../_services/photo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  registerMode = false;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: any;
  photos: Photos;
  baseUrl = environment.apiUrl;
  


  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private photoService: PhotoService
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      // tslint:disable-next-line: no-string-literal
      this.photos = data['photos'];
    });
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      },
    ];

    this.galleryImages = this.photoService.getPhotos();
  }

  // registerToggle() {
  //   this.registerMode = true;
  // }

  // cancelRegisterMode(registerMode: boolean) {
  //   this.registerMode = registerMode;
  // }
  getImages(){
  var imageUrls = [];
  for (var photo of this.photos.photos) {
    imageUrls.push({
      url: photo.url,
    });
  }
  return imageUrls;
}
}
