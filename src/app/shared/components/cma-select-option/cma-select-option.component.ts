import { Component, Input, OnInit } from '@angular/core';
import { ISimpleItem } from '../../generics/generic-model';

@Component({
  selector: 'cma-select-option',
  templateUrl: './cma-select-option.component.html',
  styleUrls: ['./cma-select-option.component.scss']
})
export class CMSelectOptionComponent implements OnInit {
  @Input() options: ISimpleItem[];
  @Input() selectedItem: ISimpleItem;

  constructor() { }

  ngOnInit(): void { }
}
