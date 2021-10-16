import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { StorageService } from 'src/app/services/storage.service';
import { IOnboadingResponseDto, IOnboarding } from '../on-boarding/on-boarding.model';

@Injectable({  providedIn: 'root'})
export class DashboardOnboardingService extends BaseService<IOnboarding | IOnboadingResponseDto> {
  constructor(http: HttpClient, storageSrv: StorageService) {
    super(http, 'onboarding', storageSrv);
  }
}

@Injectable({  providedIn: 'root'})
export class DashboardHomeownersService extends BaseService<any> {
  constructor(http: HttpClient, storageSrv: StorageService) {
    super(http, 'homeowner', storageSrv);
  }
}
