document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll('.social-icons a').forEach(function(el, i) {
    setTimeout(function() {
      el.classList.add('animated');
    }, 100 * i);
  });

  // WhatsApp floating button animation (up-down)
  var waBtn = document.querySelector('.whatsapp-float-btn');
  if (waBtn) {
    let start = null;
    let amplitude = 1.5;
    let period = 380;
    function animateWhatsAppBtn(ts) {
      if (!start) start = ts;
      let elapsed = ts - start;
      let y = Math.sin((elapsed / period) * 2 * Math.PI) * amplitude;
      waBtn.style.transform = `translateY(${y}px)`;
      requestAnimationFrame(animateWhatsAppBtn);
    }
    requestAnimationFrame(animateWhatsAppBtn);
  }

  // Hamburger menu toggle for mobile
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.getElementById('main-nav');
  if (menuToggle && mainNav) {
      menuToggle.addEventListener('click', function() {
          mainNav.classList.toggle('active');
      });
  }

  if (mainNav) {
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            mainNav.classList.remove('active');
        });
    });
  }
});


// --- Room Search Filtering ---
document.addEventListener('DOMContentLoaded', function () {
  const searchForm = document.querySelector('.hero-form');
  if (!searchForm) return;

  // Get all cards in Super Hot and Hot Rooms sections
  const hotRoomCards = Array.from(document.querySelectorAll('.hot-rooms-section .hot-room-card'));

  // Get form fields more robustly
  const selects = searchForm.querySelectorAll('select');
  const areaInput = searchForm.querySelector('.hero-form-row .hero-form-group:nth-child(3) input');
  const textInput = searchForm.querySelector('.hero-searchbar input[type="text"]');

  searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    // Get form values
    const type = selects[0]?.value.toLowerCase() || 'all';
    const city = selects[1]?.value.toLowerCase() || 'all';
    const area = areaInput?.value.toLowerCase() || '';
    const priceOrder = selects[2]?.value.toLowerCase() || '';
    const text = textInput?.value.toLowerCase() || '';

    hotRoomCards.forEach(card => {
      const cardType = card.dataset.type ? card.dataset.type.toLowerCase() : '';
      const cardCity = card.dataset.city ? card.dataset.city.toLowerCase() : '';
      const cardArea = card.querySelector('.hot-room-location')?.textContent.toLowerCase() || '';
      const cardText = card.textContent.toLowerCase();
      let match = true;
      // Type filter
      if (type !== 'all' && cardType !== type) match = false;
      // City filter
      if (city !== 'all' && cardCity !== city) match = false;
      // Area filter
      if (area && !cardArea.includes(area)) match = false;
      // Text search
      if (text && !cardText.includes(text)) match = false;
      // Show/hide card
      card.style.display = match ? '' : 'none';
    });

    // Optionally, sort by price
    if (priceOrder === 'high to low' || priceOrder === 'low to high') {
      const grid = document.querySelector('.hot-rooms-section .hot-rooms-grid');
      if (grid) {
        const sorted = hotRoomCards.slice().sort((a, b) => {
          const priceA = parseInt(a.querySelector('.hot-room-price')?.textContent.replace(/[^\d]/g, '')) || 0;
          const priceB = parseInt(b.querySelector('.hot-room-price')?.textContent.replace(/[^\d]/g, '')) || 0;
          return priceOrder === 'high to low' ? priceB - priceA : priceA - priceB;
        });
        sorted.forEach(card => grid.appendChild(card));
      }
    }
  });

  // Reset filter if all fields are cleared
  searchForm.addEventListener('reset', function () {
    hotRoomCards.forEach(card => card.style.display = '');
  });

  // Book Now button logic
  document.querySelectorAll('.book-now-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const card = btn.closest('.hot-room-card, .new-room-card, .property-card');
      if (!card) return;
      const roomData = {
        title: card.dataset.title,
        price: card.dataset.price,
        period: card.dataset.period,
        location: card.dataset.location,
        img: card.dataset.img,
        features: card.dataset.features,
        description: card.dataset.description,
        owner: card.dataset.owner
      };
      localStorage.setItem('selectedRoom', JSON.stringify(roomData));
      window.location.href = '../Home/roomDetail.html';
    });
  });
});
