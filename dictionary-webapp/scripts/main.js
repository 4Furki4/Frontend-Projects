import * as darkmode from "./dark-mode.js";

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
