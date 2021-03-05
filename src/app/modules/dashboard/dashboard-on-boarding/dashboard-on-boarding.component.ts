import { Component, OnInit } from '@angular/core';
import { ISimpleItem } from 'src/app/shared/generics/generic-model';

@Component({
  selector: 'cma-dashboard-on-boarding',
  templateUrl: './dashboard-on-boarding.component.html',
  styleUrls: ['./dashboard-on-boarding.component.scss']
})
export class DashboardOnboardingComponent implements OnInit {
  public breadCrumbItems: ISimpleItem[] = [
    { label: 'Dashboard' },
    { label: 'Onboarding' },
    { label: 'List' }
  ];

  constructor() { }

  ngOnInit(): void { }
}
