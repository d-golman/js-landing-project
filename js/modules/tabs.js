"use strict";

function tabs() {
    const
        tabheader = document.querySelector('.tabheader__items'),
        tabcontent = document.querySelectorAll('.tabcontent');

    hideTabs();

    function hideTabs(index = 0) {
        tabcontent.forEach((item, i) => {
            if (i == index) {
                return;
            }
            item.style.display = 'none';
        });
    }

    tabheader.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('tabheader__item')) {
            document.querySelector('.tabheader__item_active').classList.toggle('tabheader__item_active');
            e.target.classList.toggle('tabheader__item_active');
            let index = Array.from(tabheader.children).indexOf(e.target);
            tabcontent[index].style.display = 'block';
            hideTabs(index);
        }
    });
}

export default tabs;