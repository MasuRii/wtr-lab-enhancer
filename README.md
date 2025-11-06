# WTR-Lab Reader & UI Enhancer

![Configuration Panel](https://greasyfork.org/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MTkzODAzLCJwdXIiOiJibG9iX2lkIn19--785372a417f9bf4194e6b4f5972c9db8aa14b028/Screenshot%202025-10-29%20at%2014-11-42%20This%20Game%20Is%20Too%20Realistic%20Chapter%20862%20-%20WTR-LAB.png?locale=en) ![Configuration Panel](https://greasyfork.org/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MTkzODAyLCJwdXIiOiJibG9iX2lkIn19--18c2b2a6815239388d78e7a5b130a57c1112b1dc/Screenshot%202025-10-29%20at%2014-11-48%20This%20Game%20Is%20Too%20Realistic%20Chapter%20862%20-%20WTR-LAB.png?locale=en) ![Reader View](https://greasyfork.org/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6MTkzNDEwLCJwdXIiOiJibG9iX2lkIn19--fe51807b2fee0be4311f1ba7c686c4ca5903f155/Screenshot%202025-10-26%20at%2012-18-13%20This%20Game%20Is%20Too%20Realistic%20Chapter%20790%20-%20WTR-LAB.png?locale=en)

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/MasuRii/wtr-lab-enhancer)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](#building-from-source)
[![GreasyFork](https://img.shields.io/badge/greasyfork-ready-orange.svg)](https://greasyfork.org/)

A powerful userscript that enhances your WTR-Lab reading experience with customizable reader width, navigation panel controls, and font styling options. Create the perfect reading environment on wtr-lab.com with this feature-rich userscript.

## 🚀 Quick Installation

### Option 1: Install from GreasyFork (Recommended)

**For end users, we recommend installing directly from GreasyFork for automatic updates:**

👉 **[Install from GreasyFork](https://greasyfork.org/en/scripts/552944-wtr-lab-reader-ui-enhancer)** - Ready!

_GreasyFork provides automatic updates and easy management through userscript managers (Tampermonkey, Violentmonkey, etc.)._

### Option 2: Build from Source

**For developers who want to modify the script or contribute:**

1. **Prerequisites:** Node.js 16+ and npm
2. **Clone the repository:**
   ```bash
   git clone https://github.com/MasuRii/wtr-lab-enhancer.git
   cd wtr-lab-enhancer
   ```
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Build the userscript:**
   ```bash
   npm run build
   ```
5. **Install the generated file:** The built script will be available at `dist/wtr-lab-enhancer.user.js`
   - Open your userscript manager dashboard
   - Click "Create a new script"
   - Replace the default content with the contents of `dist/wtr-lab-enhancer.user.js`
   - Save the script

## ✨ Features

### 📐 **Layout & Sizing Control**

- **Reader Width:** Adjust the main content reading area width (300-1200px)
- **Navigation Panel:** Customize the bottom navigation panel width
- **Background Constraint:** Option to constrain navigation background to match content width

### 🎨 **Font Customization**

- **Custom Fonts:** Choose from Google Fonts collection
- **Font Categories:** Browse recommended serif and sans-serif fonts
- **Dynamic Loading:** Fonts are loaded on-demand for optimal performance
- **Font Toggle:** Enable/disable custom fonts as needed

### 👁️ **Element Visibility**

- **Toolbar Controls:** Hide/show individual toolbar buttons (Book, Text, TTS, Settings, List)
- **Add Term Button:** Option to hide the floating "Add Term" button for distraction-free reading

### 🔧 **Advanced Features**

- **Debug Mode:** Detailed console logging for troubleshooting
- **Settings Persistence:** All preferences saved locally via GM\_\* APIs
- **Responsive Design:** Works across different screen sizes
- **Touch Optimization:** Enhanced touch controls for mobile devices

## 🎯 **Target Websites**

- `https://wtr-lab.com/en/novel/*/*/chapter-*`

## 🛠️ **Development**

### **Building from Source**

```bash
# Development build with source maps
npm run dev

# Production build (minified)
npm run build
```

### **Project Structure**

```
wtr-lab-enhancer/
├── src/
│   ├── index.js          # Main entry point
│   ├── modules/
│   │   ├── config.js     # Configuration management
│   │   ├── features.js   # Feature implementations
│   │   ├── fontManager.js # Font loading and management
│   │   ├── logger.js     # Debug logging
│   │   ├── styles.js     # CSS injection
│   │   └── ui.js         # UI component management
│   └── styles/
│       └── panel.css     # Configuration panel styling
├── dist/                 # Built userscript output
├── webpack.config.js     # Build configuration
├── package.json          # Project metadata
└── README.md            # This file
```

### **Build System**

- **Webpack 5** for modern bundling
- **webpack-userscript** plugin for userscript header generation
- **CSS Modules** with style-loader and css-loader
- **Production optimization** with minification and source maps

### **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly with `npm run dev`
5. Build with `npm run build` to ensure production compatibility
6. Commit your changes (`git commit -m 'Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

## 🔄 **Versioning & Updates**

### **Current Version:** 1.0.0

- **Semantic Versioning:** Following semver (MAJOR.MINOR.PATCH)
- **GreasyFork Compatible:** Optimized for GreasyFork submission and approval
- **Auto-updates:** Configured for seamless updates via @updateURL

### **Update Sources**

- **Primary:** GreasyFork (automatic updates)
- **Backup:** GitHub releases (manual installation)
- **Development:** Direct from source (built locally)

## 📋 **GreasyFork Compliance**

This script is fully compliant with GreasyFork policies:

- ✅ **Single-file output:** All code bundled into one installable file
- ✅ **Proper metadata:** All required headers including @updateURL, @homepageURL, @supportURL
- ✅ **MIT License:** Open source license properly declared
- ✅ **Minification allowed:** Production builds are optimized
- ✅ **No obfuscation:** Clean, readable source code available
- ✅ **Documented permissions:** GM\_\* functions properly justified

## 🔐 **Permissions & APIs**

The script uses the following userscript manager APIs:

- `GM_addStyle` - Inject custom CSS styles
- `GM_getValue` / `GM_setValue` - Persist user settings
- `GM_registerMenuCommand` - Add settings menu entry
- `GM_xmlhttpRequest` - Load font resources from Google Fonts API

All permissions are minimal and necessary for core functionality.

## 🐛 **Issues & Support**

- **Report bugs:** [GitHub Issues](https://github.com/MasuRii/wtr-lab-enhancer/issues)
- **Feature requests:** [GitHub Issues](https://github.com/MasuRii/wtr-lab-enhancer/issues)
- **General support:** [GitHub Discussions](https://github.com/MasuRii/wtr-lab-enhancer/discussions)

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- WTR-Lab platform for providing an excellent reading experience
- GreasyFork community for userscript hosting and distribution
- Open source libraries and tools that made this project possible

---

**Made with ❤️ for better reading experiences on WTR-Lab**

_For the latest updates and detailed documentation, visit our [GitHub repository](https://github.com/MasuRii/wtr-lab-enhancer)._
