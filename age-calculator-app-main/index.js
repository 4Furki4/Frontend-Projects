const formEl = document.querySelector('.form');
const dayInputEl = document.querySelector('#day');
const monthInputEl = document.querySelector('#month');
const yearInputEl = document.querySelector('#year');
const resultYear = document.querySelector('#elapsedYears');
const resultMonth = document.querySelector('#elapsedMonths');
const resultDay = document.querySelector('#elapsedDays');
const dayValidationEl = document.querySelector('.dayValidation');
const monthValidationEl = document.querySelector('.monthValidation');
const yearValidationEl = document.querySelector('.yearValidation');
const labelDay = document.querySelector('[for="day"]');
const labelMonth = document.querySelector('[for="month"]');
const labelYear = document.querySelector('[for="year"]');
setValidation(dayInputEl, 1, 31, labelDay, dayValidationEl);
setValidation(monthInputEl, 1, 12, labelMonth, monthValidationEl);
setValidation(yearInputEl, 0, 2022,  labelYear, yearValidationEl);
formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const day = dayInputEl.value;
    const month = monthInputEl.value;
    const year = yearInputEl.value;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    let elapsedYears = currentYear - year;
    let elapsedMonths = currentMonth - month;
    let elapsedDays = currentDay - day;

    if(!day) {
        setValidationError(dayValidationEl, 'The field is required');
        dayValidationEl.classList.add('invalid-text');
        dayInputEl.classList.add('invalid-input');
        labelDay.classList.add('invalid-text');
    }
    else setValidationError(dayValidationEl, '')
    if(!month) {
        setValidationError(monthValidationEl, 'The field is required')
        monthValidationEl.classList.add('invalid-text');
        monthInputEl.classList.add('invalid-input');
        labelMonth.classList.add('invalid-text');
    }
    else setValidationError(monthValidationEl, '')
    if(!year) {
        setValidationError(yearValidationEl, 'The field is required')
        yearValidationEl.classList.add('invalid-text');
        yearInputEl.classList.add('invalid-input');
        labelYear.classList.add('invalid-text');
    }
    else setValidationError(yearValidationEl, '')
    if(!day || !month || !year) return


    let message = validateDate(day, month, year) ? undefined : 'Must be a valid date';
    if(message){
        setValidationError(dayValidationEl, message,);
        return
    }else{
        setValidationError(dayValidationEl, '');
    }
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
function setValidation(inputEl, min, max, label, span){
    inputEl.addEventListener('input', e => {
        e.target.value = e.target.value.replace(/[^0-9][^s]/g, '');
        if(e.target.value < min) {
            e.target.value = ''
        }
        if(e.target.value > max) {
            e.target.value = max
        }
        if(!isNaN(e.target.value)) {
            inputEl.classList.remove('invalid-input');
            label.classList.remove('invalid-text');
            span.classList.remove('invalid-text');
            setValidationError(span, '')
        }
    })
}
function validateDate(day, month, year) {
    month = parseInt(month)
    day = parseInt(day)
    let listOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if(month == 1 || month > 2){
        if(day > listOfDays[month - 1]){
            return false;
        }
        else{
            return true;
        }
    }
    else{
        let isYearElapsed = false;
        if(year % 4 == 0 && year % 100 != 0 || year % 400 == 0){
            isYearElapsed = true;
        }
        if(isYearElapsed && day > 29){
            return false;
        }
        if(!isYearElapsed && day > 28){
            return false;
        }
        return true;
    }
}
function setValidationError(spanEl, message) {
    spanEl.textContent = message;
    spanEl.classList.add('invalid-text');
}
