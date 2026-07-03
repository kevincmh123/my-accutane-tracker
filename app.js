let state = {
    tab: "dashboard",
    weight: 60,
    targetPerKg: 150,
    logs: []
};

// mock data（之後可以刪）
state.logs = [
    { date: "2026-06-20", dose: 20 },
    { date: "2026-06-21", dose: 20 },
    { date: "2026-06-22", dose: 20 }
];

window.onload = () => {
    render();
};

function switchTab(tab) {
    state.tab = tab;
    render();
}

function calculate() {
    const target = state.weight * state.targetPerKg;
    const taken = state.logs.reduce((sum, l) => sum + l.dose, 0);

    const percent = Math.min(100, (taken / target) * 100);
    const remaining = Math.max(0, target - taken);

    return { target, taken, percent, remaining };
}

function quickLog(dose) {
    const today = new Date().toISOString().split("T")[0];

    const existing = state.logs.find(l => l.date === today);

    if (existing) {
        existing.dose = dose;
    } else {
        state.logs.push({ date: today, dose });
    }

    render();
}

function render() {
    const view = document.getElementById("view");

    if (state.tab === "dashboard") {
        const { target, taken, percent, remaining } = calculate();

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
                <h3>快速記錄</h3>

                <div class="grid">
                    <button onclick="quickLog(10)">10mg</button>
                    <button onclick="quickLog(20)">20mg</button>
                    <button onclick="quickLog(30)">30mg</button>
                    <button onclick="quickLog(40)">40mg</button>
                </div>
            </div>
        `;
    }

    if (state.tab === "blood") {
        view.innerHTML = `<h2>🩸 Blood</h2>`;
    }

    if (state.tab === "history") {
        view.innerHTML = `<h2>📜 History</h2>`;
    }

    if (state.tab === "settings") {
        view.innerHTML = `<h2>⚙️ Settings</h2>`;
    }
}
