import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
})
export class MemberCardComponent implements OnInit {
  @Input()
  user: User;
  usersUrls: {};
  admin: boolean;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    if (this.authService.decodedToken.nameid === '11') {
      this.admin = true;
    } else {
      this.admin = false;
    }
  }

  sendLike(id: number) {
    this.userService
      .sendLike(this.authService.decodedToken.nameid, id)
      .subscribe(
        (data) => {
          this.alertify.success('You have liked: ' + this.user.knownAs);
        },
        (error) => {
          this.alertify.error(error);
        }
      );
  }

  blockUser(user: User) {
    this.user = user;
    this.user.blocked = '0';
    this.userService
      .blockUser(this.authService.decodedToken.nameid, this.user.id, this.user)
      .subscribe(
        (next) => {
          this.alertify.success('User bloknuty');
        },
        (error) => {
          this.alertify.error('Problem bloknut usera');
        }
      );
  }

  unBlockUser(user: User) {
    this.user = user;
    this.user.blocked = null;
    this.userService
      .blockUser(this.authService.decodedToken.nameid, this.user.id, this.user)
      .subscribe(
        (next) => {
          this.alertify.success('User odblokovany');
        },
        (error) => {
          this.alertify.error('Problem odbloknut usera');
        }
      );
  }
}
