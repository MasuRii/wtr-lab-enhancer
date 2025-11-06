# WTR-Lab Reader & UI Enhancer

![Configuration Panel](https://greasyfork.org/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MTkzODAzLCJwdXIiOiJibG9iX2lkIn19--785372a417f9bf4194e6b4f5972c9db8aa14b028/Screenshot%202025-10-29%20at%2014-11-42%20This%20Game%20Is%20Too%20Realistic%20Chapter%20862%20-%20WTR-LAB.png?locale=en) ![Configuration Panel](https://greasyfork.org/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MTkzODAyLCJwdXIiOiJibG9iX2lkIn19--18c2b2a6815239388d78e7a5b130a57c1112b1dc/Screenshot%202025-10-29%20at%2014-11-48%20This%20Game%20Is%20Too%20Realistic%20Chapter%20862%20-%20WTR-LAB.png?locale=en) ![Reader View](https://greasyfork.org/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MTkzNDEwLCJwdXIiOiJibG9iX2lkIn19--fe51807b2fee0be4311f1ba7c686c4ca5903f155/Screenshot%202025-10-26%20at%2012-18-13%20This%20Game%20Is%20Too%20Realistic%20Chapter%20790%20-%20WTR-LAB.png?locale=en)

[![Version](https://img.shields.io/badge/version-3.5.1-blue.svg)](https://github.com/MasuRii/wtr-lab-enhancer)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GreasyFork](https://img.shields.io/badge/greasyfork-ready-orange.svg)](https://greasyfork.org/)

A powerful userscript that enhances your WTR-Lab reading experience with customizable reader width, navigation panel controls, and font styling options. Create the perfect reading environment on wtr-lab.com with this feature-rich userscript.

#### The Problem

The default reading pane on `wtr-lab.com` is fixed to a narrow width and a limited font selection. On wider monitors, this results in a lot of wasted space and a less-than-ideal typographic experience, which can be uncomfortable for long reading sessions.

#### The Solution

This userscript introduces a central **configuration panel** to override the default styles. It adds a single, clean "Configure Settings" command to your userscript manager menu, allowing you to easily:

- Independently adjust the width of the reader and the bottom navigator.
- Choose from a vast selection of high-quality reading fonts, fetched directly from Google Fonts.
- Constrain the bottom navigator's background to match its content width, removing distracting excess background on the sides.
- Block the floating "Add Term" button if you find it distracting.
- Hide individual buttons from the toolbar above the chapter to declutter the interface.
- Reset any setting back to its default with a single click.

Your preferred settings are automatically saved and applied every time you visit a chapter, so you only need to set them once for a perfectly tailored reading environment.

---

### Features

#### Core Functionality

- **Theme-Adaptive UI:** The settings panel automatically adapts to the website's light and dark themes for a seamless, integrated look.
- **Organized Configuration Panel:** A single `Configure Settings` command opens a clean, modern panel with all options grouped into logical sections: "Layout & Sizing," "Font Customization," and "Element Visibility."
- **Dynamic Font Selection:**
  - Overrides the website's limited font choices with a large, categorized list from Google Fonts.
  - The dropdown is intelligently grouped into "Recommended for Reading (Serif)," "Recommended for Reading (Sans-serif)," and "All Other Fonts" to help you find the perfect style.
  - Includes a "Refresh" button to fetch the latest font list on demand.
- **Dual Width Control:** Independently adjust the width of both the main reader content (300-1200px) and the bottom navigation bar to create your perfect layout.
- **Element Visibility Control:**
  - **Navigator Background:** A simple checkbox lets you "Constrain Navigator Background," trimming excess background to match the navigator's content width.
  - **"Add Term" Button Blocker:** Easily hide the floating "Add Term" button with a dedicated toggle.
  - **Toolbar Decluttering:** Hide individual buttons (Book, Text, TTS, etc.) from the toolbar above the chapter content to create a cleaner interface.
- **Responsive & Mobile-Friendly:** The settings panel is designed to work flawlessly on both desktop and mobile browsers, with controls that adapt to your screen size and enhanced touch controls for mobile devices.
- **Persistent Settings:** Your chosen widths, font, and visibility preferences are saved locally using GM_* APIs, so they are remembered across sessions.
- **Developer Tools:** Includes a `Toggle Debug Logging` command for advanced users and easier troubleshooting.
- **Lightweight and Safe:** The script is minimal, efficient, and only affects the styling of the page. It does not interact with the website's data or your account.
- **Font Management:** Dynamic font loading with on-demand performance optimization and font toggle functionality.
- **Settings Persistence:** All preferences saved locally via GM_* APIs for reliable cross-session storage.

#### Version 3.5.1 Modern Enhancements

- **Modern CSS Architecture:** Implemented with CSS Custom Properties (variables) for better maintainability and theming support.
- **CSS Container Queries:** Dynamic responsive design that adapts to container sizes rather than viewport, providing more precise control.
- **Enhanced Accessibility (WCAG 2.2/2.3):**
  - Improved keyboard navigation and focus management
  - Better contrast ratios and visual indicators
  - Screen reader optimization with proper ARIA labels
  - Focus-visible states for better keyboard user experience
- **Performance Optimizations:**
  - Reduced CSS complexity and improved rendering performance
  - Optimized font loading strategies
  - Enhanced script efficiency and memory usage
- **Progressive Enhancement:** Graceful degradation for older browsers while leveraging modern features when available
- **Improved Debug Logging:** Enhanced troubleshooting capabilities with structured logging for better issue diagnosis
- **Build System:** Webpack 5 bundling with production optimization and minification
- **Touch Optimization:** Enhanced touch controls for mobile devices
- **CSS Modules:** Modern styling architecture with optimized build process
- **Memory Optimization:** Enhanced script efficiency and memory usage patterns

---

### How to Use

1. Make sure you have a userscript manager browser extension installed (like [Tampermonkey](https://www.tampermonkey.net/), Violentmonkey, etc.).
2. Install this script.
3. Navigate to any chapter page on `wtr-lab.com`.
4. Click the **userscript manager extension icon** in your browser's toolbar and select **`Configure Settings`**.
5. The settings panel will appear over the page.
6. Use the controls to adjust width, select your preferred font, and toggle features. Changes are applied and saved instantly. Click "Close" or click outside the panel to dismiss it.

---

### Technical Notes

- **Settings Storage:** Settings are saved using `GM_setValue`, which stores the data securely within your userscript manager.
- **Font Loading:** Uses `GM_xmlhttpRequest` to safely fetch the font list from the `google-webfonts-helper` API, bypassing browser cross-origin restrictions.
- **CSS Override Strategy:** The script uses CSS `!important` tags to ensure its styles reliably override the website's own styles.
- **Modern Web Standards:** Built with progressive enhancement principles, leveraging CSS Container Queries and Custom Properties while maintaining compatibility.
- **Accessibility Compliance:** Designed to meet WCAG 2.2/2.3 guidelines for better accessibility across all user needs.
- **Performance Focused:** Optimized for minimal impact on page load times and smooth user interactions.
