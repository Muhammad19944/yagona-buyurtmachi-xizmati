// Smooth Scroll для якорных ссылок
document.addEventListener('DOMContentLoaded', function () {
  // Smooth scroll для всех якорных ссылок
  const anchorLinks = document.querySelectorAll('a[href^="#"]')

  anchorLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href')

      // Пропускаем пустые якоря
      if (href === '#') {
        return
      }

      const targetId = href.substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        e.preventDefault()

        const header = document.querySelector('.header')
        const topBar = document.querySelector('.top-bar')
        const headerHeight = header ? header.offsetHeight : 0
        const topBarHeight = topBar ? topBar.offsetHeight : 0
        const totalOffset = headerHeight + topBarHeight
        const targetPosition = targetElement.offsetTop - totalOffset

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        })

        // Закрываем мобильное меню если открыто
        const navMenu = document.getElementById('navMenu')
        const menuToggle = document.getElementById('menuToggle')
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active')
          menuToggle.classList.remove('active')
        }
      }
    })
  })

  // Мобильное меню toggle
  const menuToggle = document.getElementById('menuToggle')
  const navMenu = document.getElementById('navMenu')

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function () {
      navMenu.classList.toggle('active')
      menuToggle.classList.toggle('active')
    })

    // Закрываем меню при клике вне его
    document.addEventListener('click', function (e) {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('active')
        menuToggle.classList.remove('active')
      }
    })
  }

  // Header scroll effect
  const header = document.getElementById('header')
  const topBar = document.querySelector('.top-bar')
  let lastScroll = 0

  window.addEventListener('scroll', function () {
    const currentScroll = window.pageYOffset

    if (currentScroll > 100) {
      if (header) header.classList.add('scrolled')
    } else {
      if (header) header.classList.remove('scrolled')
    }

    lastScroll = currentScroll
  })

  // Fade-in анимации при скролле (Intersection Observer)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        // Опционально: отключаем наблюдение после появления
        // observer.unobserve(entry.target);
      }
    })
  }, observerOptions)

  // Наблюдаем за всеми элементами с классом fade-in
  const fadeElements = document.querySelectorAll('.fade-in')
  fadeElements.forEach((element) => {
    observer.observe(element)
  })

  // Активная ссылка в навигации при скролле
  const sections = document.querySelectorAll('.section, .hero')
  const navLinks = document.querySelectorAll('.nav-link')

  function updateActiveNavLink() {
    let current = ''
    const headerHeight = header ? header.offsetHeight : 0
    const topBarHeight = topBar ? topBar.offsetHeight : 0
    const totalOffset = headerHeight + topBarHeight

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (window.pageYOffset >= sectionTop - totalOffset - 100) {
        current = section.getAttribute('id')
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove('active')
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active')
      }
    })
  }

  window.addEventListener('scroll', updateActiveNavLink)
  updateActiveNavLink() // Вызываем сразу для установки начального состояния

  // Обработка формы обратной связи
  const contactForm = document.getElementById('contactForm')
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault()

      // Здесь можно добавить отправку формы на сервер
      // Пока просто показываем сообщение
      const formData = new FormData(this)
      const data = Object.fromEntries(formData)

      console.log('Form data:', data)

      // Показываем сообщение об успехе
      alert('Спасибо за ваше обращение! Мы свяжемся с вами в ближайшее время.')

      // Очищаем форму
      this.reset()
    })
  }

  // Параллакс эффект для hero секции (опционально)
  const hero = document.querySelector('.hero')
  if (hero) {
    window.addEventListener('scroll', function () {
      const scrolled = window.pageYOffset
      const heroContent = hero.querySelector('.hero-content')

      // if (scrolled < hero.offsetHeight) {
      //     heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
      //     heroContent.style.opacity = 1 - (scrolled / hero.offsetHeight) * 0.5;
      // }
    })
  }

  // Анимация появления элементов с задержкой
  const staggerElements = document.querySelectorAll('.leader-card, .news-card')
  staggerElements.forEach((element, index) => {
    element.style.transitionDelay = `${index * 0.1}s`
  })
})

// Предзагрузка страницы - показываем контент сразу
window.addEventListener('load', function () {
  document.body.classList.add('loaded')
})

// About tabs functionality
const aboutTabs = document.querySelectorAll('.about-tab')
const aboutTabContents = document.querySelectorAll('.about-tab-content')
const aboutTabImages = document.querySelectorAll('.about-tab-image')

if (aboutTabs.length > 0) {
  aboutTabs.forEach((tab) => {
    tab.addEventListener('click', function () {
      const targetTab = this.getAttribute('data-tab')

      // Remove active class from all tabs, contents and images
      aboutTabs.forEach((t) => t.classList.remove('active'))
      aboutTabContents.forEach((c) => c.classList.remove('active'))
      aboutTabImages.forEach((img) => img.classList.remove('active'))

      // Add active class to clicked tab, corresponding content and image
      this.classList.add('active')
      const targetContent = document.getElementById(targetTab)
      if (targetContent) {
        targetContent.classList.add('active')
      }
      const targetImage = document.querySelector(`.about-tab-image[data-tab="${targetTab}"]`)
      if (targetImage) {
        targetImage.classList.add('active')
      }
    })
  })
}

// Leadership cards functionality
const leaderCards = document.querySelectorAll('.leader-card')
const leaderModal = document.getElementById('leaderModal')
const closeModalBtn = document.getElementById('closeModal')

// Leader data
const leadersData = {
  1: {
    name: 'Toshmatov Toshmat Toshmatovich',
    position: 'Bosh rahbar',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
    phone: '+998 71 123 45 67',
    schedule: 'Dushanba - Juma, 9:00 - 18:00',
    bio: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur voluptatum omnis, hic quas dolore animi!',
    press: ['Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur voluptatum omnis, hic quas dolore animi!'],
    contact: {
      linkedin: '#',
      twitter: '#'
    }
  },
  2: {
    name: 'Umarov Umar Umarovich',
    position: "Bo'lim boshlig'i",
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
    phone: '+998 71 123 45 68',
    schedule: 'Dushanba - Juma, 9:00 - 18:00',
    bio: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur voluptatum omnis, hic quas dolore animi!',
    press: ['Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur voluptatum omnis, hic quas dolore animi!'],
    contact: {
      linkedin: '#',
      twitter: '#'
    }
  },
  3: {
    name: "G'afurov G'afuro G'afurovich",
    position: "Bo'lim boshlig'i",
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
    phone: '+998 71 123 45 69',
    schedule: 'Dushanba - Juma, 9:00 - 18:00',
    bio: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur voluptatum omnis, hic quas dolore animi!',
    press: ['Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur voluptatum omnis, hic quas dolore animi!'],
    contact: {
      linkedin: '#',
      twitter: '#'
    }
  },
  4: {
    name: 'Abdullayev Abdullay Abdullayevich',
    position: "Bo'lim boshlig",
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
    phone: '+998 71 123 45 70',
    schedule: 'Dushanba - Juma, 9:00 - 18:00',
    bio: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur voluptatum omnis, hic quas dolore animi!',
    press: ['Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur voluptatum omnis, hic quas dolore animi!'],
    contact: {
      linkedin: '#',
      twitter: '#'
    }
  }
}

// Open modal function
function openLeaderModal(leaderId) {
  const leader = leadersData[leaderId]
  if (!leader) return

  document.getElementById('modalLeaderName').textContent = leader.name
  document.getElementById('modalLeaderPosition').textContent = leader.position
  document.getElementById('modalLeaderBio').textContent = leader.bio

  const modalImg = document.getElementById('modalLeaderImage')
  if (modalImg) {
    // Reset error handler to default before setting src to allow it to trigger again if needed
    modalImg.onerror = function () {
      this.src = 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
    }
    modalImg.src = leader.image || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
  }

  // Set press section
  const pressSection = document.getElementById('modalLeaderPress')
  if (leader.press && leader.press.length > 0) {
    pressSection.innerHTML = `
      <h4>Lorem ipsum dolor</h4>
      <ul>
        ${leader.press.map((item) => `<li>${item}</li>`).join('')}
      </ul>
    `
  } else {
    pressSection.innerHTML = ''
  }

  // Set contact section
  const contactSection = document.getElementById('modalLeaderContact')
  if (leader.contact) {
    contactSection.innerHTML = `
      <h4>Telefon raqam</h4>
      ${leader.contact.linkedin ? `<a href="${leader.contact.linkedin}">+998 71 123 45 67</a>` : ''}
    `
  }

  leaderModal.classList.add('active')
  document.body.style.overflow = 'hidden'
}

// Close modal function
function closeLeaderModal() {
  leaderModal.classList.remove('active')
  document.body.style.overflow = ''
}

// Add click listeners to cards
if (leaderCards.length > 0) {
  leaderCards.forEach((card) => {
    card.addEventListener('click', function () {
      const leaderId = this.getAttribute('data-leader')
      if (leaderId) {
        openLeaderModal(leaderId)
      }
    })
  })
}

// Close modal handlers
if (closeModalBtn) {
  closeModalBtn.addEventListener('click', closeLeaderModal)
}

if (leaderModal) {
  leaderModal.addEventListener('click', function (e) {
    if (e.target === leaderModal || e.target.classList.contains('leader-modal-overlay')) {
      closeLeaderModal()
    }
  })
}

// Close modal on Escape key
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && leaderModal.classList.contains('active')) {
    closeLeaderModal()
  }
})

// Google Map init (uses globally loaded Google Maps API)
window.initMap = function () {
  const mapEl = document.getElementById('gmap')
  if (!mapEl || !window.google || !google.maps) return

  const center = { lat: 41.3128851, lng: 69.2425177 }

  const map = new google.maps.Map(mapEl, {
    zoom: 13,
    center,
    disableDefaultUI: true,
    styles: [
      { elementType: 'geometry', stylers: [{ color: '#0f172a' }] },
      { elementType: 'labels.text.stroke', stylers: [{ color: '#0f172a' }] },
      { elementType: 'labels.text.fill', stylers: [{ color: '#cbd5f5' }] },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#8b6b39' }]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#8b6b39' }]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#cbd5f5' }]
      },
      {
        featureType: 'administrative',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#cbd5f5' }]
      },
      { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0d1b2a' }] }
    ]
  })

  new google.maps.Marker({
    position: center,
    map
  })
}

// Testimonials Slider
document.addEventListener('DOMContentLoaded', function () {
  const track = document.querySelector('.testimonials-track')
  if (!track) return

  const cards = document.querySelectorAll('.testimonial-card')
  const nextBtn = document.querySelector('.next-btn')
  const prevBtn = document.querySelector('.prev-btn')
  const dotsContainer = document.querySelector('.slider-dots')

  let currentIndex = 0
  let cardsPerView = 3

  // Calculate cards per view based on window width
  function updateCardsPerView() {
    if (window.innerWidth <= 768) {
      cardsPerView = 1
    } else if (window.innerWidth <= 992) {
      cardsPerView = 2
    } else {
      cardsPerView = 3
    }
    updateSlider()
    createDots()
  }

  // Create dots
  function createDots() {
    dotsContainer.innerHTML = ''
    const totalDots = Math.ceil(cards.length / cardsPerView) // Simple dots or 1 per group? Let's do 1 dot per starting item for simplicity or just total pages
    // Better: number of possible start positions = cards.length - cardsPerView + 1?
    // Or simple paging: Math.ceil(cards.length / cardsPerView) if scrolling by page.
    // Let's scroll one by one.

    const dotCount = cards.length - cardsPerView + 1

    if (dotCount <= 0) return

    for (let i = 0; i < dotCount; i++) {
      const dot = document.createElement('div')
      dot.classList.add('slider-dot')
      if (i === currentIndex) dot.classList.add('active')
      dot.addEventListener('click', () => {
        currentIndex = i
        updateSlider()
      })
      dotsContainer.appendChild(dot)
    }
  }

  function updateSlider() {
    const cardWidth = cards[0].offsetWidth
    const gap = 30 // matches CSS gap
    const moveAmount = (cardWidth + gap) * currentIndex
    track.style.transform = `translateX(-${moveAmount}px)`

    // Update dots
    const dots = document.querySelectorAll('.slider-dot')
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add('active')
      } else {
        dot.classList.remove('active')
      }
    })

    // Update button states
    prevBtn.disabled = currentIndex === 0
    nextBtn.disabled = currentIndex >= cards.length - cardsPerView

    prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1'
    nextBtn.style.opacity = currentIndex >= cards.length - cardsPerView ? '0.5' : '1'
  }

  nextBtn.addEventListener('click', () => {
    if (currentIndex < cards.length - cardsPerView) {
      currentIndex++
      updateSlider()
    }
  })

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--
      updateSlider()
    }
  })

  window.addEventListener('resize', updateCardsPerView)

  // Initial setup
  updateCardsPerView()

  // Auto scroll (optional)
  setInterval(() => {
    if (currentIndex < cards.length - cardsPerView) {
      currentIndex++
    } else {
      currentIndex = 0
    }
    updateSlider()
  }, 5000)
})
