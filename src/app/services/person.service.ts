import { Injectable } from '@angular/core';
import { BaseService } from "./base.service";
import { PersonModel } from "../models/person.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PersonService extends BaseService<PersonModel> {

  constructor() {
    super('persons');
  }

  login(payload: PersonModel): Observable<PersonModel> {
    const url = `${this.baseUrl}/login`;
    return this.http.post<PersonModel>(url, payload);
  }

  register(payload: PersonModel): Observable<PersonModel> {
    const url = `${this.baseUrl}/register`;
    return this.http.post<PersonModel>(url, payload);
  }

}
