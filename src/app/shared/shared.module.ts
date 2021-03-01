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

const primeNgModules = [
  CheckboxModule,
  ButtonModule,
  InputTextModule,
  SelectButtonModule,
  DropdownModule
];

const materialModules = [
  MatCardModule
];

const sharedComponents = [
  CMAInputComponent,
  CMSelectOptionComponent,
  CMADropdownSearchComponent,
  CMADropdownComponent
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
    ...primeNgModules,
    ...materialModules
  ],
  exports: [
    ...sharedComponents
  ],
  providers: [],
})
export class SharedModule { }