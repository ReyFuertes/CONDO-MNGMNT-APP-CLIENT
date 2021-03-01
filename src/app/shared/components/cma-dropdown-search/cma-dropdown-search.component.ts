import { Component, Input, OnInit } from '@angular/core';
import { ISimpleItem } from '../../generics/generic-model';

@Component({
  selector: 'cma-dropdown-search',
  templateUrl: './cma-dropdown-search.component.html',
  styleUrls: ['./cma-dropdown-search.component.scss']
})
export class CMADropdownSearchComponent implements OnInit {
  @Input() selectedItem: ISimpleItem;
  @Input() options: ISimpleItem[];
  @Input() placeholder: string;

  constructor() { }

  ngOnInit(): void { }
}
