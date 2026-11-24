/*==================== SHOW MENU ====================*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


/*=============== ADD BLUR TO HEADER ===============*/
const blurHeader = () => {
    const header = document.getElementById('header')
    window.scrollY >= 50 ? header.classList.add('blur-header')
        : header.classList.remove('blur-header')
}
window.addEventListener('scroll', blurHeader)

/*=============== SHOW SCROLL UP ===============*/
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    if (window.scrollY >= 200) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id')
        const activeNav = document.querySelector('.nav__menu a[href$="#' + sectionId + '"]')

        if (activeNav) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                activeNav.classList.add('active-link')
            } else {
                activeNav.classList.remove('active-link')
            }
        }
    })
}
window.addEventListener('scroll', scrollActive)


/*=============== SCROLL REVEAL ANIMATION ===============*/
if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 2500,
        delay: 400,
    })

    sr.reveal(`.home__data, .explore__data, .explore__user, .footer__container`)
    sr.reveal(`.home__card`, { delay: 600, distance: '100px', interval: 100 })
    sr.reveal(`.about__data, .join__image`, { origin: 'right' })
    sr.reveal(`.about__image, .join__data`, { origin: 'left' })
    sr.reveal(`.popular__card`, { interval: 200 })
}


/*=============== NEWSLETTER ===============*/
const joinForm = document.querySelector('.join__form')
if (joinForm) {
  joinForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const btn = joinForm.querySelector('button')
    btn.innerHTML = 'Subscribed! <i class="ri-check-line"></i>'
    joinForm.querySelector('input').value = ''
  })
}
