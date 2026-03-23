const toggleButton = document.getElementById('theme-icon');
const body = document.body;

// Tovush effektlari
const lightOnSound = document.getElementById('light-on-sound');
const lightOffSound = document.getElementById('light-off-sound');

// Oldin tanlangan rejimni tekshirish (xotiradan o'qish)
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    toggleButton.classList.remove('fa-sun');
    toggleButton.classList.add('fa-moon');
}

toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        toggleButton.classList.remove('fa-sun');
        toggleButton.classList.add('fa-moon');
        lightOffSound.play();
        localStorage.setItem('theme', 'dark');
    } else {
        toggleButton.classList.remove('fa-moon');
        toggleButton.classList.add('fa-sun');
        lightOnSound.play();
        localStorage.setItem('theme', 'light');
    }
});

// AOS Animatsiyasini ishga tushirish
AOS.init({
    duration: 1000, // Animatsiya davomiyligi (ms)
    once: true,     // Faqat bir marta animatsiya bo'lishi
    offset: 100     // Qancha pastga tushganda ishlashi
});

// Typed.js (Yozuv effekti)
const typed = new Typed('.multiple-text', {
    strings: ['Frontend Dasturchi', 'Backend Dasturchi', 'UI/UX Dizayner', 'Bot Yaratuvchi'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

// Swiper Sliderni ishga tushirish
var swiper = new Swiper(".mySwiper", {
    effect: "coverflow", // 3D effekt
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    pagination: {
        el: ".swiper-pagination",
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    // Avtomatik aylanish (xohlasangiz yoqing)
    // autoplay: {
    //   delay: 2500,
    //   disableOnInteraction: false,
    // },
});

// Testimonials Slider
var testimonialsSwiper = new Swiper(".testimonials-swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    grabCursor: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    breakpoints: {
        768: {
            slidesPerView: 2,
            spaceBetween: 40
        }
    }
});

// Scroll to Top (Tepaga qaytish) funksiyasi
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener('scroll', () => {
    // 1. Scroll Progress Bar
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";

    // 2. Scroll to Top tugmasi
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
});

// Tugma bosilganda tepaga chiqish
scrollTopBtn.addEventListener("click", () => {
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; // Chrome, Firefox, IE uchun
});

/* ---------------------------------------------------
   1. KO'P TILLILIK TIZIMI (Translation)
--------------------------------------------------- */
const translations = {
    uz: {
        nav_home: "Asosiy",
        nav_about: "Men haqimda",
        nav_portfolio: "Portfolio",
        nav_services: "Xizmatlar",
        nav_testimonials: "Fikrlar",
        nav_contact: "Bog'lanish",
        hero_hello: "Salom, men",
        btn_contact: "Bog'lanish",
        btn_portfolio: "Portfolio",
        about_title: "Men haqimda",
        about_text: "Men veb-dasturlashga qiziqaman va zamonaviy texnologiyalar yordamida foydali loyihalar yaratishni yaxshi ko'raman.",
        portfolio_title: "Mening Loyihalarim",
        services_title: "Xizmatlarim",
        testimonials_title: "Mijozlar Fikrlari",
        contact_title: "Bog'lanish",
        contact_info_title: "Ma'lumotlarim",
        contact_form_title: "Xabar yuborish",
        btn_send: "Yuborish"
    },
    ru: {
        nav_home: "Главная",
        nav_about: "Обо мне",
        nav_portfolio: "Портфолио",
        nav_services: "Услуги",
        nav_testimonials: "Отзывы",
        nav_contact: "Контакты",
        hero_hello: "Привет, я",
        btn_contact: "Связаться",
        btn_portfolio: "Портфолио",
        about_title: "Обо мне",
        about_text: "Я интересуюсь веб-разработкой и люблю создавать полезные проекты с использованием современных технологий.",
        portfolio_title: "Мои проекты",
        services_title: "Мои услуги",
        testimonials_title: "Отзывы клиентов",
        contact_title: "Контакты",
        contact_info_title: "Мои данные",
        contact_form_title: "Отправить сообщение",
        btn_send: "Отправить"
    },
    en: {
        nav_home: "Home",
        nav_about: "About Me",
        nav_portfolio: "Portfolio",
        nav_services: "Services",
        nav_testimonials: "Testimonials",
        nav_contact: "Contact",
        hero_hello: "Hello, I am",
        btn_contact: "Contact Me",
        btn_portfolio: "Portfolio",
        about_title: "About Me",
        about_text: "I am interested in web development and love creating useful projects using modern technologies.",
        portfolio_title: "My Projects",
        services_title: "My Services",
        testimonials_title: "Client Testimonials",
        contact_title: "Contact",
        contact_info_title: "My Info",
        contact_form_title: "Send Message",
        btn_send: "Send"
    }
};

function changeLanguage(lang) {
    const elements = document.querySelectorAll('[data-lang]');
    elements.forEach(el => {
        const key = el.getAttribute('data-lang');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    
    // Tugmalar rangini o'zgartirish
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active-lang');
        if (btn.innerText.toLowerCase() === lang) {
            btn.classList.add('active-lang');
        }
    });
}

/* ---------------------------------------------------
   2. AI CHATBOT TIZIMI
--------------------------------------------------- */
const chatToggleBtn = document.getElementById('chatToggleBtn');
const chatBox = document.getElementById('chatBox');
const closeChat = document.getElementById('closeChat');
const chatInput = document.getElementById('chatInput');
const sendMessageBtn = document.getElementById('sendMessage');
const chatBody = document.getElementById('chatBody');

// Chatni ochish/yopish
chatToggleBtn.addEventListener('click', () => {
    chatBox.style.display = chatBox.style.display === 'flex' ? 'none' : 'flex';
});
closeChat.addEventListener('click', () => chatBox.style.display = 'none');

// Xabar yuborish
sendMessageBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const text = chatInput.value.trim();
    if (text === "") return;

    // Foydalanuvchi xabarini qo'shish
    addMessage(text, 'user-message');
    chatInput.value = "";

    // AI javobini generatsiya qilish (Simulyatsiya)
    setTimeout(() => {
        const botReply = getBotResponse(text);
        addMessage(botReply, 'bot-message');
    }, 1000);
}

function addMessage(text, className) {
    const div = document.createElement('div');
    div.classList.add('message', className);
    div.innerText = text;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// AI Bilim Bazasi (Miya)
function getBotResponse(input) {
    input = input.toLowerCase();

    if (input.includes("salom") || input.includes("hi") || input.includes("privet")) return "Assalomu alaykum! Sizga qanday yordam bera olaman?";
    if (input.includes("narx") || input.includes("qancha") || input.includes("price")) return "Landing page 1.5 mln so'mdan boshlanadi. Batafsil 'Xizmatlar' bo'limida!";
    if (input.includes("aloqa") || input.includes("tel") || input.includes("nomer")) return "Mening raqamim: +998 91 590 39 49. Telegram: @ikoshdev";
    if (input.includes("kim") || input.includes("who")) return "Mening ismim Ikromjon, men 'Creata' brendi asoschisiman. Professional dasturchi va dizaynerman.";
    if (input.includes("bot")) return "Ha, men Telegram botlar ham yasayman. Narxlar 1 mln so'mdan boshlanadi.";
    if (input.includes("texnologiya") || input.includes("technology")) return "Men zamonaviy texnologiyalar bilan ishlayman: HTML, CSS, JavaScript, React va boshqalar. Batafsil 'Men haqimda' bo'limida ko'rishingiz mumkin.";
    if (input.includes("tajriba") || input.includes("experience")) return "Mening bir necha yillik tajribam bor va ko'plab muvaffaqiyatli loyihalarni amalga oshirganman. 'Portfolio' bo'limida ba'zilarini ko'rishingiz mumkin.";
    if (input.includes("qayerdan") || input.includes("where are you from")) return "Men O'zbekistondanman.";
    if (input.includes("xizmatlar") || input.includes("services")) return "Men vebsaytlar, telegram botlar yaratish va UI/UX dizayn xizmatlarini taklif qilaman. 'Xizmatlar' bo'limida to'liq ma'lumot bor.";
    if (input.includes("sayt") || input.includes("website")) return "Bu portfolio sayt Ikromjon Islomov tomonidan noldan yaratilgan. U zamonaviy texnologiyalar va animatsiyalardan foydalanadi.";
    if (input.includes("creata")) return "'Creata' - bu Ikromjonning shaxsiy brendi va kelajakdagi global IT kompaniyasi. Maqsadi - bizneslarni raqamli dunyoga olib kirish.";
    
    return "Uzr, tushunmadim. Iltimos, boshqacha so'rang yoki menga to'g'ridan-to'g'ri qo'ng'iroq qiling.";
}

// Toast Notification Funksiyasi (Chiroyli xabar chiqarish)
function showToast(msg, type = 'success') {
    const toastBox = document.getElementById('toast-box');
    const toast = document.createElement('div');
    toast.classList.add('toast', type);
    
    let icon = type === 'success' ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-exclamation-circle"></i>';
    
    toast.innerHTML = `${icon} <span>${msg}</span>`;
    toastBox.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 4000); // 4 sekunddan keyin yo'qoladi
}

/* ---------------------------------------------------
   3. ALOQA FORMASINI BACKENDGA YUBORISH
--------------------------------------------------- */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Formaning standart yuborilishini to'xtatish

        const name = contactForm.querySelector('input[name="name"]').value;
        const email = contactForm.querySelector('input[name="email"]').value;
        const message = contactForm.querySelector('textarea[name="message"]').value;

        // API manzilini aniqlash
        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        // Renderda backend va frontend bir joyda bo'lsa, to'g'ridan-to'g'ri /api/contact ishlatish ma'qul
        const API_URL = isLocal ? 'http://localhost:5000/api/contact' : '/api/contact';
        console.log("Xabar yuborilmoqda:", API_URL); // Tekshirish uchun

        try {
            const response = await fetch(API_URL, { // Backend API manzilini ko'rsating
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, message })
            });

            const data = await response.json();

            if (response.ok) {
                showToast(data.msg, 'success'); // Chiroyli xabar (Yashil)
                contactForm.reset(); // Formani tozalash
            } else {
                showToast(`Xato: ${data.msg}`, 'error'); // Xato xabari (Qizil)
            }
        } catch (error) {
            console.error('Xabar yuborishda xato yuz berdi:', error);
            showToast('Server bilan bog\'lanishda xatolik!', 'error');
        }
    });
}

// Sayt yuklanganda tilni o'rnatish
changeLanguage('uz'); // Boshlang'ich tilni o'zbekcha qilib qo'yish

/* ---------------------------------------------------
   4. CUSTOM CURSOR
--------------------------------------------------- */
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

const links = document.querySelectorAll("a, button");

links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
        cursorOutline.style.transform = "translate(-50%, -50%) scale(1.5)";
    });
    link.addEventListener("mouseleave", () => {
        cursorOutline.style.transform = "translate(-50%, -50%) scale(1)";
    });
});

/* ---------------------------------------------------
   7. PORTFOLIO MODAL (Loyiha tafsilotlari)
--------------------------------------------------- */
const portfolioModal = document.getElementById("portfolio-modal");
const closePortfolioBtn = document.querySelector(".close-portfolio-modal");
const viewProjectBtns = document.querySelectorAll(".view-project-btn");

viewProjectBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        // HTML dagi data- atributlardan ma'lumotlarni olish
        const img = btn.getAttribute("data-img");
        const title = btn.getAttribute("data-title");
        const desc = btn.getAttribute("data-desc");
        const techs = btn.getAttribute("data-tech").split(','); // Vergul bilan ajratish
        const link = btn.getAttribute("data-link"); // Sayt havolasini olish

        // Modal ichiga joylash
        document.getElementById("modal-img").src = img;
        document.getElementById("modal-title").innerText = title;
        document.getElementById("modal-desc").innerText = desc;
        document.getElementById("modal-link").href = link; // Havolani tugmaga ulash
        
        // Texnologiyalar (taglar) ni tozalab yangitdan chizish
        const techContainer = document.getElementById("modal-techs");
        techContainer.innerHTML = "";
        techs.forEach(tech => {
            const span = document.createElement("span");
            span.classList.add("tech-tag");
            span.innerText = tech.trim();
            techContainer.appendChild(span);
        });

        // Modalni ochish
        portfolioModal.style.display = "flex";
    });
});

closePortfolioBtn.onclick = () => {
    portfolioModal.style.display = "none";
};

/* ---------------------------------------------------
   5. MODAL OYNASINI YOPISH (Tashqariga bosganda)
--------------------------------------------------- */
window.onclick = function(event) {
    if (event.target === portfolioModal) {
        portfolioModal.style.display = "none";
    }
}

/* ---------------------------------------------------
   6. INTRO ANIMATION
--------------------------------------------------- */
const intro = document.querySelector('.intro');

document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');

    // 1. Introni ko'rsatish va 2.5 sekunddan keyin olib tashlash
    setTimeout(() => {
        intro.style.top = '-100vh'; // Ekranni tepaga surish
        preloader.classList.add('preloader-hide');
    }, 2500); // 2.5 sekund intro turadi
});

/* ---------------------------------------------------
   11. LIGHTBOX (Galereya rasmlarini katta qilish)
--------------------------------------------------- */
const lightbox = document.getElementById('lightbox-modal');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const galleryItems = document.querySelectorAll('.gallery-item img');
const closeLightbox = document.querySelector('.close-lightbox');

galleryItems.forEach(img => {
    img.addEventListener('click', () => {
        lightbox.style.display = "flex";
        lightbox.style.alignItems = "center";
        lightbox.style.justifyContent = "center";
        lightbox.style.flexDirection = "column";
        lightboxImg.src = img.src;
        lightboxCaption.innerHTML = img.alt;
    });
});

closeLightbox.addEventListener('click', () => {
    lightbox.style.display = "none";
});

lightbox.addEventListener('click', (e) => {
    if(e.target !== lightboxImg) {
        lightbox.style.display = "none";
    }
});

/* ---------------------------------------------------
   9. TEXT SCRAMBLE EFFECT (Matnni shifrlash)
--------------------------------------------------- */
const scrambleText = document.querySelector('.scramble-text');
const originalText = scrambleText.innerText;
const chars = '!<>-_\\/[]{}—=+*^?#________';

scrambleText.addEventListener('mouseover', () => {
    let iteration = 0;
    
    clearInterval(scrambleText.interval);
    
    scrambleText.interval = setInterval(() => {
        scrambleText.innerText = originalText
            .split("")
            .map((letter, index) => {
                if(index < iteration) {
                    return originalText[index];
                }
                return chars[Math.floor(Math.random() * chars.length)]
            })
            .join("");
        
        if(iteration >= originalText.length){ 
            clearInterval(scrambleText.interval);
        }
        
        iteration += 1 / 3;
    }, 30);
});

/* ---------------------------------------------------
   10. HAMBURGER MENU (Mobil menyu)
--------------------------------------------------- */
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-link-item').forEach(link => link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
}));