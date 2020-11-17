/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });


function calc() {
    const chooses = document.querySelectorAll('.calculating__choose'),
        genders = chooses[0].querySelectorAll('.calculating__choose-item'),
        stats = chooses[1].querySelectorAll('.calculating__choose-item'),
        activities = chooses[2].querySelectorAll('.calculating__choose-item');
    let gender = 'female',
        activity = 1.375,
        height = 160,
        weight = 60,
        age = 35,
        result = document.querySelector('.calculating__result span');

    (() => {
        if (localStorage.getItem('gender')) {
            gender = localStorage.getItem('gender');
        }
        if (localStorage.getItem('activity')) {
            activity = localStorage.getItem('activity');
        }
        if (localStorage.getItem('height')) {
            height = localStorage.getItem('height');
        }
        if (localStorage.getItem('weight')) {
            weight = localStorage.getItem('weight');
        }
        if (localStorage.getItem('age')) {
            age = localStorage.getItem('age');
        }
        changeResult();
        loadSaved();
    })();

    function loadSaved() {
        genders.forEach(item => {
            if (item.getAttribute('data-gender') == gender) {
                select(genders, item);
            }
            stats[0].value = height;
            stats[1].value = weight;
            stats[2].value = age;
            switch (activity) {
                case '1.2':
                    select(activities, activities[0]);
                    break;
                case '1.375':
                    select(activities, activities[1]);
                    break;
                case '1.55':
                    select(activities, activities[2]);
                    break;
                case '1.725':
                    select(activities, activities[3]);
                    break;
            }
        });
    }

    genders.forEach(item => {
        item.addEventListener('click', (e) => {
            gender = e.target.getAttribute('data-gender');
            select(genders, e.target);
            changeResult();
        });
    });

    stats.forEach(item => {
        item.addEventListener('input', e => {
            if (e.target.value.match(/\d/g)) {
                e.target.style.backgroundColor = 'white';
                switch (e.target.getAttribute('id')) {
                    case 'height':
                        height = e.target.value;
                        break;
                    case 'weight':
                        weight = e.target.value;
                        break;
                    case 'age':
                        age = e.target.value;
                        break;
                }
                changeResult();
            } else {
                e.target.style.backgroundColor = 'pink';
            }
        });
    });

    activities.forEach(item => {
        item.addEventListener('click', (e) => {
            switch (e.target.getAttribute('id')) {
                case 'low':
                    activity = 1.2;
                    break;
                case 'small':
                    activity = 1.375;
                    break;
                case 'medium':
                    activity = 1.55;
                    break;
                case 'high':
                    activity = 1.725;
                    break;
            }
            select(activities, e.target);
            changeResult();
        });
    });

    function changeResult() {
        saveStats();
        let calories;
        if (gender == 'male') {
            calories = activity * (88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age));
        } else {
            calories = activity * (447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age));
        }
        result.textContent = Math.round(calories);
    }

    function saveStats() {
        localStorage.setItem('gender', gender);
        localStorage.setItem('activity', activity);
        localStorage.setItem('weight', weight);
        localStorage.setItem('height', height);
        localStorage.setItem('age', age);
    }

    function select(choose, elem) {
        choose.forEach(item => {
            if (item != elem) {
                item.classList.remove('calculating__choose-item_active');
            } else if (!item.classList.contains('calculating__choose-item_active')) {
                item.classList.add('calculating__choose-item_active');
            }
        });
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");




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
        (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
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
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showModal)(content.parentElement.parentElement);
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/menu.js":
/*!****************************!*\
  !*** ./js/modules/menu.js ***!
  \****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");




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
        (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getData)('http://localhost:3000/menus')
            .then(json => {
                json.forEach(item => {
                    new Menu(item, container).render();
                });
            });
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (menu);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! export showModal [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__,
/* harmony export */   "showModal": () => /* binding */ showModal
/* harmony export */ });

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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);


/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });


function slider({_slides,_wrapper,_buttons,_innerSlider,_total,_current}) {
    const slides = document.querySelectorAll(_slides),
        wrapper = document.querySelector(_wrapper),
        leftButton = document.querySelector(_buttons[0]),
        rightButton = document.querySelector(_buttons[1]),
        innverSlider = document.querySelector(_innerSlider),
        total = document.querySelector(_total),
        current = document.querySelector(_current),
        width = parseInt(window.getComputedStyle(innverSlider).width);
    let active = 0,
        offset = 0,
        dots = [];

    (() => {
        leftButton.addEventListener('click', () => switchSlides('left'));
        rightButton.addEventListener('click', () => switchSlides('right'));
        total.textContent = changeNum(slides.length);
        innverSlider.style.width = `${100 * (slides.length)}%`;
        innverSlider.parentElement.style.overflow = 'hidden';
        current.textContent = changeNum(active + 1);
        addDots();
        changeDots();
    })();


    function addDots() {
        const dotsFrame = document.createElement('div');
        dotsFrame.className = 'carousel-indicators';
        slides.forEach(() => {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dotsFrame.append(dot);
        });
        wrapper.append(dotsFrame);
        dots = document.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                if (i > active) {
                    while (i > active) {
                        switchSlides('right');
                    }
                } else {
                    while (i < active) {
                        switchSlides('left');
                    }
                }
            });
        });
    }

    function switchSlides(direction) {
        if (direction == 'right') {
            offset += width;
            active++;
        } else {
            offset -= width;
            active--;
        }
        if (active > slides.length - 1) {
            offset = 0;
            active = 0;
        } else if (active < 0) {
            offset = width * (slides.length - 1);
            active = 3;
        }
        innverSlider.style.transform = `translateX(${-offset}px)`;
        current.textContent = changeNum(active + 1);
        changeDots();
    }

    function changeDots() {
        dots.forEach((dot, i) => {
            if (i != active) {
                dot.style.backgroundColor = 'white';
            } else {
                dot.style.backgroundColor = 'grey';
            }
        });
    }

    function changeNum(num) {
        if (num > 9) {
            return `${num}`;
        } else {
            return `0${num}`;
        }
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });


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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });


function timer() {
    const timer = document.querySelector('.timer'),
        endTime = new Date();

    endTime.setDate(new Date().getDate() + 1);
    updateTimer();

    function updateTimer() {
        calcTime().forEach((item, i) => {
            timer.children[i].children[0].textContent = getZero(item);
        });
        setInterval(() => {
            calcTime().forEach((item, i) => {
                timer.children[i].children[0].textContent = getZero(item);
            });
        }, 1000);
    }

    function getZero(num) {
        if (num > 0 && num < 10) {
            return (`0${num}`);
        } else {
            return (num);
        }
    }

    function calcTime() {
        const diffTime = (endTime - new Date());
        if (diffTime <= 0) {
            return ([0, 0, 0, 0]);
        }
        const date = [];
        date[0] = Math.trunc(diffTime / (86400 * 1000));
        date[1] = Math.trunc(diffTime / (3600 * 1000)) % 24;
        date[2] = Math.trunc(diffTime / (60 * 1000)) % 60;
        date[3] = Math.trunc(diffTime / (1000)) % 60;
        return (date);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/menu */ "./js/modules/menu.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");









window.addEventListener('DOMContentLoaded', () => {
    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)();
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_4__.default)('[data-modal]', '.modal');
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_1__.default)();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__.default)();
    (0,_modules_menu__WEBPACK_IMPORTED_MODULE_3__.default)();
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__.default)({
        _slides: '.offer__slide',
        _wrapper: '.offer__slider-wrapper',
        _buttons: ['.offer__slider-prev',
            '.offer__slider-next'
        ],
        _innerSlider: '.offer__slider-inner',
        _total: '#total',
        _current: '#current'
    });
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__.default)();

});

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/*! namespace exports */
/*! export getData [provided] [no usage info] [missing usage info prevents renaming] */
/*! export postData [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => /* binding */ postData,
/* harmony export */   "getData": () => /* binding */ getData
/* harmony export */ });


const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });
    return await res.json();
};

const getData = async (url) => {
    const data = await fetch(url, {
        method: "GET"
    });
    if (!data.ok) {
        throw new Error(`Couldn't fetch from ${url}, status ${data.status}`);
    }
    return await data.json();
};



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./js/script.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=bundle.js.map