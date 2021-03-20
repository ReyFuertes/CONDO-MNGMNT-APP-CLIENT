import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { OnBoardingType } from 'src/app/models/onboarding.model';
import { HOMEOWNERSBREADCRUMBS } from 'src/app/shared/constants/breadcrumbs';
import { DASHBOARDONBOARDINGROUTE } from 'src/app/shared/constants/routes';
import { GenericContainer } from 'src/app/shared/generics/generic-container';
import { ISimpleItem } from 'src/app/shared/generics/generic-model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'cma-dashboard-homeowners',
  templateUrl: './dashboard-homeowners.component.html',
  styleUrls: ['./dashboard-homeowners.component.scss']
})
export class DashboardHomeownersComponent extends GenericContainer implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  public svgPath: string = environment.svgPath;
  public imgPath: string = environment.imgPath;
  public homeowners: any[] = [{
    name: 'Rey Fuertes',
    status: 'Approved',
    type: 'corporate'
  }, {
    name: 'John Doe',
    status: 'Orientation',
    type: 'individual'
  }, {
    name: 'Rody Duterte',
    status: 'Move-in',
    type: 'individual'
  }, {
    name: 'Bong Go',
    status: 'Approved',
    type: 'individual'
  }, {
    name: 'Lauro Sams',
    status: 'Approved',
    type: 'corporate'
  }, {
    name: 'Jake James',
    status: 'Orientation',
    type: 'individual'
  }, {
    name: 'Pedro Penduko',
    status: 'Move-in',
    type: 'individual'
  }, {
    name: 'Tunying See',
    status: 'Approved',
    type: 'individual'
  }];
  public isExpanded: any = false;
  public onBoardingType = OnBoardingType;
  public onboardingStatus: any[];

  constructor(private router: Router) {
    super();
    this.onboardingStatus = ['Approved', 'Orientation', 'Move-In'];
  }
  
  public onEdit(id: string): void {
    this.router.navigateByUrl(`${DASHBOARDONBOARDINGROUTE}/${id}/detail`);
  }

  public getStatusIndex(value: any): any {
    return this.onboardingStatus.findIndex(i => i === value)
  }

  public onPanelClick(i: number): void {
    this.isExpanded = i;
  }
}