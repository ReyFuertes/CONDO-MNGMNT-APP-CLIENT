import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { StorageService } from 'src/app/services/storage.service';
import { GenericOnBoardingComponent } from 'src/app/shared/generics/generic-onboarding';
import { RooState } from 'src/app/store/root.reducer';
import { ONBOARDINGSPOUSE, ONBOARDINGVEHICLES, STROCCUPANTS } from 'src/app/shared/constants/generic';
import { addToOccupantsAction, setOnboardingStepperAction, updateOnboardingOccupantValuesAction } from '../../store/onboarding.action';
import { IOnboardingOccupant } from '../../on-boarding.model';
import { MatDialog } from '@angular/material/dialog';
import { OccupantsAddDialogComponent } from 'src/app/modules/dialog/components/occupants-add-dialog/occupants-add-dialog.component';
import { AddEditStateType, OnboardingEntityType } from 'src/app/shared/generics/generic-model';
import * as _ from 'lodash';
import { ONBOARDINGSPOUSEROUTE, ONBOARDINGVEHICLESROUTE } from 'src/app/shared/constants/routes';
import { RemoveNullOrUndefinedFromObj, FmtToValue } from 'src/app/shared/util/formating';

@Component({
  selector: 'cma-on-boarding-occupants',
  templateUrl: './on-boarding-occupants.component.html',
  styleUrls: ['./on-boarding-occupants.component.scss']
})
export class OnboardingOccupantsComponent extends GenericOnBoardingComponent implements OnInit {
  public files: File[] = [];

  constructor(public dialog: MatDialog, storageSrv: StorageService, router: Router, private _fb: FormBuilder, private _store: Store<RooState>, cdRef: ChangeDetectorRef, fb: FormBuilder, store: Store<RooState>) {
    super(OnboardingEntityType.ONBOARDINGOCCUPANTS, storageSrv, router, cdRef, fb, store);
  }

  ngOnInit(): void { }

  public newOccupant(occupant: IOnboardingOccupant): FormGroup {
    return this._fb.group(occupant);
  }

  public onRemove(item: IOnboardingOccupant, i: number): void {
    if (item) {
      this.FormOccupantsArr = this.form.get(STROCCUPANTS) as FormArray;
      this.FormOccupantsArr.removeAt(i);

      this.updateOccupants();
    }
  }

  public onAdd(): void {
    const dialogRef = this.dialog.open(OccupantsAddDialogComponent, {
      data: { state: AddEditStateType.Add },
      height: '282px',
      autoFocus: true
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.FormOccupantsArr = this.form.get(STROCCUPANTS) as FormArray;
        this.FormOccupantsArr.push(this.createOccupantItem(Object.assign({}, res)));

        this.updateOccupants();
      }
    });
  }

  private updateOccupants(): void {
    const payload = this.FormOccupantsArr?.value?.map(v => {
      return {
        id: v?.id,
        name: v?.name,
        relationship: v?.relationship?.toLowerCase() || null
      };
    });
    this._store.dispatch(updateOnboardingOccupantValuesAction({ payload }));
  }

  public onNext(): void {
    super.onNext(ONBOARDINGVEHICLESROUTE(this.id));

    this._store.dispatch(setOnboardingStepperAction({ step: ONBOARDINGVEHICLES }));
  }

  public onPrev(): void {
    super.onPrev(ONBOARDINGSPOUSEROUTE(this.id));

    this._store.dispatch(setOnboardingStepperAction({ step: ONBOARDINGSPOUSE }));
  }
}