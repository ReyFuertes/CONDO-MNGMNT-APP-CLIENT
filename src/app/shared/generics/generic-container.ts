import { Directive, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { GenericDestroyPageComponent } from './generic-destroy';
import { GenericRoute } from './generic-route';
@Directive()
export class GenericContainer extends GenericRoute implements OnInit {
  public active: boolean = false;
  constructor(storageSrv: StorageService) {
    super(storageSrv);
  }
  ngOnInit() {
    setTimeout(() => this.active = !this.active);
  }
}
