import { Component, OnInit } from '@angular/core';
import { OnBoardingType } from 'src/app/models/onboarding.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'cma-on-boarding-type',
  templateUrl: './on-boarding-type.component.html',
  styleUrls: ['./on-boarding-type.component.scss']
})
export class OnboardingTypeComponent implements OnInit {
  public svgPath: string = environment.svgPath;
  public selectedTypeIsIndividual: any;
  public selectedTypeICorporate: any;

  constructor() { }

  ngOnInit(): void { }

  public onSelect(chk: any): void {
    chk.checked = !chk.checked;

    if (chk.value == OnBoardingType.individual) {
      this.selectedTypeIsIndividual = !this.selectedTypeIsIndividual;
      this.selectedTypeICorporate = false;
    } else if (chk.value == OnBoardingType.corporate) {
      this.selectedTypeICorporate = !this.selectedTypeICorporate;
      this.selectedTypeIsIndividual = false;
    }
  }

  public get isDisabled(): boolean {
    return !this.selectedTypeIsIndividual && !this.selectedTypeICorporate;
  }
}
