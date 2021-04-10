import { Component, Input, OnInit } from '@angular/core';
import { GenericControl } from '../../generics/generic-control';
import { ISimpleItem } from '../../generics/generic-model';

@Component({
  selector: 'cma-input',
  templateUrl: './cma-input.component.html',
  styleUrls: ['./cma-input.component.scss']
})
export class CMAInputComponent extends GenericControl<ISimpleItem> implements OnInit {
  @Input() value: string = null;

  public isControlValueObject: boolean = false;

  constructor() {
    super();
  }

  ngOnInit(): void {
    const value = this.form.get(this.controlName).value;
    if (typeof (value) === 'object') {
      this.form.get(this.controlName).patchValue(value?.label);
    } else {
      this.form.get(this.controlName).patchValue(value);
    }
  }
}
