window.addEventListener('DOMContentLoaded', function() {

    'use strict';

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent'); 

    function hideTabContent(a) {
        for(let i = a; i < tabContent.length; i++) {
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
            for(let i = 0; i < tab.length; i++) {
                if(target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }

    });

    // Timer

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

    // Modal 

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

    // form!

    /* Это обьект, который соддержит сообщение, оно будет высвечиваться в тех или иных ситуациях */
    let message = {
        loading: 'загрузка',
        succes: 'Спасибо за заявку!',  
        failure: 'Произошла ошибка'
    };


    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),      /* Берем все инпуты из формы */
        statusMessage = document.createElement('div');

        statusMessage.classList.add('status'),

        сontactForm = document.getElementById('form'),
        contactInput = contactForm.getElementsByTagName('input');

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();       /* Эта строчка отключает обычное поведение сабмитов */
            contactForm.appendChild(statusMessage);

            let request = new XMLHttpRequest();

            request.open('POST', 'server.php');
            request.setRequestHeader ('Content-type', 'application/x-www-form-urlencoded');
            request.addEventListener('readystatechange', function() {
                if (request.readyState < 4) {
                    statusMessage.innerHTML = message.loading;
                } else if (request.readyState === 4 && request.status == 200) {
                    statusMessage.innerHTML = message.succes;
                } else {
                    statusMessage.innerHTML = message.failure;
                }
            });

                for ( let i = 0; i < contactInput.length; i++) {
                    contactInput[i].value = '';
                };
            })

        form.addEventListener('submit', function(event) {
            event.preventDefault();       /* Эта строчка отключает обычное поведение сабмитов */
            form.appendChild(statusMessage);

            let request = new XMLHttpRequest();

            request.open('POST', 'server.php');
            request.setRequestHeader ('Content-type', 'application/x-www-form-urlencoded');
            
            let formData = new FormData(form);

            let obj = {};

            formData.forEach(function(value, key){
                obj[key] = value;
            });

            let json = JSON.stringify(obj);

            request.send(json);

            request.addEventListener('readystatechange', function() {
                if (request.readyState < 4) {
                    statusMessage.innerHTML = message.loading;
                } else if (request.readyState === 4 && request.status == 200) {
                    statusMessage.innerHTML = message.succes;
                } else {
                    statusMessage.innerHTML = message.failure;
                }
            });

            for ( let i = 0; i < input.length; i++) {
                input[i].value = '';
            };
        });
});