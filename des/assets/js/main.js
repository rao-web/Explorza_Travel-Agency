/*=============== SHOW MENU ===============*/
/*==================== SHOW MENU ====================*/
const navMenu = document.getElementById('nav-menu'),
  navToggle = document.getElementById('nav-toggle'),
  navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu')
  })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu')
  })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
  const navMenu = document.getElementById('nav-menu')
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))


/*=============== ADD BLUR TO HEADER ===============*/

const blurHeader = () => {
  const header = document.getElementById('header')
  // Add a class if the bottom offset is greater than 50 of the viewport
  this.scrollY >= 50 ? header.classList.add('blur-header')
    : header.classList.remove('blur-header')
}
window.addEventListener('scroll', blurHeader)

/*=============== SHOW SCROLL UP ===============*/
function scrollUp() {
  const scrollUp = document.getElementById('scroll-up');
  // When the scroll is higher than 200 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if (this.scrollY >= 200) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
  const scrollY = window.pageYOffset

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute('id')

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
    } else {
      document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
    }
  })
}
window.addEventListener('scroll', scrollActive)


/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 3000,
  delay: 400,
})

sr.reveal(`.home__data, .explore__data, .explore__user, .footer__container`)
sr.reveal(`.home__card`, { delay: 600, distance: '100px', interval: 100 })
sr.reveal(`.about__data, .join__image`, { orgin: 'right' })
sr.reveal(`.about__image, .join__data`, { orgin: 'left' })
sr.reveal(`.popular__card`, { interval: 200 })


// // <!-- ////////////////////// MODAL JS ////////////////////// -->

// document.querySelectorAll('a[href="#bookingmodal"]').forEach(btn => {
//   btn.addEventListener("click", e => {
//     e.preventDefault();
//     document.getElementById("bookingmodal").style.display = "flex";
//   });
// });

// document.querySelector(".modal-close").addEventListener("click", () => {
//   document.getElementById("bookingmodal").style.display = "none";
// });

// window.addEventListener("click", e => {
//   if (e.target.classList.contains("modal-overlay")) {
//     document.getElementById("bookingmodal").style.display = "none";
//   }
// });



// // CHATGPT
// async function sendMessage() {
//   console.log("THIS IS SEND MESSAGE")
//   const message = chatInput.value.trim();
//   if (!message) return;

//   // Show user message
//   let userMsg = document.createElement("div");
//   userMsg.classList.add("chat-message", "user");
//   userMsg.textContent = message;
//   chatWindow.appendChild(userMsg);
//   chatWindow.scrollTop = chatWindow.scrollHeight;
//   chatInput.value = "";

//   // Loading message
//   let botMsg = document.createElement("div");
//   botMsg.classList.add("chat-message", "bot");
//   botMsg.textContent = "🤖 Thinking...";
//   chatWindow.appendChild(botMsg);
//   chatWindow.scrollTop = chatWindow.scrollHeight;

//   try {
//     let res = await fetch("chatgpt.php", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ message })
//     });

//     let data = await res.json();
//     console.log(data)
//     let reply = data.choices[0].message.content;

//     botMsg.textContent = reply;
//     chatWindow.scrollTop = chatWindow.scrollHeight;
//   } catch (err) {
//     botMsg.textContent = "⚠️ Error connecting to AI.";
//   }
// }
// // CHATGPT Integration
// async function sendMessage() {
//   // console.log("this is running function")
//   const message = chatInput.value.trim();
//   if (!message) return;

//   // User message
//   let userMsg = document.createElement("div");
//   userMsg.classList.add("chat-message", "user");
//   userMsg.textContent = message;
//   chatWindow.appendChild(userMsg);
//   chatWindow.scrollTop = chatWindow.scrollHeight;
//   chatInput.value = "";

//   // Bot "thinking..."
//   let botMsg = document.createElement("div");
//   botMsg.classList.add("chat-message", "bot");
//   botMsg.textContent = "🤖 Thinking...";
//   chatWindow.appendChild(botMsg);
//   chatWindow.scrollTop = chatWindow.scrollHeight;

//   try {
//     let res = await fetch("chatgpt.php", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ message })
//     });

//     let data = await res.json();
//     console.log(data)
//     if (data.error) {
//       botMsg.textContent = "⚠️ " + data.error;
//     } else {
//       // botMsg.textContent = data.choices[0].message.content;
//       botMsg.textContent = data.text;
//     }

//     chatWindow.scrollTop = chatWindow.scrollHeight;
//   } catch (err) {
//     botMsg.textContent = "⚠️ Error connecting to AI: " + err.message;
//   }
// }
