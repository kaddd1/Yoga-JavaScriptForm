/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/parts/calc.js":
/*!**************************!*\
  !*** ./js/parts/calc.js ***!
  \**************************/
/***/ (() => {

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

/***/ }),

/***/ "./js/parts/form.js":
/*!**************************!*\
  !*** ./js/parts/form.js ***!
  \**************************/
/***/ (() => {

// form!

    /* Это обьект, который соддержит сообщение, оно будет высвечиваться в тех или иных ситуациях */
    let message = {
        loading: 'загрузка',
        succes: 'Успешно',  
        failure: 'Произошла ошибка'
    };


    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),      /* Берем все инпуты из формы */
        statusMessage = document.createElement('div'),
        contactForm = document.getElementById('form'),
        contactInput = contactForm.getElementsByTagName('input');

        console.log(contactForm);

        statusMessage.classList.add('status'),

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();       /* Эта строчка отключает обычное поведение сабмитов */
            contactForm.appendChild(statusMessage);

            let request = new XMLHttpRequest();

            request.open('POST', 'server.php');
            request.setRequestHeader ('Content-type', 'application/x-www-form-urlencoded');
            let formData = new FormData(contactForm);
            request.send(formData);

            request.addEventListener('readystatechange', function() {
                return new Promise((resolve, reject) => {
                    if (request.readyState < 4) {
                        resolve(statusMessage.innerHTML = message.loading)
                    } else if (request.readyState === 4 && request.status == 200) {
                        resolve(statusMessage.innerHTML = message.succes);
                    } else {
                        reject(statusMessage.innerHTML = message.failure);
                    }
                })
            });

            for ( let i = 0; i < contactInput.length; i++) {
                contactInput[i].value = '';
            };
        });

        form.addEventListener('submit', function(event) {
            event.preventDefault();       /* Эта строчка отключает обычное поведение сабмитов */
            form.appendChild(statusMessage);

            let request = new XMLHttpRequest();

            request.open('POST', 'server.php');
            request.setRequestHeader ('Content-type', 'application/x-www-form-urlencoded');
            
            let formData = new FormData(form);

            // let obj = {};

            // formData.forEach(function(value, key){
            //     obj[key] = value;
            // });

            // let json = JSON.stringify(obj);

            request.send(formData);

            request.addEventListener('readystatechange', function() {
                return new Promise((resolve, reject) => {
                    if (request.readyState < 4) {
                        resolve(statusMessage.innerHTML = message.loading)
                    } else if (request.readyState === 4 && request.status == 200) {
                        resolve(statusMessage.innerHTML = message.succes);
                    } else {
                        reject(statusMessage.innerHTML = message.failure);
                    }
                })
            });

            for ( let i = 0; i < input.length; i++) {
                input[i].value = '';
            };
        });

/***/ }),

/***/ "./js/parts/modal.js":
/*!***************************!*\
  !*** ./js/parts/modal.js ***!
  \***************************/
/***/ (() => {

let more = document.querySelector('.more'),
    overlay = document.querySelector('.overlay'),
    close = document.querySelector('.popup-close');

    more.addEventListener('click', function() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function() {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });



/***/ }),

/***/ "./js/parts/slider.js":
/*!****************************!*\
  !*** ./js/parts/slider.js ***!
  \****************************/
/***/ (() => {

let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

        showSlides(slideIndex);

        function showSlides(n) {

            if (n > slides.length) {
                slideIndex = 1;
            }
            if (n < 1) {
                slideIndex = slides.length;
            }

            slides.forEach((item) => item.style.display = 'none');
            dots.forEach((item) => item.classList.remove('dot-active'));
            slides[slideIndex - 1].style.display = 'block';
            dots[slideIndex - 1].classList.add('dot-active');
        }

        function plusSlides(n) {
            showSlides(slideIndex += n);
        }

        function currentSlide(n) {
            showSlides(slideIndex = n);
        }

        prev.addEventListener('click', function() {
            plusSlides(-1)
        });

        next.addEventListener('click', function() {
            plusSlides(1)
        });

        dotsWrap.addEventListener('click', function(event) {
            for (let i = 0; i < dots.length + 1;  i++) {
                if (event.target.classList.contains('dot') && event.target == dots[i-1]) {
                    currentSlide(i);
                }
            }
        });

/***/ }),

/***/ "./js/parts/tabs.js":
/*!**************************!*\
  !*** ./js/parts/tabs.js ***!
  \**************************/
/***/ (() => {

let tab = document.querySelectorAll('.info-header-tab'),
    info = document.querySelector('.info-header'),
    tabContent = document.querySelectorAll('.info-tabcontent');

function hideTabContent(a) {
    for (let i = a; i < tabContent.length; i++) {
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add('hide');
    }
}

hideTabContent(1);

function showTabContent(b) {
    if (tabContent[b].classList.contains('hide')) {
        tabContent[b].classList.remove('hide');
        tabContent[b].classList.add('show');
    }
}

info.addEventListener('click', function(event) {
    let target = event.target;
    if (target && target.classList.contains('info-header-tab')) {
        for (let i = 0; i < tab.length; i++) {
            if (target == tab[i]) {
                hideTabContent(0);
                showTabContent(i);
                break;
            }
        }
    }
});



/***/ }),

/***/ "./js/parts/timer.js":
/*!***************************!*\
  !*** ./js/parts/timer.js ***!
  \***************************/
/***/ (() => {

let deadline = '2024-04-01';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
        seconds = Math.floor((t/1000) % 60),
        minutes = Math.floor((t/1000/60) % 60),
        hours = Math.floor((t/(1000*60*60)));

        return {
            'total' : t,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;

            function addZero(num) {
                if(num <= 9) {
                    return '0' + num;
                } else return num;
            };

            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }
    }
    
    setClock('timer', deadline);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
window.addEventListener('DOMContentLoaded', function() {

    'use strict';

    let form = __webpack_require__(/*! ./parts/form.js */ "./js/parts/form.js"),
        modal = __webpack_require__(/*! ./parts/modal.js */ "./js/parts/modal.js"),
        slider = __webpack_require__(/*! ./parts/slider.js */ "./js/parts/slider.js"),
        tabs = __webpack_require__(/*! ./parts/tabs.js */ "./js/parts/tabs.js"),
        timer = __webpack_require__(/*! ./parts/timer.js */ "./js/parts/timer.js"),
        calc = __webpack_require__(/*! ./parts/calc.js */ "./js/parts/calc.js");
});



})();

/******/ })()
;
//# sourceMappingURL=main.js.map