import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
  constructor() { }

  ngOnInit(): void {
    this.checkDarkMode()
  }
  setDarkmode() {
    const darkModeSwitchCheck: HTMLInputElement = document.querySelector('input[type="checkbox"]')!
    if (darkModeSwitchCheck.checked) {
      this.enableDarkMode();
    } else {
      this.disableDarkMode();
    }
  }
  enableDarkMode() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", "enabled");
  }
  disableDarkMode() {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("darkMode", "disabled");
  }
  checkDarkMode() {
    const darkModeSwitchCheck: HTMLInputElement = document.querySelector('input[type="checkbox"]')!
    if (localStorage.getItem("darkMode") === "enabled") {
      this.enableDarkMode();
      darkModeSwitchCheck.checked = true;
    }
  }

}
