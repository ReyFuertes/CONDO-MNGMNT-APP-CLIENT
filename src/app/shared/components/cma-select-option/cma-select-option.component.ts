import { Component, Input, OnInit } from '@angular/core';
import { GenericControl } from '../../generics/generic-control';
import { ISimpleItem } from '../../generics/generic-model';

@Component({
  selector: 'cma-select-option',
  templateUrl: './cma-select-option.component.html',
  styleUrls: ['./cma-select-option.component.scss']
})
export class CMSelectOptionComponent extends GenericControl<ISimpleItem> {
  constructor() {
    super();
  }

  ngOnInit(): void { }
}
