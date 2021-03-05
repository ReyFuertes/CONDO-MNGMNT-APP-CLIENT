import { Component, Input, OnInit } from '@angular/core';
import { ISimpleItem } from '../../generics/generic-model';

@Component({
  selector: 'cma-breadcrumb',
  templateUrl: './cmd-breadcrumb.component.html',
  styleUrls: ['./cmd-breadcrumb.component.scss']
})
export class CMABreadcrumbComponent implements OnInit {
  @Input() items: ISimpleItem[];
  @Input() home: any;

  constructor() { }

  ngOnInit(): void {  }
}
