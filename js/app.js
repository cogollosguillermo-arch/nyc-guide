/**
 * The NYC Compass - Main Application Logic
 */

// Application State
const state = {
  activeTab: 'all',          // 'all', 'eat', 'visit', 'nightlife', 'culture', 'facts'
  selectedBorough: 'all',    // 'all', 'Manhattan', 'Brooklyn', 'Queens', 'The Bronx', 'Staten Island'
  searchQuery: '',
  priceFilter: 'all',
  activeFactCategory: 'all',
  itinerary: JSON.parse(localStorage.getItem('nyc_itinerary') || '[]')
};

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  setupEventListeners();
  updateItineraryBadge();
  renderCurrentView();
  lucide.createIcons();
}

// Event Listeners Setup
function setupEventListeners() {
  // Navigation Tabs
  document.querySelectorAll('[data-tab]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetTab = e.currentTarget.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });

  // Borough Filter Buttons
  document.querySelectorAll('[data-borough]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('[data-borough]').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      state.selectedBorough = e.currentTarget.getAttribute('data-borough');
      renderCards();
    });
  });

  // Price Filter Select
  const priceSelect = document.getElementById('priceFilter');
  if (priceSelect) {
    priceSelect.addEventListener('change', (e) => {
      state.priceFilter = e.target.value;
      renderCards();
    });
  }

  // Live Search Input (Hero & Main)
  const searchInputs = [document.getElementById('mainSearchInput'), document.getElementById('heroSearchInput')];
  searchInputs.forEach(input => {
    if (input) {
      input.addEventListener('input', (e) => {
        state.searchQuery = e.target.value.toLowerCase().trim();
        // Sync both inputs
        searchInputs.forEach(other => {
          if (other && other !== e.target) other.value = e.target.value;
        });

        // If user was on culture or facts and searches, switch to 'all' places view if query is non-empty
        if (state.searchQuery && (state.activeTab === 'culture' || state.activeTab === 'facts')) {
          switchTab('all');
        } else {
          renderCards();
        }
      });
    }
  });

  // Itinerary Drawer Toggle
  const openItineraryBtn = document.getElementById('openItineraryBtn');
  const closeItineraryBtn = document.getElementById('closeItineraryBtn');
  const itineraryDrawer = document.getElementById('itineraryDrawer');
  const itineraryBackdrop = document.getElementById('itineraryBackdrop');

  if (openItineraryBtn && itineraryDrawer && itineraryBackdrop) {
    openItineraryBtn.addEventListener('click', () => openItinerary());
    closeItineraryBtn.addEventListener('click', () => closeItinerary());
    itineraryBackdrop.addEventListener('click', () => closeItinerary());
  }

  // Modal Close
  const closeModalBtn = document.getElementById('closeModalBtn');
  const placeModal = document.getElementById('placeModal');
  if (closeModalBtn && placeModal) {
    closeModalBtn.addEventListener('click', () => closeModal());
    placeModal.addEventListener('click', (e) => {
      if (e.target === placeModal) closeModal();
    });
  }

  // Keyboard Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeItinerary();
    }
  });

  // Clear Itinerary
  const clearItineraryBtn = document.getElementById('clearItineraryBtn');
  if (clearItineraryBtn) {
    clearItineraryBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear your entire NYC Itinerary?')) {
        state.itinerary = [];
        saveItinerary();
        renderItinerary();
        updateItineraryBadge();
        renderCards();
        showToast('Itinerary cleared');
      }
    });
  }

  // Print Itinerary
  const printItineraryBtn = document.getElementById('printItineraryBtn');
  if (printItineraryBtn) {
    printItineraryBtn.addEventListener('click', () => {
      window.print();
    });
  }
}

// Tab Switching
function switchTab(tabId) {
  state.activeTab = tabId;

  // Update nav buttons
  document.querySelectorAll('[data-tab]').forEach(btn => {
    if (btn.getAttribute('data-tab') === tabId) {
      btn.classList.add('text-amber-400', 'border-amber-400');
      btn.classList.remove('text-slate-400', 'border-transparent');
    } else {
      btn.classList.remove('text-amber-400', 'border-amber-400');
      btn.classList.add('text-slate-400', 'border-transparent');
    }
  });

  // Visibility of Sections
  const placesSection = document.getElementById('placesSection');
  const cultureSection = document.getElementById('cultureSection');
  const factsSection = document.getElementById('factsSection');
  const filterToolbar = document.getElementById('filterToolbar');

  if (tabId === 'culture') {
    placesSection.classList.add('hidden');
    factsSection.classList.add('hidden');
    cultureSection.classList.remove('hidden');
    filterToolbar.classList.add('hidden');
    renderCultureSection();
  } else if (tabId === 'facts') {
    placesSection.classList.add('hidden');
    cultureSection.classList.add('hidden');
    factsSection.classList.remove('hidden');
    filterToolbar.classList.add('hidden');
    renderFactsSection();
  } else {
    // 'all', 'eat', 'visit', 'nightlife'
    cultureSection.classList.add('hidden');
    factsSection.classList.add('hidden');
    placesSection.classList.remove('hidden');
    filterToolbar.classList.remove('hidden');
    renderCards();
  }

  window.scrollTo({ top: document.getElementById('mainContent').offsetTop - 80, behavior: 'smooth' });
}

// Render Current Active View
function renderCurrentView() {
  if (state.activeTab === 'culture') {
    renderCultureSection();
  } else if (state.activeTab === 'facts') {
    renderFactsSection();
  } else {
    renderCards();
  }
}

// Subway Bullet Generator Helper
function formatSubwayLines(subwayStr) {
  if (!subwayStr) return '';
  // Match single letters or numbers that look like train lines
  return subwayStr.replace(/\b([1-7]|[A-G]|J|L|M|N|Q|R|W|Z|S)\b/g, (match) => {
    return `<span class="subway-bullet subway-${match}">${match}</span>`;
  });
}

// Filter and Render Places Cards
function renderCards() {
  const container = document.getElementById('placesGrid');
  const emptyState = document.getElementById('emptyState');
  if (!container) return;

  const filtered = NYC_PLACES.filter(place => {
    // Category match
    const matchesCategory = (state.activeTab === 'all') || (place.category === state.activeTab);

    // Borough match
    const matchesBorough = (state.selectedBorough === 'all') || (place.borough === state.selectedBorough);

    // Price match
    const matchesPrice = (state.priceFilter === 'all') || (place.price === state.priceFilter);

    // Search query match (name, neighborhood, description, tags, mustTry)
    const matchesQuery = !state.searchQuery || (
      place.name.toLowerCase().includes(state.searchQuery) ||
      place.neighborhood.toLowerCase().includes(state.searchQuery) ||
      place.borough.toLowerCase().includes(state.searchQuery) ||
      place.shortDesc.toLowerCase().includes(state.searchQuery) ||
      place.subCategory.toLowerCase().includes(state.searchQuery) ||
      place.tags.some(t => t.toLowerCase().includes(state.searchQuery)) ||
      place.mustTry.some(m => m.toLowerCase().includes(state.searchQuery))
    );

    return matchesCategory && matchesBorough && matchesPrice && matchesQuery;
  });

  // Update Places Counter
  const countBadge = document.getElementById('placesCountBadge');
  if (countBadge) {
    countBadge.textContent = `${filtered.length} Destinatons Found`;
  }

  if (filtered.length === 0) {
    container.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  container.innerHTML = filtered.map(place => {
    const isSaved = state.itinerary.includes(place.id);
    const categoryIcon = place.category === 'eat' ? 'utensils' : place.category === 'visit' ? 'landmark' : 'cocktail';
    const categoryColor = place.category === 'eat' ? 'text-amber-400 bg-amber-950/40 border-amber-500/30' :
                          place.category === 'visit' ? 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30' :
                          'text-purple-400 bg-purple-950/40 border-purple-500/30';

    return `
      <div class="glass-card rounded-2xl overflow-hidden flex flex-col group relative">
        <!-- Card Image -->
        <div class="relative h-52 w-full overflow-hidden bg-slate-800">
          <img 
            src="${place.image}" 
            alt="${place.name}" 
            loading="lazy"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onerror="this.src='https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=800&q=80'"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent"></div>

          <!-- Top Badge: Category -->
          <div class="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${categoryColor}">
            <i data-lucide="${categoryIcon}" class="w-3.5 h-3.5"></i>
            <span>${place.category.toUpperCase()}</span>
          </div>

          <!-- Top Action: Bookmark Button -->
          <button 
            onclick="event.stopPropagation(); toggleItinerary('${place.id}')"
            class="absolute top-3 right-3 w-9 h-9 rounded-full bg-slate-900/80 backdrop-blur border border-white/10 flex items-center justify-center text-slate-300 hover:text-amber-400 transition-colors shadow-lg"
            title="${isSaved ? 'Remove from Itinerary' : 'Save to Itinerary'}"
          >
            <i data-lucide="${isSaved ? 'bookmark-check' : 'bookmark'}" class="w-4 h-4 ${isSaved ? 'text-amber-400 fill-amber-400' : ''}"></i>
          </button>

          <!-- Price & Borough on bottom edge of image -->
          <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
            <span class="px-2 py-0.5 rounded-md bg-slate-900/90 text-amber-400 font-bold border border-amber-500/30">
              ${place.price}
            </span>
            <span class="px-2 py-0.5 rounded-md bg-slate-900/80 text-slate-300 font-medium">
              📍 ${place.neighborhood}, ${place.borough}
            </span>
          </div>
        </div>

        <!-- Card Content -->
        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div class="text-xs font-medium text-amber-500 mb-1 tracking-wide uppercase">
              ${place.subCategory}
            </div>
            <h3 class="text-xl font-bold text-white group-hover:text-amber-400 transition-colors font-serif-title mb-2">
              ${place.name}
            </h3>
            <p class="text-sm text-slate-400 line-clamp-2 mb-4 leading-relaxed">
              ${place.shortDesc}
            </p>
          </div>

          <div>
            <!-- Must-Try Preview -->
            <div class="bg-slate-900/60 rounded-xl p-2.5 mb-4 border border-white/5 text-xs">
              <span class="text-slate-400 font-semibold block mb-1">
                ${place.category === 'eat' ? '⭐ Signature Dish:' : '⭐ Key Highlight:'}
              </span>
              <span class="text-slate-200">${place.mustTry[0]}</span>
            </div>

            <!-- Card Bottom Bar -->
            <div class="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
              <div class="flex items-center gap-1 text-amber-400 font-semibold">
                <span>★</span>
                <span>${place.rating}</span>
                <span class="text-slate-500 font-normal">(${place.reviewsCount})</span>
              </div>
              <button 
                onclick="openPlaceModal('${place.id}')"
                class="inline-flex items-center gap-1 font-semibold text-amber-400 hover:text-amber-300 transition-colors"
              >
                <span>Deep Dive</span>
                <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  lucide.createIcons();
}

// Modal Deep Dive
function openPlaceModal(placeId) {
  const place = NYC_PLACES.find(p => p.id === placeId);
  if (!place) return;

  const modal = document.getElementById('placeModal');
  const modalContent = document.getElementById('modalDetails');
  const isSaved = state.itinerary.includes(place.id);

  modalContent.innerHTML = `
    <div class="relative h-72 sm:h-96 w-full overflow-hidden bg-slate-900">
      <img 
        src="${place.image}" 
        alt="${place.name}" 
        class="w-full h-full object-cover"
        onerror="this.src='https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=800&q=80'"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
      
      <div class="absolute bottom-6 left-6 right-6">
        <div class="flex items-center gap-2 mb-2 flex-wrap">
          <span class="px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500 text-slate-950">
            ${place.category.toUpperCase()}
          </span>
          <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-900/90 text-amber-400 border border-amber-500/30">
            ${place.price}
          </span>
          <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-900/80 text-slate-200">
            📍 ${place.neighborhood}, ${place.borough}
          </span>
        </div>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-white font-serif-title leading-tight">
          ${place.name}
        </h2>
      </div>
    </div>

    <div class="p-6 sm:p-8 space-y-6">
      <!-- Description -->
      <div>
        <h4 class="text-xs uppercase tracking-widest text-amber-500 font-bold mb-2">The Story & Heritage</h4>
        <p class="text-slate-300 leading-relaxed text-base sm:text-lg">
          ${place.fullDesc}
        </p>
      </div>

      <!-- Quick Logistics Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900/80 p-5 rounded-2xl border border-white/5">
        <div class="flex items-start gap-3">
          <div class="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
            <i data-lucide="map-pin" class="w-5 h-5"></i>
          </div>
          <div>
            <div class="text-xs font-bold text-slate-400 uppercase">Exact Address</div>
            <div class="text-sm font-medium text-slate-200">${place.address}</div>
          </div>
        </div>

        <div class="flex items-start gap-3">
          <div class="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
            <i data-lucide="train" class="w-5 h-5"></i>
          </div>
          <div>
            <div class="text-xs font-bold text-slate-400 uppercase">Subway Transit Directions</div>
            <div class="text-sm font-medium text-slate-200 flex items-center flex-wrap gap-1 mt-0.5">
              ${formatSubwayLines(place.subway)}
            </div>
          </div>
        </div>
      </div>

      <!-- Must-Try / Key Highlights -->
      <div>
        <h4 class="text-xs uppercase tracking-widest text-amber-500 font-bold mb-3">
          ${place.category === 'eat' ? '🍽️ What To Order (Must-Try Items)' : '✨ Key Highlights & Sights'}
        </h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          ${place.mustTry.map(item => `
            <div class="flex items-center gap-2.5 bg-slate-900/40 p-3 rounded-xl border border-white/5 text-sm text-slate-200">
              <span class="w-2 h-2 rounded-full bg-amber-400 shrink-0"></span>
              <span>${item}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Insider Pro Tip -->
      <div class="bg-amber-500/10 border border-amber-500/30 p-5 rounded-2xl flex items-start gap-4">
        <div class="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 font-bold text-lg">
          💡
        </div>
        <div>
          <h5 class="text-sm font-bold text-amber-300 uppercase tracking-wide mb-1">Local New Yorker Insider Tip</h5>
          <p class="text-sm text-amber-100/90 leading-relaxed">${place.proTip}</p>
        </div>
      </div>

      <!-- Tags & External Reference -->
      <div class="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
        <div class="flex flex-wrap gap-1.5">
          ${place.tags.map(tag => `
            <span class="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-400">#${tag}</span>
          `).join('')}
        </div>

        <div class="flex items-center gap-3">
          ${place.wikipediaUrl ? `
            <a 
              href="${place.wikipediaUrl}" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-xs inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
            >
              <span>Wikipedia Article</span>
              <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
            </a>
          ` : ''}

          <button 
            onclick="toggleItinerary('${place.id}')"
            id="modalItineraryBtn"
            class="px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-lg ${
              isSaved 
                ? 'bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30' 
                : 'bg-amber-500 text-slate-950 hover:bg-amber-400'
            }"
          >
            <i data-lucide="${isSaved ? 'trash-2' : 'bookmark'}" class="w-4 h-4"></i>
            <span>${isSaved ? 'Remove from My Plan' : 'Add to My NYC Plan'}</span>
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  document.body.classList.add('overflow-hidden');
  lucide.createIcons();
}

function closeModal() {
  const modal = document.getElementById('placeModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
}

// Render Culture & History Tab
function renderCultureSection() {
  const container = document.getElementById('cultureContent');
  if (!container) return;

  const { overview, eras, boroughs, architecture } = NYC_CULTURE;

  container.innerHTML = `
    <!-- Wikipedia Overview Banner -->
    <div class="glass-card rounded-3xl p-8 sm:p-10 mb-12 border-amber-500/20 relative overflow-hidden">
      <div class="absolute -right-16 -top-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div class="max-w-4xl">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30 mb-4">
          <i data-lucide="book-open" class="w-3.5 h-3.5"></i>
          <span>Wikipedia Grounded & City Records</span>
        </div>
        <h2 class="text-3xl sm:text-5xl font-extrabold text-white font-serif-title mb-4 leading-tight">
          ${overview.title}
        </h2>
        <p class="text-lg text-slate-300 leading-relaxed mb-6 font-light">
          ${overview.summary}
        </p>
        <a 
          href="${overview.wikipediaLink}" 
          target="_blank" 
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 text-sm font-bold text-amber-400 hover:text-amber-300 transition-colors"
        >
          <span>Read Full New York City Wikipedia Entry</span>
          <i data-lucide="arrow-up-right" class="w-4 h-4"></i>
        </a>
      </div>

      <!-- Quick Stats Counter Strip -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-8 pt-8 border-t border-slate-800">
        ${overview.quickStats.map(stat => `
          <div class="bg-slate-900/60 p-4 rounded-xl border border-white/5 text-center">
            <div class="text-2xl sm:text-3xl font-extrabold text-amber-400 font-cinzel">${stat.value}</div>
            <div class="text-xs text-slate-400 mt-1 uppercase font-semibold">${stat.label}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- The 5 Boroughs In-Depth -->
    <div class="mb-16">
      <div class="text-center max-w-2xl mx-auto mb-10">
        <h3 class="text-2xl sm:text-3xl font-bold text-white font-serif-title mb-2">The Five Boroughs of New York</h3>
        <p class="text-slate-400 text-sm">United under the Great Consolidation Charter of 1898, each borough operates with its own distinct soul, history, and culture.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${boroughs.map(b => `
          <div class="glass-card rounded-2xl p-6 flex flex-col justify-between border-slate-800">
            <div>
              <div class="flex items-center justify-between mb-3">
                <h4 class="text-2xl font-bold text-white font-serif-title">${b.name}</h4>
                <span class="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-amber-400 font-semibold border border-amber-500/20">${b.nickname}</span>
              </div>
              <div class="text-xs text-slate-400 mb-4 flex items-center gap-4">
                <span>👥 ${b.population}</span>
                <span>📐 ${b.area}</span>
              </div>
              <p class="text-sm text-slate-300 leading-relaxed mb-4">
                ${b.character}
              </p>
            </div>

            <div>
              <div class="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">Iconic Landmarks:</div>
              <div class="flex flex-wrap gap-1.5 mb-4">
                ${b.iconicSpots.map(s => `
                  <span class="text-xs px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-white/5">${s}</span>
                `).join('')}
              </div>
              <div class="text-xs text-slate-400 italic bg-slate-900/40 p-2.5 rounded-lg border border-white/5">
                "${b.vibe}"
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Chronological Historical Timeline -->
    <div class="mb-16">
      <div class="text-center max-w-2xl mx-auto mb-10">
        <h3 class="text-2xl sm:text-3xl font-bold text-white font-serif-title mb-2">400 Years of New York History</h3>
        <p class="text-slate-400 text-sm">From Lenape trails to Dutch fortresses, American revolutions, and soaring Art Deco pinnacles.</p>
      </div>

      <div class="relative border-l-2 border-amber-500/30 ml-4 md:ml-32 space-y-12">
        ${eras.map(era => `
          <div class="relative pl-8 sm:pl-10">
            <!-- Timeline Marker Dot -->
            <div class="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-amber-500 shadow-md shadow-amber-500/50 ring-4 ring-slate-950"></div>
            
            <div class="glass-card rounded-2xl p-6 sm:p-8">
              <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span class="text-sm font-bold text-amber-400 tracking-wider font-cinzel">${era.era}</span>
                <span class="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold">${era.badge}</span>
              </div>
              <h4 class="text-2xl font-bold text-white font-serif-title mb-3">${era.title}</h4>
              <p class="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">${era.description}</p>
              
              <div class="space-y-1.5 pt-3 border-t border-slate-800">
                ${era.highlights.map(h => `
                  <div class="flex items-start gap-2 text-xs sm:text-sm text-slate-400">
                    <span class="text-amber-400 mt-0.5">✓</span>
                    <span>${h}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Architecture Guide -->
    <div>
      <div class="text-center max-w-2xl mx-auto mb-10">
        <h3 class="text-2xl sm:text-3xl font-bold text-white font-serif-title mb-2">Architectural Evolution</h3>
        <p class="text-slate-400 text-sm">The iconic movements that shaped the most famous skyline on Earth.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${architecture.map(arch => `
          <div class="glass-card rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <span class="text-xs font-bold text-amber-500 uppercase tracking-wider">${arch.period}</span>
              <h4 class="text-xl font-bold text-white font-serif-title my-2">${arch.style}</h4>
              <p class="text-sm text-slate-300 leading-relaxed mb-4">${arch.description}</p>
            </div>
            <div class="bg-slate-900/60 p-3 rounded-xl border border-white/5 text-xs text-amber-300 font-medium">
              🏛️ <strong>Key Examples:</strong> ${arch.iconicExample}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  lucide.createIcons();
}

// Render Facts & Secrets Tab
function renderFactsSection() {
  const container = document.getElementById('factsContent');
  if (!container) return;

  const categories = [
    { id: 'all', label: 'All Trivia & Secrets' },
    { id: 'underground', label: 'Underground & Transit' },
    { id: 'engineering', label: 'Engineering Marvels' },
    { id: 'food-lore', label: 'Food Lore' },
    { id: 'history', label: 'Historic Curiosities' }
  ];

  const filteredFacts = state.activeFactCategory === 'all'
    ? NYC_FACTS
    : NYC_FACTS.filter(f => f.category === state.activeFactCategory);

  container.innerHTML = `
    <!-- Top Header & Shuffler -->
    <div class="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 glass-card rounded-3xl p-8 border-amber-500/20">
      <div>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30 mb-3">
          <i data-lucide="sparkles" class="w-3.5 h-3.5"></i>
          <span>Mind-Blowing City Secrets</span>
        </div>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-white font-serif-title mb-2">
          Did You Know? NYC Trivia Vault
        </h2>
        <p class="text-slate-300 text-sm max-w-xl">
          Verified historical oddities, engineering anomalies, and hidden underground chambers that even lifelong New Yorkers don't know.
        </p>
      </div>

      <button 
        onclick="shuffleRandomFact()"
        class="shrink-0 px-6 py-3.5 rounded-2xl bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 transition-all flex items-center gap-2 shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95"
      >
        <i data-lucide="shuffle" class="w-4 h-4"></i>
        <span>Surprise Me With a Fact!</span>
      </button>
    </div>

    <!-- Category Filters -->
    <div class="flex flex-wrap gap-2 mb-8 justify-center">
      ${categories.map(cat => `
        <button 
          onclick="filterFacts('${cat.id}')"
          class="px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${
            state.activeFactCategory === cat.id 
              ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold shadow-lg shadow-amber-500/25' 
              : 'bg-slate-900/60 text-slate-400 border-white/5 hover:border-slate-700 hover:text-white'
          }"
        >
          ${cat.label}
        </button>
      `).join('')}
    </div>

    <!-- Spotlight Random Fact Banner (Hidden until triggered or default) -->
    <div id="spotlightFact" class="mb-10 hidden animate-fade-in"></div>

    <!-- Facts Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      ${filteredFacts.map(fact => `
        <div class="glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between border-slate-800 relative group">
          <div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-xs px-3 py-1 rounded-full bg-slate-800 text-amber-400 font-bold border border-amber-500/20">
                ${fact.categoryLabel}
              </span>
              <span class="text-xs text-slate-500 font-mono">#FACT-${fact.id}</span>
            </div>
            
            <h3 class="text-xl sm:text-2xl font-bold text-white font-serif-title mb-3 group-hover:text-amber-400 transition-colors">
              ${fact.title}
            </h3>
            
            <p class="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              ${fact.fact}
            </p>
          </div>

          <div class="bg-slate-900/80 p-4 rounded-xl border border-amber-500/20 flex items-start gap-3">
            <span class="text-base">💡</span>
            <div class="text-xs text-amber-200/90 leading-relaxed font-medium">
              ${fact.didYouKnow}
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  lucide.createIcons();
}

function filterFacts(categoryId) {
  state.activeFactCategory = categoryId;
  renderFactsSection();
}

function shuffleRandomFact() {
  const randomIndex = Math.floor(Math.random() * NYC_FACTS.length);
  const fact = NYC_FACTS[randomIndex];

  const spotlight = document.getElementById('spotlightFact');
  if (spotlight) {
    spotlight.innerHTML = `
      <div class="bg-gradient-to-r from-amber-500/20 via-slate-900 to-amber-500/20 p-8 rounded-3xl border-2 border-amber-500 shadow-2xl relative">
        <div class="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">🎲 Spotlight Random NYC Secret</div>
        <h3 class="text-2xl sm:text-3xl font-extrabold text-white font-serif-title mb-3">${fact.title}</h3>
        <p class="text-slate-200 text-base leading-relaxed mb-4">${fact.fact}</p>
        <div class="text-xs text-amber-300 font-semibold bg-slate-950/60 p-3 rounded-xl border border-amber-500/30">
          ✨ ${fact.didYouKnow}
        </div>
      </div>
    `;
    spotlight.classList.remove('hidden');
    spotlight.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// Itinerary Operations
function toggleItinerary(placeId) {
  const index = state.itinerary.indexOf(placeId);
  const place = NYC_PLACES.find(p => p.id === placeId);
  const placeName = place ? place.name : 'Destination';

  if (index > -1) {
    state.itinerary.splice(index, 1);
    showToast(`Removed "${placeName}" from your plan`);
  } else {
    state.itinerary.push(placeId);
    showToast(`Added "${placeName}" to your NYC plan!`);
  }

  saveItinerary();
  updateItineraryBadge();
  renderCards();

  // If modal is open, re-render its button
  const modalBtn = document.getElementById('modalItineraryBtn');
  if (modalBtn) {
    const isSaved = state.itinerary.includes(placeId);
    modalBtn.className = `px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-lg ${
      isSaved 
        ? 'bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30' 
        : 'bg-amber-500 text-slate-950 hover:bg-amber-400'
    }`;
    modalBtn.innerHTML = `
      <i data-lucide="${isSaved ? 'trash-2' : 'bookmark'}" class="w-4 h-4"></i>
      <span>${isSaved ? 'Remove from My Plan' : 'Add to My NYC Plan'}</span>
    `;
    lucide.createIcons();
  }

  // If itinerary drawer is open, refresh it
  renderItinerary();
}

function saveItinerary() {
  localStorage.setItem('nyc_itinerary', JSON.stringify(state.itinerary));
}

function updateItineraryBadge() {
  const count = state.itinerary.length;
  const badges = [document.getElementById('itineraryBadge'), document.getElementById('drawerCountBadge')];
  badges.forEach(badge => {
    if (badge) {
      badge.textContent = count;
      if (count > 0) {
        badge.classList.remove('hidden');
      } else {
        badge.classList.add('hidden');
      }
    }
  });
}

function openItinerary() {
  const drawer = document.getElementById('itineraryDrawer');
  const backdrop = document.getElementById('itineraryBackdrop');
  if (drawer && backdrop) {
    renderItinerary();
    backdrop.classList.remove('hidden');
    drawer.classList.remove('translate-x-full');
    drawer.classList.add('translate-x-0');
    document.body.classList.add('overflow-hidden');
  }
}

function closeItinerary() {
  const drawer = document.getElementById('itineraryDrawer');
  const backdrop = document.getElementById('itineraryBackdrop');
  if (drawer && backdrop) {
    drawer.classList.add('translate-x-full');
    drawer.classList.remove('translate-x-0');
    setTimeout(() => {
      backdrop.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }, 300);
  }
}

function renderItinerary() {
  const container = document.getElementById('itineraryList');
  const emptyView = document.getElementById('itineraryEmpty');
  if (!container) return;

  const savedPlaces = state.itinerary.map(id => NYC_PLACES.find(p => p.id === id)).filter(Boolean);

  if (savedPlaces.length === 0) {
    container.innerHTML = '';
    emptyView.classList.remove('hidden');
    return;
  }

  emptyView.classList.add('hidden');

  container.innerHTML = savedPlaces.map((place, idx) => `
    <div class="bg-slate-900/80 rounded-2xl p-4 border border-white/10 flex items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <span class="w-7 h-7 rounded-full bg-amber-500/20 text-amber-400 font-bold text-xs flex items-center justify-center shrink-0">
          ${idx + 1}
        </span>
        <img 
          src="${place.image}" 
          alt="${place.name}" 
          class="w-14 h-14 rounded-xl object-cover shrink-0"
          onerror="this.src='https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=800&q=80'"
        />
        <div>
          <h4 class="text-sm font-bold text-white">${place.name}</h4>
          <p class="text-xs text-slate-400">${place.neighborhood}, ${place.borough}</p>
          <div class="text-[11px] text-amber-400 mt-0.5">${place.price} • ${place.subCategory}</div>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <button 
          onclick="openPlaceModal('${place.id}')"
          class="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors"
          title="View Details"
        >
          <i data-lucide="eye" class="w-4 h-4"></i>
        </button>
        <button 
          onclick="toggleItinerary('${place.id}')"
          class="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
          title="Remove"
        >
          <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
      </div>
    </div>
  `).join('');

  lucide.createIcons();
}

// Toast Notification
function showToast(message) {
  let toast = document.getElementById('toastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotification';
    toast.className = 'fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl bg-slate-900 border border-amber-500 text-white shadow-2xl flex items-center gap-3 text-sm font-medium transform translate-y-20 opacity-0 transition-all';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <span class="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
    <span>${message}</span>
  `;

  // Animate in
  setTimeout(() => {
    toast.classList.remove('translate-y-20', 'opacity-0');
  }, 10);

  // Animate out
  setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 3200);
}
