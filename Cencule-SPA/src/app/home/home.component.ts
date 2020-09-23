import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from '../_services/photo.service';
import { Photo } from '../_models/photo';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  registerMode = false;
  galleryImages: string[];
  photo: Photo;
  baseUrl = environment.apiUrl;
  values: any;


  constructor(
    private http: HttpClient,
    private router: Router,
    private photoService: PhotoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getPhotos();
  }

  // registerToggle() {
  //   this.registerMode = true;
  // }

  // cancelRegisterMode(registerMode: boolean) {
  //   this.registerMode = registerMode;
  // }
  getPhotos() {
    return this.http
      .get(this.baseUrl + 'photos').subscribe(response => {
        this.values = response;
      });
    // getImages() {
    //   const imageUrls = [];
    //   for (const photo of this.values) {
    //     imageUrls.push({
    //       url: photo.url,
    //     });
    //   }
    //   return imageUrls;
    // }
  }
}
