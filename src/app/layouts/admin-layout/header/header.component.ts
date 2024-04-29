import { Component, inject } from '@angular/core';
import { LocalStorageService } from "../../../utilities/local-storage.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  localStorage = inject(LocalStorageService);

  logout() {
    this.localStorage.removeItem('loggedUser');
  }

}
