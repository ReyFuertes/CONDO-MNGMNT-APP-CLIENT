import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardOnboardingComponent } from './dashboard-on-boarding/dashboard-on-boarding.component';
import { RouterModule, Routes } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { DashboardOnboardingPanelComponent } from './dashboard-on-boarding-panel/dashboard-on-boarding-panel.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TooltipModule } from 'primeng/tooltip';
import { ChipModule } from 'primeng/chip';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: DashboardPageComponent,
    children: [
      {
        path: 'list',
        component: DashboardOnboardingComponent
      }
    ]
  }
];

const primeNgModules = [
  CheckboxModule,
  ButtonModule,
  TooltipModule,
  ChipModule,
  BreadcrumbModule
];

const materialModules = [
  MatCardModule,
  MatExpansionModule,
  MatFormFieldModule
];

@NgModule({
  declarations: [
    DashboardOnboardingComponent,
    DashboardOnboardingPanelComponent,
    DashboardPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ...primeNgModules,
    ...materialModules,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [],
  providers: [],
})
export class DashboardModule { }