import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { Directive } from '@angular/core';
import { StorageService } from './storage.service';
import { shareReplay } from 'rxjs/operators';

@Directive()
export abstract class BaseService<T> {
  protected baseUrl: string;

  constructor(
    public http: HttpClient,
    private entity: string = '',
    private storageSrv: StorageService) {
    this.baseUrl = environment.apiUrl;
  }

  private getToken(): string {
    const t = this.storageSrv.get('t');
    return t ? JSON.parse(t)?.accessToken : null;
  }

  protected commonHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${this.getToken()}`,
    });
  }

  protected binaryHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
    });
  }

  private removeNullProps(obj: any): any {
    let ret: any;
    if (!Array.isArray(obj)) {
      ret = _.pickBy(obj, _.identity);
    } else {
      ret = Object.values(_.pickBy(obj, o => o !== null && o !== undefined));
    }
    return ret;
  }

  public post(object?: T | T[], param?: string): Observable<T | T[]> {
    return this.http.post<T>(`${this.baseUrl}${this.entity}${this.fmtWithRoute(param)}`,
      this.removeNullProps(object),
      { headers: this.commonHeaders() });
  }

  public delete(id?: string, param?: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}${this.entity}/${id}${this.fmtParam(param)}`,
      { headers: this.commonHeaders() });
  }

  public patch(object: T | any, addtnlParam?: string): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}${this.entity}${this.fmtParam(addtnlParam)}`,
      this.removeNullProps(object),
      { headers: this.commonHeaders() }
    );
  }

  private fmtWithRoute(param?: string): string {
    return `${param ? '/' + param : ''}`
  }

  private fmtParam(param?: string): string {
    return param ? `?${param}` : ''
  }

  public getAllWithRoute(param?: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}${this.entity}${this.fmtWithRoute(param)}`,
      { headers: this.commonHeaders() }).pipe(shareReplay(1));
  }

  public getAll(param?: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrl}${this.entity}${this.fmtParam(param)}`,
      { headers: this.commonHeaders() }).pipe(shareReplay(1));
  }

  public getById(id: string, addtnlParam?: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${this.entity}/${id}${this.fmtParam(addtnlParam)}`, { headers: this.commonHeaders() }).pipe(shareReplay(1));
  }

  public getBinaryById(id: string, addtnlParam?: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${this.entity}/${id}${this.fmtParam(addtnlParam)}`,
      { headers: this.binaryHeaders() });
  }

  public upload(object?: any, addtnlParam?: string): Observable<T> {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
      Accept: "application/json"
    });
    headers.set('Content-Type', 'multipart/form-data');
    return this.http.post<T>(`${this.baseUrl}${this.entity}${this.fmtParam(addtnlParam)}`, object, { headers: headers });
  }
}
