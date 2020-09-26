import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { environment } from 'src/environments/environment';
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
  galleryImages: NgxGalleryImage[];
  photos: PhotoWall[];

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private photoService: PhotoService
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: { photoWall: PhotoWall[]}) => {this.photos = data.photoWall});
    
    

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

    this.galleryImages = this.getImages();
    console.log(this.galleryImages)


  }

  registerToggle() {
    this.registerMode = true;
  }

  cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }
 

getImages() {
  const imageUrls = [];
  for (const photo of this.photos) {
    imageUrls.push({  
      small: photo.url,
      medium: photo.url,
      big: photo.url,
      description: photo.description
    });
    
  }
  return imageUrls;
}
}
