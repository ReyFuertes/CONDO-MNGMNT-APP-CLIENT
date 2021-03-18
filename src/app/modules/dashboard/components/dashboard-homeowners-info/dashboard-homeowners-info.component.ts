import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'cma-dashboard-homeowners-info',
  templateUrl: './dashboard-homeowners-info.component.html',
  styleUrls: ['./dashboard-homeowners-info.component.scss']
})
export class DashboardHomeownersInfoComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public imgPath: string = environment.imgPath;

  constructor() { }

  ngOnInit(): void { }
}
