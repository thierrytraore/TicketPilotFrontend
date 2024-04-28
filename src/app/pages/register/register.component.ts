import { Component, inject, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from "@angular/common";
import { PersonModel } from "../../models/person.model";
import { PersonService } from "../../services/person.service";
import { Router } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { LocalStorageService } from "../../utilities/local-storage.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  currentYear: number = new Date().getFullYear();
  personService = inject(PersonService);
  router = inject(Router);
  localStorage = inject(LocalStorageService);

  registerForm = new FormGroup({
    lastName: new FormControl('Kouakou'),
    firstName: new FormControl('Marius'),
    email: new FormControl('marius.kouakou@exnihilo.com'),
    password: new FormControl('marius.kouakou@exnihilo.com'),
  });

  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) {
  }

  protected register() {
    this.personService.register(this.registerForm.value as PersonModel)
      .subscribe({
        next: (result) => {
          this.localStorage.setItem('loggedUser', JSON.stringify(result));
          this.router.navigateByUrl('/administration').then(r => r);
        },
        error: (e) => console.error(e)
      });
  }

  ngOnInit() {
    this.applyBodyClasses(true);
  }

  ngOnDestroy() {
    this.applyBodyClasses(false);
  }

  private applyBodyClasses(add: boolean) {
    const classes = ['py-5', 'bg-body-tertiary', 'align-items-center'];
    classes.forEach(cls => {
      if (add) {
        this.renderer.addClass(this.document.body, cls);
      } else {
        this.renderer.removeClass(this.document.body, cls);
      }
    });
  }
}
