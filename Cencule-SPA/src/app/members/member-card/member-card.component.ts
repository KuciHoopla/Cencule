import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
})
export class MemberCardComponent implements OnInit {
  @Input() admin;
  @Input() user: User;
  usersUrls: {};

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {}

  blockUser(user: User) {
    this.user = user;
    this.user.blocked = '0';
    this.userService
      .blockUser(this.authService.decodedToken.nameid, this.user.id, this.user)
      .subscribe(
        (next) => {
          this.alertify.success('Uzivatel zablokovany');
        },
        (error) => {
          this.alertify.error('Problem zablokovat uzivatela');
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
          this.alertify.success('Uzivatel odblokovany');
        },
        (error) => {
          this.alertify.error('Problem odbloknut uzivatela');
        }
      );
  }

  deleteUser(user: User) {
    alert('fakt ho chces vymazat?');
    this.userService
      .deleteUser(this.authService.decodedToken.nameid, this.user.id)
      .subscribe(
        (next) => {
          this.alertify.success('Uzivatel vymazany');
        },
        (error) => {
          this.alertify.error('Problem vymazat uzivatela');
        }
      );
    setTimeout(() => {
      this.router
        .navigateByUrl('app-lists', { skipLocationChange: true })
        .then(() => {
          this.router.navigate(['/members']);
        });
    }, 1500);
  }
}
