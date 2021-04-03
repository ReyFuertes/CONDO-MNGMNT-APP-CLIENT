import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DASHBOARDONBOARDINGROUTE } from 'src/app/shared/constants/routes';

@Component({
  selector: 'cma-dashboard-on-boarding-panel-content',
  templateUrl: './dashboard-on-boarding-panel-content.component.html',
  styleUrls: ['./dashboard-on-boarding-panel-content.component.scss']
})
export class DashboardOnboardingPanelContentComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void { }

  public onEdit(id: string): void {
    this.router.navigateByUrl(`${DASHBOARDONBOARDINGROUTE}/${id}/detail`);
  }
}
