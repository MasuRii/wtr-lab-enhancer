import { configs } from "./config.js";

const loadValue = (key, defaultValue) => GM_getValue(key, defaultValue);

export const applyWidthStyle = (configName, width) => {
  const styleId = `custom-width-styler-${configName}`;
  let styleElement = document.getElementById(styleId);
  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = styleId;
    document.head.appendChild(styleElement);
  }
  styleElement.textContent = `${configs[configName].selector} { max-width: ${width}px !important; }`;
};

export const updateNavConstraint = () => {
  const isConstrained = loadValue(configs.navConstraint.key, configs.navConstraint.defaultState);
  const styleId = 'custom-nav-constraint-styler';
  let styleElement = document.getElementById(styleId);
  if (isConstrained) {
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }
    const navContentWidth = loadValue(configs.nav.key, configs.nav.defaultWidth);
    const marginValue = Math.max(0, (window.innerWidth - navContentWidth) / 2);
    styleElement.textContent = `${configs.navConstraint.selector} { margin-left: ${marginValue}px !important; margin-right: ${marginValue}px !important; }`;
  } else if (styleElement) {
    styleElement.remove();
  }
};

export const updateBlockAddTerm = () => {
  const isBlocked = loadValue(configs.blockAddTerm.key, configs.blockAddTerm.defaultState);
  const styleId = 'custom-block-add-term-styler';
  let styleElement = document.getElementById(styleId);
  if (isBlocked) {
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }
    styleElement.textContent = `${configs.blockAddTerm.selector} { display: none !important; }`;
  } else if (styleElement) {
    styleElement.remove();
  }
};

export const updateButtonVisibilityStyles = () => {
  const styleId = 'custom-button-visibility-styler';
  let styleElement = document.getElementById(styleId);
  const buttonConfigs = [
    configs.hideBookBtn,
    configs.hideTextFieldsBtn,
    configs.hideTtsBtn,
    configs.hideCogBtn,
    configs.hideListBtn
  ];
  const selectorsToHide = buttonConfigs
    .filter(config => loadValue(config.key, config.defaultState))
    .map(config => config.selector);
  if (!styleElement && selectorsToHide.length > 0) {
    styleElement = document.createElement('style');
    styleElement.id = styleId;
    document.head.appendChild(styleElement);
  }
  if (styleElement) {
    styleElement.textContent =
      selectorsToHide.length > 0 ? `${selectorsToHide.join(', ')} { display: none !important; }` : '';
  }
};

export const removeFontStyle = () => {
  const styleElement = document.getElementById('custom-font-styler');
  if (styleElement) styleElement.remove();
  const linkElement = document.getElementById('userscript-font-link');
  if (linkElement) linkElement.remove();
};