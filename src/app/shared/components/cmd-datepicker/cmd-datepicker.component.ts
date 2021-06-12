import { Component, Input, OnInit } from '@angular/core';
import { GenericControl } from '../../generics/generic-control';
import { ISimpleItem } from '../../generics/generic-model';
import * as moment from 'moment';

@Component({
  selector: 'cma-datepicker',
  templateUrl: './cmd-datepicker.component.html',
  styleUrls: ['./cmd-datepicker.component.scss']
})
export class CMADatepickerComponent extends GenericControl<ISimpleItem> implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {
    const toDate = new Date(this.form.get(this.controlName).value || new Date());
    this.form.get(this.controlName).patchValue(toDate);
  }
}
