// Simple icon creation without Sharp - using Canvas or fallback method
const fs = require('node:fs');
const path = require('node:path');

// PNG header for a simple colored square
function createSimplePNG(size, colorR = 59, colorG = 130, colorB = 246) {
  // Create a simple PNG data structure (this is a simplified approach)
  // For production, you'd use a proper image library
  const data = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <defs>
      <linearGradient id="bg${size}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:rgb(${colorR},${colorG},${colorB});stop-opacity:1" />
        <stop offset="100%" style="stop-color:rgb(139,92,246);stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="${size}" height="${size}" rx="${Math.round(size * 0.15)}" ry="${Math.round(size * 0.15)}" fill="url(%23bg${size})"/>
    <path d="M${Math.round(size * 0.25)} ${Math.round(size * 0.4)}h${Math.round(size * 0.3)}m0 0v${Math.round(size * 0.3)}m0-${Math.round(size * 0.3)}l-${Math.round(size * 0.3)} ${Math.round(size * 0.3)}" stroke="white" stroke-width="${Math.max(1, Math.round(size * 0.04))}" stroke-linecap="round" fill="none"/>
  </svg>`;
  
  return data;
}

async function createIconFiles() {
  const iconsDir = path.join(__dirname, '..', 'public', 'icons');
  
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }

  const sizes = [
    { size: 16, name: 'favicon-16x16.png' },
    { size: 32, name: 'favicon-32x32.png' },
    { size: 72, name: 'icon-72x72.png' },
    { size: 96, name: 'icon-96x96.png' },
    { size: 128, name: 'icon-128x128.png' },
    { size: 144, name: 'icon-144x144.png' },
    { size: 152, name: 'icon-152x152.png' },
    { size: 180, name: 'apple-touch-icon.png' },
    { size: 192, name: 'icon-192x192.png' },
    { size: 384, name: 'icon-384x384.png' },
    { size: 512, name: 'icon-512x512.png' }
  ];

  console.log('Creating SVG-based icon files...');

  for (const { size, name } of sizes) {
    try {
      const svgContent = createSimplePNG(size);
      
      // Create corresponding SVG file
      const svgName = name.replace('.png', '.svg');
      fs.writeFileSync(
        path.join(iconsDir, svgName), 
        svgContent.replace('data:image/svg+xml,', '').replace(/%23/g, '#')
      );
      
      console.log(`✓ Created ${svgName} (${size}x${size})`);
    } catch (error) {
      console.error(`✗ Failed to create ${name}:`, error.message);
    }
  }

  // Create shortcuts
  const shortcuts = [
    { name: 'shortcut-trading.svg', color: 'rgb(16,185,129)' },
    { name: 'shortcut-portfolio.svg', color: 'rgb(139,92,246)' },
    { name: 'shortcut-analytics.svg', color: 'rgb(245,158,11)' }
  ];

  for (const { name, color } of shortcuts) {
    try {
      const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
        <rect width="96" height="96" rx="20" ry="20" fill="${color}"/>
        <path d="M24 48h36m0 0v36m0-36l-36 36" stroke="white" stroke-width="4" stroke-linecap="round" fill="none"/>
      </svg>`;
      
      fs.writeFileSync(path.join(iconsDir, name), svgContent);
      console.log(`✓ Created ${name}`);
    } catch (error) {
      console.error(`✗ Failed to create ${name}:`, error.message);
    }
  }

  console.log('✅ All icon files created successfully!');
  console.log('Note: For production, convert SVG files to PNG using an online converter or image processing tool.');
}

createIconFiles().catch(console.error);
