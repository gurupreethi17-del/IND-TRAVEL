// ==========================================================================
// IND TRAVEL — Core Feature 5: Smart Tourism Intelligence Dashboard (Mobile & i18n)
// "Unified Tourism Intelligence & Crowd Management Prototype"
// ==========================================================================

const TourismIntelligence = {
  charts: {},
  activeSimulatedAlert: "taj-mahal",

  init() {
    this.bindEvents();
    setTimeout(() => {
      this.initCharts();
    }, 300);
  },

  bindEvents() {
    const hotspotButtons = document.querySelectorAll(".intelligence-hotspot-btn");
    hotspotButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.hotspot;
        hotspotButtons.forEach(b => {
          b.classList.remove("border-[#FF9933]", "bg-amber-50");
        });
        btn.classList.add("border-[#FF9933]", "bg-amber-50");
        this.selectHotspot(id);
      });
    });

    const divertBtn = document.getElementById("btn-simulate-crowd-diversion");
    if (divertBtn) {
      divertBtn.addEventListener("click", () => this.simulateCrowdDiversion());
    }
  },

  initCharts() {
    if (!window.Chart) return;

    // Chart 1: Hourly Footfall vs Sustainable Carrying Capacity
    const footfallCtx = document.getElementById("chart-hourly-footfall");
    if (footfallCtx && !this.charts.footfall) {
      this.charts.footfall = new Chart(footfallCtx, {
        type: 'line',
        data: {
          labels: ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'],
          datasets: [
            {
              label: 'Actual Footfall (Tourists/Hr)',
              data: [1200, 3800, 7400, 9200, 8100, 8900, 6100, 2400],
              borderColor: '#FF9933',
              backgroundColor: 'rgba(255, 153, 51, 0.12)',
              fill: true,
              tension: 0.35,
              borderWidth: 2.5,
              pointBackgroundColor: '#FF9933',
              pointRadius: 3.5
            },
            {
              label: 'Sustainable Capacity Threshold',
              data: [6500, 6500, 6500, 6500, 6500, 6500, 6500, 6500],
              borderColor: '#D32F2F',
              borderDash: [5, 5],
              borderWidth: 2,
              fill: false,
              pointRadius: 0
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: { font: { family: 'Plus Jakarta Sans', size: 11 }, boxWidth: 10 }
            },
            tooltip: {
              backgroundColor: '#000080',
              titleFont: { family: 'Cinzel' }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: 'rgba(0, 0, 0, 0.05)' },
              ticks: { font: { family: 'Plus Jakarta Sans', size: 10 } }
            },
            x: {
              grid: { display: false },
              ticks: { font: { family: 'Plus Jakarta Sans', size: 10 } }
            }
          }
        }
      });
    }

    // Chart 2: Regional Tourism Flow Share
    const regionalCtx = document.getElementById("chart-regional-distribution");
    if (regionalCtx && !this.charts.regional) {
      this.charts.regional = new Chart(regionalCtx, {
        type: 'doughnut',
        data: {
          labels: ['North India', 'South India', 'West India', 'East India', 'North-East', 'Central'],
          datasets: [{
            data: [32, 28, 19, 11, 6, 4],
            backgroundColor: ['#000080', '#FF9933', '#1A237E', '#138808', '#0284C7', '#7C3AED'],
            borderWidth: 2,
            borderColor: '#FFFFFF'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: { font: { family: 'Plus Jakarta Sans', size: 10 }, boxWidth: 8 }
            }
          },
          cutout: '65%'
        }
      });
    }

    // Chart 3: Live Tourist Sentiment & Safety Index
    const sentimentCtx = document.getElementById("chart-sentiment-trend");
    if (sentimentCtx && !this.charts.sentiment) {
      this.charts.sentiment = new Chart(sentimentCtx, {
        type: 'bar',
        data: {
          labels: ['Cleanliness', 'Guide Trust', 'Safety', 'Signage', 'Public Transport', 'Digitization'],
          datasets: [{
            label: 'Visitor Satisfaction %',
            data: [86, 94, 91, 82, 88, 95],
            backgroundColor: [
              'rgba(19, 136, 8, 0.85)',
              'rgba(0, 0, 128, 0.85)',
              'rgba(255, 153, 51, 0.85)',
              'rgba(26, 35, 126, 0.85)',
              'rgba(2, 132, 199, 0.85)',
              'rgba(19, 136, 8, 0.85)'
            ],
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              grid: { color: 'rgba(0, 0, 0, 0.05)' },
              ticks: { callback: v => v + '%', font: { size: 10 } }
            },
            x: {
              grid: { display: false },
              ticks: { font: { size: 9 } }
            }
          }
        }
      });
    }
  },

  selectHotspot(id) {
    this.activeSimulatedAlert = id;
    const dest = IND_DATA.destinations.find(d => d.id === id) || IND_DATA.destinations[1];

    const titleElem = document.getElementById("intelligence-alert-title");
    const badgeElem = document.getElementById("intelligence-alert-badge");
    const capacityText = document.getElementById("intelligence-alert-capacity");
    const capacityBar = document.getElementById("intelligence-alert-capacity-bar");
    const recText = document.getElementById("intelligence-alert-recommendation");

    if (titleElem) titleElem.textContent = dest.name;
    if (badgeElem) {
      badgeElem.className = `px-2.5 py-0.5 rounded-full text-xs font-bold ${
        dest.crowdLevel === 'High' ? 'bg-red-100 text-red-700' :
        dest.crowdLevel === 'Moderate' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
      }`;
      badgeElem.textContent = dest.crowdBadge;
    }
    if (capacityText) capacityText.textContent = `${dest.capacityPercent}% of Hourly Carrying Capacity`;
    if (capacityBar) {
      capacityBar.style.width = `${dest.capacityPercent}%`;
      capacityBar.className = `h-full rounded-full transition-all duration-700 ${
        dest.capacityPercent > 80 ? 'bg-red-500' : dest.capacityPercent > 60 ? 'bg-amber-500' : 'bg-emerald-500'
      }`;
    }

    if (recText) {
      if (dest.crowdLevel === "High") {
        recText.innerHTML = `
          <strong>Crowd Mitigation Active:</strong> Peak surge identified. Recommend visitors divert to morning slot (06:00 AM) or visit complementary circuit: <em>${dest.attractions[2] || 'Nearby Heritage Point'}</em>. Shuttle frequency increased by +35%.
        `;
      } else if (dest.crowdLevel === "Moderate") {
        recText.innerHTML = `
          <strong>Flow Nominal:</strong> Expected queue waiting time 18 minutes. Adequate guide availability across all gates.
        `;
      } else {
        recText.innerHTML = `
          <strong>Optimal Visiting Window:</strong> Low density zone. Ideal for unhurried photography and guided architecture walks.
        `;
      }
    }
  },

  simulateCrowdDiversion() {
    const logBox = document.getElementById("intelligence-simulation-log");
    if (!logBox) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const newEntry = document.createElement("div");
    newEntry.className = "p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-xs text-slate-800 flex items-start gap-2 animate-fadeIn";
    newEntry.innerHTML = `
      <span class="w-2 h-2 rounded-full bg-[#000080] mt-1 shrink-0"></span>
      <div>
        <div class="flex items-center gap-2">
          <span class="font-bold text-[#000080]">${time} — Crowd Diversion Triggered</span>
          <span class="text-[9px] bg-blue-100 text-blue-800 px-1 rounded font-semibold">AI Dispatch</span>
        </div>
        <p class="text-slate-600 mt-0.5 text-[11px]">
          Surge threshold at <strong>Taj Mahal East Gate (92% load)</strong> reached. 1,420 app users received alert: <em>"High entry wait times. Enjoy sunset at Mehtab Bagh with free shuttle connection."</em>
        </p>
      </div>
    `;
    logBox.prepend(newEntry);

    if (window.App && window.App.showToast) {
      window.App.showToast("Crowd diversion simulation executed: Alternate routes dispatched to tourists.", "success");
    }
  }
};

window.TourismIntelligence = TourismIntelligence;

