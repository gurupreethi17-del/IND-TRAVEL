// ==========================================================================
// IND TRAVEL — Core Feature 1: AI Smart Trip Planner (Mobile-First & i18n)
// "One India. One Trusted Travel Ecosystem."
// ==========================================================================

const TripPlanner = {
  selectedInterests: new Set(["History", "Food"]),

  init() {
    this.bindEvents();
  },

  bindEvents() {
    // Interest tag selection
    const interestButtons = document.querySelectorAll(".planner-interest-btn");
    interestButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const interest = btn.dataset.interest;
        if (this.selectedInterests.has(interest)) {
          if (this.selectedInterests.size > 1) {
            this.selectedInterests.delete(interest);
            btn.classList.remove("bg-[#FF9933]", "text-white", "border-[#FF9933]");
            btn.classList.add("bg-white", "text-slate-700", "border-slate-300");
          }
        } else {
          this.selectedInterests.add(interest);
          btn.classList.add("bg-[#FF9933]", "text-white", "border-[#FF9933]");
          btn.classList.remove("bg-white", "text-slate-700", "border-slate-300");
        }
      });
    });

    // Duration slider listener
    const daysSlider = document.getElementById("planner-days");
    const daysDisplay = document.getElementById("planner-days-display");
    if (daysSlider && daysDisplay) {
      daysSlider.addEventListener("input", (e) => {
        const days = e.target.value;
        const lang = window.I18N ? window.I18N.currentLanguage : 'en';
        const dayLabel = lang === 'hi' ? 'दिन' : lang === 'te' ? 'రోజులు' : lang === 'ta' ? 'நாட்கள்' : 'Days';
        daysDisplay.textContent = `${days} ${dayLabel}`;
      });
    }

    // Form submit
    const form = document.getElementById("ai-trip-planner-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.generateItinerary();
      });
    }

    // Export buttons
    document.addEventListener("click", (e) => {
      if (e.target.closest("#btn-print-itinerary")) {
        window.print();
      }
      if (e.target.closest("#btn-copy-itinerary")) {
        this.copyItinerary();
      }
    });
  },

  setDestination(destinationName) {
    const destSelect = document.getElementById("planner-destination");
    if (destSelect) {
      for (let i = 0; i < destSelect.options.length; i++) {
        if (destSelect.options[i].value.toLowerCase().includes(destinationName.toLowerCase()) ||
            destSelect.options[i].text.toLowerCase().includes(destinationName.toLowerCase())) {
          destSelect.selectedIndex = i;
          break;
        }
      }
    }
    // Navigate to planner view
    if (window.App && window.App.navigateTo) {
      window.App.navigateTo("planner");
    }
  },

  generateItinerary() {
    const destination = document.getElementById("planner-destination").value;
    const days = parseInt(document.getElementById("planner-days").value, 10) || 3;
    const budget = document.getElementById("planner-budget").value;
    const travelers = document.getElementById("planner-travelers").value;
    const interests = Array.from(this.selectedInterests);

    const loadingElem = document.getElementById("planner-loading");
    const resultElem = document.getElementById("planner-result");
    const initialPlaceholder = document.getElementById("planner-initial-state");
    const formContainer = document.getElementById("planner-form-container");

    if (loadingElem && resultElem) {
      if (initialPlaceholder) initialPlaceholder.classList.add("hidden");
      if (formContainer) formContainer.classList.add("opacity-50", "pointer-events-none");
      loadingElem.classList.remove("hidden");
      resultElem.classList.add("hidden");

      // Progress animation steps (rapid 1.2s total)
      const lang = window.I18N ? window.I18N.currentLanguage : 'en';
      const progressSteps = lang === 'hi' ? [
        "भारतीय पर्यटन ज्ञान नेटवर्क से जुड़ रहे हैं...",
        `${destination} के लिए भीड़ व मौसम का विश्लेषण...`,
        "प्रामाणिक व्यंजनों व स्थानीय गाइड मार्गों का चयन...",
        "आपकी व्यक्तिगत यात्रा योजना तैयार की जा रही है..."
      ] : lang === 'te' ? [
        "పర్యాటక నెట్‌వర్క్ సమాచారాన్ని సేకరిస్తున్నాము...",
        `${destination} రద్దీ వివరాల విశ్లేషణ...`,
        "స్థానిక మార్గాలు & ఆహార ప్రదేశాల ఎంపిక...",
        "మీ ప్రయాణ ప్రణాళికను సిద్ధం చేస్తున్నాము..."
      ] : [
        "Connecting to Indian Tourism Knowledge Graph...",
        `Analyzing crowd trends & seasonal weather for ${destination}...`,
        `Curating ${interests.join(", ")} trails with local guides...`,
        "Finalizing your personalized Indian journey..."
      ];

      const stepTextElem = document.getElementById("planner-step-text");
      const progressBar = document.getElementById("planner-progress-bar");
      let currentStep = 0;

      const stepInterval = setInterval(() => {
        if (currentStep < progressSteps.length) {
          if (stepTextElem) stepTextElem.textContent = progressSteps[currentStep];
          if (progressBar) progressBar.style.width = `${((currentStep + 1) / progressSteps.length) * 100}%`;
          currentStep++;
        } else {
          clearInterval(stepInterval);
          setTimeout(() => {
            if (formContainer) formContainer.classList.remove("opacity-50", "pointer-events-none");
            loadingElem.classList.add("hidden");
            this.renderItineraryResult(destination, days, budget, travelers, interests);
            resultElem.classList.remove("hidden");
            resultElem.scrollIntoView({ behavior: "smooth" });
          }, 250);
        }
      }, 300);
    }
  },

  renderItineraryResult(destination, days, budget, travelers, interests) {
    const destData = IND_DATA.destinations.find(d => d.name.toLowerCase().includes(destination.toLowerCase())) || IND_DATA.destinations[0];
    const lang = window.I18N ? window.I18N.currentLanguage : 'en';

    // Budget math
    let baseRate = 2200;
    if (budget === "Moderate") baseRate = 4800;
    if (budget === "Luxury") baseRate = 12500;

    let multiplier = 1;
    if (travelers.includes("2")) multiplier = 1.8;
    if (travelers.includes("3") || travelers.includes("Family")) multiplier = 3.2;
    if (travelers.includes("5") || travelers.includes("Group")) multiplier = 4.5;

    const totalEstimatedBudget = Math.round(baseRate * days * multiplier);
    const stayCost = Math.round(totalEstimatedBudget * 0.45);
    const foodCost = Math.round(totalEstimatedBudget * 0.25);
    const transportCost = Math.round(totalEstimatedBudget * 0.18);
    const activitiesCost = Math.round(totalEstimatedBudget * 0.12);

    const container = document.getElementById("planner-result-content");
    if (!container) return;

    // Multilingual labels
    const t_day = lang === 'hi' ? 'दिन' : lang === 'te' ? 'రోజు' : lang === 'ta' ? 'நாள்' : 'Day';
    const t_morning = lang === 'hi' ? 'प्रातःकालीन भ्रमण' : lang === 'te' ? 'ఉదయపు అన్వేషణ' : lang === 'ta' ? 'காலை பயணம்' : 'Morning Expedition';
    const t_afternoon = lang === 'hi' ? 'दोपहर सांस्कृतिक भोजन' : lang === 'te' ? 'మధ్యాహ్న భోజనం & సాంస్కృతిక సందర్శన' : lang === 'ta' ? 'மதிய உணவு & கலாச்சாரம்' : 'Afternoon Cultural & Food Trail';
    const t_evening = lang === 'hi' ? 'सांध्यकालीन सूर्यास्त' : lang === 'te' ? 'సాయంత్రపు సూర్యాస్తమయం & సంగీతం' : lang === 'ta' ? 'மாலை சூரிய அஸ்தமனம் & இசை' : 'Evening Sunset Promenade';
    const t_budget = lang === 'hi' ? 'अनुमानित कुल बजट' : lang === 'te' ? 'అంచనా మొత్తం బడ్జెట్' : lang === 'ta' ? 'மதிப்பிடப்பட்ட பட்ஜெட்' : 'Estimated Budget';
    const t_best_time = lang === 'hi' ? 'सर्वोत्तम समय' : lang === 'te' ? 'ఉత్తమ సమయం' : lang === 'ta' ? 'சிறந்த காலம்' : 'Best Time';
    const t_safe = lang === 'hi' ? 'सुरक्षित क्षेत्र' : lang === 'te' ? 'సురక్షిత ప్రాంతం' : lang === 'ta' ? 'பாதுகாப்பானது' : 'Verified Safe';
    const t_food = lang === 'hi' ? 'स्थानीय व्यंजन' : lang === 'te' ? 'స్థానిక వంటకాలు' : lang === 'ta' ? 'பாரம்பரிய உணவுகள்' : 'Local Food Trails';
    const t_wisdom = lang === 'hi' ? 'सांस्कृतिक सलाह' : lang === 'te' ? 'సాంస్కృతిక సూచనలు' : lang === 'ta' ? 'கலாச்சார ஆலோசனைகள்' : 'Cultural Wisdom';

    // Build Day by Day Cards
    let daysHtml = "";
    for (let day = 1; day <= days; day++) {
      const morningActivity = this.getActivityForTime(destData, day, "Morning", interests, lang);
      const afternoonActivity = this.getActivityForTime(destData, day, "Afternoon", interests, lang);
      const eveningActivity = this.getActivityForTime(destData, day, "Evening", interests, lang);

      daysHtml += `
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-5 transition-all hover:shadow-md">
          <div class="bg-[#000080] px-5 py-3.5 flex items-center justify-between text-white">
            <div class="flex items-center gap-3">
              <span class="w-8 h-8 rounded-full bg-[#FF9933] text-[#172033] font-bold flex items-center justify-center text-xs">
                0${day}
              </span>
              <div>
                <h4 class="font-bold text-sm sm:text-base text-white">${t_day} ${day} — ${this.getDayTheme(day, destination, lang)}</h4>
                <p class="text-[11px] text-amber-200">Optimal Pace • Crowd-Optimized</p>
              </div>
            </div>
            <span class="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-medium border border-emerald-400/30 flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Crowd: Low
            </span>
          </div>

          <div class="p-5 space-y-4 text-xs sm:text-sm">
            <!-- Morning -->
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 rounded-xl bg-[#FFF4E8] text-[#E67A18] flex flex-col items-center justify-center shrink-0 border border-amber-200">
                <i data-lucide="sunrise" class="w-4 h-4"></i>
                <span class="text-[9px] font-bold mt-0.5">08:00</span>
              </div>
              <div class="flex-1 min-w-0">
                <span class="text-[10px] font-bold uppercase tracking-wider text-[#E67A18] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">${t_morning}</span>
                <h5 class="text-slate-900 font-bold text-sm mt-1">${morningActivity.title}</h5>
                <p class="text-slate-600 text-xs mt-1 leading-relaxed">${morningActivity.desc}</p>
                <div class="mt-2 flex flex-wrap items-center gap-2">
                  <span class="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded flex items-center gap-1">
                    <i data-lucide="map-pin" class="w-3 h-3 text-[#FF9933]"></i> ${morningActivity.location}
                  </span>
                </div>
              </div>
            </div>

            <div class="border-t border-slate-100"></div>

            <!-- Afternoon -->
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 rounded-xl bg-blue-50 text-[#000080] flex flex-col items-center justify-center shrink-0 border border-blue-200">
                <i data-lucide="sun" class="w-4 h-4"></i>
                <span class="text-[9px] font-bold mt-0.5">13:00</span>
              </div>
              <div class="flex-1 min-w-0">
                <span class="text-[10px] font-bold uppercase tracking-wider text-[#000080] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">${t_afternoon}</span>
                <h5 class="text-slate-900 font-bold text-sm mt-1">${afternoonActivity.title}</h5>
                <p class="text-slate-600 text-xs mt-1 leading-relaxed">${afternoonActivity.desc}</p>
                <div class="mt-2 flex flex-wrap items-center gap-2">
                  <span class="text-[11px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                    <i data-lucide="utensils" class="w-3 h-3 text-emerald-600"></i> ${afternoonActivity.food}
                  </span>
                </div>
              </div>
            </div>

            <div class="border-t border-slate-100"></div>

            <!-- Evening -->
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex flex-col items-center justify-center shrink-0 border border-purple-200">
                <i data-lucide="sunset" class="w-4 h-4"></i>
                <span class="text-[9px] font-bold mt-0.5">17:30</span>
              </div>
              <div class="flex-1 min-w-0">
                <span class="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">${t_evening}</span>
                <h5 class="text-slate-900 font-bold text-sm mt-1">${eveningActivity.title}</h5>
                <p class="text-slate-600 text-xs mt-1 leading-relaxed">${eveningActivity.desc}</p>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    container.innerHTML = `
      <!-- Header Summary Banner -->
      <div class="bg-[#000080] rounded-2xl p-5 sm:p-6 text-white mb-6 border border-slate-300 shadow-lg">
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 pb-4">
          <div>
            <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FF9933] text-[#172033] text-[11px] font-bold">
              <i data-lucide="sparkles" class="w-3 h-3"></i> IND Travel AI Synthesized Plan
            </span>
            <h3 class="font-heritage text-xl sm:text-2xl font-bold text-white mt-1.5">${destination} Expedition</h3>
            <p class="text-slate-200 text-xs mt-0.5">${days} ${t_day} • ${travelers} • ${budget} Tier</p>
          </div>
          <div class="flex items-center gap-2">
            <button id="btn-copy-itinerary" class="px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors">
              <i data-lucide="copy" class="w-3.5 h-3.5"></i> Copy
            </button>
            <button id="btn-print-itinerary" class="px-3.5 py-1.5 rounded-xl bg-[#FF9933] hover:bg-[#E67A18] text-[#172033] font-bold text-xs flex items-center gap-1.5 shadow transition-colors">
              <i data-lucide="printer" class="w-3.5 h-3.5"></i> PDF
            </button>
          </div>
        </div>

        <!-- Quick Stat Pills -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-xs">
          <div class="bg-white/10 p-3 rounded-xl">
            <span class="text-slate-300 text-[10px] block">${t_budget}</span>
            <span class="text-lg font-bold text-white mt-0.5 block">₹${totalEstimatedBudget.toLocaleString('en-IN')}</span>
          </div>
          <div class="bg-white/10 p-3 rounded-xl">
            <span class="text-slate-300 text-[10px] block">${t_best_time}</span>
            <span class="text-xs font-bold text-white mt-0.5 block">${destData.bestTime}</span>
          </div>
          <div class="bg-white/10 p-3 rounded-xl">
            <span class="text-slate-300 text-[10px] block">State Authority</span>
            <span class="text-xs font-bold text-white mt-0.5 block">${destData.state}</span>
          </div>
          <div class="bg-white/10 p-3 rounded-xl">
            <span class="text-slate-300 text-[10px] block">Safety Index</span>
            <span class="text-xs font-bold text-emerald-300 mt-0.5 flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> ${t_safe}
            </span>
          </div>
        </div>
      </div>

      <!-- Budget Breakdown Card -->
      <div class="bg-[#F2F6FF] rounded-2xl p-5 border border-blue-200 mb-6">
        <h4 class="font-bold text-[#000080] text-sm flex items-center gap-2 mb-3">
          <i data-lucide="wallet" class="w-4 h-4 text-[#FF9933]"></i>
          ${t_budget} Breakdown (INR)
        </h4>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
          <div class="bg-white p-3 rounded-xl border border-slate-200">
            <span class="text-slate-500 text-[10px]">🏨 Stays</span>
            <p class="text-sm font-bold text-slate-900 mt-0.5">₹${stayCost.toLocaleString('en-IN')}</p>
          </div>
          <div class="bg-white p-3 rounded-xl border border-slate-200">
            <span class="text-slate-500 text-[10px]">🍛 Food</span>
            <p class="text-sm font-bold text-slate-900 mt-0.5">₹${foodCost.toLocaleString('en-IN')}</p>
          </div>
          <div class="bg-white p-3 rounded-xl border border-slate-200">
            <span class="text-slate-500 text-[10px]">🛺 Transport</span>
            <p class="text-sm font-bold text-slate-900 mt-0.5">₹${transportCost.toLocaleString('en-IN')}</p>
          </div>
          <div class="bg-white p-3 rounded-xl border border-slate-200">
            <span class="text-slate-500 text-[10px]">🎟 Activities</span>
            <p class="text-sm font-bold text-slate-900 mt-0.5">₹${activitiesCost.toLocaleString('en-IN')}</p>
          </div>
        </div>
      </div>

      <!-- Day by Day Content -->
      <div class="mb-6">
        <h4 class="font-heritage text-base sm:text-lg text-slate-900 font-bold mb-3">
          Daily Intelligent Schedule
        </h4>
        ${daysHtml}
      </div>

      <!-- Essential Local Food Trails & Cultural Tips -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-xs">
        <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <h5 class="font-bold text-[#000080] text-sm flex items-center gap-2 mb-2.5">
            <i data-lucide="utensils" class="w-4 h-4 text-[#FF9933]"></i>
            ${t_food}
          </h5>
          <div class="space-y-2">
            ${destData.delicacies.map(delicacy => `
              <div class="flex items-center gap-2 p-2 rounded-lg bg-amber-50 border border-amber-100">
                <span>🍛</span>
                <span class="font-semibold text-slate-800">${delicacy}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
          <h5 class="font-bold text-[#000080] text-sm flex items-center gap-2 mb-2.5">
            <i data-lucide="shield-check" class="w-4 h-4 text-emerald-600"></i>
            ${t_wisdom}
          </h5>
          <div class="space-y-2 text-slate-600">
            <p class="p-2.5 bg-emerald-50 rounded-lg border border-emerald-100">
              <strong>Sanctum Guidelines:</strong> ${destData.etiquette}
            </p>
            <p class="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
              <strong>Helpline:</strong> Dial <strong>1363</strong> (Ministry of Tourism 24x7) or activate IND Travel SOS anytime.
            </p>
          </div>
        </div>
      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons();
    }
  },

  getDayTheme(day, destination, lang) {
    if (lang === 'hi') {
      const themes = [
        "ऐतिहासिक स्मारक व प्राचीन नगर दर्शन",
        "पारंपरिक कारीगर व हस्तशिल्प बाजार",
        "आध्यात्मिक दर्शन एवं सुंदर दृश्य",
        "गुप्त गलियां व प्रसिद्ध खान-पान",
        "प्रकृति एवं शांत वातावरण"
      ];
      return themes[(day - 1) % themes.length];
    } else if (lang === 'te') {
      const themes = [
        "చారిత్రక కట్టడాలు & పురాతన వీధుల సందర్శన",
        "చేనేత కళాకారులు & సాంప్రదాయ మార్కెట్లు",
        "ఆధ్యాత్మిక దేవాలయాలు & ప్రకృతి అందాలు",
        "స్థానిక వంటకాలు & విశిష్ట ప్రదేశాలు"
      ];
      return themes[(day - 1) % themes.length];
    }
    const themes = [
      "Heritage Monuments & Ancient Heartbeat",
      "Artisan Quarters & Living Traditions",
      "Spiritual Sanctuaries & Scenic Panoramas",
      "Hidden Alleys, Bazaars & Culinary Trails",
      "Nature Reserves & Peaceful Environs"
    ];
    return themes[(day - 1) % themes.length];
  },

  getActivityForTime(destData, day, timeSlot, interests, lang) {
    const attractions = destData.attractions || ["Historic Old Quarter", "Heritage Citadel", "Sunset Panorama Point", "Artisan Guild"];
    const delicacies = destData.delicacies || ["Local Thali", "Traditional Chai", "Sweet Delicacy"];

    if (timeSlot === "Morning") {
      const spot = attractions[(day - 1) % attractions.length];
      return {
        title: lang === 'hi' ? `${spot} का प्रातःकालीन भ्रमण` : `${spot} Sunrise Exploration`,
        desc: `Beat the mid-day queue between 08:00 AM and 09:30 AM with soft photography light and calm temperatures.`,
        location: `${spot}, ${destData.state}`
      };
    } else if (timeSlot === "Afternoon") {
      const food = delicacies[(day - 1) % delicacies.length];
      return {
        title: lang === 'hi' ? `पारंपरिक भोजन व आंतरिक दर्शन` : `Culinary Discovery & Indoor Exhibition`,
        desc: `Enjoy authentic lunch followed by an air-conditioned state museum or handloom showcase.`,
        food: food
      };
    } else {
      const spot = attractions[day % attractions.length];
      return {
        title: lang === 'hi' ? `${spot} पर सांध्यकालीन भ्रमण` : `Twilight Walk at ${spot}`,
        desc: `Watch evening lighting illuminate the heritage stone facades while enjoying local tea stalls.`
      };
    }
  },

  copyItinerary() {
    const dest = document.getElementById("planner-destination").value;
    const days = document.getElementById("planner-days").value;
    const text = `IND TRAVEL — AI Itinerary for ${dest}\nDuration: ${days} Days\nOne India. One Trusted Travel Ecosystem.\nCheck your itinerary at IND Travel app.`;
    navigator.clipboard.writeText(text).then(() => {
      if (window.App && window.App.showToast) {
        window.App.showToast("Itinerary copied to clipboard!", "success");
      }
    });
  }
};

window.TripPlanner = TripPlanner;
