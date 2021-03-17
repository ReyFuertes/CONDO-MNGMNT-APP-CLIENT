import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { OnBoardingType } from 'src/app/models/onboarding.model';
import { ISimpleItem } from 'src/app/shared/generics/generic-model';
import { environment } from 'src/environments/environment';
import { DASHBOARDONBOARDINGROUTE } from 'src/app/shared/constants/routes';

@Component({
  selector: 'cma-dashboard-on-boarding-panel',
  templateUrl: './dashboard-on-boarding-panel.component.html',
  styleUrls: ['./dashboard-on-boarding-panel.component.scss']
})
export class DashboardOnboardingPanelComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  public svgPath: string = environment.svgPath;
  public imgPath: string = environment.imgPath;
  public onboaders: any[] = [{
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
  public uploadDocuments: ISimpleItem[] = [{
    label: 'Amenities Registration Form',
    value: ''
  }, {
    label: 'Move-in Notice & Clearance Form',
    value: ''
  }, {
    label: 'Residents Information Sheet',
    value: ''
  }, {
    label: 'Vehicle Registration & Car Sticker Form',
    value: ''
  }, {
    label: 'ID Card Application Form',
    value: ''
  }, {
    label: 'Signature Information Card',
    value: ''
  }, {
    label: 'Waiver',
    value: ''
  }, {
    label: 'Contract',
    value: ''
  }];
  public onboardingStatus: any[];

  constructor(private router: Router) { }

  ngOnInit(): void {
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
