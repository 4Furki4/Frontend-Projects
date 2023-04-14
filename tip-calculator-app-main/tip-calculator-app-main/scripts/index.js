document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input')
    const billEl = document.querySelector('#bill');
    const tipAmountEl = document.querySelector('#tip-amount')
    const totalPerPersonEl = document.querySelector('#total-per-person')
    const tipPredefinedOptions = document.querySelectorAll('.calculator__tip-select__options');
    const tipFivePercentage = tipPredefinedOptions[0]
    const tipTenPercentage = tipPredefinedOptions[1]
    const tipFiveteenPercentage = tipPredefinedOptions[2]
    const tipTwentyfivePercentage = tipPredefinedOptions[3]
    const tipFiftyPercentage = tipPredefinedOptions[4]
    const tipCustomPercentageEl = document.querySelector('.calculator__tip-select__options--custom');
    const numberOfPeopleEl = document.querySelector('.calculator__people-count__input')
    const numberOfPeopleInpuValidationEl = document.querySelector('.calculator__people-count__validation')
    const resetButtonEl = document.querySelector('.calculator__output__reset-button')
    let tipAmount = 0;
    let billValue = 0;
    let totalBill = 0;
    let tipPercentage = 0;
    let numberOfPeople = 0;
    let totalPerPerson = 0;
    const inputTextAvoid = (inputEl) => {
        let value = parseFloat(inputEl.target.value)
        if (!value) {
            inputEl.target.value = 0
        }
        else {
            inputEl.target.value = value
        }
    }
    resetButtonEl.addEventListener('click', reset);
    function calculateTipAmount(bill, percentage) {
        tipAmount = parseFloat(bill * (percentage / 100))
    }
    function calculateTotalPerPerson(totalBill, personCount) {
        if (totalBill <= 0 || personCount <= 0) {
            totalPerPerson = 0
            return
        }
        totalPerPerson = parseFloat(totalBill / personCount)
    }
    function calculateTotalBill(bill, tip) {
        totalBill = parseFloat(bill + tip)
    }
    function setTotalPerPersonText(totalPerPerson) {
        totalPerPersonEl.innerText = `$${parseFloat(totalPerPerson).toFixed(2)}`
    }
    function setTipAmountText(tipAmount) {
        tipAmountEl.innerText = `$${parseFloat(tipAmount).toFixed(2)}`
    }
    function setNumberOfPeople(numberOfPeople) {
        totalPerPerson = numberOfPeople
    }
    function setCalculatedValues() {
        setNumberOfPeople(totalPerPerson)
        calculateTipAmount(billValue, tipPercentage)
        calculateTotalBill(billValue, tipAmount)
        calculateTotalPerPerson(totalBill, numberOfPeople)
        if ((totalPerPerson <= 0 || tipAmount <= 0)) {
            setTotalPerPersonText(0)
            setTipAmountText(0)
            return
        }
        setTotalPerPersonText(totalPerPerson)
        setTipAmountText(tipAmount)
    }
    function reset() {
        resetTipButtonStyle()
        tipAmount = 0;
        billValue = 0;
        totalBill = 0;
        tipPercentage = 0;
        numberOfPeople = 0;
        totalPerPerson = 0;
        billEl.value = 0
        numberOfPeopleEl.value = 0
        tipCustomPercentageEl.value = 0
        setValidationOfPeopleCount()
        setCalculatedValues()
    }
    function resetTipButtonStyle() {
        let selectedBtn = document.querySelector(`button[data-tip-value="${tipPercentage}"]`)
        selectedBtn?.classList.remove('selected-btn')
    }
    billEl.addEventListener('input', inputEl => {
        inputTextAvoid(inputEl)
        billValue = parseFloat(inputEl.target.value)
        setCalculatedValues()
    })
    numberOfPeopleEl.addEventListener('blur', inputEl => {
        inputTextAvoid(inputEl)
        numberOfPeople = parseInt(inputEl.target.value)
        setValidationOfPeopleCount()
        setCalculatedValues()
    })
    function setValidationOfPeopleCount() {
        if (!numberOfPeople) {
            numberOfPeopleInpuValidationEl.style.display = 'block'
        }
        else {
            numberOfPeopleInpuValidationEl.style.display = 'none'
        }
    }
    numberOfPeopleEl.addEventListener('input', inputEl => {
        inputTextAvoid(inputEl)
        numberOfPeople = parseInt(inputEl.target.value)
        setValidationOfPeopleCount()
        setCalculatedValues()
    })
    tipPredefinedOptions.forEach(el => {
        el.addEventListener('click', () => {
            resetTipButtonStyle()
            tipPercentage = parseFloat(el.attributes.getNamedItem('data-tip-value').value)
            el.classList.add('selected-btn')
            tipCustomPercentageEl.value = ''
            setCalculatedValues()
        })
    })
    tipCustomPercentageEl.addEventListener('input', inputEl => {
        resetTipButtonStyle()
        tipPercentage = parseInt(inputEl.target.value)
        setCalculatedValues()
    })
})