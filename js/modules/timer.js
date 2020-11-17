"use strict";

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

export default timer;