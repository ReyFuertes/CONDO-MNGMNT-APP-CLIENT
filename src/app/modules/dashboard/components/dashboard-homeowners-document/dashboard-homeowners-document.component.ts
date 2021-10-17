import { Component, Input, OnInit } from '@angular/core';
import { IOnboardingDocument } from 'src/app/modules/on-boarding/on-boarding.model';
import { ISimpleItem } from 'src/app/shared/generics/generic-model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'cma-dashboard-homeowners-document',
  templateUrl: './dashboard-homeowners-document.component.html',
  styleUrls: ['./dashboard-homeowners-document.component.scss']
})
export class DashboardHomeownersDocumentComponent implements OnInit {
  @Input() documents: IOnboardingDocument[];
  public svgPath: string = environment.svgPath;
  public imgPath: string = environment.imgPath;

  constructor() { }

  ngOnInit(): void {  }
}
