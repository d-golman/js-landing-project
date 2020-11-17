'use strict';

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

export default calc;