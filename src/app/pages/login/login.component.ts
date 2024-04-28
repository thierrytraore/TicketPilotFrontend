import { Component, inject, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DOCUMENT } from "@angular/common";
import { PersonService } from "../../services/person.service";
import { PersonModel } from "../../models/person.model";
import { LocalStorageService } from "../../utilities/local-storage.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule, CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {

  currentYear: number = new Date().getFullYear();
  router = inject(Router);
  personService = inject(PersonService);
  localStorage = inject(LocalStorageService);

  loginForm = new FormGroup({
    email: new FormControl('thierry.traore@exnihilo.com'),
    password: new FormControl('thierry.traore@exnihilo.com'),
  });

  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) {
  }

  ngOnInit() {
    this.applyBodyClasses(true);
  }

  ngOnDestroy() {
    this.applyBodyClasses(false);
  }

  protected login() {
    this.personService.login(this.loginForm.value as PersonModel)
      .subscribe({
        next: (result) => {
          console.log(result);
          this.localStorage.setItem('loggedUser', JSON.stringify(result));
          this.router.navigateByUrl('/administration').then(r => r);
        },
        error: (e) => console.error(e)
      });
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
