import { Component, Input, OnInit } from '@angular/core';
import { GenericControl } from '../../generics/generic-control';
import { ISimpleItem } from '../../generics/generic-model';

@Component({
  selector: 'cma-multi-select',
  templateUrl: './cma-multi-select.component.html',
  styleUrls: ['./cma-multi-select.component.scss']
})
export class CMAMultiSelectComponent extends GenericControl<ISimpleItem> {
  @Input() options: ISimpleItem[];

  constructor() {
    super();
  }

  public onChange(event: any): void {
    if(event?.value) {
      //this.form.get(this.controlName).patchValue(event?.value);
    }
  }
}
