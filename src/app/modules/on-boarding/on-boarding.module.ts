import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingPageComponent } from './components/on-boarding-page/on-boarding-page.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OnboardingTypeComponent } from './components/on-boarding-type/on-boarding-type.component';
import { MatCardModule } from '@angular/material/card';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { OnboardingDetailComponent } from './components/on-boarding-detail/on-boarding-detail.component';
import { OnboardingReviewComponent } from './components/on-boarding-review/on-boarding-review.component';

const routes: Routes = [
  {
    path: '',
    component: OnboardingPageComponent,
    children: [
      {
        path: 'type',
        component: OnboardingTypeComponent
      },
      {
        path: 'detail',
        component: OnboardingDetailComponent
      },
      {
        path: 'review',
        component: OnboardingReviewComponent
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
    OnboardingPageComponent,
    OnboardingTypeComponent,
    OnboardingDetailComponent,
    OnboardingReviewComponent
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
  ],
  exports: [],
  providers: [],
})
export class OnboardingModule { }