import * as darkmode from "./dark-mode.js";
import { searchForm } from "./word-request.js";
import { navDropdown, navDropdownList } from "./font-switcher.js";
document.addEventListener("DOMContentLoaded", () => {
  darkmode.darkModeSwitch.addEventListener("click", () => {
    if (darkmode.darkModeSwitchCheck.checked) {
      darkmode.setDarkMode();
    } else {
      darkmode.disableDarkMode();
    }
  });
  if (localStorage.getItem("darkMode") === "enabled") {
    darkmode.setDarkMode();
    darkmode.darkModeSwitchCheck.checked = true;
  }
});

document.addEventListener("click", (e) => {
  const isDropdown = e.target.matches("[data-dropdown-selected]");
  if (!isDropdown && e.target.closest("[data-dropdown]") != null) {
    return;
  }
  if (isDropdown) navDropdownList.classList.toggle("active");
  if (!isDropdown) navDropdownList.classList.remove("active");
});
