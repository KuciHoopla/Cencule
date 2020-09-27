import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-block',
  templateUrl: './register-block.component.html',
  styleUrls: ['./register-block.component.css'],
})
export class RegisterBlockComponent implements OnInit {
  registerMode = false;

  constructor() {}

  ngOnInit() {}

  registerToggle() {
    this.registerMode = true;
  }

  cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }
}
