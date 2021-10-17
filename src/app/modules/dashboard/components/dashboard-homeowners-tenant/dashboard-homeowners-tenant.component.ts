import { Component, OnInit } from '@angular/core';
import { ITenant } from 'src/app/models/homeowners.model';

@Component({
  selector: 'cma-dashboard-homeowners-tenant',
  templateUrl: './dashboard-homeowners-tenant.component.html',
  styleUrls: ['./dashboard-homeowners-tenant.component.scss']
})
export class DashboardHomeownersTenantComponent implements OnInit {
  public tenants: ITenant[] = [{
    id: '1',
    firstname: 'rey',
    lastname: 'fuertes',
    contactNo: '09955112256',
    email: 'reyfuertes@gmail.com'
  }, {
    id: '2',
    firstname: 'rhea marie',
    lastname: 'fuertes',
    contactNo: '09955112256',
    email: 'rheamariefuertes@gmail.com'
  }, {
    id: '3',
    firstname: 'rhea marie',
    lastname: 'fuertes',
    contactNo: '09955112256',
    email: 'rheamariefuertes@gmail.com'
  }];

  constructor() { }

  ngOnInit(): void { }
}
