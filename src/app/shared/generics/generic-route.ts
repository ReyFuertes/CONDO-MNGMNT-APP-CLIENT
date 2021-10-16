import { Directive } from '@angular/core';
import { GenericDestroyPageComponent } from './generic-destroy';
import { RouteActionsType } from 'src/app/models/onboarding.model';
import { StorageService } from 'src/app/services/storage.service';

@Directive()
export abstract class GenericRoute extends GenericDestroyPageComponent {
  public state: RouteActionsType;

  constructor(private storageSrv: StorageService) {
    super();
  }

  public routeTo(name: string, value: any): void {
    this.storageSrv.set(name, JSON.stringify(value));
  }
}
