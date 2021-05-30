import { Component, Input, OnInit } from '@angular/core';
import { GenericControl } from '../../generics/generic-control';
import { ISimpleItem } from '../../generics/generic-model';

@Component({
  selector: 'cma-dropdown',
  templateUrl: './cmd-dropdown.component.html',
  styleUrls: ['./cmd-dropdown.component.scss']
})
export class CMADropdownComponent extends GenericControl<ISimpleItem> implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() { }
}
