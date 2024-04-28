import { Component, inject, OnInit } from '@angular/core';
import { TicketService } from "../../services/ticket.service";
import { TicketModel } from "../../models/ticket.model";

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss'
})
export class TicketComponent implements OnInit {

  ticketRows = [] as TicketModel[];
  ticketService = inject(TicketService);

  ngOnInit(): void {
    this.fetchTicket();
  }

  private fetchTicket() {
    this.ticketService.getAll().subscribe({
      next: (result) => {
        this.ticketRows = result;
        console.log(result);
      },
      error: (e) => console.error(e)
    });
  }

}
