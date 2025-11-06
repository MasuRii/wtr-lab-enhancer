import { configs, MIN_WIDTH, STEP_WIDTH, DEBUG_KEY } from "./config.js";
import { log } from "./logger.js";
import {
  applyWidthStyle,
  updateNavConstraint,
  updateBlockAddTerm,
  updateButtonVisibilityStyles,
} from "./styles.js";
import {
  applyFontStyle,
  populateFontDropdown,
  getFallbackFonts,
} from "./fontManager.js";

const saveValue = (key, value) => GM_setValue(key, value);
const loadValue = (key, defaultValue) => GM_getValue(key, defaultValue);
let isDebugEnabled = GM_getValue(configs.debug.key, false);

// --- UI CONFIGURATION PANEL ---
export const createConfigPanel = () => {
  const panelHTML = `<div id="wtr-config-container" class="wtr-panel-container"><div id="wtr-config-overlay" style="display: none;"><div id="wtr-config-panel"><h2>WTR-Lab Enhancer Settings</h2><div id="wtr-config-sections"></div><button id="wtr-config-close-btn" class="wtr-config-button">Close</button></div></div></div>`;
  document.body.insertAdjacentHTML("beforeend", panelHTML);

  const sectionsContainer = document.getElementById("wtr-config-sections");

  // Section 1: Layout & Sizing
  const layoutSection = document.createElement("div");
  layoutSection.className = "wtr-config-section";
  layoutSection.innerHTML = `<label class="wtr-section-title">Layout & Sizing</label>
            <div class="wtr-control-group">
                <label for="wtr-reader-width-input">${configs.reader.label} (px)</label>
                <div class="wtr-config-controls"><button id="wtr-reader-decrease-btn" class="wtr-config-button control">-</button><input type="number" id="wtr-reader-width-input" min="${MIN_WIDTH}" step="10"><button id="wtr-reader-increase-btn" class="wtr-config-button control">+</button><button id="wtr-reader-reset-btn" class="wtr-config-button reset">Reset</button></div>
            </div>
            <div class="wtr-control-group">
                <label for="wtr-nav-width-input">${configs.nav.label} (px)</label>
                <div class="wtr-config-controls"><button id="wtr-nav-decrease-btn" class="wtr-config-button control">-</button><input type="number" id="wtr-nav-width-input" min="${MIN_WIDTH}" step="10"><button id="wtr-nav-increase-btn" class="wtr-config-button control">+</button><button id="wtr-nav-reset-btn" class="wtr-config-button reset">Reset</button></div>
            </div>`;
  sectionsContainer.appendChild(layoutSection);

  // Section 2: Font Customization
  const fontSection = document.createElement("div");
  fontSection.className = "wtr-config-section";
  fontSection.innerHTML = `<label class="wtr-section-title">Font Customization</label>
            <div class="wtr-config-controls checkbox-control"><input type="checkbox" id="wtr-fontToggle-toggle"><label for="wtr-fontToggle-toggle">${configs.fontToggle.label}</label></div>
            <div class="wtr-control-group">
                <label for="wtr-font-select">${configs.font.label}</label>
                <div class="wtr-config-controls font-controls"><select id="wtr-font-select"></select></div>
                <div class="wtr-config-controls font-controls"><div class="wtr-button-group"><button id="wtr-font-refresh-btn" class="wtr-config-button">Refresh</button><button id="wtr-font-reset-btn" class="wtr-config-button reset">Reset</button></div></div>
            </div>`;
  sectionsContainer.appendChild(fontSection);

  // Section 3: Element Visibility
  const visibilitySection = document.createElement("div");
  visibilitySection.className = "wtr-config-section";
  visibilitySection.innerHTML = `<label class="wtr-section-title">Element Visibility</label>
            <div class="wtr-config-controls checkbox-control"><input type="checkbox" id="wtr-navConstraint-toggle"><label for="wtr-navConstraint-toggle">${configs.navConstraint.label}</label></div>
            <div class="wtr-config-controls checkbox-control"><input type="checkbox" id="wtr-blockAddTerm-toggle"><label for="wtr-blockAddTerm-toggle">${configs.blockAddTerm.label}</label></div>
            <div class="wtr-control-group"><label class="wtr-subsection-title">Hide Toolbar Buttons</label><div class="wtr-button-hide-controls"></div></div>`;
  const buttonControlsContainer = visibilitySection.querySelector(".wtr-button-hide-controls");
  Object.entries(configs)
    .filter(([n]) => n.startsWith("hide"))
    .forEach(([name, config]) => {
      buttonControlsContainer.insertAdjacentHTML(
        "beforeend",
        `<div class="wtr-config-controls checkbox-control icon-checkbox"><input type="checkbox" id="wtr-${name}-toggle"><label for="wtr-${name}-toggle">${config.iconHTML}<span>${config.label}</span></label></div>`
      );
    });
  sectionsContainer.appendChild(visibilitySection);

  // Section 4: Debug & Advanced
  const debugSection = document.createElement("div");
  debugSection.className = "wtr-config-section";
  debugSection.innerHTML = `<label class="wtr-section-title">Debug & Advanced</label>
			         <div class="wtr-config-controls checkbox-control"><input type="checkbox" id="wtr-debug-toggle"><label for="wtr-debug-toggle">Enable Debug Logging</label></div>`;
  sectionsContainer.appendChild(debugSection);

  populateFontDropdown(getFallbackFonts());
  attachPanelEventListeners();
};

const attachPanelEventListeners = () => {
  document.getElementById("wtr-config-overlay").addEventListener("click", (e) => {
    if (e.target.id === "wtr-config-overlay") hideConfigPanel();
  });
  document.getElementById("wtr-config-close-btn").addEventListener("click", hideConfigPanel);

  const updateSetting = (configName, value) => {
    const config = configs[configName];
    saveValue(config.key, value);
    if (configName === "font") {
      applyFontStyle(value);
      document.getElementById("wtr-font-select").value = value;
    } else if (configName === "fontToggle") {
      updateFontControlsState(value);
      applyFontStyle(loadValue(configs.font.key, configs.font.defaultFont));
    } else if (configName === "debug") {
      isDebugEnabled = value;
      GM_setValue(DEBUG_KEY, isDebugEnabled);
      log(`Debug logging ${isDebugEnabled ? "ENABLED" : "DISABLED"}`);
    } else if (configName === "navConstraint") {
      updateNavConstraint();
    } else if (configName === "blockAddTerm") {
      updateBlockAddTerm();
    } else if (configName.startsWith("hide")) {
      updateButtonVisibilityStyles();
    } else {
      const validatedWidth = Math.max(MIN_WIDTH, parseInt(value, 10));
      if (isNaN(validatedWidth)) return;
      applyWidthStyle(configName, validatedWidth);
      document.getElementById(`wtr-${configName}-width-input`).value = validatedWidth;
      saveValue(config.key, validatedWidth);
      if (configName === "nav") updateNavConstraint();
    }
  };

  for (const [name, config] of Object.entries(configs)) {
    if (name === "font") {
      const select = document.getElementById("wtr-font-select");
      select.addEventListener("change", () => updateSetting(name, select.value));
      document
        .getElementById("wtr-font-reset-btn")
        .addEventListener("click", () => updateSetting(name, config.defaultFont));
      const refreshBtn = document.getElementById("wtr-font-refresh-btn");
      refreshBtn.addEventListener("click", async () => {
        refreshBtn.textContent = "Fetching...";
        refreshBtn.disabled = true;
        await populateFontDropdown();
        refreshBtn.textContent = "Refresh";
        refreshBtn.disabled = false;
      });
    } else if (["fontToggle", "navConstraint", "blockAddTerm", "debug"].includes(name) || name.startsWith("hide")) {
      const toggle = document.getElementById(`wtr-${name}-toggle`);
      if (toggle) toggle.addEventListener("change", () => updateSetting(name, toggle.checked));
    } else if (["reader", "nav"].includes(name)) {
      const input = document.getElementById(`wtr-${name}-width-input`);
      document
        .getElementById(`wtr-${name}-increase-btn`)
        .addEventListener("click", () => updateSetting(name, parseInt(input.value, 10) + STEP_WIDTH));
      document
        .getElementById(`wtr-${name}-decrease-btn`)
        .addEventListener("click", () => updateSetting(name, parseInt(input.value, 10) - STEP_WIDTH));
      document
        .getElementById(`wtr-${name}-reset-btn`)
        .addEventListener("click", () => updateSetting(name, config.defaultWidth));
      input.addEventListener("change", () => updateSetting(name, input.value));
    }
  }
};

const updateFontControlsState = (isEnabled) => {
  ["wtr-font-select", "wtr-font-refresh-btn", "wtr-font-reset-btn"].forEach((id) => {
    const element = document.getElementById(id);
    if (element) element.disabled = !isEnabled;
  });
};

export const showConfigPanel = () => {
  for (const [name, config] of Object.entries(configs)) {
    if (name === "font") {
      document.getElementById("wtr-font-select").value = loadValue(config.key, config.defaultFont);
    } else if (name === "fontToggle") {
      const isEnabled = loadValue(config.key, config.defaultState);
      document.getElementById("wtr-fontToggle-toggle").checked = isEnabled;
      updateFontControlsState(isEnabled);
    } else if (["navConstraint", "blockAddTerm", "debug"].includes(name) || name.startsWith("hide")) {
      const toggle = document.getElementById(`wtr-${name}-toggle`);
      if (toggle) toggle.checked = loadValue(config.key, config.defaultState);
    } else if (["reader", "nav"].includes(name)) {
      document.getElementById(`wtr-${name}-width-input`).value = loadValue(config.key, config.defaultWidth);
    }
  }

  document.getElementById("wtr-config-overlay").style.display = "flex";
};

export const hideConfigPanel = () => (document.getElementById("wtr-config-overlay").style.display = "none");