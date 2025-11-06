import { DEBUG_KEY } from "./config.js";

let isDebugEnabled = GM_getValue(DEBUG_KEY, false);

export const syncDebugState = () => {
  isDebugEnabled = GM_getValue(DEBUG_KEY, false);
};

export const log = (...args) => {
  if (isDebugEnabled) console.log("[WTR-Lab Enhancer]", ...args);
};

export const toggleDebugLogging = () => {
  isDebugEnabled = !isDebugEnabled;
  GM_setValue(DEBUG_KEY, isDebugEnabled);
  alert(`Debug logging is now ${isDebugEnabled ? "ENABLED" : "DISABLED"}.`);
};