import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  SystemJsNgModuleLoader,
} from '@angular/core';

import { AuthService } from '../_services/auth.service';
import { BlogAddService } from '../_services/blogAdd.service';
import { AlertifyService } from '../_services/alertify.service';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { User } from '../_models/user';
import { Blog } from '../_models/blog';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { BlogUpdate } from '../_models/blogUpdate';
import { UserService } from '../_services/user.service';
import { toInt } from 'ngx-bootstrap/chronos/utils/type-checks';

@Component({
  selector: 'app-blog-add',
  templateUrl: './blogAdd.component.html',
  styleUrls: ['./blogAdd.component.css'],
})
export class BlogAddComponent implements OnInit {
  @Input() blog: Blog;
  @Input() blogUpdate: BlogUpdate;
  @Output() cancelblogAdd = new EventEmitter();

  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  blocked: string;
  user: User;
  userId = this.authService.decodedToken.nameid;
  blogAddForm: FormGroup;
  description: string;

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private fb: FormBuilder,
    private router: Router,
    private blogAddService: BlogAddService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.createBlogAddForm();
    this.intializeUploader();
    this.isBlocked();
  }

  createBlogAddForm() {
    this.blogAddForm = this.fb.group({
      description: ['', Validators.required],
    });
  }

  blogAdd() {
    if (this.blogAddForm.valid) {
      document.getElementById('add-blog-btn').style.display = 'block';
    }
  }

  isBlocked() {
    let blocked;
    this.userService.getUser(this.userId).subscribe((data: User) => {
      blocked = data.blocked;
      if (blocked === '0') {
        this.blocked = blocked;
      }
    });
  }

  cancel() {
    this.cancelblogAdd.emit(false);
    // document.getElementById('add-blog-block').style.display = 'none';
    document.getElementById('add-blog-btn').style.display = 'block';
    document.getElementById('add-blog-block').style.display = 'none';
    this.alertify.warning('canceled');
  }

  showUp() {
    document.getElementById('add-blog-block').style.display = 'block';
    document.getElementById('add-blog-btn').style.display = 'none';
  }

  intializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'blog/' + this.authService.decodedToken.nameid,
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      this.uploader.onSuccessItem = (item, response, status, headers) => {
        if (response) {
          const res: Blog = JSON.parse(response);
          const blog = {
            id: res.id,
            url: res.url,
            dateAdded: res.dateAdded,
            description: res.description,
            publicId: null,
            user: '',
            userId: this.userId,
            mainUrl: '',
            userName: '',
            blocked: '',
          };
          this.blog = blog;
          const descriptionFromForm = Object.assign({}, this.blogAddForm.value);
          this.blogUpdate = descriptionFromForm;
          this.blogAddService
            .updateBlog(this.blog.id, this.blogUpdate)
            .subscribe(
              (next) => {
                this.alertify.success('blog pridaný');
                this.router.navigateByUrl('/', {
                  skipLocationChange: true,
                });
                this.router.navigate(['app-blog']);
                document.getElementById('add-blog-block').style.display =
                  'none';
              },
              (error) => {
                this.alertify.error('problém s pridaním blogu');
              }
            );
          this.blogAddForm.reset();
        }
      };
    };
  }
}
