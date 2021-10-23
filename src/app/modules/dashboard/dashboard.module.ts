import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardOnboardingComponent } from './components/dashboard-on-boarding/dashboard-on-boarding.component';
import { RouterModule, Routes } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardOnboardingPanelComponent } from './components/dashboard-on-boarding-panel/dashboard-on-boarding-panel.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TooltipModule } from 'primeng/tooltip';
import { ChipModule } from 'primeng/chip';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardRequestsComponent } from './components/dashboard-requests/dashboard-requests.component';
import { DashboardRequestTableComponent } from './components/dashboard-requests-table/dashboard-requests-table.component';
import { MatTableModule } from '@angular/material/table';
import { PaginatorModule } from 'primeng/paginator';
import { DashboardRequestsTableHiddenComponent } from './components/dashboard-requests-table-hidden-row/dashboard-requests-table-hidden-row.component';
import { MenuModule } from 'primeng/menu';
import { TimelineModule } from 'primeng/timeline';
import { DashboardHomeownersComponent } from './components/dashboard-homeowners/dashboard-homeowners.component';
import { DashboardPaymentsComponent } from './components/dashboard-payments/dashboard-payments.component';
import { DashboardDocumentsComponent } from './components/dashboard-documents/dashboard-documents.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DashboardContainerComponent } from './container/dashboard-container.component';
import { DashboardOnboardingDetailComponent } from './components/dashboard-onboarding-detail/dashboard-onboarding-detail.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DashboardHomeownersDetailComponent } from './components/dashboard-homeowners-detail/dashboard-homeowners-detail.component';
import { DashboardHomeownersDocumentComponent } from './components/dashboard-homeowners-document/dashboard-homeowners-document.component';
import { DashboardOnboardingPanelDocumentComponent } from './components/dashboard-on-boarding-panel-document/dashboard-on-boarding-panel-document.component';
import { DashboardOnboardingPanelContentComponent } from './components/dashboard-on-boarding-panel-content/dashboard-on-boarding-panel-content.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DashboardOnboardingEffects } from './store/effects/dashboard-onboarding.effect';
import { reducers } from './store/reducers';
import { DashboardHomeownersTenantComponent } from './components/dashboard-homeowners-tenant/dashboard-homeowners-tenant.component';
import { DashboardHomeownersEffects } from './store/effects/dashboard-homeowners.action';
import { MatDialogModule } from '@angular/material/dialog';
import { CMADialogModule } from '../dialog/dialog.module';
import { DashboardHomeownersOccupantComponent } from './components/dashboard-homeowners-occupant/dashboard-homeowners-occupant.component';
import { DashboardHomeownersVehicleComponent } from './components/dashboard-homeowners-vehicles/dashboard-homeowners-vehicle.component';

const routes: Routes = [{
  path: '',
  component: DashboardContainerComponent,
  children: [{
    path: 'on-boarding/list',
    component: DashboardOnboardingComponent
  },
  {
    path: 'requests/list',
    component: DashboardRequestsComponent
  },
  {
    path: 'homeowners/list',
    component: DashboardHomeownersComponent
  },
  {
    path: 'payments/list',
    component: DashboardPaymentsComponent
  },
  {
    path: 'documents/list',
    component: DashboardDocumentsComponent
  },
  {
    path: 'homeowners',
    component: DashboardHomeownersComponent
  },
  {
    path: 'on-boarding/:id/detail',
    component: DashboardOnboardingDetailComponent
  }]
}];

const primeNgModules = [
  CheckboxModule,
  ButtonModule,
  TooltipModule,
  ChipModule,
  BreadcrumbModule,
  PaginatorModule,
  MenuModule,
  TimelineModule,
  TableModule,
  InputTextModule,
];

const materialModules = [
  MatCardModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatTableModule,
  MatTabsModule,
  MatDialogModule
];

@NgModule({
  declarations: [
    DashboardOnboardingComponent,
    DashboardOnboardingPanelComponent,
    DashboardContainerComponent,
    DashboardRequestsComponent,
    DashboardRequestTableComponent,
    DashboardRequestsTableHiddenComponent,
    DashboardHomeownersComponent,
    DashboardPaymentsComponent,
    DashboardDocumentsComponent,
    DashboardOnboardingDetailComponent,
    DashboardHomeownersDetailComponent,
    DashboardHomeownersDocumentComponent,
    DashboardOnboardingPanelDocumentComponent,
    DashboardOnboardingPanelContentComponent,
    DashboardOnboardingPanelContentComponent,
    DashboardHomeownersTenantComponent,
    DashboardHomeownersOccupantComponent,
    DashboardHomeownersVehicleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CMADialogModule,
    FlexLayoutModule,
    ...primeNgModules,
    ...materialModules,
    RouterModule.forChild(routes),
    SharedModule,
    StoreModule.forFeature('dashboardModule', reducers),
    EffectsModule.forFeature([
      DashboardOnboardingEffects,
      DashboardHomeownersEffects
    ])
  ],
  exports: [],
  providers: [],
})
export class DashboardModule { }