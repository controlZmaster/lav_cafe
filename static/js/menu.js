const MENU_DATA = [
  { id: 'e1', category: 'entrees', name: 'Жульен грибной', description: '150 гр - шампиньыаны, лук, сливки, сыр', price: 370, badge: null, allergens: [] },
  { id: 'e2', category: 'entrees', name: 'Шампиньоны фаршированные', description: '200 гр - с помидорами или ветчиной, сметана, лук,сыр', price: 460, badge: null, allergens: [] },
  { id: 'e3', category: 'entrees', name: 'Баклажаны с чесноком', description: '150 гр - на оливковом масле с зеленью', price: 350, badge: null, allergens: [] },
  { id: 'e4', category: 'entrees', name: 'Жареный сулугуни', description: '150 гр - с ягодным соусом', price: 480, badge: null, allergens: [] },
  { id: 'e5', category: 'entrees', name: 'Сырные палочки из мацареллы', description: '200/30 гр - с пикантным соусом', price: 520, badge: null, allergens: [] },
  { id: 'e6', category: 'entrees', name: 'Креветки отварные в пиве', description: '150 гр', price: 650, badge: null, allergens: ['gluten'] },
  { id: 'e7', category: 'entrees', name: 'Тигровые креветки', description: '200/50 гр - с ромовым соусом ', price: 920, badge: null, allergens: [] },
  { id: 'e8', category: 'entrees', name: 'Пенне дель фатторе', description: '350 гр - печене, филе куриное, помидоры вяленые, пицца-соус, пармезан, маслины, помидоры черри, сливки', price: 740, badge: null, allergens: [] },
  { id: 'e9', category: 'entrees', name: 'Феттучини с сыром', description: '350 гр - феттучини, пармезан, сливки', price: 540, badge: null, allergens: [] },
  { id: 'e10', category: 'entrees', name: 'Паста карбонара', description: '350 гр - феттучини, пармезан, сливки', price: 670, badge: null, allergens: [] },

  { id: 's1', category: 'soupes', name: 'Bortsch traditionnel', description: 'Soupe de betteraves avec bœuf et crème fraîche', price: 450, badge: 'populaire', allergens: [] },
  { id: 's2', category: 'soupes', name: 'Solianka', description: 'Soupe aigre-piquante aux viandes et cornichons', price: 480, badge: null, allergens: [] },
  { id: 's3', category: 'soupes', name: 'Chtchi', description: 'Soupe au chou et viande de bœuf', price: 420, badge: null, allergens: [] },
  { id: 's4', category: 'soupes', name: 'Okrochka', description: 'Soupe froide au kvas et légumes', price: 440, badge: null, allergens: [] },
  
  { id: 'p1', category: 'plats', name: 'Bœuf Stroganov', description: 'Émincé de bœuf à la crème et champignons', price: 890, badge: 'populaire', allergens: [] },
  { id: 'p2', category: 'plats', name: 'Poulet Kotchet', description: 'Escalopes de poulet panées farcies au beurre', price: 750, badge: null, allergens: [] },
  { id: 'p3', category: 'plats', name: 'Pelmeni', description: 'Raviolis russes farcis à la viande', price: 620, badge: 'populaire', allergens: [] },
  { id: 'p4', category: 'plats', name: 'Golubtsy', description: 'Feuilles de chou farcies à la viande et riz', price: 680, badge: null, allergens: [] },
  
  { id: 'a1', category: 'accompagnements', name: 'Kasha de sarrasin', description: 'Gruau de sarrasin grillé au beurre', price: 280, badge: null, allergens: [] },
  { id: 'a2', category: 'accompagnements', name: 'Pommes de terre rôties', description: 'Pommes de terre dorées aux herbes', price: 290, badge: null, allergens: [] },
  { id: 'a3', category: 'accompagnements', name: 'Légumes grillés', description: 'Assortiment de légumes de saison', price: 320, badge: null, allergens: [] },
  
  { id: 'sp1', category: 'specialites', name: 'Vareniki au fromage', description: 'Raviolis sucrés au fromage blanc', price: 540, badge: null, allergens: [] },
  { id: 'sp2', category: 'specialites', name: 'Chakhokhbili', description: 'Ragoût de poulet aux tomates et épices', price: 820, badge: 'nouveau', allergens: [] },
  { id: 'sp3', category: 'specialites', name: 'Syrniki', description: 'Galettes de fromage blanc dorées', price: 480, badge: null, allergens: [] },
  { id: 'sp4', category: 'specialites', name: 'Chebureki', description: 'Chaussons frits farcis à la viande', price: 520, badge: 'populaire', allergens: [] },
  
  { id: 'd1', category: 'desserts', name: 'Napoléon', description: 'Mille-feuille à la crème pâtissière', price: 380, badge: 'populaire', allergens: [] },
  { id: 'd2', category: 'desserts', name: 'Medovik', description: 'Gâteau au miel et crème', price: 360, badge: null, allergens: [] },
  { id: 'd3', category: 'desserts', name: 'Blinis au miel', description: 'Crêpes russes servies avec miel et confiture', price: 320, badge: null, allergens: [] },
  { id: 'd4', category: 'desserts', name: 'Ptichye moloko', description: 'Gâteau mousseux au chocolat', price: 390, badge: 'nouveau', allergens: [] },
  
  { id: 'b1', category: 'boissons', name: 'Kvas artisanal', description: 'Boisson fermentée traditionnelle au pain', price: 220, badge: null, allergens: [] },
  { id: 'b2', category: 'boissons', name: 'Thé russe', description: 'Thé noir servi avec confiture', price: 180, badge: null, allergens: [] },
  { id: 'b3', category: 'boissons', name: 'Kompot maison', description: 'Boisson aux fruits de saison', price: 200, badge: null, allergens: [] },
  { id: 'b4', category: 'boissons', name: 'Mors aux airelles', description: 'Jus de baies rouges rafraîchissant', price: 210, badge: null, allergens: [] }
];

const CATEGORY_LABELS = {
  entrees: 'Горячие Закуски',
  soupes: 'Первые блюда',
  plats: 'Гарниры',
  accompagnements: 'Соусы',
  specialites: 'Русские специалитеты',
  desserts: 'Десерты',
  boissons: 'Напитки'
};

let currentFilter = '';
let searchDebounceTimer = null;

document.addEventListener('DOMContentLoaded', () => {
  renderMenu();
  setupSearch();
  setupCategoryNav();
  setupAddToCart();
  initCart();
  
  setTimeout(() => {
  }, 100);
});

function initCart() {
  if (!window.Cart) return;
  window.Cart.loadCart();
  window.Cart.initCartUI();
  window.Cart.renderCart();
  window.Cart.updateCartBadge();
  window.Cart.updateMobileBottomBar();
}

function renderMenu(filterQuery = '') {
  const container = document.getElementById('menu-container');
  const noResults = document.getElementById('no-results');
  const searchQueryEl = document.getElementById('search-query');
  
  if (!container) return;
  
  let filteredData = MENU_DATA;
  
  if (filterQuery) {
    const query = filterQuery.toLowerCase();
    filteredData = MENU_DATA.filter(item => 
      item.name.toLowerCase().includes(query) || 
      item.description.toLowerCase().includes(query)
    );
  }
  
  if (filteredData.length === 0) {
    container.innerHTML = '';
    if (noResults) {
      noResults.style.display = 'block';
      if (searchQueryEl) searchQueryEl.textContent = filterQuery;
    }
    return;
  }
  
  if (noResults) noResults.style.display = 'none';
  
  const categories = ['entrees', 'soupes', 'plats', 'accompagnements', 'specialites', 'desserts', 'boissons'];
  
  container.innerHTML = categories.map(category => {
    const items = filteredData.filter(item => item.category === category);
    
    if (items.length === 0) return '';
    
    return `
      <section class="menu-section" id="${category}">
        <div class="section-header">
          <h2 class="section-title">${CATEGORY_LABELS[category]}</h2>
        </div>
        <div class="menu-grid">
          ${items.map(item => renderMenuItem(item)).join('')}
        </div>
      </section>
    `;
  }).join('');
}

function renderMenuItem(item) {
  const allergenIcons = item.allergens.map(allergen => {
    const icons = {
      gluten: '🌾',
      dairy: '🥛',
      nuts: '🥜'
    };
    return `<span class="allergen-icon" title="${allergen}">${icons[allergen] || ''}</span>`;
  }).join('');
  
  return `
    <div class="menu-item">
      <div class="item-image">
        ${item.badge ? `<div class="item-badge ${item.badge}">${item.badge}</div>` : ''}
      </div>
      <div class="item-content">
        <h3 class="item-name">${item.name}</h3>
        <p class="item-description">${item.description}</p>
        ${allergenIcons ? `<div class="item-allergens">${allergenIcons}</div>` : ''}
        <div class="item-footer">
          <div class="item-price">${item.price} ₽</div>
          <button
            class="add-to-cart-btn"
            type="button"
            aria-label="Добавить в корзину"
            data-action="add-to-cart"
            data-id="${item.id}"
          >+</button>
        </div>
      </div>
    </div>
  `;
}

function setupAddToCart() {
  const container = document.getElementById('menu-container');
  if (!container) return;

  container.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action="add-to-cart"]');
    if (!btn) return;

    e.preventDefault();
    e.stopPropagation();

    const id = btn.getAttribute('data-id');
    const item = MENU_DATA.find(i => i.id === id);
    if (!item || !window.Cart) return;

    window.Cart.addItem({ id: item.id, name: item.name, price: item.price });

    const card = btn.closest('.menu-item');
    if (card) {
      card.classList.remove('just-added');
      void card.offsetWidth; // force reflow to restart animation
      card.classList.add('just-added');
      setTimeout(() => card.classList.remove('just-added'), 450);
    }

    if (window.LavCafe && window.LavCafe.Toast) {
      window.LavCafe.Toast.success('Добавлено', 1200);
    }
  });
}

function setupSearch() {
  const searchInput = document.getElementById('search-input');
  const searchClear = document.getElementById('search-clear');
  
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim();
      if (searchDebounceTimer) {
        clearTimeout(searchDebounceTimer);
      }

      // Debounce to avoid full menu rerender on every keystroke.
      searchDebounceTimer = setTimeout(() => {
        if (query === currentFilter) return;
        currentFilter = query;
        renderMenu(query);
      }, 120);
      
      if (searchClear) {
        searchClear.style.display = query ? 'block' : 'none';
      }
    });
  }
  
  if (searchClear) {
    searchClear.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        if (searchDebounceTimer) {
          clearTimeout(searchDebounceTimer);
        }
        currentFilter = '';
        renderMenu('');
        searchClear.style.display = 'none';
      }
    });
  }
}

function setupCategoryNav() {
  const categoryLinks = document.querySelectorAll('.category-link');
  
  categoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      categoryLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      
      const category = link.getAttribute('data-category');
      const section = document.getElementById(category);
      
      if (section) {
        const offset = 90;
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
      
      const sidebar = document.getElementById('category-sidebar');
      const overlay = document.getElementById('cart-overlay');
      if (sidebar && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        if (overlay) overlay.classList.remove('show');
      }
    });
  });
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        categoryLinks.forEach(link => {
          if (link.getAttribute('data-category') === id) {
            categoryLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-100px 0px -70% 0px'
  });
  
  document.querySelectorAll('.menu-section').forEach(section => {
    observer.observe(section);
  });
}
