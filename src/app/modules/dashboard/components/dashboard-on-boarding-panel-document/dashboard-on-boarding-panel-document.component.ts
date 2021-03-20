import { Component, OnInit } from '@angular/core';
import { ISimpleItem } from 'src/app/shared/generics/generic-model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'cma-dashboard-on-boarding-panel-document',
  templateUrl: './dashboard-on-boarding-panel-document.component.html',
  styleUrls: ['./dashboard-on-boarding-panel-document.component.scss']
})
export class DashboardOnboardingPanelDocumentComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public imgPath: string = environment.imgPath;
  public uploadedDocuments: ISimpleItem[] = [{
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
  constructor() { }

  ngOnInit(): void { }
}
