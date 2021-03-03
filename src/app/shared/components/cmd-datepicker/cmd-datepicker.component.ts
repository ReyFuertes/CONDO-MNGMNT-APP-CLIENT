import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cma-datepicker',
  templateUrl: './cmd-datepicker.component.html',
  styleUrls: ['./cmd-datepicker.component.scss']
})
export class CMADatepickerComponent implements OnInit {
  @Input() placeholder: string;
  
  constructor() { }

  ngOnInit(): void { }
}
