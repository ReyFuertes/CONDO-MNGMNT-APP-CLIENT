import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { StorageService } from 'src/app/services/storage.service';
import { GenericOnBoardingComponent } from 'src/app/shared/generics/generic-onboarding';
import { AppState } from 'src/app/store/app.reducer';
import { ONBOARDINGOCCUPANTS, ONBOARDINGDOCUMENTS, ONBOARDINGPARTNER } from 'src/app/shared/constants/generic';
import { setOnboardingStepperAction } from '../../store/onboarding.action';
import { IOccupant } from '../../on-boarding.model';
import { MatDialog } from '@angular/material/dialog';
import { OccupantsAddDialogComponent } from 'src/app/modules/dialog/components/occupants-add-dialog/occupants-add-dialog.component';
import { AddEditStateType } from 'src/app/shared/generics/generic-model';

@Component({
  selector: 'cma-on-boarding-occupants',
  templateUrl: './on-boarding-occupants.component.html',
  styleUrls: ['./on-boarding-occupants.component.scss']
})
export class OnboardingOccupantsComponent extends GenericOnBoardingComponent implements OnInit {
  public form: FormGroup;
  public files: File[] = [];

  constructor(public dialog: MatDialog, storageSrv: StorageService, router: Router, private fb: FormBuilder, private store: Store<AppState>) {
    super(ONBOARDINGOCCUPANTS, storageSrv, router);

    this.form = this.fb.group({
      occupants: new FormArray([]),
    });
  }

  ngOnInit(): void {

  }

  public get occupants(): FormArray {
    return this.form.get('occupants') as FormArray;
  }

  public newOccupant(occupant: IOccupant): FormGroup {
    return this.fb.group(occupant)
  }

  public createItem = (item: IOccupant): FormGroup => this.fb.group(item);

  public onAdd(): void {
    const dialogRef = this.dialog.open(OccupantsAddDialogComponent, {
      data: {
        state: AddEditStateType.Add
      },
      height: '282px',
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe((payload) => {
      if (payload) {
        this.occupants.push(this.createItem(payload));
      }
    });
  }

  public onNext(): void {
    super.onNext('/on-boarding/documents');

    this.store.dispatch(setOnboardingStepperAction({ step: ONBOARDINGDOCUMENTS }));
  }

  public onPrev(): void {
    super.onPrev('/on-boarding/partner');

    this.store.dispatch(setOnboardingStepperAction({ step: ONBOARDINGPARTNER }));
  }
}