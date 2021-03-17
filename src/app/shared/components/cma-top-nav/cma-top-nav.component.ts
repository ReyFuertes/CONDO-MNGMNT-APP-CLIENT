import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { MenuType } from 'src/app/models/onboarding.model';
import { environment } from 'src/environments/environment';
import { DASHBOARDROUTE, DASHBOARDONBOARDINGLISTROUTE, HOMEOWNERSLISTROUTE, REQUESTSLISTROUTE, DOCUMENTSLISTROUTE, INVOICESLISTROUTE } from '../../constants/routes';
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
      id: JSON.stringify(MenuType.Dashboard),
      label: 'Dashboard', icon: 'pi pi-fw pi-home',
      command: (event) => {
        localStorage.setItem('nav', JSON.stringify(MenuType.Dashboard));
        this.router.navigateByUrl(DASHBOARDROUTE);
      }
    }, {
      id: JSON.stringify(MenuType.Onboarding),
      label: 'Onboarding', icon: 'pi pi-fw pi-home',
      command: (event) => {
        localStorage.setItem('nav', JSON.stringify(MenuType.Onboarding));
        this.router.navigateByUrl(DASHBOARDONBOARDINGLISTROUTE);
      }
    }, {
      id: JSON.stringify(MenuType.Homeowners),
      label: 'Homeowners', icon: 'pi pi-fw pi-users',
      command: (event) => {
        localStorage.setItem('nav', JSON.stringify(MenuType.Homeowners));
        this.router.navigateByUrl(HOMEOWNERSLISTROUTE);
      }
    }, {
      id: JSON.stringify(MenuType.Requests),
      label: 'Requests', icon: 'pi pi-fw pi-comments',
      command: (event) => {
        localStorage.setItem('nav', JSON.stringify(MenuType.Requests));
        this.router.navigateByUrl(REQUESTSLISTROUTE);
      }
    }, {
      id: JSON.stringify(MenuType.Invoices),
      label: 'Invoices', icon: 'pi pi-fw pi-book',
      command: (event) => {
        localStorage.setItem('nav', JSON.stringify(MenuType.Invoices));
        this.router.navigateByUrl(INVOICESLISTROUTE);
      }
    }, {
      id: JSON.stringify(MenuType.Documents),
      label: 'Documents', icon: 'pi pi-fw pi-briefcase',
      command: (event) => {
        localStorage.setItem('nav', JSON.stringify(MenuType.Documents));
        this.router.navigateByUrl(DOCUMENTSLISTROUTE);
      }
    }]
  }

  public isActive(id: string): boolean {
    return Number(JSON.parse(localStorage.getItem('nav'))) === Number(id);
  }
}
