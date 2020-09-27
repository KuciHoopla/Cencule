import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotoWall } from '../_models/photoWall';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  photos: PhotoWall[];

  constructor(
    private route: ActivatedRoute  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: { photoWall: PhotoWall[]}) => { this.photos = data.photoWall; });

  }
}
