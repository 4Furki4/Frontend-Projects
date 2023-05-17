document.addEventListener("DOMContentLoaded", () => {
  const darkModeSwitch = document.querySelector(".switch");
  const darkModeSwitchCheck = document.querySelector(".switch input");
  darkModeSwitch.addEventListener("click", () => {
    if (darkModeSwitchCheck.checked) {
      setDarkMode();
    } else {
      disableDarkMode();
    }
  });
  if (localStorage.getItem("darkMode") === "enabled") {
    setDarkMode();
    darkModeSwitchCheck.checked = true;
  }
  function setDarkMode() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", "enabled");
  }
  function disableDarkMode() {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("darkMode", "disabled");
  }
});
