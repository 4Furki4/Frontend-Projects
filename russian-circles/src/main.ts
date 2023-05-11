document.addEventListener('DOMContentLoaded', () => {
    const checkbox = document.querySelector('input[type="checkbox"]')!
    let darkmode = localStorage.getItem("darkMode")
    if(darkmode === "enabled"){ // check  if dark mode is enabled when page loaded
        setDarkMode()
        checkbox.checked = true;
    }
    checkbox.addEventListener("change", () => {
        console.log(checkbox.checked);
        darkmode = localStorage.getItem("darkMode")
        if(darkmode !== "enabled")
            setDarkMode()
        else
            setLightMode()
    })
    function setDarkMode() {
        document.body.classList.add('dark-mode')
        localStorage.setItem("darkMode", "enabled")
    }
    function setLightMode() {
        document.body.classList.remove('dark-mode')
        localStorage.setItem("darkMode", null)
    }
})