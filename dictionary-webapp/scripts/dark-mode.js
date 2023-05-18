export const darkModeSwitch = document.querySelector(".switch");
export const darkModeSwitchCheck = document.querySelector(".switch input");
export function setDarkMode() {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", "enabled");
}
export function disableDarkMode() {
  document.body.classList.remove("dark-mode");
  localStorage.setItem("darkMode", "disabled");
}
