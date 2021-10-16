import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'cma-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public actionText: any[] = [{
    label: 'Approve',
    message: 'Are you sure to Approve this record?'
  }, {
    label: 'Archive',
    message: 'Are you sure to Archive this record?'
  }, {
    label: 'Delete',
    message: 'Are you sure to Delete this record?'
  }];

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void { }
}
