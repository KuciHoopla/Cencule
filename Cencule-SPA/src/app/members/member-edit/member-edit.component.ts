import {
  Component,
  OnInit,
  ViewChild,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';
import { User } from 'src/app/_models/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Check } from 'src/app/_models/check';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm', { static: true }) editForm: NgForm;
  changeForm: FormGroup;
  user: User;
  check: Check = { veryfication: false };
  newPassword: string;
  photoUrl: string;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.user = data['user'];
      this.authService.currentPhotoUrl.subscribe(
        (photoUrl) => (this.photoUrl = photoUrl)
      );
    });
    this.createChangeForm();
  }

  updateUser() {
    this.userService
      .updateUser(this.authService.decodedToken.nameid, this.user)
      .subscribe(
        (next) => {
          this.alertify.success('profil upravený');
          this.editForm.reset(this.user);
        },
        (error) => {
          this.alertify.error('nepodarilo sa upravit profil');
        }
      );
  }
  updateMainPhoto(photoUrl) {
    this.user.photoUrl = photoUrl;
  }

  changePassword() {
    if (this.changeForm.valid) {
      this.newPassword = Object.assign({}, this.changeForm.value).password;
      let oldPassword = Object.assign({}, this.changeForm.value).oldPassword;
          console.log(this.check.veryfication);


      this.userService
        .oldPassword(this.user.username, oldPassword)
        .subscribe((data) => {
          this.check = data;
          console.log(this.check.veryfication)
        });

      if (this.check.veryfication) {
        this.userService
          .changePassword(
            this.authService.decodedToken.nameid,
            this.newPassword
          )
          .subscribe(
            (next) => {
              this.alertify.success('heslo zmenene');
              this.changeForm.reset();
              this.newPassword = '';
            },
            (error) => {
              this.alertify.error('nepodarilo sa zmenit heslo');
              this.newPassword = '';
            }
          );
      } else {
        this.alertify.error('zadal si nespravne stare heslo');
      }
    }
  }

  cancel() {
    this.alertify.warning('zrusene');
    this.changeForm.reset();
  }

  createChangeForm() {
    this.changeForm = this.fb.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(12),
            Validators.maxLength(30),
          ],
        ],
        oldPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(30),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: this.passwordMatchValidator,
      }
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value
      ? null
      : { mismatch: true };
  }
}
