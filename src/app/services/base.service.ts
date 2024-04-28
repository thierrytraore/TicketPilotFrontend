import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "../../environments/environment";
import { inject } from "@angular/core";

export abstract class BaseService<T> {

  protected readonly baseUrl;
  protected readonly http = inject(HttpClient);

  protected constructor(protected service: string) {
    this.baseUrl = `${environment.baseUrl}/${this.service}`;
  }

  public getAll(): Observable<T[]> {
    const url = `${this.baseUrl}/getAll`;
    return this.http.get<T[]>(url);
  }

  public getById(id: string): Observable<T> {
    const url = `${this.baseUrl}/getById/${id}`;
    return this.http.get<T>(url);
  }

  public create(data: T): Observable<T> {
    const url = `${this.baseUrl}/create`;
    return this.http.post<T>(url, data);
  }

  public update(id: string, data: T): Observable<T> {
    const url = `${this.baseUrl}/update/${id}`;
    return this.http.put<T>(url, data);
  }

  public delete(id: string): Observable<void> {
    const url = `${this.baseUrl}/delete/${id}`;
    return this.http.delete<void>(url);
  }

}
