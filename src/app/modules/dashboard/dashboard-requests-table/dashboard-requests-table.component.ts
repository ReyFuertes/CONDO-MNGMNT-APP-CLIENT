import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { environment } from 'src/environments/environment';
import { ServiceType, ServiceStatusType } from 'src/app/models/onboarding.model';

@Component({
  selector: 'cma-dashboard-requests-table',
  templateUrl: './dashboard-requests-table.component.html',
  styleUrls: ['./dashboard-requests-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DashboardRequestTableComponent implements OnInit {
  public imgPath: string = environment.imgPath;
  public dataSource: any = [
    {
      image: 'sample-profile-pic.png',
      owner: 'Rey Fuertes',
      unit_no: '9622',
      service_type: 'Repair',
      service_person: 'Jan P.',
      description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
          atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`,
      date: '06/20/2021 9:00 AM',
      status: 'Pending'
    },
    {
      image: 'sample-profile-pic.png',
      owner: 'Rey Fuertes',
      unit_no: '9622',
      service_type: 'Delivery',
      service_person: 'Jan P.',
      description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
          atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`,
      date: '06/20/2021 9:00 AM',
      status: 'Approved'
    },
    {
      image: 'sample-profile-pic.png',
      owner: 'Rey Fuertes',
      unit_no: '9622',
      service_type: 'Delivery',
      service_person: 'Jan P.',
      description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
          atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`,
      date: '06/20/2021 9:00 AM',
      status: 'Pending'
    },
    {
      image: 'sample-profile-pic.png',
      owner: 'Rey Fuertes',
      unit_no: '9622',
      service_type: 'Maintenance',
      service_person: 'Jan P.',
      description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
          atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`,
      date: '06/20/2021 9:00 AM',
      status: 'Declined'
    },
    {
      image: 'sample-profile-pic.png',
      owner: 'Rey Fuertes',
      unit_no: '9622',
      service_type: 'Delivery',
      service_person: 'Jan P.',
      description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
          atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`,
      date: '06/20/2021 9:00 AM',
      status: 'Pending'
    },
    {
      image: 'sample-profile-pic.png',
      owner: 'Rey Fuertes',
      unit_no: '9622',
      service_type: 'Maintenance',
      service_person: 'Jan P.',
      description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
          atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`,
      date: '06/20/2021 9:00 AM',
      status: 'Pending'
    },
    {
      image: 'sample-profile-pic.png',
      owner: 'Rey Fuertes',
      unit_no: '9622',
      service_type: 'Repair',
      service_person: 'Jan P.',
      description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
          atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`,
      date: '06/20/2021 9:00 AM',
      status: 'Approved'
    },
    {
      image: 'sample-profile-pic.png',
      owner: 'Rey Fuertes',
      unit_no: '9622',
      service_type: 'Other',
      service_person: 'Jan P.',
      description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
          atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`,
      date: '06/20/2021 9:00 AM',
      status: 'Approved'
    },
    {
      image: 'sample-profile-pic.png',
      owner: 'Rey Fuertes',
      unit_no: '9622',
      service_type: 'Delivery',
      service_person: 'Jan P.',
      description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
          atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`,
      date: '06/20/2021 9:00 AM',
      status: 'Pending'
    }
  ];
  public columnsToDisplay = ['image', 'owner', 'unit_no', 'service_type', 'service_person', 'description', 'date', 'status'];
  public expandedElement: any;
  public serviceType = ServiceType;
  public serviceStatusType = ServiceStatusType;

  constructor() { }

  ngOnInit(): void { }

  public onExpand(element: any): void {
    this.expandedElement = this.expandedElement === element ? null : element
  }

  public isSrvStatusApproved(srv: any): boolean {
    return srv === this.serviceStatusType.Approved;
  }

  public isSrvStatusPending(srv: any): boolean {
    return srv === this.serviceStatusType.Pending;
  }

  public isSrvStatusDeclined(srv: any): boolean {
    return srv === this.serviceStatusType.Declined;
  }

  public isSrvTypeOther(srv: any): any {
    return srv === this.serviceType.Other;
  }

  public isSrvTypeMaintenance(srv: any): boolean {
    return srv === this.serviceType.Maintenance;
  }

  public isSrvTypeRepair(srv: any): boolean {
    return srv === this.serviceType.Repair;
  }

  public isSrvTypeDelivery(srv: any): boolean {
    return srv === this.serviceType.Delivery;
  }

  public fmtCol(col: any): any {
    return col.replace(/_/g, ' ');
  }
}
