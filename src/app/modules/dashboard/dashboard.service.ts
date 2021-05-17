import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { StorageService } from 'src/app/services/storage.service';
import { IOnboarding } from '../on-boarding/on-boarding.model';

@Injectable({  providedIn: 'root'})
export class DashboardOnboardingService extends BaseService<IOnboarding> {
  constructor(http: HttpClient, storageSrv: StorageService) {
    super(http, 'onboarding', storageSrv);
  }
}
