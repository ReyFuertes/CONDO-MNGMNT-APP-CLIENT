import { Component, Input, OnInit } from '@angular/core';
import { IVehicle } from 'src/app/models/homeowners.model';

@Component({
  selector: 'cma-dashboard-homeowners-vehicle',
  templateUrl: './dashboard-homeowners-vehicle.component.html',
  styleUrls: ['./dashboard-homeowners-vehicle.component.scss']
})
export class DashboardHomeownersVehicleComponent implements OnInit {
  @Input() public vehicles: IVehicle[] = [];
  constructor() { }

  ngOnInit(): void { }
}
