let state = {
  weight: 60,
  targetPerKg: 150,
  logs: []
};

// ---------- INIT ----------
function init(){
  const saved = localStorage.getItem("accu");
  if(saved) state = JSON.parse(saved);

  render();
}
window.onload = init;

// ---------- SAVE ----------
function save(){
  localStorage.setItem("accu", JSON.stringify(state));
}

// ---------- LOG DOSE ----------
function logDose(mg){
  const today = new Date().toISOString().split("T")[0];

  const existing = state.logs.find(l => l.date === today);

  if(existing){
    existing.dose = mg;
  } else {
    state.logs.push({ date: today, dose: mg });
  }

  save();
  render();
}

// ---------- CALC ----------
function calc(){
  const target = state.weight * state.targetPerKg;
  const taken = state.logs.reduce((a,b)=>a + b.dose, 0);
  const percent = Math.min(100, (taken / target) * 100);

  return { target, taken, percent };
}

// ---------- RENDER ----------
function render(){
  const {target, taken, percent} = calc();

  document.getElementById("taken").innerText = taken;
  document.getElementById("target").innerText = target;
  document.getElementById("percent").innerText = percent.toFixed(1) + "%";

  // ring
  const ring = document.getElementById("progressRing");
  const offset = 339 - (339 * percent / 100);
  ring.style.strokeDashoffset = offset;

  // history
  const h = document.getElementById("history");
  h.innerHTML = state.logs
    .sort((a,b)=>b.date.localeCompare(a.date))
    .map(l => `
      <div class="item">
        <span>${l.date}</span>
        <b>${l.dose}mg</b>
      </div>
    `).join("");
}

// ---------- TAB ----------
function tab(name){
  alert("Phase 4 simplified UI - next upgrade can restore full tabs 😎");
}
