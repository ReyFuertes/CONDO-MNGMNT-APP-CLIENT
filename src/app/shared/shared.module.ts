import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CMAInputComponent } from './components/cma-input/cma-input.component';
import { InputTextModule } from 'primeng/inputtext';
import { MatCardModule } from '@angular/material/card';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CMSelectOptionComponent } from './components/cma-select-option/cma-select-option.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { CMADropdownSearchComponent } from './components/cma-dropdown-search/cma-dropdown-search.component';
import { CMADropdownComponent } from './components/cmd-dropdown/cmd-dropdown.component';
import { CMADatepickerComponent } from './components/cmd-datepicker/cmd-datepicker.component';
import { CalendarModule } from 'primeng/calendar';
import { CMAUploadComponent } from './components/cma-upload/cma-upload.component';
import { TooltipModule } from 'primeng/tooltip';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CMABreadcrumbComponent } from './components/cmd-breadcrumb/cmd-breadcrumb.component';
import { CMATopNavComponent } from './components/cma-top-nav/cma-top-nav.component';
import { MegaMenuModule } from 'primeng/megamenu';
import { CMAInputSearchComponent } from './components/input-search/input-search.component';
import { CMAMultiSelectComponent } from './components/cma-multi-select/cma-multi-select.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { CMATextareaComponent } from './components/cma-textarea/cma-textarea.component';
import { CMStepperComponent } from './components/cma-stepper/cma-stepper.component';
import { TimelineModule } from 'primeng/timeline';
import { CMAUploadThumbComponent } from './components/cma-upload-thumb/cma-upload-thumb.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { CMAImgPreviewComponent } from './components/cma-img-preview/cma-img-preview.component';

const primeNgModules = [
  CheckboxModule,
  ButtonModule,
  InputTextModule,
  SelectButtonModule,
  DropdownModule,
  CalendarModule,
  TooltipModule,
  BreadcrumbModule,
  MegaMenuModule,
  MultiSelectModule,
  MenuModule,
  BadgeModule,
  OverlayPanelModule,
  TableModule,
  TimelineModule
];

const materialModules = [
  MatCardModule
];

const sharedComponents = [
  CMAInputComponent,
  CMSelectOptionComponent,
  CMADropdownSearchComponent,
  CMADropdownComponent,
  CMADatepickerComponent,
  CMAUploadComponent,
  CMABreadcrumbComponent,
  CMATopNavComponent,
  CMAInputSearchComponent,
  CMAMultiSelectComponent,
  CMATextareaComponent,
  CMStepperComponent,
  CMAUploadThumbComponent,
  CMAImgPreviewComponent
]

@NgModule({
  declarations: [
    ...sharedComponents,
  ],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    NgxFileDropModule,
    ...primeNgModules,
    ...materialModules
  ],
  exports: [
    ...sharedComponents
  ],
  providers: [],
})
export class SharedModule { }