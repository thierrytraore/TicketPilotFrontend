import { Component, inject, OnInit } from '@angular/core';
import { TicketService } from "../../services/ticket.service";
import { TicketModel } from "../../models/ticket.model";
import { CommonModule, UpperCasePipe } from "@angular/common";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TagService } from "../../services/tag.service";
import { TagModel } from "../../models/tag.model";
import { IDropdownSettings, NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { LocalStorageService } from "../../utilities/local-storage.service";
import { PersonModel } from "../../models/person.model";

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [
    UpperCasePipe, ReactiveFormsModule, CommonModule, NgMultiSelectDropDownModule, FormsModule,
  ],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss'
})
export class TicketComponent implements OnInit {

  ticketService = inject(TicketService);
  tagService = inject(TagService);
  localStorageService = inject(LocalStorageService);

  ticketRows = [] as TicketModel[];
  tagRows = [] as TagModel[];
  currentTicket: TicketModel = {} as TicketModel;

  createTicketForm = new FormGroup({
    label: new FormControl(''),
    description: new FormControl(''),
    status: new FormControl('')
  });

  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    itemsShowLimit: 5,
    allowSearchFilter: true,
    idField: 'id',
    textField: 'label',
  };
  selectedTags = [] as TagModel;

  ngOnInit(): void {
    this.fetchTicket();
    this.tagService.getAll().subscribe({
      next: (result) => {
        this.tagRows = result;
      },
      error: (e) => console.error(e)
    });
  }

  showModal(index: number | null) {
    if (index !== null) {
      this.currentTicket = this.ticketRows[index];
    }
  }

  closeModal() {
    this.currentTicket = {} as TicketModel;
  }

  deleteTicket() {
    const id = this.currentTicket.id as string;
    this.ticketService.delete(id).subscribe({
      next: (result) => {
        console.log('suppression effectuée avec succès');
        this.fetchTicket();
      },
      error: (e) => console.error(e)
    })
  }

  createTicket() {
    const person = JSON.parse(<string>this.localStorageService.getItem('loggedUser')) as PersonModel;
    const ticket = {
      ...this.createTicketForm,
      openedById: person.id,
      closedById: person.id,
      tags: this.selectedTags as TagModel[]
    } as TicketModel
    this.ticketService.create(ticket).subscribe({
      next: (result) => {
        console.log('creation effectuée avec succès');
        this.fetchTicket();
      },
      error: (e) => console.error(e)
    })
  }

  private fetchTicket() {
    this.ticketService.getAll().subscribe({
      next: (result) => {
        this.ticketRows = result;
      },
      error: (e) => console.error(e)
    });
  }
}
