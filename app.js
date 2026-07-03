let state = {
    tab: "dashboard",
    weight: 60,
    targetPerKg: 150,
    logs: []
};

// ========================
// INIT
// ========================

window.onload = () => {
    loadState();
    render();
};

// ========================
// STORAGE
// ========================

function loadState() {
    const saved = localStorage.getItem("accu_state");

    if (saved) {
        try {
            state = JSON.parse(saved);
        } catch (e) {
            console.error("Failed to parse state", e);
            saveState();
        }
    } else {
        saveState();
    }
}

function saveState() {
    localStorage.setItem("accu_state", JSON.stringify(state));
}

// ========================
// CALCULATION
// ========================

function calculate() {
    const target = state.weight * state.targetPerKg;
    const taken = state.logs.reduce((sum, l) => sum + (l.dose || 0), 0);

    const percent = target > 0 ? Math.min(100, (taken / target) * 100) : 0;
    const remaining = Math.max(0, target - taken);

    return { target, taken, percent, remaining };
}

// ========================
// ACTIONS
// ========================

function switchTab(tab) {
    state.tab = tab;
    render();
}

function quickLog(dose) {
    const today = new Date().toISOString().split("T")[0];

    const existing = state.logs.find(l => l.date === today);

    if (existing) {
        existing.dose = dose;
    } else {
        state.logs.push({ date: today, dose });
    }

    saveState();
    render();
}

// ========================
// SETTINGS (simple version)
// ========================

function updateWeight(value) {
    const w = parseFloat(value);
    if (!isNaN(w) && w > 0) {
        state.weight = w;
        saveState();
        render();
    }
}

function updateTarget(value) {
    state.targetPerKg = parseInt(value);
    saveState();
    render();
}

// ========================
// RENDER
// ========================

function render() {
    const view = document.getElementById("view");
    if (!view) return;

    const { target, taken, percent, remaining } = calculate();

    // ========================
    // DASHBOARD
    // ========================
    if (state.tab === "dashboard") {
        view.innerHTML = `
            <div class="card">
                <h2>💊 今日進度</h2>

                <div class="big">${percent.toFixed(1)}%</div>

                <div class="bar">
                    <div class="bar-fill" style="width:${percent}%"></div>
                </div>

                <p>已食：${taken} mg</p>
                <p>目標：${target} mg</p>
                <p>剩餘：${remaining} mg</p>
            </div>

            <div class="card">
                <h3>⚡ Quick Log</h3>

                <div class="grid">
                    <button onclick="quickLog(10)">10mg</button>
                    <button onclick="quickLog(20)">20mg</button>
                    <button onclick="quickLog(30)">30mg</button>
                    <button onclick="quickLog(40)">40mg</button>
                </div>
            </div>
        `;
    }

    // ========================
    // HISTORY
    // ========================
    if (state.tab === "history") {

        const sorted = [...state.logs]
            .sort((a, b) => new Date(b.date) - new Date(a.date));

        view.innerHTML = `
            <div class="card">
                <h2>📜 食藥紀錄</h2>
            </div>

            ${sorted.length === 0 ? `
                <div class="card">
                    <p>暫時未有紀錄</p>
                </div>
            ` : sorted.map(l => `
                <div class="card">
                    <div style="font-weight:700">${l.date}</div>
                    <div style="font-size:22px;font-weight:800;color:#007AFF">
                        💊 ${l.dose} mg
                    </div>
                </div>
            `).join("")}
        `;
    }

    // ========================
    // BLOOD (placeholder)
    // ========================
    if (state.tab === "blood") {
        view.innerHTML = `
            <div class="card">
                <h2>🩸 Blood Test</h2>
                <p>下一個 phase upgrade</p>
            </div>
        `;
    }

    // ========================
    // SETTINGS
    // ========================
    if (state.tab === "settings") {
        view.innerHTML = `
            <div class="card">
                <h2>⚙️ Settings</h2>

                <div style="margin-top:10px">
                    <label>Weight (kg)</label>
                    <input type="number" value="${state.weight}"
                        onchange="updateWeight(this.value)">
                </div>

                <div style="margin-top:10px">
                    <label>Target mg/kg</label>
                    <select onchange="updateTarget(this.value)">
                        <option value="120" ${state.targetPerKg==120?'selected':''}>120</option>
                        <option value="135" ${state.targetPerKg==135?'selected':''}>135</option>
                        <option value="150" ${state.targetPerKg==150?'selected':''}>150</option>
                    </select>
                </div>
            </div>
        `;
    }
}
