import { Injectable } from '@angular/core';
import { HttpResponse, HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { RooState } from '../store/root.reducer';
import { clearLoadingAction, setLoadingAction } from '../store/action/app.action';
import { MessageService } from 'primeng/api';
import { APPTIMING } from '../shared/constants/generic';

@Injectable({ providedIn: 'root' })
export class UILoaderService {
  public isLoading = new Subject();
}

@Injectable({ providedIn: 'root' })
export class LoaderInterceptorService implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];
  constructor(private msgSrv: MessageService, private store: Store<RooState>) { }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }

    setTimeout(() => {
      this.store.dispatch(clearLoadingAction());
    }, APPTIMING);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requests.push(req);
    this.store.dispatch(setLoadingAction());

    return Observable.create(observer => {
      const subscription = next.handle(req)
        .subscribe(
          event => {
            if (event instanceof HttpResponse) {
              observer.next(event);
            }
          }, err => {
            this.removeRequest(req);
            observer.error(err);
          }, () => {
            observer.complete();
          });
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }
}
