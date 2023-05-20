import * as darkmode from "./dark-mode.js";
import * as request from "./word-request.js";
import { navDropdown, navDropdownList } from "./font-switcher.js";
import { handleLocation } from "./routing.js";
document.addEventListener("DOMContentLoaded", async () => {
  const currentLocation = window.location.pathname;
  const word = handleLocation(currentLocation);
  if (word) {
    await request.handleWordRequest(word);
  }

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
window.addEventListener("popstate", async (event) => {
  const currentLocation = event.currentTarget.location.pathname;
  const word = handleLocation(currentLocation);
  if (word) {
    await request.handleWordRequest(word);
  } else {
    request.clearWordDefinitions();
  }
});
