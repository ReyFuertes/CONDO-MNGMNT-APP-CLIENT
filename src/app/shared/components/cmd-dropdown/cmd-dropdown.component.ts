import { Component, Input, OnInit } from '@angular/core';
import { ISimpleItem } from '../../generics/generic-model';

@Component({
  selector: 'cma-dropdown',
  templateUrl: './cmd-dropdown.component.html',
  styleUrls: ['./cmd-dropdown.component.scss']
})
export class CMADropdownComponent implements OnInit {
  @Input() selectedItem: ISimpleItem;
  @Input() options: ISimpleItem[];
  @Input() placeholder: string;

  constructor() { }

  ngOnInit(): void { }
}
