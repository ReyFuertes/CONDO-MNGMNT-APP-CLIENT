import { Component, OnInit } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';

@Component({
  selector: 'cma-cma-top-nav',
  templateUrl: './cma-top-nav.component.html',
  styleUrls: ['./cma-top-nav.component.scss']
})
export class CMATopNavComponent implements OnInit {
  public items: MegaMenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Onboarding', icon: 'pi pi-fw pi-home',
      },
      {
        label: 'Requests', icon: 'pi pi-fw pi-comments',
      },
      {
        label: 'Payments', icon: 'pi pi-fw pi-wallet',
      }
    ]
  }
}
