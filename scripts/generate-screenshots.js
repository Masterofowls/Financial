const sharp = require('sharp');
const fs = require('node:fs');
const path = require('node:path');

async function generateScreenshots() {
  const screenshotsDir = path.join(__dirname, '..', 'public', 'screenshots');
  
  console.log('Generating PWA screenshots...');

  try {
    // Desktop screenshot
    const desktopSvg = fs.readFileSync(path.join(screenshotsDir, 'desktop-home.svg'));
    await sharp(desktopSvg)
      .png({ quality: 100 })
      .toFile(path.join(screenshotsDir, 'desktop-home.png'));
    console.log('✓ Generated desktop-home.png (1280x720)');

    // Mobile screenshot
    const mobileSvg = fs.readFileSync(path.join(screenshotsDir, 'mobile-dashboard.svg'));
    await sharp(mobileSvg)
      .png({ quality: 100 })
      .toFile(path.join(screenshotsDir, 'mobile-dashboard.png'));
    console.log('✓ Generated mobile-dashboard.png (390x844)');

    console.log('✅ All PWA screenshots generated successfully!');
  } catch (error) {
    console.error('✗ Failed to generate screenshots:', error.message);
  }
}

generateScreenshots();
