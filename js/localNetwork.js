// ==========================================================================
// IND TRAVEL — Verified Local Tourism Network
// "Discover Local India — Grassroots Community Inclusion"
// ==========================================================================

const LocalNetwork = {
  currentCategory: "All",

  init() {
    this.renderPartners("All");
    this.bindEvents();
  },

  bindEvents() {
    // Filter tabs
    const filterTabs = document.querySelectorAll(".local-filter-tab");
    filterTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        filterTabs.forEach(t => {
          t.classList.remove("bg-amber-600", "text-white");
          t.classList.add("bg-white", "text-slate-700");
        });
        tab.classList.add("bg-amber-600", "text-white");
        tab.classList.remove("bg-white", "text-slate-700");

        const cat = tab.dataset.category;
        this.currentCategory = cat;
        this.renderPartners(cat);
      });
    });

    // Inquiry button handler
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn-connect-local");
      if (btn) {
        const partnerName = btn.dataset.name;
        this.openInquiryModal(partnerName);
      }
    });

    const closeInquiry = document.getElementById("btn-close-inquiry-modal");
    if (closeInquiry) {
      closeInquiry.addEventListener("click", () => this.closeInquiryModal());
    }

    const inquiryForm = document.getElementById("local-inquiry-form");
    if (inquiryForm) {
      inquiryForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.closeInquiryModal();
        if (window.App && window.App.showToast) {
          window.App.showToast("Inquiry dispatched directly to verified local host! ", "success");
        }
      });
    }
  },

  renderPartners(category = "All") {
    const container = document.getElementById("local-partners-grid");
    if (!container) return;

    let items = IND_DATA.localPartners;
    if (category !== "All") {
      items = items.filter(p => p.category.toLowerCase().includes(category.toLowerCase()));
    }

    container.innerHTML = items.map(p => `
      <div class="bg-white rounded-2xl border border-amber-900/10 shadow-sm overflow-hidden flex flex-col justify-between transition-all hover:shadow-lg hover:-translate-y-1">
        <div>
          <div class="p-6 pb-4">
            <div class="flex items-start justify-between gap-3">
              <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                ${p.type}
              </span>
              <span class="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <i data-lucide="shield-check" class="w-3.5 h-3.5 text-emerald-600"></i>
                ${p.badge}
              </span>
            </div>

            <h4 class="font-heritage text-lg font-bold text-slate-900 mt-3">${p.name}</h4>
            <p class="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
              <i data-lucide="map-pin" class="w-3.5 h-3.5 text-amber-600"></i> ${p.location} • ${p.experience}
            </p>

            <div class="flex items-center gap-1.5 mt-2.5">
              <div class="flex text-amber-400">
                ${'★'.repeat(Math.floor(p.rating))}
              </div>
              <span class="text-xs font-bold text-slate-800">${p.rating}</span>
              <span class="text-xs text-slate-400">(${p.reviews} verified reviews)</span>
            </div>

            <p class="text-xs text-slate-600 mt-3 leading-relaxed">
              ${p.description}
            </p>
          </div>

          <!-- Community Impact Box -->
          <div class="mx-6 mb-4 p-3 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80">
            <div class="flex items-start gap-2">
              <i data-lucide="heart-handshake" class="w-4 h-4 text-emerald-700 shrink-0 mt-0.5"></i>
              <div>
                <span class="text-[11px] font-bold text-emerald-900 block uppercase tracking-wider">Local Economic Impact</span>
                <p class="text-xs text-emerald-800 font-medium mt-0.5">${p.impact}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="p-6 pt-0 border-t border-slate-100 mt-2">
          <div class="pt-4 flex items-center justify-between">
            <span class="text-xs text-slate-400 font-medium">Direct Community Booking</span>
            <button data-name="${p.name}" class="btn-connect-local px-4 py-2 rounded-xl bg-slate-900 hover:bg-amber-600 text-white font-semibold text-xs transition-colors flex items-center gap-1.5">
              <span>Connect & Support</span>
              <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');

    if (window.lucide) {
      window.lucide.createIcons();
    }
  },

  openInquiryModal(partnerName) {
    const modal = document.getElementById("local-inquiry-modal");
    const nameElem = document.getElementById("inquiry-partner-name");
    if (nameElem) nameElem.textContent = partnerName;
    if (modal) {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    }
  },

  closeInquiryModal() {
    const modal = document.getElementById("local-inquiry-modal");
    if (modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }
  }
};

window.LocalNetwork = LocalNetwork;
