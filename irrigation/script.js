// small helper — update slider display value
function updateVal(inputId, spanId, unit) {
  const v = document.getElementById(inputId).value;
  document.getElementById(spanId).textContent = v + unit;
}


// =========================
// 🧠 MODEL (Random Forest JS)
// =========================
function predictIrrigation(inputs) {
  let votes = { Low: 0, Medium: 0, High: 0 };

  // Tree 1
  if (inputs.soil_moisture < 25) {
    if (inputs.temperature > 30) votes.High++;
    else votes.Medium++;
  } else {
    if (inputs.rainfall > 1200) votes.Low++;
    else votes.Medium++;
  }

  // Tree 2
  if (inputs.soil_type === 'Sandy') {
    if (inputs.soil_moisture < 30) votes.High++;
    else votes.Medium++;
  } else {
    if (inputs.soil_moisture > 40) votes.Low++;
    else votes.Medium++;
  }

  // Tree 3
  if (inputs.rainfall < 800) {
    if (inputs.temperature > 28) votes.High++;
    else votes.Medium++;
  } else {
    votes.Low++;
  }

  // Tree 4
  if (inputs.growth_stage === 'Flowering') {
    if (inputs.soil_moisture < 35) votes.High++;
    else votes.Medium++;
  } else {
    votes.Low++;
  }

  // Tree 5
  if (inputs.prev_irrigation > 30) {
    votes.Low++;
  } else {
    if (inputs.soil_moisture < 20) votes.High++;
    else votes.Medium++;
  }

  // Tree 6
  if (inputs.temperature > 32 && inputs.humidity < 50) {
    votes.High++;
  } else if (inputs.humidity > 70) {
    votes.Low++;
  } else {
    votes.Medium++;
  }

  // Tree 7
  if (inputs.season === 'Kharif') {
    votes.Low++;
  } else if (inputs.season === 'Summer') {
    if (inputs.soil_moisture < 30) votes.High++;
    else votes.Medium++;
  } else {
    votes.Medium++;
  }

  // Final decision
  const total = votes.Low + votes.Medium + votes.High;

  let prediction = Object.keys(votes).reduce((a, b) =>
    votes[a] > votes[b] ? a : b
  );

  const confidence = {
    Low: Math.round((votes.Low / total) * 100),
    Medium: Math.round((votes.Medium / total) * 100),
    High: Math.round((votes.High / total) * 100),
  };

  const summary = `Soil moisture is ${inputs.soil_moisture}%, temperature is ${inputs.temperature}°C, and rainfall is ${inputs.rainfall}mm. These conditions indicate ${prediction.toLowerCase()} irrigation need.`;

  const tips = {
    Low: "No irrigation needed now. Recheck soil in a few days.",
    Medium: "Apply moderate irrigation and monitor soil moisture.",
    High: "Irrigate immediately to avoid crop stress."
  };

  return {
    prediction,
    confidence,
    summary,
    tip: tips[prediction]
  };
}


// =========================
// 🚀 MAIN FUNCTION
// =========================
async function runPrediction() {
  const btn = document.getElementById('predict-btn');
  const panel = document.getElementById('result-panel');
  const placeholder = document.getElementById('placeholder-card');
  const errEl = document.getElementById('result-error');

  const inputs = {
    soil_type:        document.getElementById('soil_type').value,
    soil_moisture:    parseFloat(document.getElementById('soil_moisture').value),
    crop_type:        document.getElementById('crop_type').value,
    growth_stage:     document.getElementById('growth_stage').value,
    temperature:      parseFloat(document.getElementById('temperature').value),
    humidity:         parseFloat(document.getElementById('humidity').value),
    rainfall:         parseFloat(document.getElementById('rainfall').value),
    prev_irrigation:  parseFloat(document.getElementById('prev_irrigation').value),
    season:           document.getElementById('season').value,
  };

  btn.classList.add('loading');
  btn.disabled = true;
  errEl.style.display = 'none';

  try {
    const result = predictIrrigation(inputs);
    renderResult(result);
  } catch (err) {
    console.error(err);
    errEl.textContent = 'Something went wrong — check your inputs.';
    errEl.style.display = 'block';
    panel.classList.add('visible');
    placeholder.style.display = 'none';
  } finally {
    btn.classList.remove('loading');
    btn.disabled = false;
  }
}


// =========================
// 🎨 UI RENDER
// =========================
function renderResult(result) {
  const panel = document.getElementById('result-panel');
  const placeholder = document.getElementById('placeholder-card');

  placeholder.style.display = 'none';
  panel.classList.add('visible');

  const badgeEl = document.getElementById('result-badge');
  const level = result.prediction.toLowerCase();
  const icons = { low: '💧', medium: '🌿', high: '🔥' };

  badgeEl.innerHTML = `
    <div class="need-badge ${level}">
      <div class="dot"></div>
      ${icons[level]} ${result.prediction} Irrigation Need
    </div>
  `;

  document.getElementById('result-summary').textContent = result.summary;

  setTimeout(() => {
    const conf = result.confidence;
    const total = conf.Low + conf.Medium + conf.High;

    const low  = Math.round(conf.Low / total * 100);
    const med  = Math.round(conf.Medium / total * 100);
    const high = Math.round(conf.High / total * 100);

    document.getElementById('bar-low').style.width  = low + '%';
    document.getElementById('bar-med').style.width  = med + '%';
    document.getElementById('bar-high').style.width = high + '%';

    document.getElementById('pct-low').textContent  = low + '%';
    document.getElementById('pct-med').textContent  = med + '%';
    document.getElementById('pct-high').textContent = high + '%';
  }, 50);

  document.getElementById('tip-strip').innerHTML =
    `<strong>What to do</strong> ${result.tip}`;
}