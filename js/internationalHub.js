// ==========================================================================
// IND TRAVEL — International Tourist Assistance Hub
// "Welcome to India — Global Visitor Intelligence & Safety Gateway"
// ==========================================================================

const InternationalHub = {
  init() {
    this.bindEvents();
    this.renderEmbassies();
    this.renderPhrasebook();
  },

  bindEvents() {
    // Currency Converter listener
    const amountInput = document.getElementById("forex-amount-input");
    const currencySelect = document.getElementById("forex-currency-select");

    if (amountInput && currencySelect) {
      const updateConversion = () => {
        const amt = parseFloat(amountInput.value) || 0;
        const curr = currencySelect.value;
        const rate = IND_DATA.forexRates[curr] || 83.50;
        const inrResult = Math.round(amt * rate);

        const resultElem = document.getElementById("forex-result-inr");
        const rateDisplay = document.getElementById("forex-current-rate");
        if (resultElem) resultElem.textContent = `₹${inrResult.toLocaleString('en-IN')}`;
        if (rateDisplay) rateDisplay.textContent = `1 ${curr} ≈ ₹${rate.toFixed(2)} INR (RBI Reference Indicative Rate)`;
      };

      amountInput.addEventListener("input", updateConversion);
      currencySelect.addEventListener("change", updateConversion);
      updateConversion();
    }

    // Embassy filter search
    const embassySearch = document.getElementById("embassy-search-input");
    if (embassySearch) {
      embassySearch.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();
        this.renderEmbassies(query);
      });
    }

    // Offline Card print button
    const printCardBtn = document.getElementById("btn-print-offline-card");
    if (printCardBtn) {
      printCardBtn.addEventListener("click", () => {
        window.print();
      });
    }
  },

  renderEmbassies(query = "") {
    const container = document.getElementById("embassy-cards-container");
    if (!container) return;

    let list = IND_DATA.embassies;
    if (query) {
      list = list.filter(e => e.country.toLowerCase().includes(query) || e.city.toLowerCase().includes(query));
    }

    container.innerHTML = list.map(item => `
      <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:border-amber-400 transition-colors">
        <div class="flex items-start justify-between gap-2">
          <div>
            <h5 class="font-bold text-slate-900 text-sm">${item.country} Embassy</h5>
            <span class="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
              <i data-lucide="map-pin" class="w-3.5 h-3.5 text-amber-600"></i> ${item.city}
            </span>
          </div>
          <span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-800 border border-blue-200">
            Diplomatic Mission
          </span>
        </div>
        <p class="text-xs text-slate-600 mt-2 font-mono">${item.address}</p>
        <div class="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
          <span class="text-slate-500 font-mono">🚨 Hotline: <strong>${item.emergency}</strong></span>
          <button onclick="window.App.showToast('Connecting to consular inquiry desk...', 'info')" class="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-[11px] flex items-center gap-1">
            <i data-lucide="phone" class="w-3 h-3"></i> Call
          </button>
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  },

  renderPhrasebook() {
    const container = document.getElementById("phrasebook-table-body");
    if (!container) return;

    container.innerHTML = IND_DATA.phrasebook.map(row => `
      <tr class="border-b border-slate-100 hover:bg-amber-50/30 transition-colors text-xs">
        <td class="py-3 px-4 font-semibold text-slate-900">${row.eng}</td>
        <td class="py-3 px-4 text-slate-700">${row.hin}</td>
        <td class="py-3 px-4 text-slate-700">${row.tel}</td>
        <td class="py-3 px-4 text-slate-700">${row.tam}</td>
      </tr>
    `).join('');
  }
};

window.InternationalHub = InternationalHub;
