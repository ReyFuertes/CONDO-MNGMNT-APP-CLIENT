import { Component, OnInit } from '@angular/core';
import { ISimpleItem } from 'src/app/shared/generics/generic-model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'cma-dashboard-homeowners-document',
  templateUrl: './dashboard-homeowners-document.component.html',
  styleUrls: ['./dashboard-homeowners-document.component.scss']
})
export class DashboardHomeownersDocumentComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public imgPath: string = environment.imgPath;
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

  constructor() { }

  ngOnInit(): void { }
}
