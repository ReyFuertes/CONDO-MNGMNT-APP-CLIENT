import { Component, Input, OnInit } from '@angular/core';
import { IOnboarding } from 'src/app/modules/on-boarding/on-boarding.model';
import { ISimpleItem } from 'src/app/shared/generics/generic-model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'cma-dashboard-on-boarding-panel-document',
  templateUrl: './dashboard-on-boarding-panel-document.component.html',
  styleUrls: ['./dashboard-on-boarding-panel-document.component.scss']
})
export class DashboardOnboardingPanelDocumentComponent implements OnInit {
  @Input() public item: IOnboarding;

  public svgPath: string = environment.svgPath;
  public imgPath: string = environment.imgPath;
  
  constructor() { }

  ngOnInit(): void { }
}
