// index.cjs
(async () => {
  try {
    // Dynamically import your main ES module
    const mainModule = await import('./build/electron/Main.js');
    
    // If your Main.js exports a default function, call it.
    if (typeof mainModule.default === 'function') {
      mainModule.default();
    } else {
      console.error('Main.js does not export a default function.');
    }
  } catch (err) {
    console.error('Error loading Main.js:', err);
  }
})();
