import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { StorageService } from 'src/app/services/storage.service';
import { IOnboardingPersonal } from './on-boarding.model';

@Injectable({  providedIn: 'root'})
export class OnboardingService extends BaseService<IOnboardingPersonal> {
  constructor(http: HttpClient) {
    super(http, 'onboarding');
  }
}
