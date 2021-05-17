import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOnboarding } from 'src/app/modules/on-boarding/on-boarding.model';
import { DASHBOARDONBOARDINGROUTE } from 'src/app/shared/constants/routes';

@Component({
  selector: 'cma-dashboard-on-boarding-panel-content',
  templateUrl: './dashboard-on-boarding-panel-content.component.html',
  styleUrls: ['./dashboard-on-boarding-panel-content.component.scss']
})
export class DashboardOnboardingPanelContentComponent implements OnInit {
  @Input() public item: IOnboarding;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  public onEdit(id: string): void {
    this.router.navigateByUrl(`${DASHBOARDONBOARDINGROUTE}/${id}/detail`);
  }
}
