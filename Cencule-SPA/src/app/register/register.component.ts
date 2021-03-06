import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  user: User;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-red',
    };
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group(
      {
        gender: ['male'],
        knownAs: [
          '',
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(15),
          ],
        ],
        dateOfBirth: [null, Validators.required],
        city: [
          '',
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(20),
          ],
        ],
        country: [
          '',
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(20),
          ],
        ],
        userName: [
          '',
          [
            Validators.required,
            Validators.minLength(12),
            Validators.maxLength(30),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(30),
          ],
        ],
        security: ['', [Validators.required]],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: this.passwordMatchValidator && this.securityMatchValidator,
      }
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value
      ? null
      : { mismatch: true };
  }

  securityMatchValidator(g: FormGroup) {
    return g.get('security').value === 'dom' ? null : { mismatch1: true };
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(
        () => {
          this.alertify.success('Registracia uspesna');
        },
        (error) => {
          this.alertify.error(error);
        },
        () => {
          this.authService.login(this.user).subscribe(() => {
            this.router.navigate(['/home']);
          });
        }
      );
    }
  }
  cancel() {
    this.cancelRegister.emit(false);
    this.alertify.warning('zrusene');
  }
}
