'use strict';

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

export default slider;