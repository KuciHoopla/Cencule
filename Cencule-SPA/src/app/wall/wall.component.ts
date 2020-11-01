import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhotoWall } from '../_models/photoWall';
import { User } from '../_models/user';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css'],
})
export class WallComponent implements OnInit {
  constructor(
    private route: ActivatedRoute
  ) {}
  photos: PhotoWall[];
  users: User[];

  ngOnInit() {
    this.route.data.subscribe((data: { photoWall: PhotoWall[] }) => {
      this.photos = data.photoWall;
    });
  }

  toggleClass(i) {
    const cardId = 'card' + i;
    const imgId = 'img' + i;
    const elementClass = document.getElementById(imgId).classList;
    if (!elementClass.contains('activePhoto')) {
      document.getElementById(imgId).classList.add('activePhoto');
      document.getElementById(cardId).classList.add('activeCard');
      document.getElementById('wrapper').style.overflow = 'hidden';
    } else {
      document.getElementById(imgId).classList.remove('activePhoto');
      document.getElementById(cardId).classList.remove('activeCard');
      document.getElementById('wrapper').style.overflow = 'auto';
    }
  }
}
