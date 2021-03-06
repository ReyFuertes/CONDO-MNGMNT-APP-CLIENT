import { Component, Input, OnInit } from '@angular/core';
import { ISimpleItem } from '../../generics/generic-model';

@Component({
  selector: 'cma-multi-select',
  templateUrl: './cma-multi-select.component.html',
  styleUrls: ['./cma-multi-select.component.scss']
})
export class CMAMultiSelectComponent implements OnInit {
  @Input() options: ISimpleItem[] = [
    { label: 'Lastname', value: 'NY' },
    { label: 'Firstname', value: 'RM' },
    { label: 'Middlename', value: 'PRS' },
    { label: 'Citizenship', value: 'PRS' },
    { label: 'Contact No.', value: 'PRS' },
    { label: 'ID No.', value: 'PRS' },
    { label: 'ID Type', value: 'LDN' },
    { label: 'Occupation', value: 'IST' },
    { label: 'Gender', value: 'PRS' }
  ];
  constructor() { }

  ngOnInit(): void { }
}
