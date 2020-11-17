'use strict';

import {getData} from '../services/services';

function menu() {
    class Menu {
        constructor({
            title,
            img,
            alt,
            text,
            price,

        }, parent) {
            this.title = title;
            this.img = img;
            this.alt = alt;
            this.text = text;
            this.price = price;
            this.parent = parent;
            this.convert(60);
        }

        convert($) {
            this.price *= $;
        }

        render() {
            const menu = document.createElement('div');
            menu.innerHTML = `
                    <div class="menu__item">
                        <img src="${this.img}" alt="${this.alt}">
                        <h3 class="menu__item-subtitle">${this.title}</h3>
                        <div class="menu__item-descr">${this.text}</div>
                        <div class="menu__item-divider"></div>
                        <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                        </div>
                    </div>`;
            this.parent.append(menu);
        }
    }



    menusInsert();

    function menusInsert() {

        const container = document.querySelector('.menu__item').parentElement;
        container.innerHTML = '';
        getData('http://localhost:3000/menus')
            .then(json => {
                json.forEach(item => {
                    new Menu(item, container).render();
                });
            });
    }
}

export default menu;