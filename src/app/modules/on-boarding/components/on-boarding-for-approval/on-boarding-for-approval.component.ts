import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'cma-on-boarding-for-approval',
  templateUrl: './on-boarding-for-approval.component.html',
  styleUrls: ['./on-boarding-for-approval.component.scss']
})
export class OnboardingForApprovalComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  constructor() { }

  ngOnInit(): void { }
}
