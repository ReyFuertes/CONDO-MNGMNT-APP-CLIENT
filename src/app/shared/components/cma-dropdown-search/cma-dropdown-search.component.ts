import { Component, Input, OnInit } from '@angular/core';
import { GenericControl } from '../../generics/generic-control';
import { ISimpleItem } from '../../generics/generic-model';

@Component({
  selector: 'cma-dropdown-search',
  templateUrl: './cma-dropdown-search.component.html',
  styleUrls: ['./cma-dropdown-search.component.scss']
})
export class CMADropdownSearchComponent extends GenericControl<ISimpleItem> implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void { }
}
