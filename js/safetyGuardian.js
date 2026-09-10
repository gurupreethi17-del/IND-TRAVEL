// ==========================================================================
// IND TRAVEL — Core Feature 4: Smart Tourist Safety Guardian (Mobile & i18n)
// "Travel With Confidence — Intelligent Safety & Emergency Layer"
// ==========================================================================

const SafetyGuardian = {
  currentCoords: { lat: 17.3616, lng: 78.4747, locationName: "Hyderabad (Near Charminar Old City)" },
  isSosActive: false,

  init() {
    this.detectLocation();
    this.bindEvents();
    this.renderFacilities('police');
  },

  detectLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.currentCoords = {
            lat: parseFloat(pos.coords.latitude.toFixed(4)),
            lng: parseFloat(pos.coords.longitude.toFixed(4)),
            locationName: "Current GPS Location (Live)"
          };
          this.updateLocationDisplay();
        },
        (err) => {
          this.updateLocationDisplay();
        },
        { timeout: 4000 }
      );
    } else {
      this.updateLocationDisplay();
    }
  },

  updateLocationDisplay() {
    const locElem = document.getElementById("safety-current-location-text");
    const coordsElem = document.getElementById("safety-current-coords-text");
    if (locElem) locElem.textContent = this.currentCoords.locationName;
    if (coordsElem) coordsElem.textContent = `GPS: ${this.currentCoords.lat}° N, ${this.currentCoords.lng}° E`;
  },

  bindEvents() {
    const sosBtns = document.querySelectorAll(".btn-trigger-sos");
    sosBtns.forEach(btn => {
      btn.addEventListener("click", () => this.triggerSosModal());
    });

    const closeSosBtn = document.getElementById("btn-close-sos-modal");
    if (closeSosBtn) {
      closeSosBtn.addEventListener("click", () => this.closeSosModal());
    }

    const shareLocBtn = document.getElementById("btn-share-location");
    if (shareLocBtn) {
      shareLocBtn.addEventListener("click", () => this.shareLiveLocation());
    }

    const facilityTabs = document.querySelectorAll(".safety-facility-tab");
    facilityTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        facilityTabs.forEach(t => {
          t.classList.remove("bg-[#000080]", "text-white");
          t.classList.add("bg-white", "text-slate-700");
        });
        tab.classList.add("bg-[#000080]", "text-white");
        tab.classList.remove("bg-white", "text-slate-700");

        const type = tab.dataset.facility;
        this.renderFacilities(type);
      });
    });
  },

  triggerSosModal() {
    const modal = document.getElementById("sos-alert-modal");
    if (!modal) return;

    modal.classList.remove("hidden");
    modal.classList.add("flex");

    const step1 = document.getElementById("sos-step-1");
    const step2 = document.getElementById("sos-step-2");
    const step3 = document.getElementById("sos-step-3");
    const stepCoords = document.getElementById("sos-modal-coords");

    if (stepCoords) {
      stepCoords.textContent = `${this.currentCoords.lat}° N, ${this.currentCoords.lng}° E (${this.currentCoords.locationName})`;
    }

    [step1, step2, step3].forEach(step => {
      if (step) {
        step.classList.remove("text-emerald-400", "font-bold");
        step.classList.add("text-slate-400");
        const icon = step.querySelector(".sos-step-icon");
        if (icon) icon.innerHTML = `<i data-lucide="loader" class="w-4 h-4 animate-spin text-amber-400"></i>`;
      }
    });

    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      if (step1) {
        step1.classList.remove("text-slate-400");
        step1.classList.add("text-emerald-400", "font-bold");
        const icon = step1.querySelector(".sos-step-icon");
        if (icon) icon.innerHTML = `<i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400"></i>`;
        if (window.lucide) window.lucide.createIcons();
      }
    }, 500);

    setTimeout(() => {
      if (step2) {
        step2.classList.remove("text-slate-400");
        step2.classList.add("text-emerald-400", "font-bold");
        const icon = step2.querySelector(".sos-step-icon");
        if (icon) icon.innerHTML = `<i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400"></i>`;
        if (window.lucide) window.lucide.createIcons();
      }
    }, 1100);

    setTimeout(() => {
      if (step3) {
        step3.classList.remove("text-slate-400");
        step3.classList.add("text-emerald-400", "font-bold");
        const icon = step3.querySelector(".sos-step-icon");
        if (icon) icon.innerHTML = `<i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-400"></i>`;
        if (window.lucide) window.lucide.createIcons();
      }
    }, 1700);
  },

  closeSosModal() {
    const modal = document.getElementById("sos-alert-modal");
    if (modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }
  },

  shareLiveLocation() {
    const shareUrl = `https://indtravel.in/track?lat=${this.currentCoords.lat}&lng=${this.currentCoords.lng}&t=${Date.now()}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        if (window.App && window.App.showToast) {
          window.App.showToast("Encrypted live location link copied! (Demo Tracking Link)", "success");
        }
      });
    }
  },

  renderFacilities(type = "police") {
    const container = document.getElementById("safety-facilities-list");
    if (!container) return;

    window.SafetyService.getSafetyInformation(this.currentCoords.locationName).then((res) => {
      if (res.source === 'demo' && window.App) window.App.showToast("Prototype Emergency Directory Loaded.", "info");
    });

    if (type === "police") {
      container.innerHTML = `
        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div class="flex items-start gap-3">
            <div class="w-9 h-9 rounded-xl bg-blue-100 text-[#000080] flex items-center justify-center shrink-0">
              <i data-lucide="shield" class="w-4 h-4"></i>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h5 class="font-bold text-slate-900 text-sm">Charminar Tourist Police Station</h5>
                <span class="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-semibold">24x7</span>
              </div>
              <p class="text-xs text-slate-500 mt-0.5">Special Tourist Unit • English, Hindi, Telugu</p>
              <p class="text-[11px] text-slate-400 mt-0.5">Distance: 450m • Approx 5 min walk</p>
            </div>
          </div>
          <div class="flex items-center gap-2 w-full sm:w-auto">
            <button onclick="window.App.showToast('Calling Tourist Police Unit (112)...', 'info')" class="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-[#000080] text-white font-semibold text-xs flex items-center justify-center gap-1">
              <i data-lucide="phone-call" class="w-3.5 h-3.5"></i> Call Desk
            </button>
            <button onclick="window.App.showToast('Simulating directions (450m)...', 'info')" class="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-slate-100 text-slate-800 font-semibold text-xs flex items-center justify-center gap-1">
              <i data-lucide="navigation" class="w-3.5 h-3.5 text-[#000080]"></i> Directions
            </button>
          </div>
        </div>

        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div class="flex items-start gap-3">
            <div class="w-9 h-9 rounded-xl bg-blue-100 text-[#000080] flex items-center justify-center shrink-0">
              <i data-lucide="shield" class="w-4 h-4"></i>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h5 class="font-bold text-slate-900 text-sm">Old City Divisional Police HQ</h5>
                <span class="px-2 py-0.5 rounded text-[10px] bg-emerald-100 text-emerald-800 font-semibold">24x7</span>
              </div>
              <p class="text-xs text-slate-500 mt-0.5">Main Police Control Room & Foreigners Registration Desk</p>
              <p class="text-[11px] text-slate-400 mt-0.5">Distance: 1.4 km • Approx 6 min drive</p>
            </div>
          </div>
          <div class="flex items-center gap-2 w-full sm:w-auto">
            <button onclick="window.App.showToast('Calling Police HQ...', 'info')" class="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-[#000080] text-white font-semibold text-xs flex items-center justify-center gap-1">
              <i data-lucide="phone-call" class="w-3.5 h-3.5"></i> Call Desk
            </button>
            <button onclick="window.App.showToast('Simulating directions...', 'info')" class="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-slate-100 text-slate-800 font-semibold text-xs flex items-center justify-center gap-1">
              <i data-lucide="navigation" class="w-3.5 h-3.5 text-[#000080]"></i> Directions
            </button>
          </div>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div class="flex items-start gap-3">
            <div class="w-9 h-9 rounded-xl bg-red-100 text-red-700 flex items-center justify-center shrink-0">
              <i data-lucide="cross" class="w-4 h-4"></i>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h5 class="font-bold text-slate-900 text-sm">Osmania General Hospital & Trauma Centre</h5>
                <span class="px-2 py-0.5 rounded text-[10px] bg-red-100 text-red-800 font-semibold">24x7 Emergency</span>
              </div>
              <p class="text-xs text-slate-500 mt-0.5">Tertiary Emergency Care & NABH Ambulance Dispatch</p>
              <p class="text-[11px] text-slate-400 mt-0.5">Distance: 1.8 km • Approx 7 min dispatch</p>
            </div>
          </div>
          <div class="flex items-center gap-2 w-full sm:w-auto">
            <button onclick="window.App.showToast('Calling Hospital Emergency (108)...', 'info')" class="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-[#D32F2F] text-white font-semibold text-xs flex items-center justify-center gap-1">
              <i data-lucide="phone-call" class="w-3.5 h-3.5"></i> Emergency Call
            </button>
            <button onclick="window.App.showToast('Simulating hospital route...', 'info')" class="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-slate-100 text-slate-800 font-semibold text-xs flex items-center justify-center gap-1">
              <i data-lucide="navigation" class="w-3.5 h-3.5 text-red-600"></i> Route
            </button>
          </div>
        </div>
      `;
    }

    if (window.lucide) window.lucide.createIcons();
  }
};

window.SafetyGuardian = SafetyGuardian;
