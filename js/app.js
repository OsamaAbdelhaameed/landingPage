/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Define Global Variables
 * 
 */
const sections = document.getElementsByTagName('section');
const ul = document.getElementById('navbar__list');

/**
 * End Global Variables
 * Start Helper Functions
 * 
 */

/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */

// build the nav
function buildNav() {
    /*  scrollIntoView Didn't work at all I don't know how to use it with preventDefault, it returns <a>'s default settings
        Array.prototype.forEach.call(sections, section => {
            const child = document.createElement('li');
            child.innerHTML = '<a href=\#' + section.id + ' class="menu__link">' + section.getAttribute('data-nav') + '</a>';

            child.firstElementChild.addEventListener('click', (event) => {
                event.preventDefault();
                section.scrollIntoView({ behavior: "smooth", inline: "nearest" })
            })
            ul.appendChild(child)
        }) */

    Array.prototype.forEach.call(sections, section => {
        const child = document.createElement('li');
        child.innerHTML = '<a href=\#' + section.id + ' class="menu__link">' + section.getAttribute('data-nav') + '</a>';

        child.firstElementChild.addEventListener('click', (event) => {
            event.preventDefault();
            let elem = document.querySelector('#' + section.id);

            let startPos = window.pageYOffset;
            console.log('the initial position', startPos)
            let dist = elem.getBoundingClientRect().top;
            console.log('the distance between them position of wanted element - initial position', dist)
            let startTime = null;

            const animation = (currenTime) => {
                if (startTime === null) startTime = currenTime;
                let timeElapsed = currenTime - startTime;
                let run = ease(timeElapsed, startPos, dist, 1000);
                window.scrollTo(0, run)
                if (timeElapsed < 1000) requestAnimationFrame(animation)
            }

            const ease = (t, b, c, d) => {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }
            requestAnimationFrame(animation);
        })
        ul.appendChild(child)
    })
}
// Add class 'active' to section when near top of viewport

function activeClass() {
    const secTop = [];
    let inView = 10000;
    Array.prototype.forEach.call(sections, section => {
        secTop.push(section.getBoundingClientRect().top)
    })
    Array.prototype.forEach.call(secTop, elem => {
        if (elem >= 0 && elem < inView) {
            inView = elem;
        }
    })
    Array.prototype.forEach.call(sections, section => {
        if (section.getBoundingClientRect().top == inView) {
            if (!section.classList.contains('your-active-class')) {
                section.classList.add('your-active-class');
            }
        } else {
            section.classList.remove('your-active-class');
        }
    })
}
// Scroll to anchor ID using scrollTO event



/**
 * End Main Functions
 * Begin Events
 * 
 */

// Build menu 
buildNav();
// Scroll to section on link click

// Set sections as active
document.addEventListener('scroll', activeClass);