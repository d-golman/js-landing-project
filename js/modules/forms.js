'use strict';
import {
    showModal
} from './modal';
import {postData} from '../services/services';

function forms() {
    const forms = document.querySelectorAll('form');

    forms.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();
            bindpostData(item);
            let loading = document.createElement('img');
            loading.classList.add('loading');
            loading.src = 'img/spinner.svg';
            loading.style = 'display: block; margin: 0 auto;';
            item.parentElement.append(loading);
        });
    });

    function bindpostData(form) {
        const formData = new FormData(form);
        const json = JSON.stringify(Object.fromEntries(formData.entries()));
        postData('http://localhost:3000/requests', json)
            .then(() => {
                thankUser('Ожидайте звонка');
            }).catch(() => {
                thankUser('Ошибка');
            }).finally(() => {
                document.querySelector('.loading').remove();
                setTimeout(() => {
                    form.reset();
                }, 2000);
            });

    }

    function thankUser(message) {
        const content = document.querySelector('.modal__content');
        content.classList.add('hide');
        content.classList.remove('show');
        showModal(content.parentElement.parentElement);
        const thanks = document.createElement('div');
        thanks.classList.add('modal__content');
        thanks.innerHTML = `
            <div data-close="" class="modal__close">×</div>
            <div class="modal__title">${message}</div>`;

        content.parentElement.append(thanks);

        setTimeout(() => {
            content.classList.add('show');
            content.classList.remove('hide');
            thanks.remove();
        }, 3000);
    }
}

export default forms;