let persons = document.querySelectorAll('.counter-block-input')[0],
restDays = document.querySelectorAll('.counter-block-input')[1],
place = document.getElementById('select'),
totalValue = document.getElementById('total'),
personsSum = 0,
daysSum = 0,
total = 0;

totalValue.innerHTML = 0;

function updateTotal() {
    total = (daysSum + personsSum) * 4000;

    if (restDays.value == '' || persons.value == '') {
        totalValue.innerHTML = 0;
    } else {
        totalValue.innerHTML = total;
    }
    checkTotal(total);
}

persons.addEventListener('input', function() {
    personsSum = +this.value;
    updateTotal();
});

restDays.addEventListener('input', function() {
    daysSum = +this.value;
    updateTotal();
});

place.addEventListener('change', function() {
    if (restDays.value == '' || persons.value == '') {
        totalValue.innerHTML = 0;
    } else {
        let a = total;
        totalValue.innerHTML = a * this.options[this.selectedIndex].value;
    }
    checkTotal(total);
});

function checkTotal(n) {
    if (restDays.value == '' || persons.value == '') {
        totalValue.innerHTML = 0;
    }
}