import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { GenericControl } from '../../generics/generic-control';
import { ISimpleItem } from '../../generics/generic-model';

@Component({
  selector: 'cma-input',
  templateUrl: './cma-input.component.html',
  styleUrls: ['./cma-input.component.scss']
})
export class CMAInputComponent extends GenericControl<ISimpleItem> implements OnInit {
  @Input() value: string = null;
  @Input() isDate: boolean = false;

  public isControlValueObject: boolean = false;

  constructor() {
    super();
  }

  ngOnInit(): void {
    let value = this.form.get(this.controlName)?.value || '';
    if (value) {
      if (value instanceof Date) {
        this.form.get(this.controlName).patchValue(moment(value).format('MM-DD-YYYY'), { emitEvent: false });
      } else if (typeof (value) === 'object') {
        this.form.get(this.controlName).patchValue(value?.label, { emitEvent: false });
      } else {
        this.form.get(this.controlName).patchValue(value, { emitEvent: false });
      }
    }
  }
}
