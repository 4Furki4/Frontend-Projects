document.addEventListener('DOMContentLoaded', () => {
    // window.addEventListener('load', () => {
    //     let name = prompt("May I learn your name ?")
    //     while(!name) {
    //         name = prompt("Please enter your name")
    //     }
    //     alert(`Welcome ${name}`)
    // })
    const checkbox : HTMLInputElement = document.querySelector('input[type="checkbox"]')!
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
    const carouselButtons = document.querySelectorAll('[data-carousel-button]')
    carouselButtons.forEach(button => {
        button.addEventListener('click', () => {
            if(button instanceof HTMLElement){
                const offset = button.dataset.carouselButton === 'next' ? 1 : -1
                const slides = button.closest('[data-carousel]')!.querySelector('[data-slides]')!
                const activeSlide = slides.querySelector('[data-active]')!
                if(slides instanceof HTMLElement && activeSlide instanceof HTMLElement){
                    let newIndex = [...slides.children].indexOf(activeSlide) + offset
                    if(newIndex < 0) newIndex = slides.children.length - 1
                    if(newIndex >= slides.children.length) newIndex = 0
                    let nextSlide = slides.children[newIndex]
                    if(nextSlide instanceof HTMLElement)
                    nextSlide.dataset.active = "true"
                    delete activeSlide.dataset.active
                }
            }
        })}
    )
    const menuIcon = document.querySelector('.nav__menu-icon')
    const menu = document.querySelector('.nav__pages')
    menuIcon?.addEventListener('click', () => {
        menu?.classList.toggle('nav__pages--dropdown')
    })
    window.addEventListener('resize', () => {
        if(window.innerWidth > 900) {
            menu?.classList.remove('nav__pages--dropdown')
        }
    })
    const messageForm = document.querySelector('.message__form')
    const submittedMessageContainer = document.querySelector('.message__list')
    if(messageForm instanceof HTMLFormElement){
        messageForm?.addEventListener('submit', (e) => {
            e.preventDefault()
            let message : string = e.target["message"].value
            if(!message) return
            else{
                message = message.trim()
                const messageListEl = document.createElement('li')
                messageListEl.innerText = message
                submittedMessageContainer?.appendChild(messageListEl)
                messageForm?.reset()
            }
        })
    }
})
