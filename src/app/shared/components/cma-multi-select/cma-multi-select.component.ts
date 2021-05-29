import { Component, Input, OnInit } from '@angular/core';
import { GenericControl } from '../../generics/generic-control';
import { ISimpleItem } from '../../generics/generic-model';

@Component({
  selector: 'cma-multi-select',
  templateUrl: './cma-multi-select.component.html',
  styleUrls: ['./cma-multi-select.component.scss']
})
export class CMAMultiSelectComponent extends GenericControl<ISimpleItem> implements OnInit {
  @Input() options: ISimpleItem[];

  constructor() {
    super();
  }

  ngOnInit(): void { }
}
