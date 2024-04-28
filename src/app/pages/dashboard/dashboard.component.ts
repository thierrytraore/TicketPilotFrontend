import { Component, inject, OnInit } from '@angular/core';
import { NgIf } from "@angular/common";
import { TicketService } from "../../services/ticket.service";
import { LocalStorageService } from "../../utilities/local-storage.service";
import { PersonModel } from "../../models/person.model";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  ticketService = inject(TicketService);
  localStorage = inject(LocalStorageService);

  loggedUser: PersonModel = JSON.parse(<string>this.localStorage.getItem('loggedUser')) as PersonModel;
  statistics: any;

  ngOnInit(): void {
    this.fetchStatistics();
    console.log(this.loggedUser)
  }

  private fetchStatistics() {
    this.ticketService.statistics().subscribe({
      next: (result) => this.statistics = [
        [result.NEW, "NOUVEAUX<br>TICKETS", "NOUVEAU<br>TICKET"],
        [result.RESOLVED, "TICKETS<br>RÉSOLUS", "TICKET<br>RÉSOLU"],
        [result.ASSIGNED, "TICKETS<br>AFFECTÉS", "TICKET<br>AFFECTÉ"],
        [result.PENDING, "TICKETS<br>EN ATTENTE", "TICKET<br>EN ATTENTE"],
        [result.REJECTED, "TICKETS<br>REJETÉS", "TICKET<br>REJETÉ"]
      ],
      error: (e) => console.error(e)
    });
  }
}
