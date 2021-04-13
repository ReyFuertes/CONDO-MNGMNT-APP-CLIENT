import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { StorageService } from 'src/app/services/storage.service';
import { GenericOnBoardingComponent } from 'src/app/shared/generics/generic-onboarding';
import { RooState } from 'src/app/store/root.reducer';
import { ONBOARDINGOCCUPANTS, ONBOARDINGDOCUMENTS, ONBOARDINGSPOUSE } from 'src/app/shared/constants/generic';
import { setOnboardingStepperAction } from '../../store/onboarding.action';
import { IOccupant } from '../../on-boarding.model';
import { MatDialog } from '@angular/material/dialog';
import { OccupantsAddDialogComponent } from 'src/app/modules/dialog/components/occupants-add-dialog/occupants-add-dialog.component';
import { AddEditStateType, OnboardingEntityType } from 'src/app/shared/generics/generic-model';
import * as _ from 'lodash';

@Component({
  selector: 'cma-on-boarding-occupants',
  templateUrl: './on-boarding-occupants.component.html',
  styleUrls: ['./on-boarding-occupants.component.scss']
})
export class OnboardingOccupantsComponent extends GenericOnBoardingComponent implements OnInit {
  public files: File[] = [];
  public formOccupantsArr: FormArray;

  constructor(public dialog: MatDialog, storageSrv: StorageService, router: Router, private _fb: FormBuilder, private store: Store<RooState>, cdRef: ChangeDetectorRef, fb: FormBuilder) {
    super(OnboardingEntityType.ONBOARDINGOCCUPANTS, storageSrv, router, cdRef, fb);

    this.form = this._fb.group({
      occupants: new FormArray([]),
    });
  }

  ngOnInit(): void { }

  public get occupants(): FormArray {
    return this.form.get('occupants') as FormArray;
  }

  public newOccupant(occupant: IOccupant): FormGroup {
    return this._fb.group(occupant)
  }

  public onRemove(item: IOccupant, i: number): void {
    if (item) {
      this.formOccupantsArr = this.form.get('occupants') as FormArray;
      this.formOccupantsArr.removeAt(i);
    }
  }

  public onAdd(): void {
    const dialogRef = this.dialog.open(OccupantsAddDialogComponent, {
      data: {
        state: AddEditStateType.Add
      },
      height: '282px',
      autoFocus: true
    });
    dialogRef.afterClosed().subscribe((payload) => {
      if (payload) {
        this.formOccupantsArr = this.form.get('occupants') as FormArray;
        this.formOccupantsArr.push(this.createItem(Object.assign({}, payload)));
      }
    });
  }

  public get getOccupants(): any[] {
    return this.form.get('occupants')['controls'];
  }

  public get hasOccupants(): boolean {
    return this.getOccupants?.length > 0;
  }

  public onNext(): void {
    super.onNext('/on-boarding/documents', 'occupants', this.form.value);

    this.store.dispatch(setOnboardingStepperAction({ step: ONBOARDINGDOCUMENTS }));
  }

  public onPrev(): void {
    super.onPrev('/on-boarding/spouse', 'occupants', this.form.value);

    this.store.dispatch(setOnboardingStepperAction({ step: ONBOARDINGSPOUSE }));
  }
}