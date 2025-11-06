import { configs, FONTS_API_URL, RECOMMENDED_FONTS } from "./config.js";
import { log } from "./logger.js";
import { removeFontStyle } from "./styles.js";

const loadValue = (key, defaultValue) => GM_getValue(key, defaultValue);

const getFallbackFonts = () => ({
  recommendedSerif: RECOMMENDED_FONTS.serif,
  recommendedSansSerif: RECOMMENDED_FONTS.sansSerif,
  other: ["Georgia", "Times New Roman", "Arial", "Verdana"],
});

export const fetchFonts = () =>
  new Promise((resolve) =>
    GM_xmlhttpRequest({
      method: "GET",
      url: FONTS_API_URL,
      onload: (r) => {
        try {
          const d = JSON.parse(r.responseText);
          const rec = [...RECOMMENDED_FONTS.serif, ...RECOMMENDED_FONTS.sansSerif];
          resolve({
            recommendedSerif: RECOMMENDED_FONTS.serif,
            recommendedSansSerif: RECOMMENDED_FONTS.sansSerif,
            other: d
              .map((f) => f.family)
              .filter((f) => !rec.includes(f))
              .sort(),
          });
        } catch (e) {
          resolve(getFallbackFonts());
        }
      },
      onerror: () => resolve(getFallbackFonts()),
    })
  );

export const applyFontStyle = (fontFamily) => {
  const isEnabled = loadValue(configs.fontToggle.key, configs.fontToggle.defaultState);
  if (!isEnabled) {
    removeFontStyle();
    return;
  }

  log(`Applying font: ${fontFamily}`);
  const primaryFont = fontFamily.split(",")[0].trim();
  const styleId = "custom-font-styler";
  let styleElement = document.getElementById(styleId);
  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = styleId;
    document.head.appendChild(styleElement);
  }

  const fontUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(primaryFont)}&display=swap`;
  let linkElement = document.getElementById("userscript-font-link");
  if (!linkElement) {
    linkElement = document.createElement("link");
    linkElement.id = "userscript-font-link";
    linkElement.rel = "stylesheet";
    document.head.appendChild(linkElement);
  }
  linkElement.href = fontUrl;

  styleElement.textContent = `${configs.font.selector} { font-family: "${primaryFont}", serif, sans-serif !important; }`;
};

export const populateFontDropdown = async (initialFontGroups = null) => {
  const fontSelect = document.getElementById("wtr-font-select");
  if (!fontSelect) return;
  const currentFont = loadValue(configs.font.key, configs.font.defaultFont);
  fontSelect.innerHTML = "";
  const fontGroups = initialFontGroups || (await fetchFonts());
  const groupLabels = {
    recommendedSerif: "Recommended (Serif)",
    recommendedSansSerif: "Recommended (Sans-serif)",
    other: "All Other Fonts",
  };
  for (const groupKey in fontGroups) {
    if (fontGroups[groupKey].length === 0) continue;
    const optgroup = document.createElement("optgroup");
    optgroup.label = groupLabels[groupKey] || "Fonts";
    fontGroups[groupKey].forEach((font) => {
      const option = document.createElement("option");
      option.value = font;
      option.textContent = font;
      optgroup.appendChild(option);
    });
    fontSelect.appendChild(optgroup);
  }
  fontSelect.value = Object.values(fontGroups).flat().includes(currentFont) ? currentFont : configs.font.defaultFont;
};

export { getFallbackFonts };