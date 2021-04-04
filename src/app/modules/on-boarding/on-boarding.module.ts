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
import { OnboardingPartnerInfoComponent } from './components/on-boarding-partner-info/on-boarding-partner-info.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { OnboardingReducer } from './store/onboarding.reducer';
import { OnboardingContainerComponent } from './container/on-boarding-container.component';

const routes: Routes = [
  {
    path: '',
    component: OnboardingContainerComponent,
    children: [
      {
        path: 'type',
        component: OnboardingTypeComponent
      },
      {
        path: 'personal',
        component: OnboardingPersonalComponent
      },
      {
        path: 'partner',
        component: OnboardingPartnerInfoComponent
      },
      {
        path: 'documents',
        component: OnboardingDocumentComponent
      },
      {
        path: 'review',
        component: OnboardingReviewComponent
      },
      {
        path: 'for-approval',
        component: OnboardingForApprovalComponent
      }
    ]
  }
];

const primeNgModules = [
  CheckboxModule,
  ButtonModule
];

const materialModules = [
  MatCardModule
];

@NgModule({
  declarations: [
    OnboardingContainerComponent,
    OnboardingTypeComponent,
    OnboardingPersonalComponent,
    OnboardingReviewComponent,
    OnboardingDocumentComponent,
    OnboardingForApprovalComponent,
    OnboardingPartnerInfoComponent
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
    EffectsModule.forFeature([]),
  ],
  exports: [],
  providers: [],
})
export class OnboardingModule { }