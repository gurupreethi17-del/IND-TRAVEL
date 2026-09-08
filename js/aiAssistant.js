// ==========================================================================
// IND TRAVEL — Core Feature 3: Multilingual AI Travel Assistant (Mobile & i18n)
// "India speaks many languages. IND Travel helps you understand them."
// ==========================================================================

const AIAssistant = {
  currentLanguage: "English",
  isListening: false,
  recognition: null,
  voiceEnabled: false,

  greetings: {
    "English": "Namaste! I am your IND Travel AI Companion. How can I help guide your journey across India today?",
    "Hindi": "नमस्ते! मैं आपका IND ट्रैवल AI साथी हूँ। आज भारत में आपकी यात्रा में मैं कैसे सहायता कर सकता हूँ?",
    "Telugu": "నమస్కారం! నేను మీ IND ట్రావెల్ AI గైడ్. భారతదేశంలో మీ ప్రయాణానికి నేను ఎలా సహాయపడగలను?",
    "Tamil": "வணக்கம்! நான் உங்கள் IND டிராவல் AI வழிகாட்டி. இந்தியாவில் உங்கள் பயணத்திற்கு நான் எவ்வாறு உதவ முடியும்?",
    "Kannada": "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ IND ಟ್ರಾವೆಲ್ AI ಮಾರ್ಗದರ್ಶಿ. ಭಾರತದಲ್ಲಿ మీ ప్రయాణానికి నేను ఎలా సహాయం చేయగలను?",
    "Malayalam": "നമസ്കാരം! ഞാൻ നിങ്ങളുടെ IND ട്രാവൽ AI സഹയാത്രികനാണ്. യാത്രയിൽ ഞാൻ എങ്ങനെ സഹായിക്കണം?",
    "Bengali": "নমস্কার! আমি আপনার IND ট্রাভেল AI সঙ্গী। আজ কীভাবে সাহায্য করতে পারি?",
    "Marathi": "नमस्कार! मी तुमचा IND ट्रॅव्हल AI साथीदार आहे. मी तुम्हाला कशी मदत करू?",
    "Gujarati": "નમસ્તે! હું તમારો IND ટ્રાવેલ AI સાથી છું. હું તમને કેવી રીતે મદદ કરી શકું?",
    "Punjabi": "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ IND ਟ੍ਰੈਵਲ AI ਸਾਥੀ ਹਾਂ। ਅੱਜ ਕਿਵੇਂ ਮਦਦ ਕਰਾਂ?",
    "French": "Bonjour! Je suis votre compagnon IA IND Travel. Comment puis-je vous aider?",
    "German": "Guten Tag! Ich bin Ihr IND Travel KI-Reisebegleiter. Wie kann ich helfen?",
    "Spanish": "¡Hola! Soy tu compañero de viaje con IA de IND Travel. ¿En qué te ayudo?"
  },

  init() {
    this.setupSpeechRecognition();
    this.bindEvents();
  },

  onLanguageChange(langCode) {
    const mapLang = {
      en: 'English', hi: 'Hindi', te: 'Telugu', ta: 'Tamil',
      kn: 'Kannada', ml: 'Malayalam', bn: 'Bengali', mr: 'Marathi',
      gu: 'Gujarati', pa: 'Punjabi', fr: 'French', de: 'German', es: 'Spanish'
    };
    const name = mapLang[langCode] || 'English';
    this.currentLanguage = name;
    this.addBotMessage(this.greetings[name] || this.greetings["English"]);

    if (this.recognition) {
      const langMap = {
        "English": "en-IN", "Hindi": "hi-IN", "Telugu": "te-IN", "Tamil": "ta-IN",
        "Kannada": "kn-IN", "Malayalam": "ml-IN", "Bengali": "bn-IN", "Marathi": "mr-IN",
        "Gujarati": "gu-IN", "Punjabi": "pa-IN", "French": "fr-FR", "German": "de-DE", "Spanish": "es-ES"
      };
      this.recognition.lang = langMap[name] || "en-IN";
    }
  },

  setupSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;

      this.recognition.onstart = () => {
        this.isListening = true;
        const micBtn = document.getElementById("chat-mic-btn");
        if (micBtn) micBtn.classList.add("bg-red-500", "text-white", "animate-pulse");
      };

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const input = document.getElementById("chat-input");
        if (input) {
          input.value = transcript;
          this.handleSendMessage(transcript);
        }
      };

      this.recognition.onend = () => {
        this.isListening = false;
        const micBtn = document.getElementById("chat-mic-btn");
        if (micBtn) micBtn.classList.remove("bg-red-500", "text-white", "animate-pulse");
      };

      this.recognition.onerror = () => {
        this.isListening = false;
        const micBtn = document.getElementById("chat-mic-btn");
        if (micBtn) micBtn.classList.remove("bg-red-500", "text-white", "animate-pulse");
      };
    }
  },

  bindEvents() {
    const langSelect = document.getElementById("chat-language-select");
    if (langSelect) {
      langSelect.addEventListener("change", (e) => {
        const langName = e.target.value;
        const codeMap = {
          'English': 'en', 'Hindi': 'hi', 'Telugu': 'te', 'Tamil': 'ta',
          'Kannada': 'kn', 'Malayalam': 'ml', 'Bengali': 'bn', 'Marathi': 'mr',
          'Gujarati': 'gu', 'Punjabi': 'pa', 'French': 'fr', 'German': 'de', 'Spanish': 'es'
        };
        if (window.I18N) {
          window.I18N.setLanguage(codeMap[langName] || 'en');
        } else {
          this.onLanguageChange(codeMap[langName] || 'en');
        }
      });
    }

    const voiceToggle = document.getElementById("chat-voice-toggle");
    if (voiceToggle) {
      voiceToggle.addEventListener("click", () => {
        this.voiceEnabled = !this.voiceEnabled;
        voiceToggle.classList.toggle("bg-[#FF9933]", this.voiceEnabled);
        voiceToggle.classList.toggle("text-[#172033]", this.voiceEnabled);
        if (window.App && window.App.showToast) {
          window.App.showToast(this.voiceEnabled ? "Voice output enabled" : "Voice output muted", "info");
        }
      });
    }

    const micBtn = document.getElementById("chat-mic-btn");
    if (micBtn) {
      micBtn.addEventListener("click", () => {
        if (!this.recognition) {
          if (window.App && window.App.showToast) {
            window.App.showToast("Voice recognition not supported in this browser.", "info");
          }
          return;
        }
        if (this.isListening) {
          this.recognition.stop();
        } else {
          try {
            this.recognition.start();
          } catch (err) {
            console.warn(err);
          }
        }
      });
    }

    const chatForm = document.getElementById("ai-chat-form");
    if (chatForm) {
      chatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = document.getElementById("chat-input");
        const query = input.value.trim();
        if (query) {
          input.value = "";
          this.handleSendMessage(query);
        }
      });
    }

    const promptChips = document.querySelectorAll(".chat-quick-prompt");
    promptChips.forEach(chip => {
      chip.addEventListener("click", () => {
        const query = chip.textContent.trim().replace(/^[^\w\u0900-\u0DFF]+/, '');
        this.handleSendMessage(query);
      });
    });
  },

  handleSendMessage(query) {
    this.addUserMessage(query);
    this.showTypingIndicator();

    setTimeout(() => {
      this.removeTypingIndicator();
      const response = this.generateResponse(query);
      this.addBotMessage(response);
    }, 500);
  },

  addUserMessage(text) {
    const chatHistory = document.getElementById("chat-messages-container");
    if (!chatHistory) return;

    const div = document.createElement("div");
    div.className = "flex justify-end mb-3";
    div.innerHTML = `
      <div class="max-w-[85%] bg-[#000080] text-white rounded-2xl rounded-tr-none px-4 py-2.5 shadow-sm text-xs sm:text-sm">
        <p>${this.escapeHtml(text)}</p>
        <span class="text-[9px] text-blue-200 block text-right mt-1">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    `;
    chatHistory.appendChild(div);
    chatHistory.scrollTop = chatHistory.scrollHeight;
  },

  addBotMessage(htmlContent) {
    const chatHistory = document.getElementById("chat-messages-container");
    if (!chatHistory) return;

    const div = document.createElement("div");
    div.className = "flex justify-start mb-3";
    div.innerHTML = `
      <div class="flex items-start gap-2.5 max-w-[92%] sm:max-w-[80%]">
        <div class="w-7 h-7 rounded-full bg-[#000080] text-white flex items-center justify-center shrink-0 text-[10px] font-bold">
          IND
        </div>
        <div class="bg-white border border-slate-200 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm text-xs sm:text-sm text-slate-800 space-y-1.5">
          ${htmlContent}
          <div class="flex items-center justify-between border-t border-slate-100 pt-1.5 mt-1.5 text-[10px] text-slate-400">
            <span>Verified Knowledge Base</span>
            <span>${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </div>
    `;
    chatHistory.appendChild(div);
    chatHistory.scrollTop = chatHistory.scrollHeight;

    if (this.voiceEnabled && window.speechSynthesis) {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = htmlContent;
      const plainText = tempDiv.textContent || tempDiv.innerText || "";
      const utterance = new SpeechSynthesisUtterance(plainText.substring(0, 180));
      window.speechSynthesis.speak(utterance);
    }
  },

  showTypingIndicator() {
    const chatHistory = document.getElementById("chat-messages-container");
    if (!chatHistory) return;

    const div = document.createElement("div");
    div.id = "chat-typing-indicator";
    div.className = "flex justify-start mb-3";
    div.innerHTML = `
      <div class="flex items-center gap-2">
        <div class="w-7 h-7 rounded-full bg-[#000080] text-white flex items-center justify-center text-[10px] font-bold">
          IND
        </div>
        <div class="bg-white border border-slate-200 rounded-2xl px-3 py-2 shadow-sm flex items-center gap-1">
          <span class="w-1.5 h-1.5 rounded-full bg-[#FF9933] animate-bounce"></span>
          <span class="w-1.5 h-1.5 rounded-full bg-[#FF9933] animate-bounce" style="animation-delay: 0.2s"></span>
          <span class="w-1.5 h-1.5 rounded-full bg-[#FF9933] animate-bounce" style="animation-delay: 0.4s"></span>
        </div>
      </div>
    `;
    chatHistory.appendChild(div);
    chatHistory.scrollTop = chatHistory.scrollHeight;
  },

  removeTypingIndicator() {
    const indicator = document.getElementById("chat-typing-indicator");
    if (indicator) indicator.remove();
  },

  generateResponse(query) {
    const q = query.toLowerCase();
    const lang = this.currentLanguage;

    // Multilingual response handling
    if (lang === "Hindi") {
      if (q.includes("चारमीनार") || q.includes("charminar") || q.includes("पहुंचें")) {
        return `
          <p class="font-bold text-slate-900">🛺 चारमीनार कैसे पहुंचें:</p>
          <ul class="list-disc pl-4 space-y-1 text-xs text-slate-700 mt-1">
            <li><strong>हवाई अड्डे से:</strong> पुष्पा AC बस (₹250) से अफज़लगंज, फिर 5 मिनट का ऑटो।</li>
            <li><strong>रेलवे स्टेशन से:</strong> नामपल्ली से 4 किमी ऑटो या कैब (₹90-₹130)।</li>
            <li><strong>मेट्रो द्वारा:</strong> ग्रीन लाइन से MGBS स्टेशन, वहां से 1.8 किमी ई-रिक्शा।</li>
          </ul>
          <p class="text-xs text-amber-800 bg-amber-50 p-1.5 rounded mt-1 border border-amber-200">
            💡 <strong>सुझाव:</strong> शाम 4:30 बजे जाएं ताकि पास के निमरा कैफे की ईरानी चाय का आनंद ले सकें!
          </p>
        `;
      }
      if (q.includes("सुरक्षा") || q.includes("police") || q.includes("हेल्पलाइन")) {
        return `
          <p class="font-bold text-red-700">🛡 आपातकालीन सुरक्षा संपर्क:</p>
          <ul class="list-disc pl-4 space-y-1 text-xs text-slate-700 mt-1">
            <li><strong>राष्ट्रीय आपातकाल:</strong> 112</li>
            <li><strong>पर्यटन मंत्रालय 24x7 हेल्पलाइन:</strong> 1363 (निशुल्क)</li>
            <li><strong>महिला हेल्पलाइन:</strong> 1090</li>
          </ul>
        `;
      }
      return `
        <p class="font-bold text-slate-900">नमस्ते! आपकी यात्रा के लिए सुझाव:</p>
        <p class="text-xs text-slate-700 mt-1">
          भारत में सुखद यात्रा हेतु हमारे <strong>AI Trip Planner</strong> का उपयोग करें एवं <strong>1363</strong> हेल्पलाइन अपने फोन में सहेज कर रखें।
        </p>
      `;
    }

    if (lang === "Telugu") {
      if (q.includes("చార్మినార్") || q.includes("charminar")) {
        return `
          <p class="font-bold text-slate-900">🛺 చార్మినార్‌ను చేరుకోవడం ఎలా:</p>
          <ul class="list-disc pl-4 space-y-1 text-xs text-slate-700 mt-1">
            <li><strong>ఎయిర్‌పోర్ట్ నుండి:</strong> పుష్పక్ AC బస్సు ద్వారా అఫ్జల్‌గంజ్ (₹250), అక్కడి నుండి ఆటో.</li>
            <li><strong>మెట్రో ద్వారా:</strong> గ్రీన్ లైన్ ద్వారా MGBS స్టేషన్ చేరుకుని, అక్కడి నుండి 1.8 కి.మీ ఆటో.</li>
          </ul>
          <p class="text-xs text-amber-800 bg-amber-50 p-1.5 rounded mt-1 border border-amber-200">
            💡 <strong>సూచన:</strong> సాయంత్రం 4:30 గంటలకు వెళితే నిమ్రా కేఫ్‌లో ఇరానీ చాయ్ మరియు బిస్కెట్లను ఆస్వాదించవచ్చు!
          </p>
        `;
      }
      return `
        <p class="font-bold text-slate-900">నమస్కారం! మీ ప్రయాణానికి సూచనలు:</p>
        <p class="text-xs text-slate-700 mt-1">
          భారతదేశంలో సురక్షిత ప్రయాణానికి మా <strong>AI Trip Planner</strong> ఉపయోగించండి. అత్యవసర సహాయం కొరకు <strong>1363</strong> లేదా <strong>112</strong> నంబర్లను సంప్రదించండి.
        </p>
      `;
    }

    // Default English response logic
    if (q.includes("charminar") || q.includes("reach")) {
      return `
        <p class="font-bold text-slate-900">🛺 Reaching Charminar in Hyderabad:</p>
        <ul class="list-disc pl-4 space-y-1 text-xs text-slate-700 mt-1">
          <li><strong>From Airport (RGIA):</strong> Take Pushpak AC Airport Bus (Route AC-1) to Afzal Gunj (₹250), then 5-min auto.</li>
          <li><strong>From Railway Station (Nampally):</strong> Auto/cab is 4 km (15 mins, ₹90-₹140).</li>
          <li><strong>By Metro:</strong> Take Green Line to MGBS station, then 1.8 km electric auto.</li>
        </ul>
        <p class="text-xs bg-amber-50 p-2 rounded-lg border border-amber-200 text-amber-900 mt-2">
          💡 <strong>Pro-tip:</strong> Visit around 4:30 PM for Nimrah Cafe's hot Irani Chai & Osmania biscuits before evening illumination!
        </p>
      `;
    }

    if (q.includes("temple") || q.includes("dress")) {
      return `
        <p class="font-bold text-slate-900">🕉 Indian Temple Etiquette:</p>
        <ul class="list-disc pl-4 space-y-1 text-xs text-slate-700 mt-1">
          <li><strong>Footwear:</strong> Always remove shoes at shoe stands before entering sanctums.</li>
          <li><strong>Dress Code:</strong> Shoulders and knees must be covered. Traditional attire is mandatory in prominent South Indian temples.</li>
          <li><strong>Photography:</strong> Restricted inside inner sanctums (Garbhagriha).</li>
        </ul>
      `;
    }

    if (q.includes("food") || q.includes("water") || q.includes("eat")) {
      return `
        <p class="font-bold text-slate-900">🍛 Safe Food & Dining in India:</p>
        <ul class="list-disc pl-4 space-y-1 text-xs text-slate-700 mt-1">
          <li><strong>Water:</strong> Drink sealed bottled mineral water (Bisleri, Kinley) or RO purified water.</li>
          <li><strong>Street Food:</strong> Choose popular stalls with high local turnover where food is served piping hot.</li>
          <li><strong>Symbols:</strong> 🟢 Green dot indicates 100% vegetarian; 🔴 red dot indicates non-vegetarian.</li>
        </ul>
      `;
    }

    if (q.includes("safe") || q.includes("emergency") || q.includes("help") || q.includes("police")) {
      return `
        <p class="font-bold text-red-700">🛡 Tourist Safety & Immediate Helplines:</p>
        <ul class="list-disc pl-4 space-y-1 text-xs text-slate-700 mt-1">
          <li><strong>Unified National Emergency:</strong> 112</li>
          <li><strong>Ministry of Tourism 24x7 Multi-lingual Helpline:</strong> 1363 (Toll-Free)</li>
          <li><strong>Women Helpline:</strong> 1090</li>
          <li><strong>Ambulance:</strong> 108</li>
        </ul>
      `;
    }

    return `
      <p class="font-bold text-slate-900">Namaste! Here is verified guidance for your query:</p>
      <p class="text-xs text-slate-700 mt-1 leading-relaxed">
        India offers incredible cultural richness across every state. For the smoothest experience, use our <strong>AI Trip Planner</strong> and keep the <strong>1363</strong> Tourism Helpline saved.
      </p>
    `;
  },

  escapeHtml(string) {
    const entityMap = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    return String(string).replace(/[&<>"']/g, s => entityMap[s]);
  }
};

window.AIAssistant = AIAssistant;
