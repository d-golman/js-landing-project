"use strict";
import tabs from './modules/tabs';
import calc from './modules/calc';
import forms from './modules/forms';
import menu from './modules/menu';
import modal from './modules/modal';
import slider from './modules/slider';
import timer from './modules/timer';

window.addEventListener('DOMContentLoaded', () => {
    tabs();
    modal('[data-modal]', '.modal');
    calc();
    forms();
    menu();
    slider({
        _slides: '.offer__slide',
        _wrapper: '.offer__slider-wrapper',
        _buttons: ['.offer__slider-prev',
            '.offer__slider-next'
        ],
        _innerSlider: '.offer__slider-inner',
        _total: '#total',
        _current: '#current'
    });
    timer();

});