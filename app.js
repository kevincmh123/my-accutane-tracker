let state = {
    tab: "dashboard"
};

window.onload = () => {
    render();
};

function switchTab(tab) {
    state.tab = tab;
    render();
}

function render() {
    const view = document.getElementById("view");

    if (state.tab === "dashboard") {
        view.innerHTML = `
            <h2>今日進度</h2>
            <div style="font-size:40px">💊</div>
            <p>AccuTrack v2 開始啦</p>
        `;
    }

    if (state.tab === "blood") {
        view.innerHTML = `<h2>驗血</h2>`;
    }

    if (state.tab === "history") {
        view.innerHTML = `<h2>歷史</h2>`;
    }

    if (state.tab === "settings") {
        view.innerHTML = `<h2>設定</h2>`;
    }
}
