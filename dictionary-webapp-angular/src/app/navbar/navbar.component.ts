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
    const selectedFontSpan = document.querySelector("#selected__font")!
    const navDropdownListItems = document.querySelectorAll(
      ".nav__dropdown__list__item"
    )!;
    navDropdownListItems.forEach((listItem) => {
      listItem.addEventListener("click", () => {
        if (listItem.textContent === "Mono") {
          this.setSelectedFontFamily("Inconsolata");
          selectedFontSpan.textContent = "Mono";
        } else if (listItem.textContent === "Sans Serif") {
          this.setSelectedFontFamily("Inter");
          selectedFontSpan.textContent = "Sans Serif";
        } else {
          this.setSelectedFontFamily("Lora");
          selectedFontSpan.textContent = "Serif";
        }
      });
    })
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
  setSelectedFontFamily(fontFamily: string) {
    document.documentElement.style.setProperty("--font-family", fontFamily);
  }
}