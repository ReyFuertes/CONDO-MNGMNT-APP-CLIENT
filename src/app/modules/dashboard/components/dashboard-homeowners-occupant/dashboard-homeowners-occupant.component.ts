import { Component, Input, OnInit } from '@angular/core';
import { IOccupant } from 'src/app/models/homeowners.model';

@Component({
  selector: 'cma-dashboard-homeowners-occupant',
  templateUrl: './dashboard-homeowners-occupant.component.html',
  styleUrls: ['./dashboard-homeowners-occupant.component.scss']
})
export class DashboardHomeownersOccupantComponent implements OnInit {
  @Input() public occupants: IOccupant[] = [];
  constructor() { }

  ngOnInit(): void { }
}
