import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LakeWall } from '../_models/lakeWall';
import { User } from '../_models/user';

@Component({
  selector: 'app-lakes',
  templateUrl: './lakes.component.html',
  styleUrls: ['./lakes.component.css'],
})
export class LakesComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  lakes: LakeWall[];
  users: User[];

  ngOnInit() {
    this.getLakes();
  }

  getLakes() {
    this.route.data.subscribe((data: { lakes: LakeWall[] }) => {
      this.lakes = data.lakes;
    });
  }
}
