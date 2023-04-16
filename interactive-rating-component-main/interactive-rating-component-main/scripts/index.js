const btnEl = document.querySelector('.card__button')
const ratingPoints = document.querySelectorAll('.card__rating__points');
let selectedPoint
let point
ratingPoints.forEach(el => {
    el.addEventListener('click', () => {
        if (selectedPoint) {
            selectedPoint.classList.remove('selected')
        }
        selectedPoint = el;
        point = el.attributes.getNamedItem('data-point').value
        localStorage.setItem('point', point)
        el.classList.add('selected')
    })
})
btnEl?.addEventListener('click', () => {
    if (point) {
        window.location.pathname = 'pages/thanks.html'
    }
})