// ==========================================================================
// IND TRAVEL — Main Application Orchestrator & Router
// "One India. One Trusted Travel Ecosystem."
// ==========================================================================

const App = {
  currentView: "home",
  activeRegion: "All",
  activeTheme: "All",

  init() {
    this.setupRouting();
    this.renderDestinations();
    this.bindGlobalEvents();

    // Initialize API Client and submodules
    this.initServices();

    if (window.TripPlanner) window.TripPlanner.init();
    if (window.HeritageScanner) window.HeritageScanner.init();
    if (window.AIAssistant) window.AIAssistant.init();
    if (window.SafetyGuardian) window.SafetyGuardian.init();
    if (window.TourismIntelligence) window.TourismIntelligence.init();
    if (window.LocalNetwork) window.LocalNetwork.init();
    if (window.InternationalHub) window.InternationalHub.init();

    // Re-render Lucide icons
    if (window.lucide) window.lucide.createIcons();
  },

  async initServices() {
    if (window.ApiClient) {
      await window.ApiClient.init();
      // Inject developer API status overlay
      document.body.insertAdjacentHTML('beforeend', window.ApiClient.getApiStatusHtml());
    }
  },

  setupRouting() {
    // Read initial hash or default to 'home'
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "") || "home";
      this.navigateTo(hash, false);
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
  },

  navigateTo(viewId, updateHash = true) {
    const validViews = ["home", "explore", "planner", "scanner", "assistant", "safety", "intelligence", "local", "international"];
    const target = validViews.includes(viewId) ? viewId : "home";

    this.currentView = target;

    // Update section visibility
    document.querySelectorAll(".view-section").forEach(sec => {
      sec.classList.remove("active");
    });

    const activeSec = document.getElementById(`view-${target}`);
    if (activeSec) {
      activeSec.classList.add("active");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Update desktop nav
    document.querySelectorAll(".nav-link").forEach(link => {
      link.classList.toggle("active", link.dataset.target === target);
    });

    // Update mobile bottom nav
    document.querySelectorAll(".mobile-nav-item").forEach(item => {
      item.classList.toggle("active", item.dataset.target === target);
    });

    if (updateHash) {
      window.location.hash = target;
    }

    // Special view initializations
    if (target === "intelligence" && window.TourismIntelligence) {
      setTimeout(() => window.TourismIntelligence.initCharts(), 300);
    }

    if (window.lucide) window.lucide.createIcons();
  },

  bindGlobalEvents() {
    // Desktop Nav Click
    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = link.dataset.target;
        this.navigateTo(target);
      });
    });

    // Mobile Bottom Nav Click
    document.querySelectorAll(".mobile-nav-item").forEach(item => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const target = item.dataset.target;
        this.navigateTo(target);
      });
    });

    // Action button triggers (e.g. Hero CTAs)
    document.querySelectorAll("[data-navigate]").forEach(el => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        const target = el.dataset.navigate;
        this.navigateTo(target);
      });
    });

    // Global Search Input
    const searchInput = document.getElementById("global-search-input");
    const searchDropdown = document.getElementById("global-search-dropdown");

    if (searchInput && searchDropdown) {
      searchInput.addEventListener("input", (e) => {
        const query = e.target.value.trim().toLowerCase();
        if (query.length > 0) {
          const matches = IND_DATA.destinations.filter(d =>
            d.name.toLowerCase().includes(query) ||
            d.state.toLowerCase().includes(query) ||
            d.region.toLowerCase().includes(query) ||
            d.theme.toLowerCase().includes(query)
          );

          if (matches.length > 0) {
            searchDropdown.innerHTML = matches.map(d => `
              <div data-id="${d.id}" class="search-result-item px-4 py-3 hover:bg-amber-50 cursor-pointer flex items-center justify-between border-b border-slate-100 last:border-none transition-colors">
                <div class="flex items-center gap-3">
                  <img src="${d.image}" alt="${d.name}" class="w-10 h-10 rounded-lg object-cover">
                  <div>
                    <h5 class="text-sm font-bold text-slate-900">${d.name}</h5>
                    <p class="text-xs text-slate-500">${d.state} • ${d.theme}</p>
                  </div>
                </div>
                <span class="text-xs text-amber-600 font-semibold flex items-center gap-1">
                  Explore <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                </span>
              </div>
            `).join('');
            searchDropdown.classList.remove("hidden");
            if (window.lucide) window.lucide.createIcons();
          } else {
            searchDropdown.innerHTML = `
              <div class="px-4 py-3 text-xs text-slate-500 text-center">
                No matching destination found. Try "Jaipur", "Kerala", or "Hampi".
              </div>
            `;
            searchDropdown.classList.remove("hidden");
          }
        } else {
          searchDropdown.classList.add("hidden");
        }
      });

      // Search item click delegation
      searchDropdown.addEventListener("click", (e) => {
        const item = e.target.closest(".search-result-item");
        if (item) {
          const id = item.dataset.id;
          searchDropdown.classList.add("hidden");
          searchInput.value = "";
          this.openDestinationModal(id);
        }
      });

      // Hide dropdown on blur
      document.addEventListener("click", (e) => {
        if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
          searchDropdown.classList.add("hidden");
        }
      });
    }

    // Destination filter pills (Regions)
    const regionButtons = document.querySelectorAll(".explore-region-btn");
    regionButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        regionButtons.forEach(b => {
          b.classList.remove("bg-slate-900", "text-white");
          b.classList.add("bg-white", "text-slate-700");
        });
        btn.classList.add("bg-slate-900", "text-white");
        btn.classList.remove("bg-white", "text-slate-700");

        this.activeRegion = btn.dataset.region;
        this.renderDestinations();
      });
    });

    // Destination filter pills (Themes)
    const themeButtons = document.querySelectorAll(".explore-theme-btn");
    themeButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        themeButtons.forEach(b => {
          b.classList.remove("bg-amber-600", "text-white");
          b.classList.add("bg-white", "text-slate-700");
        });
        btn.classList.add("bg-amber-600", "text-white");
        btn.classList.remove("bg-white", "text-slate-700");

        this.activeTheme = btn.dataset.theme;
        this.renderDestinations();
      });
    });

    // Destination modal close
    const closeDestModal = document.getElementById("btn-close-destination-modal");
    if (closeDestModal) {
      closeDestModal.addEventListener("click", () => this.closeDestinationModal());
    }

    // Profile modal trigger
    const profileBtn = document.getElementById("btn-profile-trigger");
    const closeProfileBtn = document.getElementById("btn-close-profile-modal");
    if (profileBtn) {
      profileBtn.addEventListener("click", () => this.openProfileModal());
    }
    if (closeProfileBtn) {
      closeProfileBtn.addEventListener("click", () => this.closeProfileModal());
    }

    // Role switcher pills inside Profile Modal
    const rolePills = document.querySelectorAll(".profile-role-pill");
    rolePills.forEach(pill => {
      pill.addEventListener("click", () => {
        rolePills.forEach(p => {
          p.classList.remove("bg-amber-600", "text-white");
          p.classList.add("bg-slate-100", "text-slate-700");
        });
        pill.classList.add("bg-amber-600", "text-white");
        pill.classList.remove("bg-slate-100", "text-slate-700");

        const role = pill.dataset.role;
        const roleText = document.getElementById("profile-role-description");
        if (roleText) {
          if (role === "domestic") {
            roleText.textContent = "Domestic Tourist Profile: Personalized state-wise itineraries, local train connectivity, regional cuisines, and verified budget stays.";
          } else if (role === "international") {
            roleText.textContent = "International Visitor Profile: Forex guidance, embassy hotlines, multilingual translator, e-SIM setup, and cultural etiquette advisor.";
          } else if (role === "local") {
            roleText.textContent = "Local Tourism Partner Profile: Verified badge application, direct booking commission-free interface, and community artisan guild registry.";
          } else {
            roleText.textContent = "Tourism Authority Profile: Privacy-conscious crowd density analytics, regional footfall telemetry, and dynamic visitor dispersion controls.";
          }
        }
      });
    });
  },

  renderDestinations() {
    const container = document.getElementById("explore-destinations-grid");
    if (!container) return;

    let list = IND_DATA.destinations;
    if (this.activeRegion !== "All") {
      list = list.filter(d => d.region === this.activeRegion);
    }
    if (this.activeTheme !== "All") {
      list = list.filter(d => d.theme === this.activeTheme);
    }

    if (list.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-12 text-center text-slate-500">
          <p class="text-base font-semibold">No destinations matched both filters.</p>
          <button onclick="App.resetFilters()" class="mt-3 text-xs text-amber-600 font-bold underline">Reset Filters</button>
        </div>
      `;
      return;
    }

    container.innerHTML = list.map(d => `
      <div class="heritage-card-hover bg-white rounded-2xl border border-amber-900/10 shadow-sm overflow-hidden flex flex-col justify-between group">
        <div>
          <!-- Card Image & Badges -->
          <div class="relative h-52 overflow-hidden">
            <img src="${d.image}" alt="${d.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
            
            <div class="absolute top-3 left-3 flex flex-wrap gap-2">
              <span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-900/80 backdrop-blur-md text-amber-300 border border-amber-400/30">
                ${d.region}
              </span>
              <span class="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/90 backdrop-blur-md text-slate-800">
                ${d.theme}
              </span>
            </div>

            <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
              <span class="text-xs font-medium text-amber-200 flex items-center gap-1">
                <i data-lucide="calendar" class="w-3.5 h-3.5"></i> ${d.bestTime}
              </span>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${d.crowdLevel === 'High' ? 'bg-red-500/90 text-white' :
        d.crowdLevel === 'Moderate' ? 'bg-amber-500/90 text-slate-950' : 'bg-emerald-600/90 text-white'
      }">
                ${d.crowdBadge}
              </span>
            </div>
          </div>

          <!-- Card Body -->
          <div class="p-5">
            <span class="text-[11px] font-bold tracking-widest text-amber-600 uppercase block font-sans">${d.state}</span>
            <h4 class="font-heritage text-lg font-bold text-slate-900 mt-1">${d.name}</h4>
            <p class="text-xs italic text-amber-800/80 font-serif mt-0.5">"${d.tagline}"</p>
            <p class="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
              ${d.description}
            </p>
          </div>
        </div>

        <!-- Card Footer -->
        <div class="p-5 pt-0">
          <div class="pt-3 border-t border-slate-100 flex items-center gap-2">
            <button onclick="App.openDestinationModal('${d.id}')" class="flex-1 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors">
              <span>View Insights</span>
              <i data-lucide="eye" class="w-3.5 h-3.5"></i>
            </button>
            <button onclick="TripPlanner.setDestination('${d.name}')" class="py-2 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200/80 flex items-center gap-1 transition-colors" title="Plan AI Itinerary">
              <i data-lucide="sparkles" class="w-3.5 h-3.5 text-amber-600"></i> Plan
            </button>
          </div>
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  },

  resetFilters() {
    this.activeRegion = "All";
    this.activeTheme = "All";
    document.querySelectorAll(".explore-region-btn").forEach((b, i) => {
      b.classList.toggle("bg-slate-900", i === 0);
      b.classList.toggle("text-white", i === 0);
      b.classList.toggle("bg-white", i !== 0);
      b.classList.toggle("text-slate-700", i !== 0);
    });
    document.querySelectorAll(".explore-theme-btn").forEach((b, i) => {
      b.classList.toggle("bg-amber-600", i === 0);
      b.classList.toggle("text-white", i === 0);
      b.classList.toggle("bg-white", i !== 0);
      b.classList.toggle("text-slate-700", i !== 0);
    });
    this.renderDestinations();
  },

  openDestinationModal(id) {
    const dest = IND_DATA.destinations.find(d => d.id === id);
    if (!dest) return;

    const modal = document.getElementById("destination-detail-modal");
    if (!modal) return;

    const img = document.getElementById("modal-dest-image");
    const name = document.getElementById("modal-dest-name");
    const state = document.getElementById("modal-dest-state");
    const tagline = document.getElementById("modal-dest-tagline");
    const desc = document.getElementById("modal-dest-desc");
    const bestTime = document.getElementById("modal-dest-best-time");
    const climate = document.getElementById("modal-dest-climate");
    const crowd = document.getElementById("modal-dest-crowd");
    const attractions = document.getElementById("modal-dest-attractions");
    const delicacies = document.getElementById("modal-dest-delicacies");
    const etiquette = document.getElementById("modal-dest-etiquette");
    const planBtn = document.getElementById("modal-btn-plan");

    if (img) img.src = dest.image;
    if (name) name.textContent = dest.name;
    if (state) state.textContent = `${dest.state} • ${dest.region} • ${dest.theme}`;
    if (tagline) tagline.textContent = `"${dest.tagline}"`;
    if (desc) desc.textContent = dest.description;
    if (bestTime) bestTime.textContent = dest.bestTime;
    if (climate) climate.textContent = dest.climate;
    if (crowd) crowd.textContent = dest.crowdBadge;

    if (attractions) {
      attractions.innerHTML = dest.attractions.map(a => `
        <li class="flex items-center gap-2 text-xs text-slate-700">
          <i data-lucide="check-circle" class="w-3.5 h-3.5 text-amber-600 shrink-0"></i>
          <span>${a}</span>
        </li>
      `).join('');
    }

    if (delicacies) {
      delicacies.innerHTML = dest.delicacies.map(d => `
        <span class="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 text-xs font-semibold border border-amber-200/60">
          🍛 ${d}
        </span>
      `).join('');
    }

    if (etiquette) etiquette.textContent = dest.etiquette;

    if (planBtn) {
      planBtn.onclick = () => {
        this.closeDestinationModal();
        TripPlanner.setDestination(dest.name);
      };
    }

    modal.classList.remove("hidden");
    modal.classList.add("flex");

    if (window.lucide) window.lucide.createIcons();
  },

  closeDestinationModal() {
    const modal = document.getElementById("destination-detail-modal");
    if (modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }
  },

  openProfileModal() {
    const modal = document.getElementById("profile-role-modal");
    if (modal) {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    }
  },

  closeProfileModal() {
    const modal = document.getElementById("profile-role-modal");
    if (modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }
  },

  showToast(message, type = "info") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    const bgColors = {
      success: "bg-slate-900 border-emerald-500/60 text-white",
      info: "bg-slate-900 border-amber-500/60 text-white",
      error: "bg-slate-900 border-red-500/60 text-white"
    };

    toast.className = `px-4 py-3 rounded-xl border shadow-xl text-xs font-medium flex items-center gap-2.5 transition-all duration-300 transform translate-y-2 opacity-0 ${bgColors[type] || bgColors.info}`;
    toast.innerHTML = `
      <span class="w-2 h-2 rounded-full ${type === 'success' ? 'bg-emerald-400' : type === 'error' ? 'bg-red-400' : 'bg-amber-400'}"></span>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove("translate-y-2", "opacity-0");
    }, 20);

    setTimeout(() => {
      toast.classList.add("opacity-0", "translate-y-2");
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
};

window.App = App;

// Bootstrap on DOM load
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});

