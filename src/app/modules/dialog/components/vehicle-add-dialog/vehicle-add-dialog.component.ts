import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RooState } from 'src/app/store/root.reducer';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { GenericAddEditComponent } from 'src/app/shared/generics/generic-ae';
import { IVehicle, IOnboardingPersonal } from 'src/app/modules/on-boarding/on-boarding.model';
import { ISimpleItem } from 'src/app/shared/generics/generic-model';
import { RELATIONSOPTIONS } from 'src/app/shared/constants/generic';
import * as _ from 'lodash';
@Component({
  selector: 'cma-vehicle-add-dialog',
  templateUrl: './vehicle-add-dialog.component.html',
  styleUrls: ['./vehicle-add-dialog.component.scss']
})
export class VehicleAddDialogComponent extends GenericAddEditComponent<IVehicle> implements OnInit {
  public relationOptions = RELATIONSOPTIONS;

  constructor(private store: Store<RooState>, public dialogRef: MatDialogRef<VehicleAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      id: [null],
      model: [null, Validators.required],
      make: [null, [Validators.required]],
      plateNo: [null, [Validators.required]]
    });

    this.state = data?.state || null;
  }

  ngOnInit(): void { }

  public valuesToForm = (entity: IVehicle): void => {
    if (!entity) return;
    try {
      const { id, model, make, plateNo } = entity;
      
      this.form.controls['id'].patchValue(id);
      this.form.controls['model'].patchValue(model);
      this.form.controls['make'].patchValue(make);
      this.form.controls['plateNo'].patchValue(plateNo);
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
