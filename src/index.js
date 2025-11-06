// Import the panel's CSS. Webpack will inject it into the page.
import "./styles/panel.css";

// Import modules
import { configs } from "./modules/config.js";
import { log, syncDebugState } from "./modules/logger.js";
import {
  applyWidthStyle,
  updateNavConstraint,
  updateBlockAddTerm,
  updateButtonVisibilityStyles,
} from "./modules/styles.js";
import {
  fetchFonts,
  applyFontStyle,
  populateFontDropdown,
} from "./modules/fontManager.js";
import { createConfigPanel, showConfigPanel } from "./modules/ui.js";
import { initializeModernFeatures } from "./modules/features.js";

const saveValue = (key, value) => GM_setValue(key, value);
const loadValue = (key, defaultValue) => GM_getValue(key, defaultValue);

// --- INITIALIZATION ---
const init = async () => {
  log("Initializing script...");
  syncDebugState();
  createConfigPanel();

  // Apply initial styles
  applyWidthStyle(
    "reader",
    loadValue(configs.reader.key, configs.reader.defaultWidth)
  );
  applyWidthStyle("nav", loadValue(configs.nav.key, configs.nav.defaultWidth));
  updateNavConstraint();
  updateBlockAddTerm();
  updateButtonVisibilityStyles();

  // Set up font
  const fontGroups = await fetchFonts();
  const allAvailableFonts = Object.values(fontGroups).flat();
  let initialFont = loadValue(configs.font.key, configs.font.defaultFont);
  if (!allAvailableFonts.includes(initialFont)) {
    initialFont = configs.font.defaultFont;
    saveValue(configs.font.key, initialFont);
  }
  applyFontStyle(initialFont);
  populateFontDropdown(fontGroups);

  // Event Listeners & Menu Commands
  window.addEventListener("resize", updateNavConstraint);
  GM_registerMenuCommand("Configure Settings", showConfigPanel);

  // Progressive Enhancement
  initializeModernFeatures();

  log("Initialization complete.");
};

// Run the script
init();