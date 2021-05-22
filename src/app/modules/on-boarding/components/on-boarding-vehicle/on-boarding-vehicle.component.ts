import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { StorageService } from 'src/app/services/storage.service';
import { GenericOnBoardingComponent } from 'src/app/shared/generics/generic-onboarding';
import { RooState } from 'src/app/store/root.reducer';
import { ONBOARDINGDOCUMENTS, ONBOARDINGOCCUPANTS, ONBOARDINGSPOUSE, STRVEHICLES } from 'src/app/shared/constants/generic';
import { addToVehiclesAction, setOnboardingStepperAction } from '../../store/onboarding.action';
import { IOnboardingVehicle } from '../../on-boarding.model';
import { MatDialog } from '@angular/material/dialog';
import { AddEditStateType, OnboardingEntityType } from 'src/app/shared/generics/generic-model';
import * as _ from 'lodash';
import { VehicleAddDialogComponent } from 'src/app/modules/dialog/components/vehicle-add-dialog/vehicle-add-dialog.component';
import { ONBOARDINGDOCUMENTSROUTE, ONBOARDINGOCCUPANTSROUTE } from 'src/app/shared/constants/routes';

@Component({
  selector: 'cma-on-boarding-vehicle',
  templateUrl: './on-boarding-vehicle.component.html',
  styleUrls: ['./on-boarding-vehicle.component.scss']
})
export class OnboardingVehicleComponent extends GenericOnBoardingComponent implements OnInit {
  public files: File[] = [];

  constructor(public dialog: MatDialog, storageSrv: StorageService, router: Router, private _fb: FormBuilder, private _store: Store<RooState>, cdRef: ChangeDetectorRef, fb: FormBuilder, store: Store<RooState>) {
    super(OnboardingEntityType.ONBOARDINGVEHICLES, storageSrv, router, cdRef, fb, store);

    this.form = this._fb.group({
      vehicles: new FormArray([]),
    });
  }

  ngOnInit(): void { }

  public get vehicles(): FormArray {
    return this.form.get(STRVEHICLES) as FormArray;
  }

  public newVehicle(vehicle: IOnboardingVehicle): FormGroup {
    return this._fb.group(vehicle)
  }

  public onRemove(item: IOnboardingVehicle, i: number): void {
    if (item) {
      this.FormVehiclesArr = this.form.get(STRVEHICLES) as FormArray;
      this.FormVehiclesArr.removeAt(i);
    }
  }

  public onAdd(): void {
    const dialogRef = this.dialog.open(VehicleAddDialogComponent, {
      data: {
        state: AddEditStateType.Add
      },
      height: '380px',
      autoFocus: true
    });
    dialogRef.afterClosed().subscribe((payload) => {
      if (payload) {
        this.FormVehiclesArr = this.form.get(STRVEHICLES) as FormArray;
        this.FormVehiclesArr.push(this.createVehicleItem(Object.assign({}, payload)));
      }
    });
  }

  public get getVehicles(): any[] {
    return this.form.get(STRVEHICLES)['controls'] as any;
  }

  public get hasVehicles(): boolean {
    return this.getVehicles?.length > 0;
  }

  public onNext(): void {
    super.onNext(ONBOARDINGDOCUMENTSROUTE, STRVEHICLES, this.form.value);

    this._store.dispatch(addToVehiclesAction({ payload: this.form.value?.vehicles }));
    this._store.dispatch(setOnboardingStepperAction({ step: ONBOARDINGDOCUMENTS }));
  }

  public onPrev(): void {
    super.onPrev(ONBOARDINGOCCUPANTSROUTE, STRVEHICLES, this.form.value);

    this._store.dispatch(addToVehiclesAction({ payload: this.form.value?.vehicles }));
    this._store.dispatch(setOnboardingStepperAction({ step: ONBOARDINGOCCUPANTS }));
  }
}