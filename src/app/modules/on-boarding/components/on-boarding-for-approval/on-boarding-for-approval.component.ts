import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'cma-on-boarding-for-approval',
  templateUrl: './on-boarding-for-approval.component.html',
  styleUrls: ['./on-boarding-for-approval.component.scss']
})
export class OnboardingForApprovalComponent implements OnInit {
  public svgPath: string = environment.svgPath;

  constructor(private storageSrv: StorageService, private router: Router) { }

  ngOnInit(): void { }

  public onDone(): void {
    this.router.navigateByUrl('/on-boarding/type');
    this.storageSrv.clear();
  }
}
