import { Injectable } from '@angular/core';
import { BaseService } from "./base.service";
import { TicketModel } from "../models/ticket.model";

@Injectable({
  providedIn: 'root'
})
export class TicketService extends BaseService<TicketModel> {
  constructor() {
    super('tickets');
  }

  statistics() {
    const url = `${this.baseUrl}/statistics`;
    return this.http.get<any>(url);
  }

}
