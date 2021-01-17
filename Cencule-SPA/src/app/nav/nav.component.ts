import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;
  name: string;

  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(
      (photoUrl) => (this.photoUrl = photoUrl)
    );
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      this.name = user.knownAs;
    } catch (error) {}
  }

  login() {
    this.authService.login(this.model).subscribe(
      (next) => {
        this.alertify.success('Prihlásený');
      },
      (error) => {
        this.alertify.error('Problém s prihlásením');
      },
      () => {
        this.router.navigate(['/home']);
      }
    );
  }
  loggedIn() {
    return this.authService.loggedIn();
  }
  loggOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertify.message('odhlaseny');
    this.router.navigate(['/home']);
  }
}
