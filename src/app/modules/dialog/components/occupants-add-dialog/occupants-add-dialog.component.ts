import { Component, Inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RooState } from 'src/app/store/root.reducer';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { GenericAddEditComponent } from 'src/app/shared/generics/generic-ae';
import { IOnboardingOccupant, IOnboardingPersonal } from 'src/app/modules/on-boarding/on-boarding.model';
import { ISimpleItem } from 'src/app/shared/generics/generic-model';
import { RELATIONSOPTIONS } from 'src/app/shared/constants/generic';
import * as _ from 'lodash';
@Component({
  selector: 'cma-occupants-add-dialog',
  templateUrl: './occupants-add-dialog.component.html',
  styleUrls: ['./occupants-add-dialog.component.scss']
})
export class OccupantsAddDialogComponent extends GenericAddEditComponent<IOnboardingOccupant> implements OnInit {
  public relationOptions = RELATIONSOPTIONS;

  constructor(private store: Store<RooState>, public dialogRef: MatDialogRef<OccupantsAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      relationship: [null, [Validators.required]]
    });

    this.state = data?.state || null;
  }

  ngOnInit(): void { }

  public valuesToForm = (entity: IOnboardingOccupant): void => {
    if (!entity) return;
    try {
      const { id, name, relationship } = entity;
      
      this.form.controls['id'].patchValue(id);
      this.form.controls['name'].patchValue(name);
      this.form.controls['relationship'].patchValue(relationship);
    }
    catch (error) { }
  }

  public getDirectionSelection(options: ISimpleItem[], strSelValue: any): ISimpleItem {
    return options?.find(o => o?.value === strSelValue)
  }

  public onAddUpdate = (): void => {
    if (this.form.valid) {
      const formValues = {
        ...this.form.value,
        //id: uuid()
      };

      this.dialogRef.close(_.pickBy(formValues, _.identity));
    } else {

    }
  }
}
