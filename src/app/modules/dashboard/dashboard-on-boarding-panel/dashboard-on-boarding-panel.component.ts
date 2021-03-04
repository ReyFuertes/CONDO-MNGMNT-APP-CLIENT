import { Component, OnInit, ViewChild } from '@angular/core';
import {MatAccordion} from '@angular/material/expansion';
import { environment } from 'src/environments/environment';

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
    status: 'Approved'
  }, {
    name: 'John Doe',
    status: 'Orientation'
  }, {
    name: 'Rody Duterte',
    status: 'Move-in'
  }, {
    name: 'Bong Go',
    status: 'Approved'
  }, {
    name: 'Lauro Sams',
    status: 'Approved'
  }, {
    name: 'Jake James',
    status: 'Orientation'
  }, {
    name: 'Pedro Penduko',
    status: 'Move-in'
  }, {
    name: 'Tunying See',
    status: 'Approved'
  }];

  constructor() { }

  ngOnInit(): void { }
}
