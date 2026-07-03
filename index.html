let state = {
  weight: 60,
  mult: 150,
  logs: [],
  blood: []
};

function init(){
  const saved = localStorage.getItem("accu5");
  if(saved) state = JSON.parse(saved);
  render();
}
window.onload = init;

function save(){
  localStorage.setItem("accu5", JSON.stringify(state));
}

/* ---------- DOSE ---------- */
function logDose(mg){
  const d = today();

  const ex = state.logs.find(x=>x.date===d);
  if(ex) ex.dose = mg;
  else state.logs.push({date:d,dose:mg});

  save(); render();
}

/* ---------- BLOOD ---------- */
function addBlood(){
  state.blood.push({
    date: today(),
    alt:+alt.value,
    ast:+ast.value,
    chol:+chol.value,
    tg:+tg.value
  });

  save(); render();
}

/* ---------- CALC ---------- */
function calc(){
  const target = state.weight * state.mult;
  const taken = state.logs.reduce((a,b)=>a+b.dose,0);
  const pct = Math.min(100,(taken/target)*100);
  return {target,taken,pct};
}

/* ---------- RENDER ---------- */
function render(){
  const {target,taken,pct} = calc();

  percent.innerText = pct.toFixed(1)+"%";
  takenEl().innerText = taken;
  targetEl().innerText = target;

  const ring = document.getElementById("ring");
  const c = 339;
  ring.style.strokeDashoffset = c - c*(pct/100);

  history.innerHTML = state.logs
    .sort((a,b)=>b.date.localeCompare(a.date))
    .map(x=>`<div>${x.date} - ${x.dose}mg</div>`).join("");

  bloodList.innerHTML = state.blood
    .map(b=>{
      const level = (b.alt>40||b.ast>40)?"red":"green";
      return `<div class="${level}">
        ${b.date} ALT:${b.alt} AST:${b.ast}
      </div>`;
    }).join("");
}

/* ---------- SETTINGS ---------- */
function saveSettings(){
  state.weight = +weight.value;
  state.mult = +mult.value;
  save(); render();
}

/* ---------- TAB ---------- */
function switchTab(t){
  document.querySelectorAll(".tab").forEach(x=>x.classList.add("hidden"));
  document.getElementById("tab-"+t).classList.remove("hidden");
}

/* ---------- HELPERS ---------- */
function today(){
  return new Date().toISOString().split("T")[0];
}

function takenEl(){return document.getElementById("taken")}
function targetEl(){return document.getElementById("target")}
