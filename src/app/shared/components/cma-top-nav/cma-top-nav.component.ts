import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { MenuType } from 'src/app/models/onboarding.model';
import { environment } from 'src/environments/environment';
import { DASHBOARDONBOARDINGROUTE, REQUESTSROUTE } from '../../constants/routes';
import { ISimpleItem } from '../../generics/generic-model';

@Component({
  selector: 'cma-cma-top-nav',
  templateUrl: './cma-top-nav.component.html',
  styleUrls: ['./cma-top-nav.component.scss']
})
export class CMATopNavComponent implements OnInit {
  public menuItems: MegaMenuItem[];
  public userMenuItems: MenuItem[];
  public imgPath: string = environment.imgPath;
  public notifications: ISimpleItem[] = [{
    label: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500',
    value: '1'
  }, {
    label: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500',
    value: '2'
  }, {
    label: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500',
    value: '3'
  }, {
    label: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500',
    value: '4'
  }, {
    label: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500',
    value: '5'
  }, {
    label: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500',
    value: '6'
  }, {
    label: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500',
    value: '7'
  }, {
    label: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500',
    value: '8'
  }];

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.userMenuItems = [
      { label: 'Profile', icon: 'pi pi-fw pi-user' },
      { label: 'Settings', icon: 'pi pi-fw pi-cog' },
      { label: 'Logout', icon: 'pi pi-fw pi-lock' }
    ];
    this.menuItems = [{
      label: 'Onboarding', icon: 'pi pi-fw pi-home',
      command: (event) => {
        localStorage.setItem('nav', JSON.stringify(MenuType.Onboarding));
        this.router.navigateByUrl(DASHBOARDONBOARDINGROUTE);
      }
    }, {
      label: 'Homeowners', icon: 'pi pi-fw pi-users',
      command: (event) => {
        localStorage.setItem('nav', JSON.stringify(MenuType.Homeowners));

      }
    }, {
      label: 'Requests', icon: 'pi pi-fw pi-comments',
      command: (event) => {
        localStorage.setItem('nav', JSON.stringify(MenuType.Requests));
        this.router.navigateByUrl(REQUESTSROUTE);
      }
    }, {
      label: 'Payments', icon: 'pi pi-fw pi-wallet',
      command: (event) => {
        localStorage.setItem('nav', JSON.stringify(MenuType.Payments));
      }
    }]
  }

  public get isHomeOwners(): boolean {
    return Number(JSON.parse(localStorage.getItem('nav'))) === MenuType.Homeowners;
  }

  public get isOnboarding(): boolean {
    return Number(JSON.parse(localStorage.getItem('nav'))) === MenuType.Onboarding;
  }

  public get isRequests(): boolean {
    return Number(JSON.parse(localStorage.getItem('nav'))) === MenuType.Requests;
  }

  public get isPayments(): boolean {
    return Number(JSON.parse(localStorage.getItem('nav'))) === MenuType.Payments;
  }
}
