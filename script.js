// Injector Specifications (simplified examples)
const injectorSpecs = {
  bosch: {
    leak: { max: 5, unit: "ml/min" },
    em: { min: 0.8, max: 1.0, unit: "ms" },
    vl: { max: 2, unit: "ml/min" },
  },
  delphi: {
    leak: { max: 4, unit: "ml/min" },
    em: { min: 0.7, max: 1.2, unit: "ms" },
    back: { max: 3, unit: "ml/min" },
  },
  denso: {
    leak: { max: 3, unit: "ml/min" },
    ve: { min: 80, max: 120, unit: "mm³/stroke" },
  },
};

// Step Navigation
function nextStep(step) {
  document.getElementById(`step${step}`).classList.add("hidden");
  document.getElementById(`step${step + 1}`).classList.remove("hidden");

  if (step === 1) {
    loadTestFields();
  }
}

// Load fields based on injector type
function loadTestFields() {
  const type = document.getElementById("injectorType").value;
  const fieldsDiv = document.getElementById("dynamicFields");
  fieldsDiv.innerHTML = "";

  // Common fields
  fieldsDiv.innerHTML += `
    <div class="form-group">
      <label for="leak">LEAK (${injectorSpecs[type]?.leak?.unit || "ml/min"})</label>
      <input type="number" id="leak" step="0.1" placeholder="e.g., 2.0">
    </div>
  `;

  // Type-specific fields
  if (type === "bosch" || type === "delphi") {
    fieldsDiv.innerHTML += `
      <div class="form-group">
        <label for="em">EM (${injectorSpecs[type]?.em?.unit || "ms"})</label>
        <input type="number" id="em" step="0.1" placeholder="e.g., 0.9">
      </div>
    `;
  }

  if (type === "bosch") {
    fieldsDiv.innerHTML += `
      <div class="form-group">
        <label for="vl">VL (${injectorSpecs[type]?.vl?.unit || "ml/min"})</label>
        <input type="number" id="vl" step="0.1" placeholder="e.g., 1.0">
      </div>
    `;
  }

  if (type === "delphi") {
    fieldsDiv.innerHTML += `
      <div class="form-group">
        <label for="back">BACK (${injectorSpecs[type]?.back?.unit || "ml/min"})</label>
        <input type="number" id="back" step="0.1" placeholder="e.g., 1.5">
      </div>
    `;
  }

  if (type === "denso") {
    fieldsDiv.innerHTML += `
      <div class="form-group">
        <label for="ve">VE (${injectorSpecs[type]?.ve?.unit || "mm³/stroke"})</label>
        <input type="number" id="ve" step="1" placeholder="e.g., 100">
      </div>
    `;
  }
}

// Diagnosis Logic
function diagnose() {
  const type = document.getElementById("injectorType").value;
  const specs = injectorSpecs[type];
  let diagnosis = "";

  // Check LEAK
  const leak = parseFloat(document.getElementById("leak").value) || 0;
  if (leak > specs.leak.max) {
    diagnosis += `
      <p class="issue">LEAK: Too high (${leak} ${specs.leak.unit} > max ${specs.leak.max}).</p>
      <p class="fix">→ Replace nozzle or check injector seat.</p>
    `;
  }

  // Check EM (if applicable)
  if (specs.em) {
    const em = parseFloat(document.getElementById("em").value) || 0;
    if (em < specs.em.min || em > specs.em.max) {
      diagnosis += `
        <p class="issue">EM: Out of range (${em} ${specs.em.unit}). Target: ${specs.em.min}-${specs.em.max}.</p>
        <p class="fix">→ Test solenoid resistance; replace if faulty.</p>
      `;
    }
  }

  // Check other parameters similarly...
  // (Add checks for VL, BACK, VE, etc.)

  // Show result
  document.getElementById("diagnosisResult").innerHTML = 
    diagnosis || "<p>✅ Injector passes all tests. No action needed.</p>";
  nextStep(2);
}

// Reset app
function resetApp() {
  document.getElementById("step3").classList.add("hidden");
  document.getElementById("step1").classList.remove("hidden");
  document.getElementById("testForm").reset();
}
