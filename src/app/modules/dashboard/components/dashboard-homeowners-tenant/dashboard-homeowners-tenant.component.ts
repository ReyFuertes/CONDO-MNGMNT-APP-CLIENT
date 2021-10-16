import { Component, OnInit } from '@angular/core';
import { Tenant } from 'src/app/models/onboarding.model';

@Component({
  selector: 'cma-dashboard-homeowners-tenant',
  templateUrl: './dashboard-homeowners-tenant.component.html',
  styleUrls: ['./dashboard-homeowners-tenant.component.scss']
})
export class DashboardHomeownersTenantComponent implements OnInit {
  public tenants: Tenant[] = [{
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
