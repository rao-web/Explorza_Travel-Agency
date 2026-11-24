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

  sr.reveal(`.headerText, .footer__container`)
  sr.reveal(`.custom-card`, { interval: 200 })
  sr.reveal(`.news-card`, { interval: 200 })
}


/*=============== MODALS (chatbot + booking) ===============*/
const openModal = (modal) => {
  if (!modal) return
  modal.classList.add('active')
  document.body.style.overflow = 'hidden'
  const first = modal.querySelector('#chatInput, input, select')
  if (first) setTimeout(() => first.focus({ preventScroll: true }), 50)
}

const closeModals = () => {
  document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'))
  document.body.style.overflow = ''
}

const chatbotModal = document.getElementById('chatbotModal')
const bookingModal = document.getElementById('bookingmodal')

document.querySelectorAll('.open-chatbot').forEach(b =>
  b.addEventListener('click', () => openModal(chatbotModal)))

document.querySelectorAll('.open-booking').forEach(b =>
  b.addEventListener('click', (e) => {
    e.preventDefault()
    const pkg = b.closest('.custom-card')?.querySelector('.card-title')?.textContent.trim()
    const select = document.getElementById('package')
    if (pkg && select) select.value = pkg
    openModal(bookingModal)
  }))

document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModals() })
  overlay.querySelector('.modal-close')?.addEventListener('click', closeModals)
})

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModals()
    if (location.hash.startsWith('#modal')) location.hash = '#news'
  }
})

/*=============== BOOKING FORM ===============*/
const bookingForm = document.getElementById('bookingForm')
if (bookingForm) {
  const dateInput = document.getElementById('date')
  const today = new Date()
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset())
  dateInput.min = today.toISOString().slice(0, 10)

  const rules = {
    name: v => /^[A-Za-z]+( [A-Za-z]+)*$/.test(v.trim()),
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
    package: v => v !== '',
    date: v => v !== '' && v >= dateInput.min,
    persons: v => Number.isInteger(Number(v)) && Number(v) >= 1
  }

  const check = (id) => {
    const el = document.getElementById(id)
    const ok = rules[id](el.value)
    el.closest('.form-group').classList.toggle('invalid', !ok)
    return ok
  }

  Object.keys(rules).forEach(id =>
    document.getElementById(id).addEventListener('input', () => check(id)))

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const results = Object.keys(rules).map(check)
    if (results.includes(false)) return
    const name = document.getElementById('name').value.trim()
    bookingForm.innerHTML = `
      <div class="booking-success">
        <i class="ri-checkbox-circle-line"></i>
        <h3>Booking confirmed!</h3>
        <p>Thank you, ${name.replace(/[<>&]/g, '')}. We'll email you the details shortly.</p>
      </div>`
  })
}


/*=============== AI MODAL TABS (mobile) ===============*/
const aiTabs = document.querySelectorAll('.ai-tab')
const aiPanes = document.querySelectorAll('.ai-pane')
aiTabs.forEach(tab => tab.addEventListener('click', () => {
  aiTabs.forEach(t => {
    const on = t === tab
    t.classList.toggle('active', on)
    t.setAttribute('aria-selected', on)
  })
  aiPanes.forEach(p => p.classList.toggle('active', p.dataset.pane === tab.dataset.tab))
}))

// jump to the itinerary tab after generating a plan on small screens
document.getElementById('aiPlannerForm')?.addEventListener('submit', () => {
  if (window.matchMedia('(max-width: 860px)').matches) {
    document.getElementById('itineraryResult')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
})


/*=============== AI TRIP PLANNER: nav link + #ai-planner deep link ===============*/
document.querySelectorAll('a[href$="#ai-planner"]').forEach(link =>
  link.addEventListener('click', (e) => {
    e.preventDefault()
    document.getElementById('ai-planner')?.scrollIntoView({ behavior: 'smooth' })
    openModal(chatbotModal)
  }))

if (location.hash === '#ai-planner') openModal(chatbotModal)
