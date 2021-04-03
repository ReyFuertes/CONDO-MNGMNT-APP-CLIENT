import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'cma-on-boarding-page',
  templateUrl: './on-boarding-page.component.html',
  styleUrls: ['./on-boarding-page.component.scss']
})
export class OnboardingPageComponent implements OnInit {
  public hideStepper: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        const forApproval = e.urlAfterRedirects.includes('for-approval');

        if (forApproval) {
          this.hideStepper = true;
        } else this.hideStepper = false;
      });
  }
}
