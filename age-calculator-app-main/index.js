const formEl = document.querySelector('.form');
const dayInputEl = document.querySelector('#day');
const monthInputEl = document.querySelector('#month');
const yearInputEl = document.querySelector('#year');
const resultYear = document.querySelector('#elapsedYears');
const resultMonth = document.querySelector('#elapsedMonths');
const resultDay = document.querySelector('#elapsedDays');
formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const day = dayInputEl.value;
    const month = monthInputEl.value;
    const year = yearInputEl.value;
    const currentDate = new Date();
    // debugger
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    let elapsedYears = currentYear - year;
    let elapsedMonths = currentMonth - month;
    let elapsedDays = currentDay - day;
    if(elapsedDays < 0) {
        elapsedMonths--;
        elapsedDays += 30;
    }
    if(elapsedMonths < 0) {
        elapsedYears--;
        elapsedMonths += 12;
    }
    resultYear.textContent = elapsedYears;
    resultMonth.textContent = elapsedMonths;
    resultDay.textContent = elapsedDays;

})
