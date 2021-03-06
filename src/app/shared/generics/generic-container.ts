import { Directive, OnInit } from '@angular/core';
import { GenericDestroyPageComponent } from './generic-destroy';
@Directive()
export class GenericContainer extends GenericDestroyPageComponent implements OnInit {
  public active: boolean = false;
  constructor() {
    super();
  }
  ngOnInit() {
    setTimeout(() => this.active = !this.active);
  }
}
