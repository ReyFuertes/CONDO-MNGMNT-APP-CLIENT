import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { StorageService } from 'src/app/services/storage.service';
import { GenericOnBoardingComponent } from 'src/app/shared/generics/generic-onboarding';
import { RooState } from 'src/app/store/root.reducer';
import { ONBOARDINGDOCUMENTS, ONBOARDINGOCCUPANTS, ONBOARDINGREVIEW, ONBOARDINGSPOUSE, ROUTEACTIONSTYPE, STRDOCUMENTS, STRVEHICLES } from 'src/app/shared/constants/generic';
import { addToVehiclesAction, setOnboardingStepperAction, updateOnboardingVehicleValuesAction } from '../../store/onboarding.action';
import { IOnboardingVehicle } from '../../on-boarding.model';
import { MatDialog } from '@angular/material/dialog';
import { AddEditStateType, OnboardingEntityType } from 'src/app/shared/generics/generic-model';
import * as _ from 'lodash';
import { VehicleAddDialogComponent } from 'src/app/modules/dialog/components/vehicle-add-dialog/vehicle-add-dialog.component';
import { ONBOARDINGDOCUMENTSROUTE, ONBOARDINGOCCUPANTSROUTE } from 'src/app/shared/constants/routes';
import { RouteActionsType } from 'src/app/models/onboarding.model';

@Component({
  selector: 'cma-on-boarding-vehicle',
  templateUrl: './on-boarding-vehicle.component.html',
  styleUrls: ['./on-boarding-vehicle.component.scss']
})
export class OnboardingVehicleComponent extends GenericOnBoardingComponent implements OnInit {
  public files: File[] = [];

  constructor(public dialog: MatDialog, storageSrv: StorageService, router: Router, private _fb: FormBuilder, private _store: Store<RooState>, cdRef: ChangeDetectorRef, fb: FormBuilder, store: Store<RooState>) {
    super(OnboardingEntityType.ONBOARDINGVEHICLES, storageSrv, router, cdRef, fb, store);
  }

  ngOnInit(): void { }

  public newVehicle(vehicle: IOnboardingVehicle): FormGroup {
    return this._fb.group(vehicle)
  }

  public onRemove(item: IOnboardingVehicle, i: number): void {
    if (item) {
      this.FormVehiclesArr = this.getVehiclesForm;
      this.FormVehiclesArr.removeAt(i);

      this.updateVehicles();
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
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.FormVehiclesArr = this.getVehiclesForm;
        this.FormVehiclesArr.push(this.createVehicleItem(Object.assign({}, res)));

        this.updateVehicles();
      }
    });
  }

  private updateVehicles(): void {
    const payload = this.FormVehiclesArr?.value?.map(v => {
      return {
        id: v?.id,
        model: v?.model,
        make: v?.make,
        plateNo: v?.plateNo
      };
    });
    this._store.dispatch(updateOnboardingVehicleValuesAction({ payload }));
  }

  public onNext(): void {
    super.onNext(ONBOARDINGDOCUMENTSROUTE(this.id, <RouteActionsType>this.getActionFromStorage(ROUTEACTIONSTYPE)), STRDOCUMENTS, this.getVehiclesForm.value);

    this._store.dispatch(addToVehiclesAction({ payload: this.getVehiclesForm.value }));
    this._store.dispatch(setOnboardingStepperAction({ step: ONBOARDINGDOCUMENTS }));
  }

  public onPrev(): void {
    super.onPrev(ONBOARDINGOCCUPANTSROUTE(this.id));

    this._store.dispatch(setOnboardingStepperAction({ step: ONBOARDINGOCCUPANTS }));
  }
}