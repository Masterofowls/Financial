const sharp = require('sharp');
const fs = require('node:fs');
const path = require('node:path');

// Icon sizes needed for PWA
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

// Create SVG for each size
function createSVG(size) {
  const isSmall = size <= 32;
  const isMedium = size > 32 && size <= 96;
  
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradient${size}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
    </linearGradient>
    ${!isSmall ? `<linearGradient id="bitcoinGradient${size}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#f59e0b;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#ef4444;stop-opacity:1" />
    </linearGradient>` : ''}
  </defs>
  
  <!-- Background -->
  <rect width="${size}" height="${size}" rx="${Math.round(size * 0.15)}" ry="${Math.round(size * 0.15)}" fill="url(#bgGradient${size})"/>
  
  <!-- Main trending up icon -->
  <g transform="translate(${Math.round(size * 0.25)}, ${Math.round(size * 0.25)})">
    <path d="M${Math.round(size * 0.25)} ${Math.round(size * 0.1)}h${Math.round(size * 0.25)}m0 0v${Math.round(size * 0.25)}m0-${Math.round(size * 0.25)}l-${Math.round(size * 0.25)} ${Math.round(size * 0.25)}${isMedium || !isSmall ? `l-${Math.round(size * 0.125)}-${Math.round(size * 0.125)}l-${Math.round(size * 0.1875)} ${Math.round(size * 0.1875)}` : ''}" 
          stroke="white" 
          stroke-width="${Math.max(1, Math.round(size * 0.03))}" 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          fill="none"/>
  </g>
  
  ${!isSmall ? `<!-- Bitcoin/Zap indicator -->
  <circle cx="${Math.round(size * 0.8)}" cy="${Math.round(size * 0.2)}" r="${Math.round(size * 0.1)}" fill="url(#bitcoinGradient${size})"/>
  <path d="M${Math.round(size * 0.8)} ${Math.round(size * 0.15)}l-${Math.round(size * 0.05)} ${Math.round(size * 0.075)}h${Math.round(size * 0.1)}l-${Math.round(size * 0.05)} ${Math.round(size * 0.075)}" 
        stroke="white" 
        stroke-width="${Math.max(1, Math.round(size * 0.015))}" 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        fill="white"/>` : ''}
</svg>`;
}

async function generateIcons() {
  const iconsDir = path.join(__dirname, 'public', 'icons');
  
  // Ensure icons directory exists
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }

  console.log('Generating PWA icons...');

  for (const { size, name } of sizes) {
    try {
      const svgContent = createSVG(size);
      const svgBuffer = Buffer.from(svgContent);
      
      // Convert SVG to PNG
      await sharp(svgBuffer)
        .png({ quality: 100, compressionLevel: 9 })
        .toFile(path.join(iconsDir, name));
      
      console.log(`✓ Generated ${name} (${size}x${size})`);
    } catch (error) {
      console.error(`✗ Failed to generate ${name}:`, error.message);
    }
  }

  // Generate favicon.ico (multi-size ICO file)
  try {
    const svgContent = createSVG(32);
    const svgBuffer = Buffer.from(svgContent);
    
    await sharp(svgBuffer)
      .png({ quality: 100 })
      .toFile(path.join(__dirname, 'public', 'favicon.ico'));
    
    console.log('✓ Generated favicon.ico');
  } catch (error) {
    console.error('✗ Failed to generate favicon.ico:', error.message);
  }

  // Create shortcut icons
  const shortcuts = [
    { name: 'shortcut-trading.png', color: '#10b981' },
    { name: 'shortcut-portfolio.png', color: '#8b5cf6' },
    { name: 'shortcut-analytics.png', color: '#f59e0b' }
  ];

  for (const { name, color } of shortcuts) {
    try {
      const svgContent = `<svg width="96" height="96" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
        <rect width="96" height="96" rx="20" ry="20" fill="${color}"/>
        <path d="M24 48h36m0 0v36m0-36l-36 36" stroke="white" stroke-width="4" stroke-linecap="round" fill="none"/>
      </svg>`;
      
      const svgBuffer = Buffer.from(svgContent);
      await sharp(svgBuffer)
        .png({ quality: 100 })
        .toFile(path.join(iconsDir, name));
      
      console.log(`✓ Generated ${name}`);
    } catch (error) {
      console.error(`✗ Failed to generate ${name}:`, error.message);
    }
  }

  console.log('✅ All PWA icons generated successfully!');
}

generateIcons().catch(console.error);
