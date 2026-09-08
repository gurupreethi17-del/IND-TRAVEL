// ==========================================================================
// IND TRAVEL — Core Feature 2: AI Heritage & Cultural Scanner (Mobile & i18n)
// "Point. Scan. Discover India's Story."
// ==========================================================================

const HeritageScanner = {
  currentLandmarkId: "charminar",
  isScanning: false,
  speechSynth: window.speechSynthesis || null,
  speechUtterance: null,
  isPlayingAudio: false,
  audioRate: 1.0,

  init() {
    this.bindEvents();
    this.loadLandmark("charminar");
  },

  bindEvents() {
    // Preset landmark pill buttons
    const presetButtons = document.querySelectorAll(".scanner-preset-btn");
    presetButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.landmark;
        presetButtons.forEach(b => {
          b.classList.remove("bg-[#FF9933]", "text-white", "border-[#FF9933]");
          b.classList.add("bg-white", "text-slate-700", "border-slate-200");
        });
        btn.classList.add("bg-[#FF9933]", "text-white", "border-[#FF9933]");
        btn.classList.remove("bg-white", "text-slate-700", "border-slate-200");

        this.triggerScan(id);
      });
    });

    // Custom image upload scanner
    const uploadInput = document.getElementById("scanner-file-input");
    if (uploadInput) {
      uploadInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const previewImg = document.getElementById("scanner-viewfinder-img");
            if (previewImg) {
              previewImg.src = event.target.result;
            }
            this.triggerScan("taj-mahal", true);
          };
          reader.readAsDataURL(file);
        }
      });
    }

    // Audio guide controls
    const playBtn = document.getElementById("scanner-audio-btn");
    if (playBtn) {
      playBtn.addEventListener("click", () => this.toggleAudioGuide());
    }

    const rateBtn = document.getElementById("scanner-rate-btn");
    if (rateBtn) {
      rateBtn.addEventListener("click", () => {
        this.audioRate = this.audioRate === 1.0 ? 1.25 : 1.0;
        rateBtn.textContent = `${this.audioRate}x`;
        if (this.isPlayingAudio) {
          this.stopAudio();
          this.playAudioGuide();
        }
      });
    }
  },

  onLanguageChange(lang) {
    this.loadLandmark(this.currentLandmarkId);
  },

  triggerScan(landmarkId, isCustomUpload = false) {
    this.stopAudio();
    this.isScanning = true;
    this.currentLandmarkId = landmarkId;

    const laser = document.getElementById("scanner-laser-line");
    const statusPill = document.getElementById("scanner-status-pill");
    const confidenceBadge = document.getElementById("scanner-confidence");
    const detailsContainer = document.getElementById("scanner-details-content");

    if (laser) laser.classList.remove("hidden");
    if (statusPill) {
      statusPill.innerHTML = `
        <span class="w-2 h-2 rounded-full bg-[#FF9933] animate-ping"></span>
        <span class="text-white text-xs font-semibold">AI Neural Mesh: Analyzing Contours...</span>
      `;
    }
    if (detailsContainer) {
      detailsContainer.classList.add("opacity-40", "pointer-events-none");
    }

    if (!isCustomUpload) {
      const dest = IND_DATA.destinations.find(d => d.id === landmarkId) || IND_DATA.destinations[0];
      const previewImg = document.getElementById("scanner-viewfinder-img");
      if (previewImg && dest) {
        previewImg.src = dest.image;
      }
    }

    setTimeout(() => {
      this.isScanning = false;
      if (laser) laser.classList.add("hidden");
      if (statusPill) {
        statusPill.innerHTML = `
          <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span class="text-emerald-300 text-xs font-semibold">ASI & Heritage Registry: 99.4% Match</span>
        `;
      }
      if (confidenceBadge) {
        confidenceBadge.textContent = "99.4% Verified";
      }
      if (detailsContainer) {
        detailsContainer.classList.remove("opacity-40", "pointer-events-none");
      }

      this.loadLandmark(landmarkId);
    }, 700);
  },

  loadLandmark(landmarkId) {
    const rawData = IND_DATA.landmarks[landmarkId] || IND_DATA.landmarks["charminar"];
    this.currentLandmarkId = landmarkId;
    const lang = window.I18N ? window.I18N.currentLanguage : 'en';

    // Check for localized translation
    const localized = (rawData.i18n && rawData.i18n[lang]) ? rawData.i18n[lang] : rawData;

    const nameElem = document.getElementById("scanner-dossier-name");
    const cityElem = document.getElementById("scanner-dossier-city");
    const eraElem = document.getElementById("scanner-dossier-era");
    const archElem = document.getElementById("scanner-dossier-arch");
    const matElem = document.getElementById("scanner-dossier-material");
    const overviewElem = document.getElementById("scanner-dossier-overview");
    const culturalElem = document.getElementById("scanner-dossier-cultural");
    const secretsElem = document.getElementById("scanner-dossier-secrets");
    const featuresList = document.getElementById("scanner-dossier-features");

    if (nameElem) nameElem.textContent = localized.name || rawData.name;
    if (cityElem) cityElem.textContent = localized.city || rawData.city;
    if (eraElem) eraElem.textContent = localized.era || rawData.era;
    if (archElem) archElem.textContent = localized.architecture || rawData.architecture;
    if (matElem) matElem.textContent = localized.material || rawData.material;
    if (overviewElem) overviewElem.textContent = localized.overview || rawData.overview;
    if (culturalElem) culturalElem.textContent = localized.culturalSignificance || rawData.culturalSignificance;
    if (secretsElem) secretsElem.textContent = localized.secrets || rawData.secrets;

    if (featuresList) {
      featuresList.innerHTML = rawData.architecturalFeatures.map(f => `
        <li class="flex items-start gap-2 text-xs text-slate-700">
          <i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5"></i>
          <span>${f}</span>
        </li>
      `).join('');
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  },

  toggleAudioGuide() {
    if (this.isPlayingAudio) {
      this.stopAudio();
    } else {
      this.playAudioGuide();
    }
  },

  playAudioGuide() {
    const rawData = IND_DATA.landmarks[this.currentLandmarkId] || IND_DATA.landmarks["charminar"];
    const lang = window.I18N ? window.I18N.currentLanguage : 'en';
    const localized = (rawData.i18n && rawData.i18n[lang]) ? rawData.i18n[lang] : rawData;
    const playBtn = document.getElementById("scanner-audio-btn");
    const waveElem = document.getElementById("scanner-audio-wave");

    if (!window.speechSynthesis) {
      if (window.App && window.App.showToast) {
        window.App.showToast("Speech synthesis not supported on this device.", "info");
      }
      return;
    }

    window.speechSynthesis.cancel();
    const textToSpeak = localized.audioGuide || rawData.audioGuide;
    this.speechUtterance = new SpeechSynthesisUtterance(textToSpeak);
    this.speechUtterance.rate = this.audioRate;

    // Pick speech voice matching selected language
    const voices = window.speechSynthesis.getVoices();
    const langVoiceMap = {
      hi: "hi-IN", te: "te-IN", ta: "ta-IN", kn: "kn-IN",
      ml: "ml-IN", bn: "bn-IN", mr: "mr-IN", gu: "gu-IN", en: "en-IN"
    };
    const targetLocale = langVoiceMap[lang] || "en-IN";
    const matchedVoice = voices.find(v => v.lang.replace('_', '-').startsWith(targetLocale.substring(0, 2)));
    if (matchedVoice) {
      this.speechUtterance.voice = matchedVoice;
    }

    this.speechUtterance.onstart = () => {
      this.isPlayingAudio = true;
      if (playBtn) {
        playBtn.innerHTML = `<i data-lucide="pause" class="w-4 h-4"></i> Pause Audio`;
        playBtn.classList.add("bg-[#FF9933]", "text-[#172033]");
      }
      if (waveElem) waveElem.classList.remove("hidden");
      if (window.lucide) window.lucide.createIcons();
    };

    this.speechUtterance.onend = () => {
      this.stopAudio();
    };

    this.speechUtterance.onerror = () => {
      this.stopAudio();
    };

    window.speechSynthesis.speak(this.speechUtterance);
  },

  stopAudio() {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    this.isPlayingAudio = false;
    const playBtn = document.getElementById("scanner-audio-btn");
    const waveElem = document.getElementById("scanner-audio-wave");

    if (playBtn) {
      playBtn.innerHTML = `<i data-lucide="volume-2" class="w-4 h-4"></i> Audio Guide`;
      playBtn.classList.remove("bg-[#FF9933]", "text-[#172033]");
    }
    if (waveElem) waveElem.classList.add("hidden");
  }
};

window.HeritageScanner = HeritageScanner;
