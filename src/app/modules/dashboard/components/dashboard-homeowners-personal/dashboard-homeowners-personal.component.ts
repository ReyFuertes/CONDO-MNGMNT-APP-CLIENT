import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IHomeowner } from 'src/app/models/homeowners.model';
import { IPersonal } from 'src/app/modules/on-boarding/on-boarding.model';
import { DASHBOARDONBOARDINGROUTE } from 'src/app/shared/constants/routes';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'cma-dashboard-homeowners-personal',
  templateUrl: './dashboard-homeowners-personal.component.html',
  styleUrls: ['./dashboard-homeowners-personal.component.scss']
})
export class DashboardHomeownersPersonalComponent implements OnInit {
  @Input()
  public personal: IPersonal;

  public svgPath: string = environment.svgPath;
  public imgPath: string = environment.imgPath;

  constructor(private router: Router) { }

  ngOnInit(): void {  }

  public onEdit(id: string): void {
    this.router.navigateByUrl(`${DASHBOARDONBOARDINGROUTE}/${id}/detail`);
  }
}
