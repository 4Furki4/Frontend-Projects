
document.addEventListener('DOMContentLoaded', () => {
    const resultMessageEl = document.querySelector('.card__header__result-message')
    let point = localStorage.getItem('point')
    resultMessageEl.textContent = `You Selected ${point} out of 5`
})



