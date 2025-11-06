import { log } from "./logger.js";

export const detectCSSFeatures = () => {
  const features = {
    containerQueries: CSS.supports('container-type: inline-size'),
    grid: CSS.supports('display: grid'),
    backdropFilter: CSS.supports('backdrop-filter: blur(1px)'),
    customProperties: CSS.supports('--custom: 0'),
    motionPreferences: window.matchMedia('(prefers-reduced-motion: reduce)'),
    touchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
  };

  log('CSS Feature Detection:', features);

  return features;
};

export const initializeModernFeatures = () => {
  const features = detectCSSFeatures();

  // Add feature flags to the document for CSS fallbacks
  document.documentElement.setAttribute('data-container-queries', features.containerQueries);
  document.documentElement.setAttribute('data-grid', features.grid);
  document.documentElement.setAttribute('data-backdrop-filter', features.backdropFilter);
  document.documentElement.setAttribute('data-touch-device', features.touchDevice);

  // Initialize modern features if supported
  if (features.containerQueries) {
    log('Container queries supported - enabling responsive container design');
    initializeContainerQueryResponsive();
  }

  if (features.grid) {
    log('CSS Grid supported - enabling modern grid layouts');
    initializeGridLayouts();
  }

  if (features.backdropFilter) {
    log('Backdrop filter supported - enabling blur effects');
    initializeBackdropEffects();
  }

  if (features.touchDevice) {
    log('Touch device detected - optimizing for touch interactions');
    initializeTouchOptimizations();
  }

  // Set up motion preference listeners
  features.motionPreferences.addEventListener('change', (e) => {
    const isReducedMotion = e.matches;
    document.documentElement.setAttribute('data-reduced-motion', isReducedMotion);
    log(`Motion preference changed: ${isReducedMotion ? 'Reduce motion' : 'Allow motion'}`);
  });

  // Set initial motion preference
  document.documentElement.setAttribute('data-reduced-motion', features.reducedMotion);
};

export const initializeContainerQueryResponsive = () => {
  const container = document.getElementById('wtr-config-container');
  if (container) {
    container.classList.add('wtr-container-responsive');
  }
};

export const initializeGridLayouts = () => {
  const controls = document.querySelectorAll('.wtr-config-controls');
  controls.forEach(control => {
    control.classList.add('wtr-grid-enabled');
  });
};

export const initializeBackdropEffects = () => {
  const overlay = document.getElementById('wtr-config-overlay');
  if (overlay) {
    overlay.classList.add('wtr-backdrop-filter');
  }
};

export const initializeTouchOptimizations = () => {
  const buttons = document.querySelectorAll('.wtr-config-button');
  buttons.forEach(button => {
    button.classList.add('wtr-touch-optimized');
  });

  const inputs = document.querySelectorAll('input[type="number"], select');
  inputs.forEach(input => {
    input.classList.add('wtr-touch-optimized');
  });
};