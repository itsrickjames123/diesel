function diagnose() {
  // Get input values
  const warm = document.getElementById("warm").value;
  const leak = parseFloat(document.getElementById("leak").value) || 0;
  const vl = parseFloat(document.getElementById("vl").value) || 0;
  const em = parseFloat(document.getElementById("em").value) || 0;

  // Diagnosis logic
  let diagnosis = "";

  // WARM check
  if (warm === "FAIL") {
    diagnosis += `<p class="issue">WARM: Injector not heating properly.</p>
                  <p class="fix">→ Check heating element or test bench calibration.</p>`;
  }

  // LEAK check (assume spec: max 5ml/min)
  if (leak > 5) {
    diagnosis += `<p class="issue">LEAK: Excessive leakage (${leak}ml/min).</p>
                  <p class="fix">→ Replace nozzle or recondition injector seat.</p>`;
  }

  // VL check (assume spec: max 2ml/min)
  if (vl > 2) {
    diagnosis += `<p class="issue">VL: High volume leakage (${vl}ml/min).</p>
                  <p class="fix">→ Check nozzle wear or internal seals.</p>`;
  }

  // EM check (assume spec: 0.8-1.0ms)
  if (em < 0.8 || em > 1.0) {
    diagnosis += `<p class="issue">EM: Solenoid response out of range (${em}ms).</p>
                  <p class="fix">→ Test solenoid resistance; replace if faulty.</p>`;
  }

  // If all OK
  if (diagnosis === "") {
    diagnosis = "<p>✅ Injector passes all tests. No action needed.</p>";
  }

  // Display result
  document.getElementById("diagnosisText").innerHTML = diagnosis;
  document.getElementById("result").classList.remove("hidden");
}
