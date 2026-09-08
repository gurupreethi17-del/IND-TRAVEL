// ==========================================================================
// IND TRAVEL — Tourism Intelligence & Heritage Dataset
// "One India. One Trusted Travel Ecosystem."
// ==========================================================================

const IND_DATA = {
  // 1. Curated Destinations across 6 Regions & 10 Themes
  destinations: [
    {
      id: "charminar",
      name: "Charminar & Old Hyderabad",
      state: "Telangana",
      region: "South India",
      theme: "Heritage India",
      tagline: "The Arc de Triomphe of the East",
      description: "Built in 1591 by Sultan Muhammad Quli Qutb Shah to commemorate the eradication of a plague, Charminar stands as the timeless beating heart of Hyderabad, flanked by bustling Laad Bazaar and aroma-filled biryani lanes.",
      bestTime: "October to March",
      climate: "Pleasant (18°C - 28°C)",
      image: "https://images.unsplash.com/photo-1572445271230-a78b5944a659?auto=format&fit=crop&w=1000&q=80",
      crowdLevel: "Moderate",
      crowdBadge: "🟡 Moderate",
      capacityPercent: 68,
      attractions: ["Laad Bazaar (Lacquer Bangles)", "Chowmahalla Palace", "Mecca Masjid", "Nimrah Cafe (Irani Chai)"],
      delicacies: ["Hyderabadi Dum Biryani", "Mirchi Ka Salan", "Double Ka Meetha", "Osmania Biscuits"],
      etiquette: "Modest dress code required near Mecca Masjid. Bargaining is standard in Laad Bazaar."
    },
    {
      id: "taj-mahal",
      name: "Taj Mahal & Agra Fort",
      state: "Uttar Pradesh",
      region: "North India",
      theme: "Heritage India",
      tagline: "A Teardrop on the Face of Eternity",
      description: "Commissioned in 1631 by Mughal Emperor Shah Jahan for his beloved Mumtaz Mahal, this ivory-white marble mausoleum on the southern bank of the Yamuna River represents the pinnacle of Mughal symmetry and UNESCO world heritage.",
      bestTime: "November to February",
      climate: "Cool Winters (10°C - 22°C)",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1000&q=80",
      crowdLevel: "High",
      crowdBadge: "🔴 High",
      capacityPercent: 92,
      attractions: ["Taj Mahal Sunrise", "Agra Fort", "Mehtab Bagh Sunset View", "Fatehpur Sikri"],
      delicacies: ["Agra Petha (Angoori & Kesar)", "Bedmi Puri & Aloo", "Mughlai Kebab"],
      etiquette: "No shoes on the marble plinth (shoe covers provided). Tripods, large bags, and drones are strictly restricted."
    },
    {
      id: "varanasi",
      name: "Varanasi Ghats & Kashi",
      state: "Uttar Pradesh",
      region: "North India",
      theme: "Spiritual India",
      tagline: "The Spiritual Capital of India",
      description: "One of the oldest continuously inhabited cities on Earth. Mark Twain wrote that Varanasi is older than history, older than tradition, older even than legend. Experience the transcendent evening Ganga Aarti at Dashashwamedh Ghat.",
      bestTime: "October to March",
      climate: "Mild & Cool (12°C - 25°C)",
      image: "https://images.unsplash.com/photo-1561359313-0639aad49ca6?auto=format&fit=crop&w=1000&q=80",
      crowdLevel: "High",
      crowdBadge: "🔴 High",
      capacityPercent: 88,
      attractions: ["Dashashwamedh Ghat Aarti", "Kashi Vishwanath Corridor", "Assi Ghat Dawn Boat Ride", "Sarnath"],
      delicacies: ["Banarasi Paan", "Kachori Sabzi & Jalebi", "Malaiyo (Winter Foam)", "Tamatar Chaat"],
      etiquette: "Maintain deep reverence at Manikarnika Ghat; strictly avoid photography at cremation sites."
    },
    {
      id: "hampi",
      name: "Hampi — Ruins of Vijayanagara",
      state: "Karnataka",
      region: "South India",
      theme: "Heritage India",
      tagline: "Where History Lives Among Stones",
      description: "A breathtaking UNESCO World Heritage open-air museum set amidst boulder-strewn hills. In the 15th century, Vijayanagara was the world's second-largest city, trading gems and silk from across Europe and Persia.",
      bestTime: "October to February",
      climate: "Warm Days, Cool Breezes (20°C - 30°C)",
      image: "https://images.unsplash.com/photo-1600100397608-f010e41b2123?auto=format&fit=crop&w=1000&q=80",
      crowdLevel: "Normal",
      crowdBadge: "🟢 Normal",
      capacityPercent: 44,
      attractions: ["Stone Chariot at Vittala Temple", "Virupaksha Temple", "Lotus Mahal & Elephant Stables", "Matanga Hill Sunrise"],
      delicacies: ["South Indian Thali on Banana Leaf", "Bisi Bele Bath", "Filter Coffee", "Mysore Pak"],
      etiquette: "Rent a bicycle or electric cart to preserve the heritage zone. Remove footwear before entering sanctums."
    },
    {
      id: "jaipur",
      name: "Jaipur — The Pink City",
      state: "Rajasthan",
      region: "West India",
      theme: "Cultural India",
      tagline: "Royal Pageantry & Fortified Grandeur",
      description: "Founded in 1727 by Maharaja Sawai Jai Singh II, Jaipur is a planned marvel of Vedic Vastu Shastra painted terracotta pink in 1876 to welcome the Prince of Wales. Home to Amber Fort, Hawa Mahal, and City Palace.",
      bestTime: "November to March",
      climate: "Crisp Desert Winters (12°C - 26°C)",
      image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80",
      crowdLevel: "Moderate",
      crowdBadge: "🟡 Moderate",
      capacityPercent: 74,
      attractions: ["Amber Fort Mirror Palace (Sheesh Mahal)", "Hawa Mahal (Palace of Winds)", "Jantar Mantar Observatory", "Nahargarh Fort"],
      delicacies: ["Dal Baati Churma", "Ghevar", "Pyaaz Kachori", "Laal Maas"],
      etiquette: "Respect royal private quarters inside City Palace. Use certified Rajasthan Tourism guides."
    },
    {
      id: "kerala-backwaters",
      name: "Alleppey & Kumarakom Backwaters",
      state: "Kerala",
      region: "South India",
      theme: "Coastal India",
      tagline: "God's Own Country",
      description: "An intricate labyrinth of tranquil lagoons, palm-fringed canals, and emerald paddy fields. Glide on a traditional eco-friendly Kettuvallam houseboat powered by solar energy, tasting fresh coastal spices.",
      bestTime: "September to March",
      climate: "Tropical Breezy (23°C - 32°C)",
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=80",
      crowdLevel: "Normal",
      crowdBadge: "🟢 Normal",
      capacityPercent: 51,
      attractions: ["Houseboat Cruise on Vembanad Lake", "Kumarakom Bird Sanctuary", "Marari Beach", "Ayurvedic Herbal Spas"],
      delicacies: ["Karimeen Pollichathu (Pearl Spot Fish)", "Appam with Stew", "Puttu and Kadala Curry", "Kerala Sadya"],
      etiquette: "Choose certified green-leaf houseboats that avoid dumping plastic or waste in the fragile backwater ecosystem."
    },
    {
      id: "ladakh",
      name: "Leh & Nubra Valley",
      state: "Ladakh",
      region: "North India",
      theme: "Himalayan Escapes",
      tagline: "The Land of High Passes",
      description: "A high-altitude moonscape framed by snow-dusted Karakoram and Himalayan peaks. Tibetan Buddhist gompas cling to sheer granite cliffs, while double-humped Bactrian camels wander the white sands of Nubra Valley.",
      bestTime: "May to September",
      climate: "Cold Desert (10°C - 20°C Days, 0°C Nights)",
      image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1000&q=80",
      crowdLevel: "Normal",
      crowdBadge: "🟢 Normal",
      capacityPercent: 42,
      attractions: ["Pangong Tso Lake", "Khardung La Pass (17,582 ft)", "Thiksey Monastery", "Nubra Valley Sand Dunes"],
      delicacies: ["Thukpa & Steamed Momos", "Butter Tea (Gur Gur Chai)", "Skyu Stew", "Chhurpi Dried Yak Cheese"],
      etiquette: "Mandatory 48-hour acclimatization in Leh to prevent acute mountain sickness. Carry all plastic trash back."
    },
    {
      id: "goa",
      name: "Old Goa & South Beaches",
      state: "Goa",
      region: "West India",
      theme: "Coastal India",
      tagline: "Sun, Spice & Indo-Portuguese Soul",
      description: "Beyond the party coast lies a 450-year confluence of Konkani traditions and Portuguese Baroque architecture. Walk through UNESCO churches of Velha Goa, explore fragrant spice plantations, and unwind on serene southern shores.",
      bestTime: "November to March",
      climate: "Tropical Sunshine (22°C - 31°C)",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=80",
      crowdLevel: "Moderate",
      crowdBadge: "🟡 Moderate",
      capacityPercent: 72,
      attractions: ["Basilica of Bom Jesus", "Fontainhas Latin Quarter", "Palolem Beach", "Sahakari Spice Plantation"],
      delicacies: ["Goan Fish Curry & Rice", "Bebinca (16-layer cake)", "Pork Vindaloo", "Poi Bread with Chorizo"],
      etiquette: "Observe solemn silence and respectful attire inside ancient basilicas. Wear life jackets during water sports."
    }
  ],

  // 2. Multilingual Heritage Landmark Scans for AI Scanner
  landmarks: {
    "charminar": {
      name: "Charminar",
      city: "Hyderabad, Telangana",
      era: "1591 CE — Qutb Shahi Dynasty",
      dynasty: "Muhammad Quli Qutb Shah",
      architecture: "Indo-Islamic with Persian & Deccani synthesis",
      material: "Granite, Lime mortar, Pulverized marble",
      overview: "Erected in 1591 CE by the fifth ruler of the Qutb Shahi dynasty to commemorate the end of a devastating plague, Charminar is a square monument with four grand arches and four 48.7-meter minarets.",
      culturalSignificance: "Symbol of Hyderabad's Ganga-Jamuni tehzeeb (syncretic Hindu-Muslim cultural ethos). The upper floor houses the oldest surviving mosque in the city, while the surrounding markets form Asia's vibrant center for natural pearls and lacquer craft.",
      architecturalFeatures: [
        "Four 48.7-meter minarets with 149 winding spiral steps",
        "Pointed arches facing the cardinal directions",
        "Stucco floral ornamentation and jali screens",
        "Vastu-compliant Deccani street layout alignment"
      ],
      secrets: "Legend speaks of a subterranean escape tunnel connecting the Charminar arches directly to the Golconda Fort citadel 9 km away.",
      audioGuide: "Welcome to Charminar, the crown jewel of the Deccan plateau. Built in 1591 by Sultan Muhammad Quli Qutb Shah, this 430-year-old monument marked Hyderabad's transition into an open garden city.",
      
      // Multilingual variations
      i18n: {
        hi: {
          name: "चारमीनार",
          city: "हैदराबाद, तेलंगाना",
          era: "1591 ईस्वी — कुतुब शाही राजवंश",
          architecture: "दक्कनी व फ़ारसी तत्वों से युक्त भारत-इस्लामी शैली",
          material: "ग्रेनाइट, चूने का गारा, पिसा हुआ संगमरमर",
          overview: "1591 ईस्वी में कुतुब शाही वंश के पांचवें सुल्तान मुहम्मद कुली कुतुब शाह द्वारा एक भीषण प्लेग महामारी की समाप्ति की स्मृति में चारमीनार का निर्माण कराया गया था।",
          culturalSignificance: "हैदराबाद की गंगा-जमुनी तहज़ीब का अमर प्रतीक। ऊपरी मंजिल पर शहर की सबसे प्राचीन मस्जिद स्थित है, जबकि आसपास लाड बाज़ार की लाख की चूड़ियाँ प्रसिद्ध हैं।",
          secrets: "कहा जाता है कि संकट काल में शाही परिवार को सुरक्षित निकालने हेतु चारमीनार से गोलकोंडा किले तक 9 किलोमीटर लंबी गुप्त सुरंग थी।",
          audioGuide: "दक्कन के ताज चारमीनार में आपका स्वागत है। 1591 में सुल्तान मुहम्मद कुली कुतुब शाह द्वारा निर्मित यह भव्य 430 वर्ष पुराना स्मारक हैदराबाद की समृद्ध ऐतिहासिक संस्कृति का प्रतीक है।"
        },
        te: {
          name: "చార్మినార్",
          city: "హైదరాబాద్, తెలంగాణ",
          era: "1591 సా.శ. — కుతుబ్ షాహీ రాజవంశం",
          architecture: "ఇండో-ఇస్లామిక్ మరియు దక్కనీ సమ్మేళన శైలి",
          material: "గ్రానైట్, సున్నం గార, పాలరాయి పొడి",
          overview: "1591లో కుతుబ్ షాహీ వంశానికి చెందిన ఐదవ సుల్తాన్ మహమ్మద్ కులీ కుతుబ్ షా ప్లేగు వ్యాధి నిర్మూలనకు గుర్తుగా చార్మినార్‌ను నిర్మించారు.",
          culturalSignificance: "హైదరాబాద్ గంగా-జమునీ తెహజీబ్ (హిందూ-ముస్లిం సామరస్యం) యొక్క సజీవ చిహ్నం. దీని ఎగువ అంతస్తులో పురాతన మసీదు ఉంది, చుట్టూ ప్రసిద్ధ లాడ్ బజార్ ముత్యాలు లభిస్తాయి.",
          secrets: "చార్మినార్ నుండి గోల్కొండ కోటకు అత్యవసర సమయాల్లో తప్పించుకోవడానికి 9 కి.మీ భూగర్భ రహస్య సొరంగం ఉండేదని చెబుతారు.",
          audioGuide: "దక్కన్ కిరీటం చార్మినార్‌కు స్వాగతం. 1591లో సుల్తాన్ మహమ్మద్ కులీ కుతుబ్ షా చేత నిర్మించబడిన ఈ 430 ఏళ్ల చారిత్రక కట్టడం హైదరాబాద్ జీవనాడి."
        },
        ta: {
          name: "சார்மினார்",
          city: "ஹைதராபாத், தெலுங்கானா",
          era: "கி.பி. 1591 — குதுப் ஷாஹி வம்சம்",
          architecture: "பாரசீக மற்றும் தக்காண பாணி இந்தோ-இஸ்லாமிக் கட்டிடக்கலை",
          material: "கிரானைட், சுண்ணாம்பு காரை, பளிங்குத்தூள்",
          overview: "1591 ஆம் ஆண்டில் சுல்தான் முஹம்மது குலி குதுப் ஷா அவர்களால் பிளேக் நோய் ஒழிப்பைக் கொண்டாடும் வகையில் கட்டப்பட்ட வரலாற்றுச் சின்னம்.",
          culturalSignificance: "ஹைதராபாத்தின் மத நல்லிணக்கத்தின் சின்னம். இதன் மேல் தளம் நகரின் பழமையான பள்ளிவாசலைக் கொண்டுள்ளது.",
          secrets: "சார்மினார் வளைவுகளிலிருந்து 9 கிமீ தொலைவில் உள்ள கோல்கொண்டா கோட்டைக்கு தப்பிக்கும் நிலத்தடி சுரங்கப்பாதை இருந்ததாக நம்பப்படுகிறது.",
          audioGuide: "தக்காணத்தின் மணிமகுடமான சார்மினாருக்கு உங்களை வரவேற்கிறோம். 1591 இல் கட்டப்பட்ட இந்த 430 ஆண்டுகள் பழமையான நினைவுச்சின்னம் ஹைதராபாத்தின் பெருமைமிகு அடையாளமாகும்."
        }
      }
    },
    "taj-mahal": {
      name: "Taj Mahal",
      city: "Agra, Uttar Pradesh",
      era: "1631–1648 CE — Mughal Empire",
      dynasty: "Emperor Shah Jahan",
      architecture: "Classical Mughal with Pietra Dura inlay",
      material: "Makrana White Marble with 28 types of precious stones",
      overview: "Universally acknowledged as a wonder of the world, the Taj Mahal is an ivory-white marble mausoleum on the southern bank of the Yamuna river built by Emperor Shah Jahan in memory of Mumtaz Mahal.",
      culturalSignificance: "An architectural hymn to love and the zenith of Mughal aesthetic harmony, designated a UNESCO World Heritage Site in 1983.",
      architecturalFeatures: [
        "Perfect bilaterally symmetrical composition around a central dome (35m tall)",
        "Outward-tilted minarets designed to fall away from the tomb during earthquakes",
        "Parchin Kari (Pietra Dura) stone inlay with lapis lazuli, jade, and carnelian",
        "Optical illusion where Arabic calligraphy appears identical in size from ground to apex"
      ],
      secrets: "The four 40-meter minarets were deliberately built tilting outward by 2 to 3 degrees so that during an earthquake they would fall away from the sanctum.",
      audioGuide: "You are standing before the Taj Mahal, a masterpiece of mathematical symmetry and devotion. Notice how the ivory-white Makrana marble shifts shade with the daylight.",
      i18n: {
        hi: {
          name: "ताज महल",
          city: "आगरा, उत्तर प्रदेश",
          era: "1631-1648 ईस्वी — मुग़ल साम्राज्य",
          architecture: "पिएट्रा ड्यूरा नक्काशी युक्त शास्त्रीय मुग़ल वास्तुकला",
          material: "मकराना का श्वेत संगमरमर एवं 28 बहुमूल्य रत्न",
          overview: "विश्व धरोहरों में शीर्ष स्थान रखने वाला ताजमहल यमुना नदी के तट पर सम्राट शाहजहाँ द्वारा अपनी बेगम मुमताज़ महल की स्मृति में निर्मित संगमरमरी मकबरा है।",
          culturalSignificance: "मुग़ल कला का उत्कृष्टतम नमूना और प्रेम का शाश्वत प्रतीक, जिसे 1983 में यूनेस्को विश्व धरोहर घोषित किया गया।",
          secrets: "चारों मीनारों को बाहर की ओर 2-3 डिग्री झुकाया गया है ताकि भूकंप आने पर वे मुख्य गुंबद से बाहर की ओर गिरें।",
          audioGuide: "विश्व प्रसिद्ध ताज महल में आपका स्वागत है। मकराना संगमरमर से निर्मित यह स्मारक सूर्य के प्रकाश के साथ अपने रंग बदलता प्रतीत होता है।"
        },
        te: {
          name: "తాజ్ మహల్",
          city: "ఆగ్రా, ఉత్తర ప్రదేశ్",
          era: "1631–1648 సా.శ. — మొఘల్ సామ్రాజ్యం",
          architecture: "పియట్రా డ్యూరా నైపుణ్యంతో కూడిన క్లాసికల్ మొఘల్ శైలి",
          material: "మక్రానా తెల్లటి పాలరాయి, 28 రకాల రత్నాలు",
          overview: "ప్రపంచ అద్భుతాలలో ఒకటైన తాజ్ మహల్, చక్రవర్తి షాజహాన్ తన ప్రియతమ భార్య ముంతాజ్ మహల్ జ్ఞాపకార్థం నిర్మించిన పాలరాతి సమాధి.",
          culturalSignificance: "ప్రేమకు శాశ్వత చిహ్నం మరియు మొఘల్ నిర్మాణ శైలికి శిఖరాగ్ర ఉదాహరణ.",
          secrets: "భూకంపాలు సంభవించినప్పుడు ప్రధాన సమాధిపై పడకుండా నాలుగు మినార్లను బయటివైపుకు కొద్దిగా వంచి నిర్మించారు.",
          audioGuide: "ప్రపంచ అద్భుతం తాజ్ మహల్‌కు స్వాగతం. గణిత సమరూపత మరియు శాశ్వత ప్రేమకు ఇది నిదర్శనం."
        }
      }
    },
    "hampi": {
      name: "Virupaksha Temple & Hampi",
      city: "Hampi, Bellary, Karnataka",
      era: "7th Century CE to 1565 CE — Vijayanagara Empire",
      dynasty: "Sangama to Tuluva Dynasties (Krishnadevaraya)",
      architecture: "Dravidian with stepped granite pillared halls",
      material: "Local granite monoliths, Stucco carvings",
      overview: "Located on the banks of the sacred Tungabhadra River, Virupaksha Temple is one of the few shrines in Hampi that has maintained continuous, unbroken worship since the 7th century.",
      culturalSignificance: "The spiritual heart of the Vijayanagara empire. Its grand gopuram dominates the boulder-filled landscape.",
      architecturalFeatures: [
        "9-tiered 50-meter eastern gateway gopuram",
        "Musical pillars in nearby Vittala Temple producing distinct sa-re-ga-ma notes",
        "Pinhole camera effect inside sanctum inverting the gopuram shadow",
        "Ranga Mandapa pillared hall commissioned by King Krishnadevaraya in 1510 CE"
      ],
      secrets: "An ancient aperture in the granite wall creates a natural pinhole camera (Camera Obscura) inverting the gopuram shadow inside the inner chamber.",
      audioGuide: "Welcome to Hampi, where the stones echo with the splendor of Vijayanagara. Virupaksha Temple has seen prayers uninterrupted for over 1,300 years.",
      i18n: {
        hi: {
          name: "विरूपाक्ष मंदिर एवं हम्पी",
          city: "हम्पी, कर्नाटक",
          era: "7वीं शताब्दी से 1565 ईस्वी — विजयनगर साम्राज्य",
          architecture: "द्रविड़ शैली एवं ग्रेनाइट के अलंकृत खंभे",
          material: "स्थानीय अखंड ग्रेनाइट पत्थर",
          overview: "तुंगभद्रा नदी के तट पर स्थित विरूपाक्ष मंदिर हम्पी का वह दुर्लभ तीर्थ है जहाँ 7वीं शताब्दी से आज तक निरंतर पूजा-अर्चना होती आ रही है।",
          culturalSignificance: "विजयनगर साम्राज्य का आध्यात्मिक हृदय। 15वीं सदी में यह विश्व का दूसरा सबसे बड़ा समृद्ध महानगर था।",
          secrets: "मंदिर के गर्भगृह में एक प्राकृतिक छिद्र से प्रकाश आकर 50 मीटर ऊंचे गोपुरम की उल्टी छाया दीवार पर बनाता है (कैमरा ऑब्स्क्यूरा)।",
          audioGuide: "हम्पी में आपका स्वागत है जहाँ पत्थरों में इतिहास सांस लेता है। 1300 वर्षों से यहाँ निरंतर पूजा हो रही है।"
        },
        te: {
          name: "విరూపాక్ష దేవాలయం & హంపి",
          city: "హంపి, కర్ణాటక",
          era: "7వ శతాబ్దం నుండి 1565 సా.శ. — విజయనగర సామ్రాజ్యం",
          architecture: "ద్రావిడ శైలి మరియు నల్లరాతి స్తంభాల నిర్మాణం",
          material: "స్థానిక గ్రానైట్ రాళ్ళు",
          overview: "తుంగభద్ర నదీ తీరాన వెలసిన విరూపాక్ష ఆలయం 7వ శతాబ్దం నుండి ఇప్పటివరకు నిరంతర పూజలు అందుకుంటున్న పవిత్ర క్షేత్రం.",
          culturalSignificance: "విజయనగర సామ్రాజ్య ఆధ్యాత్మిక కేంద్రం. శ్రీకృష్ణదేవరాయల పాలనలో స్వర్ణయుగం చూసిన క్షేత్రం.",
          secrets: "ఆలయ గర్భగుడి వెనుక గోడపై 50 మీటర్ల గోపుర నీడ తలకిందులుగా పడే సహజ పిన్‌హోల్ కెమెరా నిర్మాణం ఉంది.",
          audioGuide: "హంపి శిల్పకళా వైభవానికి స్వాగతం. విజయనగర చక్రవర్తుల వైభవం ఈ రాళ్లలో నేటికీ ప్రతిధ్వనిస్తుంది."
        }
      }
    },
    "konark": {
      name: "Konark Sun Temple",
      city: "Konark, Puri, Odisha",
      era: "1250 CE — Eastern Ganga Dynasty",
      dynasty: "King Narasimhadeva I",
      architecture: "Kalinga Style (Rekha and Pidha Deula)",
      material: "Khondalite stone and chlorite slabs",
      overview: "Conceived as a colossal chariot for the solar deity Surya, the temple stands on 24 intricately sculpted stone wheels pulled by seven horses.",
      culturalSignificance: "Renowned globally as the 'Black Pagoda' by ancient sailors navigating the Bay of Bengal, harmonizing astronomy and solar theology.",
      architecturalFeatures: [
        "24 sundial wheels, each 9.9 feet in diameter, accurate to within a minute",
        "Seven galloping horses representing the seven days of the week",
        "Intricate Natya Mandapa depicting 108 classical Odissi dance postures"
      ],
      secrets: "The spokes of the 24 stone wheels form sundials that calculate solar time to the minute through shadow casting.",
      audioGuide: "Stand before Surya's chariot at Konark. Each of the twenty-four wheels is a functioning astronomical chronometer.",
      i18n: {
        hi: {
          name: "कोणार्क सूर्य मंदिर",
          city: "कोणार्क, ओडिशा",
          era: "1250 ईस्वी — पूर्वी गंग राजवंश",
          architecture: "कलिंग वास्तुकला शैली",
          material: "खोंडालाइट एवं क्लोराइट पाषाण",
          overview: "सूर्य देव के 24 पहियों वाले भव्य रथ के रूप में निर्मित यह मंदिर प्राचीन भारतीय खगोल विज्ञान और स्थापत्य कला का शिखर है।",
          culturalSignificance: "बंगाल की खाड़ी में प्राचीन नाविकों द्वारा 'ब्लैक पैगोडा' के नाम से विख्यात।",
          secrets: "इसके 24 पहियों की तीलियां धूपघड़ी का काम करती हैं और सूर्य की छाया देखकर मिनटों तक सटीक समय बताती हैं।",
          audioGuide: "कोणार्क के सूर्य मंदिर में आपका स्वागत है। इसके पत्थर के पहिए 800 वर्ष पूर्व के वैज्ञानिक खगोल यंत्र हैं।"
        }
      }
    },
    "mysore-palace": {
      name: "Mysore Palace (Amba Vilas)",
      city: "Mysuru, Karnataka",
      era: "1897–1912 CE — Kingdom of Mysore",
      dynasty: "Wadiyar Dynasty",
      architecture: "Indo-Saracenic (Hindu, Mughal, Rajput & Gothic synthesis)",
      material: "Fine grey granite with deep pink marble domes",
      overview: "One of the most visited monuments in India, Mysore Palace is the official residence of the Wadiyar dynasty and the seat of the Kingdom of Mysore.",
      culturalSignificance: "The epicenter of the world-famous 10-day Mysuru Dasara festival with its royal elephant procession.",
      architecturalFeatures: [
        "Three-story stone structure with pink marble domes and 145-foot tower",
        "Kalyana Mantapa (Octagonal marriage pavilion) with stained glass peacock ceiling",
        "Illumination by 97,000 incandescent bulbs on festive evenings"
      ],
      secrets: "The palace contains hidden secret passages leading to the Chamundi Hills used by royals during emergencies.",
      audioGuide: "Welcome to the Amba Vilas Palace of Mysuru, a stunning synthesis of Hindu, Rajput, and Gothic craftsmanship.",
      i18n: {
        hi: {
          name: "मैसूर पैलेस (अम्बा विलास)",
          city: "मैसूरु, कर्नाटक",
          era: "1897–1912 ईस्वी — वाडियार राजवंश",
          architecture: "इंडो-सारैसेनिक मिश्रित वास्तुकला",
          material: "धूसर ग्रेनाइट एवं गुलाबी संगमरमर",
          overview: "भारत के सर्वाधिक दर्शनीय महलों में से एक, मैसूर पैलेस वाडियार राजवंश का ऐतिहासिक राजप्रासाद है।",
          culturalSignificance: "विश्वप्रसिद्ध 10 दिवसीय मैसूरु दशहरा महोत्सव का मुख्य केंद्र।",
          secrets: "महल के भीतर चामुंडी पहाड़ियों तक जाने वाले कई गुप्त भूमिगत मार्ग बने हुए हैं।",
          audioGuide: "मैसूर के अम्बा विलास पैलेस में आपका स्वागत है। इसके भव्य दरबार हॉल और रंगीन कांच की नक्काशी अद्वितीय हैं।"
        }
      }
    }
  },

  // 3. Verified Local Tourism Network
  localPartners: [
    {
      id: "guide-1",
      name: "Rameshwar Shastri",
      type: "Certified Heritage Guide",
      category: "Local Guides",
      location: "Varanasi, UP",
      experience: "24 Years Experience",
      rating: 4.9,
      reviews: 312,
      badge: "IND Travel Verified — Demo",
      description: "Sanskrit scholar and 4th-generation Kashi heritage storyteller. Leads dawn boat journeys across Assi to Manikarnika Ghat with deep Vedic philosophical commentary.",
      languages: ["English", "Hindi", "Sanskrit", "French"],
      impact: "100% direct remuneration to family; conducts free heritage walks for government school children."
    },
    {
      id: "homestay-1",
      name: "Thirumalai Chettinad Ancestral Villa",
      type: "Heritage Homestay",
      category: "Homestays",
      location: "Kanadukathan, Chettinad, Tamil Nadu",
      experience: "Built in 1912",
      rating: 4.95,
      reviews: 184,
      badge: "IND Travel Verified — Demo",
      description: "Restored 110-year-old mansion with Burma teak pillars, Italian marble, and Athangudi handmade tiles. Authentic 7-course Chettinad banana leaf feasts prepared by heirloom cooks.",
      amenities: ["Solar Powered", "Traditional Cooking Workshops", "Bullock Cart Village Tour", "Organic Farm-to-Table"],
      impact: "Preserves rare Athangudi tile-making artisans and employs 14 local village women."
    },
    {
      id: "artisan-1",
      name: "Pochampally Ikat Weavers Guild",
      type: "Master Handloom Artisans",
      category: "Artisans",
      location: "Bhoodan Pochampally, Telangana",
      experience: "GI Tagged Heritage Guild",
      rating: 4.88,
      reviews: 260,
      badge: "IND Travel Verified — Demo",
      description: "Witness the complex tie-and-dye 'Pagdu Bandhu' silk and cotton weaving process. Purchase authentic sarees, stoles, and tapestries directly with zero middleman commissions.",
      craft: "Geographical Indication (GI) Ikat Handloom",
      impact: "88% of retail proceeds directly deposited into the weaver family bank cooperative."
    },
    {
      id: "experience-1",
      name: "Kadathanadan Kalari Sangam",
      type: "Ancient Martial Arts & Wellness",
      category: "Cultural Experiences",
      location: "Wayanad & Kozhikode, Kerala",
      experience: "Established 1948",
      rating: 4.92,
      reviews: 145,
      badge: "IND Travel Verified — Demo",
      description: "Experience Kalaripayattu, the 3,000-year-old mother of all martial arts, combined with ancient Marma pressure point therapy and traditional herbal steam treatments.",
      specialty: "Acrobatic Weapon Combat, Marma Therapy, Yoga",
      impact: "Preserves ancient palm-leaf medical and martial manuscripts for youth generations."
    },
    {
      id: "food-1",
      name: "Old Delhi Haveli Culinary Walk",
      type: "Heritage Food Historian",
      category: "Food Trails",
      location: "Chandni Chowk, Delhi",
      experience: "15 Years Curation",
      rating: 4.96,
      reviews: 420,
      badge: "IND Travel Verified — Demo",
      description: "Navigate secret alleys of Shahjahanabad tasting 120-year-old paranthe, safe filtered kulfi falooda, slow-cooked Nihari, and authentic Daulat ki Chaat foam sweets.",
      hygieneCertified: "Verified Clean Street Food Vendor Guild",
      impact: "Directly sustains micro street food artisans whose recipes date to the Mughal court."
    },
    {
      id: "transport-1",
      name: "Eco-Lahaul Himalayan Community Cabs",
      type: "Green Mountain Transport",
      category: "Local Transport",
      location: "Manali to Spiti & Leh, HP",
      experience: "Local Drivers Association",
      rating: 4.85,
      reviews: 198,
      badge: "IND Travel Verified — Demo",
      description: "Experienced high-altitude mountain drivers with certified winter driving skills, satellite emergency beacons, and onboard portable medical oxygen cylinders.",
      vehicles: ["4x4 Expeditions", "BS-VI Low Emission", "Onboard First Aid & Oxygen"],
      impact: "Supports tribal youth drivers in Lahaul-Spiti valley during harsh winter seasons."
    }
  ],

  // 4. Foreign Diplomatic Missions (Embassies & Consulates)
  embassies: [
    { country: "United States of America", city: "New Delhi (Chanakyapuri)", phone: "+91-11-2419-8000", emergency: "+91-11-2419-8000", address: "Shantipath, Chanakyapuri, New Delhi 110021" },
    { country: "United Kingdom", city: "New Delhi (Chanakyapuri)", phone: "+91-11-2419-2100", emergency: "+91-11-2419-2100", address: "Shantipath, Chanakyapuri, New Delhi 110021" },
    { country: "France", city: "New Delhi (Chanakyapuri)", phone: "+91-11-4319-6100", emergency: "+91-99-9977-8080", address: "2/50-E Shantipath, Chanakyapuri, New Delhi 110021" },
    { country: "Germany", city: "New Delhi (Chanakyapuri)", phone: "+91-11-4419-9199", emergency: "+91-98-1000-4850", address: "6/50G Shantipath, Chanakyapuri, New Delhi 110021" },
    { country: "Japan", city: "New Delhi (Chanakyapuri)", phone: "+91-11-4610-4810", emergency: "+91-11-4610-4810", address: "50-G Shantipath, Chanakyapuri, New Delhi 110021" },
    { country: "Australia", city: "New Delhi (Chanakyapuri)", phone: "+91-11-4139-9900", emergency: "+61-2-6261-3305", address: "1/50G Shantipath, Chanakyapuri, New Delhi 110021" },
    { country: "Canada", city: "New Delhi (Chanakyapuri)", phone: "+91-11-4178-2000", emergency: "+1-613-996-8885", address: "7/8 Shantipath, Chanakyapuri, New Delhi 110021" }
  ],

  // 5. Baseline Forex Conversion Rates (to INR)
  forexRates: {
    USD: 83.50,
    EUR: 90.25,
    GBP: 105.80,
    AUD: 54.40,
    CAD: 61.10,
    SGD: 62.30,
    JPY: 0.54,
    AED: 22.74,
    SAR: 22.25,
    CHF: 94.60
  },

  // 6. Multilingual Phrasebook for Offline International Cards
  phrasebook: [
    { eng: "Hello / Greetings", hin: "नमस्ते (Namaste)", tel: "నమస్కారం (Namaskaram)", tam: "வணக்கம் (Vanakkam)", kan: "ನಮಸ್ಕಾರ (Namaskara)" },
    { eng: "Thank you", hin: "धन्यवाद (Dhanyavaad)", tel: "ధన్యవాదాలు (Dhanyavaadaalu)", tam: "நன்றி (Nandri)", kan: "ಧನ್ಯವಾದಗಳು (Dhanyavaadagalu)" },
    { eng: "How much does this cost?", hin: "यह कितने का है? (Yeh kitne ka hai?)", tel: "ఇది ఎంత? (Idi entha?)", tam: "இது எவ்வளவு? (Idhu evvalavu?)", kan: "ಇದು ಎಷ್ಟು? (Idu eshtu?)" },
    { eng: "Where is the train station?", hin: "रेलवे स्टेशन कहाँ है? (Railway station kahan hai?)", tel: "రైల్వే స్టేషన్ ఎక్కడ ఉంది? (Railway station ekkada undi?)", tam: "ரயில் நிலையம் எங்கே? (Railway nilayam enge?)", kan: "ರೈಲ್ವೆ ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ? (Railway nildana ellide?)" },
    { eng: "Please help me", hin: "कृपया मेरी मदद करें (Kripya meri madad karein)", tel: "దయచేసి నాకు సహాయం చేయండి (Dayachesi naaku sahayam cheyandi)", tam: "தயவுசெய்து எனக்கு உதவுங்கள் (Thayavuseidhu enakku udhavungal)", kan: "ದಯవిಟ್ಟು ನನಗೆ సహాయం ಮಾಡಿ (Dayavittu nanage sahaya maadi)" },
    { eng: "I am vegetarian", hin: "मैं शाकाहारी हूँ (Main shakahari hoon)", tel: "నేను శాఖాహారిని (Nenu shaakaharini)", tam: "நான் சைவ உணவு சாப்பிடுவேன் (Naan saiva unavu)", kan: "ನಾನು ಸಸ್ಯಾಹಾರಿ (Naanu sasyaahari)" }
  ]
};

// Global accessor
window.IND_DATA = IND_DATA;
