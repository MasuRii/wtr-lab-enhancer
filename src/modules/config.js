export const DEBUG_KEY = "wtr_lab_enhancer_debug";
export const STEP_WIDTH = 50;
export const MIN_WIDTH = 300;
export const FONTS_API_URL = "https://gwfh.mranftl.com/api/fonts";

export const RECOMMENDED_FONTS = {
  serif: [
    "Merriweather",
    "Lora",
    "Crimson Text",
    "Libre Baskerville",
    "Spectral",
    "EB Garamond",
    "Noto Serif",
  ],
  sansSerif: ["Roboto", "Open Sans", "Source Sans Pro"],
};

export const configs = {
  reader: {
    key: "wtr_lab_reader_width",
    selector: ".fix-size.card",
    defaultWidth: 760,
    label: "Reader Content Width",
  },
  nav: {
    key: "wtr_lab_nav_width",
    selector: "nav.bottom-reader-nav .fix-size",
    defaultWidth: 760,
    label: "Bottom Navigator Width",
  },
  navConstraint: {
    key: "wtr_lab_nav_constraint",
    selector: "nav.bottom-reader-nav",
    defaultState: false,
    label: "Constrain Navigator Background",
  },
  fontToggle: { key: "wtr_lab_font_style_enabled", defaultState: false, label: "Enable Custom Font Style" },
  font: { key: "wtr_lab_font_family", selector: ".chapter-body", defaultFont: "Merriweather", label: "Font Style" },
  blockAddTerm: {
    key: "wtr_lab_block_add_term",
    selector: ".floating-add-term-btn",
    defaultState: false,
    label: 'Block "Add Term" Button',
  },
  hideBookBtn: {
    key: "wtr_lab_hide_book_btn",
    selector: 'div.btn-group button.wtr:has(svg use[href*="book"])',
    defaultState: false,
    label: "Book",
    iconHTML: '<svg><use href="/icons/sprite_cd1f90d7.svg#book"></use></svg>',
  },
  hideTextFieldsBtn: {
    key: "wtr_lab_hide_text_fields_btn",
    selector: 'div.btn-group button.wtr:has(svg use[href*="text_fields"])',
    defaultState: false,
    label: "Text",
    iconHTML: '<svg><use href="/icons/sprite_cd1f90d7.svg#text_fields"></use></svg>',
  },
  hideTtsBtn: {
    key: "wtr_lab_hide_tts_btn",
    selector: 'div.btn-group button.wtr:has(svg use[href*="tts"])',
    defaultState: false,
    label: "TTS",
    iconHTML: '<svg><use href="/icons/sprite_cd1f90d7.svg#tts"></use></svg>',
  },
  hideCogBtn: {
    key: "wtr_lab_hide_cog_btn",
    selector: 'div.btn-group button.wtr:has(svg use[href*="cog-outline"])',
    defaultState: false,
    label: "Settings",
    iconHTML: '<svg><use href="/icons/sprite_cd1f90d7.svg#cog-outline"></use></svg>',
  },
  hideListBtn: {
    key: "wtr_lab_hide_list_btn",
    selector: 'div.btn-group button.wtr:has(svg use[href*="list"])',
    defaultState: false,
    label: "List",
    iconHTML: '<svg><use href="/icons/sprite_cd1f90d7.svg#list"></use></svg>',
  },
  debug: { key: DEBUG_KEY, defaultState: false, label: "Enable Debug Logging" },
};