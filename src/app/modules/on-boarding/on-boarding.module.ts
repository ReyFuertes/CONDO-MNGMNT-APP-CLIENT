import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OnboardingTypeComponent } from './components/on-boarding-type/on-boarding-type.component';
import { MatCardModule } from '@angular/material/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { OnboardingPersonalComponent } from './components/on-boarding-personal/on-boarding-personal.component';
import { OnboardingReviewComponent } from './components/on-boarding-review/on-boarding-review.component';
import { OnboardingDocumentComponent } from './components/on-boarding-document/on-boarding-document.component';
import { OnboardingForApprovalComponent } from './components/on-boarding-for-approval/on-boarding-for-approval.component';
import { OnboardingSpouseInfoComponent } from './components/on-boarding-spouse/on-boarding-spouse.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { OnboardingReducer } from './store/onboarding.reducer';
import { OnboardingContainerComponent } from './container/on-boarding-container.component';
import { OnboardingOccupantsComponent } from './components/on-boarding-occupants/on-boarding-occupants.component';
import { CMADialogModule } from '../dialog/dialog.module';
import { InputTextModule } from 'primeng/inputtext';
import { MatDialogModule } from '@angular/material/dialog';
import { OnboardingEffects } from './store/onboarding.effect';
import { OnboardingVehicleComponent } from './components/on-boarding-vehicle/on-boarding-vehicle.component';
import { FileUploadModule } from 'primeng/fileupload';

const routes: Routes = [{
  path: '',
  component: OnboardingContainerComponent,
  children: [{
    path: 'type/:id',
    component: OnboardingTypeComponent
  }, {
    path: 'personal/:id',
    component: OnboardingPersonalComponent
  }, {
    path: 'spouse/:id',
    component: OnboardingSpouseInfoComponent
  }, {
    path: 'occupants/:id',
    component: OnboardingOccupantsComponent
  }, {
    path: 'documents/:id',
    component: OnboardingDocumentComponent
  }, {
    path: 'vehicles/:id',
    component: OnboardingVehicleComponent
  }, {
    path: 'review/:id',
    component: OnboardingReviewComponent
  }, {
    path: 'for-approval/:id',
    component: OnboardingForApprovalComponent
  }]
}];

const primeNgModules = [
  CheckboxModule,
  ButtonModule,
  InputTextModule,
  FileUploadModule
];

const materialModules = [
  MatCardModule,
  MatDialogModule
];

@NgModule({
  declarations: [
    OnboardingContainerComponent,
    OnboardingTypeComponent,
    OnboardingPersonalComponent,
    OnboardingReviewComponent,
    OnboardingDocumentComponent,
    OnboardingForApprovalComponent,
    OnboardingSpouseInfoComponent,
    OnboardingOccupantsComponent,
    OnboardingVehicleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ...primeNgModules,
    ...materialModules,
    RouterModule.forChild(routes),
    SharedModule,
    StoreModule.forFeature('onboarding', OnboardingReducer),
    EffectsModule.forFeature([OnboardingEffects]),
    CMADialogModule
  ],
  exports: [],
  providers: [],
})
export class OnboardingModule { }