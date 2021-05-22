import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { StorageService } from 'src/app/services/storage.service';
import { GenericOnBoardingComponent } from 'src/app/shared/generics/generic-onboarding';
import { RooState } from 'src/app/store/root.reducer';
import { ONBOARDINGSPOUSE, ONBOARDINGVEHICLES, STROCCUPANTS } from 'src/app/shared/constants/generic';
import { addToOccupantsAction, setOnboardingStepperAction } from '../../store/onboarding.action';
import { IOnboardingOccupant } from '../../on-boarding.model';
import { MatDialog } from '@angular/material/dialog';
import { OccupantsAddDialogComponent } from 'src/app/modules/dialog/components/occupants-add-dialog/occupants-add-dialog.component';
import { AddEditStateType, OnboardingEntityType } from 'src/app/shared/generics/generic-model';
import * as _ from 'lodash';
import { ONBOARDINGSPOUSEROUTE, ONBOARDINGVEHICLESROUTE } from 'src/app/shared/constants/routes';

@Component({
  selector: 'cma-on-boarding-occupants',
  templateUrl: './on-boarding-occupants.component.html',
  styleUrls: ['./on-boarding-occupants.component.scss']
})
export class OnboardingOccupantsComponent extends GenericOnBoardingComponent implements OnInit {
  public files: File[] = [];

  constructor(public dialog: MatDialog, storageSrv: StorageService, router: Router, private _fb: FormBuilder, private _store: Store<RooState>, cdRef: ChangeDetectorRef, fb: FormBuilder, store: Store<RooState>) {
    super(OnboardingEntityType.ONBOARDINGOCCUPANTS, storageSrv, router, cdRef, fb, store);

    this.form = this._fb.group({
      occupants: new FormArray([]),
    });
  }

  ngOnInit(): void { }

  public get occupants(): FormArray {
    return this.form.get(STROCCUPANTS) as FormArray;
  }

  public newOccupant(occupant: IOnboardingOccupant): FormGroup {
    return this._fb.group(occupant)
  }

  public onRemove(item: IOnboardingOccupant, i: number): void {
    if (item) {
      this.FormOccupantsArr = this.form.get(STROCCUPANTS) as FormArray;
      this.FormOccupantsArr.removeAt(i);
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
        this.FormOccupantsArr = this.form.get(STROCCUPANTS) as FormArray;
        this.FormOccupantsArr.push(this.createOccupantItem(Object.assign({}, payload)));
      }
    });
  }

  public get getOccupants(): any[] {
    return this.form.get(STROCCUPANTS)['controls'] as any;
  }

  public get hasOccupants(): boolean {
    return this.getOccupants?.length > 0;
  }

  public onNext(): void {
    super.onNext(ONBOARDINGVEHICLESROUTE, STROCCUPANTS, this.form.value);

    this._store.dispatch(addToOccupantsAction({ payload: this.form.value?.occupants }));
    this._store.dispatch(setOnboardingStepperAction({ step: ONBOARDINGVEHICLES }));
  }

  public onPrev(): void {
    super.onPrev(ONBOARDINGSPOUSEROUTE, STROCCUPANTS, this.form.value);

    this._store.dispatch(addToOccupantsAction({ payload: this.form.value?.occupants }));
    this._store.dispatch(setOnboardingStepperAction({ step: ONBOARDINGSPOUSE }));
  }
}