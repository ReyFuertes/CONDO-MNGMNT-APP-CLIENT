import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RooState } from 'src/app/store/root.reducer';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { GenericAddEditComponent } from 'src/app/shared/generics/generic-ae';
import { IOnboardingVehicle, IPersonal } from 'src/app/modules/on-boarding/on-boarding.model';
import { ISimpleItem } from 'src/app/shared/generics/generic-model';
import { RELATIONSOPTIONS } from 'src/app/shared/constants/generic';
import * as _ from 'lodash';
@Component({
  selector: 'cma-on-boarding-invite-dialog',
  templateUrl: './on-boarding-invite-dialog.component.html',
  styleUrls: ['./on-boarding-invite-dialog.component.scss']
})
export class OnboardingInviteDialogComponent extends GenericAddEditComponent<IOnboardingVehicle> implements OnInit {
  public relationOptions = RELATIONSOPTIONS;

  constructor(private store: Store<RooState>, public dialogRef: MatDialogRef<OnboardingInviteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      email: [null, Validators.required, Validators.email]
    });

    this.state = data?.state || null;
  }

  ngOnInit(): void { }

  public valuesToForm = (entity: IOnboardingVehicle): void => {
    if (!entity) return;
    try {
    }
    catch (error) { }
  }

  public getDirectionSelection(options: ISimpleItem[], strSelValue: any): ISimpleItem {
    return options?.find(o => o?.value === strSelValue)
  }

  public onAddUpdate = (): void => {
    if (this.form.valid) {
      const formValues = {
        ...this.form.value
      };

      this.dialogRef.close(_.pickBy(formValues, _.identity));
    } else {

    }
  }
}
