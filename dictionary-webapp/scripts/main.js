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

  function setDarkMode() {
    document.body.classList.toggle("dark-mode");
  }
  function disableDarkMode() {
    document.body.classList.remove("dark-mode");
  }
});
