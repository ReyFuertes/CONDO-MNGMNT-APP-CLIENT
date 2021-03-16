import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'cma-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public imgPath: string = environment.imgPath;
  public svgPath: string = environment.svgPath;
  public isRememberMe: boolean = false;

  constructor() { }

  ngOnInit(): void { }

  public rememberMe(): void {
    this.isRememberMe = !this.isRememberMe;
  }
}
