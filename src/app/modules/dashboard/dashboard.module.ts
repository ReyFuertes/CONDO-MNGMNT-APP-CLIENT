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
import { DashboardRequestsComponent } from './dashboard-requests/dashboard-requests.component';
import { DashboardRequestTableComponent } from './dashboard-requests-table/dashboard-requests-table.component';
import { MatTableModule } from '@angular/material/table';
import { PaginatorModule } from 'primeng/paginator';
import { DashboardRequestsTableHiddenComponent } from './dashboard-requests-table-hidden-row/dashboard-requests-table-hidden-row.component';
import { MenuModule } from 'primeng/menu';
import { TimelineModule } from 'primeng/timeline';
import { DashboardHomeownersComponent } from './dashboard-homeowners/dashboard-homeowners.component';
import { DashboardPaymentsComponent } from './dashboard-payments/dashboard-payments.component';
import { DashboardDocumentsComponent } from './dashboard-documents/dashboard-documents.component';
import { DashboardHomeownersTableComponent } from './dashboard-homeowners-table/dashboard-homeowners-table.component';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

const routes: Routes = [
  {
    path: '',
    component: DashboardPageComponent,
    children: [
      {
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
      }
    ]
  }
];

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
  InputTextModule
];

const materialModules = [
  MatCardModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatTableModule
];

@NgModule({
  declarations: [
    DashboardOnboardingComponent,
    DashboardOnboardingPanelComponent,
    DashboardPageComponent,
    DashboardRequestsComponent,
    DashboardRequestTableComponent,
    DashboardRequestsTableHiddenComponent,
    DashboardHomeownersComponent,
    DashboardPaymentsComponent,
    DashboardDocumentsComponent,
    DashboardHomeownersTableComponent,
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