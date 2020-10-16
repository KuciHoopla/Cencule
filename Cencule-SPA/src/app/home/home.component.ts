import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ElementFinder } from 'protractor';
import { last } from 'rxjs/operators';
import { PhotoWall } from '../_models/photoWall';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private userService: UserService,
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

