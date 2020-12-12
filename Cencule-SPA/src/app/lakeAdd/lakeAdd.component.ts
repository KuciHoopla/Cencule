import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  SystemJsNgModuleLoader,
} from '@angular/core';

import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from '../_models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LakeUpdate } from '../_models/lakeUpdate';
import { LakeAddService } from '../_services/lakeAdd.service';
import { invalid } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-lake-add',
  templateUrl: './lakeAdd.component.html',
  styleUrls: ['./lakeAdd.component.css'],
})
export class LakeAddComponent implements OnInit {
  @Input() lakeUpdate: LakeUpdate;
  @Output() cancelLakeAdd = new EventEmitter();

  baseUrl = environment.apiUrl;
  user: User;
  userId = this.authService.decodedToken.nameid;
  lakeAddForm: FormGroup;
  lake: LakeUpdate;
  numbers: {};
  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private router: Router,
    private lakeAddService: LakeAddService
  ) {}

  ngOnInit() {
    this.createLakeAddForm();
    this.addNumbers();
  }

  createLakeAddForm() {
    this.lakeAddForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50),
        ],
      ],
      temperature: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  lakeAdd() {
    if (this.lakeAddForm.valid) {
      this.lakeUpdate = this.lakeAddForm.value;
      this.lakeUpdate.userId = this.userId;
      this.lakeUpdate.temperature = this.lakeUpdate.temperature.toString();
      this.lakeAddService.postLake(this.userId, this.lakeUpdate).subscribe();
      document.getElementById('add-lake-block').style.display = 'none';
      document.getElementById('add-lake-btn').style.display = 'block';
      this.lakeAddForm.reset();
      this.alertify.success('jazero pridane');
    }
    this.router
      .navigateByUrl('app-lakes', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['/lakes']);
      });
  }

  cancel() {
    this.cancelLakeAdd.emit(false);
    document.getElementById('add-lake-btn').style.display = 'block';
    document.getElementById('add-lake-block').style.display = 'none';
    this.alertify.warning('canceled');
  }

  showUp() {
    document.getElementById('add-lake-block').style.display = 'block';
    document.getElementById('add-lake-btn').style.display = 'none';
  }

  addNumbers() {
    const arr = ['lad'];
    for (let i = 1; i < 19; i++) {
      arr.push(i.toString() + '°C');
    }
    arr.push('horuco');
    this.numbers = arr;
  }
}
