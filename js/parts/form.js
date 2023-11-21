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