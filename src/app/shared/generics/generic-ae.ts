import { FormGroup } from '@angular/forms';
import { Directive, Input } from '@angular/core';
import { AddEditStateType } from './generic-model';
import { GenericDestroyPageComponent } from './generic-destroy';
import { BTNTEXTSAVE, BTNTEXTUPDATE} from 'src/app/shared/constants/generic';

@Directive()
export abstract class GenericAddEditComponent<T> extends GenericDestroyPageComponent {
  public state: AddEditStateType;

  public entity: T;
  public form: FormGroup;

  constructor() {
    super();
  }

  public abstract onAddUpdate: (entity: T) => void;
  public abstract valuesToForm: (entity: T) => void;

  public get getBtnText(): string {
    return this.state === AddEditStateType.Add ? BTNTEXTSAVE : BTNTEXTUPDATE;
  }
}
