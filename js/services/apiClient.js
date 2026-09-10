// ==========================================================================
// IND TRAVEL — API Client (Service Abstraction Layer)
// Handles API calls, demo mode detection, and fallback resolution
// ==========================================================================

const ApiClient = {
    isDemoMode: true,
    servicesStatus: {},
    initialized: false,

    async init() {
        if (this.initialized) return;
        try {
            const res = await fetch('/api/status');
            const data = await res.json();
            if (data && data.status === "success") {
                this.isDemoMode = data.mode === "DEMO";
                this.servicesStatus = data.services || {};
            }
        } catch (e) {
            console.warn("IND Travel: API Proxy unreachable, forcing Demo Mode.", e);
            this.isDemoMode = true;
        }
        this.initialized = true;
    },

    async post(endpoint, data) {
        if (!this.initialized) await this.init();
        try {
            const res = await fetch(`/api/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return await res.json();
        } catch (e) {
            console.warn(`IND Travel API Error (${endpoint}):`, e);
            return { status: "error", message: e.message };
        }
    },

    async get(endpoint) {
        if (!this.initialized) await this.init();
        try {
            const res = await fetch(`/api/${endpoint}`);
            return await res.json();
        } catch (e) {
            console.warn(`IND Travel API Error (${endpoint}):`, e);
            return { status: "error", message: e.message };
        }
    },

    // Developer UI helper
    getApiStatusHtml() {
        if (!this.initialized) return '';
        const badgeClass = this.isDemoMode ? "bg-amber-100 text-amber-800 border-amber-300" : "bg-emerald-100 text-emerald-800 border-emerald-300";
        const modeText = this.isDemoMode ? "DEMO MODE" : "LIVE MODE";

        let servicesHtml = Object.entries(this.servicesStatus).map(([srv, status]) => {
            const isConnected = status === "Connected";
            const icon = isConnected ? "🟢" : "🟡";
            return `<div class="flex justify-between text-[11px] mb-1">
                <span class="capitalize">${srv} API:</span> 
                <span class="font-bold">${icon} ${status}</span>
              </div>`;
        }).join("");

        return `
      <div id="dev-api-status" class="fixed bottom-4 right-4 bg-white/90 backdrop-blur border border-slate-200 p-4 rounded-xl shadow-2xl z-50 w-64 font-sans hidden sm:block">
        <div class="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
          <span class="text-xs font-bold text-slate-800 flex items-center gap-1">
            <svg class="w-3.5 h-3.5 text-brand-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            API Status
          </span>
          <span class="text-[9px] font-bold px-2 py-0.5 rounded border ${badgeClass}">${modeText}</span>
        </div>
        ${servicesHtml}
        <div class="text-[9px] text-slate-400 mt-2 text-center">Settings managed via .env</div>
        <button onclick="document.getElementById('dev-api-status').style.display='none'" class="absolute -top-2 -right-2 w-5 h-5 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 hover:bg-red-500 hover:text-white transition-colors">×</button>
      </div>
    `;
    }
};

window.ApiClient = ApiClient;
