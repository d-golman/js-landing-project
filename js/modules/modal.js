'use strict';
let modalShown = false;

function showModal(modalSelector) {
    let modal = modalSelector;
    if (typeof (modal) == 'string') {
        modal = document.querySelector(modalSelector);
    }
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    modalShown = true;
}

function modal(btnsSelector, modalSelector) {

    modalSetup();

    function modalSetup() {
        const modalBtns = document.querySelectorAll(btnsSelector),
            modal = document.querySelector(modalSelector);

        modalTimeOut(modal);
        modalScroll(modal);

        function hideModal(modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }

        modalBtns.forEach(item => {
            item.addEventListener('click', () => {
                showModal(modal);
            });
        });
        modal.addEventListener('click', event => {
            if (event.target.classList == 'modal show' || event.target.getAttribute('data-close') == '') {
                hideModal(modal);
            }
        });
        document.addEventListener('keydown', (event) => {
            if (event.code == 'Escape' && modal.classList == 'modal show') {
                hideModal(modal);
            }
        });
    }

    function modalTimeOut(modal) {
        setTimeout(() => {
            if (modal.classList != 'modal show' && !modalShown) {
                showModal(modal);
            }
        }, 15000);
    }

    function modalScroll(modal) {
        document.addEventListener('scroll', () => {
            if (modal.classList != 'modal show' && document.documentElement.scrollTop ==
                document.documentElement.scrollHeight - document.documentElement.clientHeight && !modalShown) {
                showModal(modal);
            }
        });
    }
}

export default modal;
export {
    showModal
};