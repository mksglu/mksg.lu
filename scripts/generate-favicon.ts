const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function generateFavicons() {
  const inputImage = path.join(process.cwd(), 'src', 'images', 'pp-mert.jpg');
  const outputDir = path.join(process.cwd(), 'public/favicon');

  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Generate different sizes
  const sizes = {
    'favicon-16x16.png': 16,
    'favicon-32x32.png': 32,
    'apple-touch-icon.png': 180,
    'android-chrome-192x192.png': 192,
    'android-chrome-512x512.png': 512,
    'icon.png': 192,
  };

  for (const [filename, size] of Object.entries(sizes)) {
    await sharp(inputImage)
      .resize(size, size, {
        fit: 'cover',
        position: 'center'
      })
      .toFile(path.join(outputDir, filename));

    // Use the 32x32 PNG as favicon.ico
    if (filename === 'favicon-32x32.png') {
      fs.copyFileSync(
        path.join(outputDir, filename),
        path.join(process.cwd(), 'public/favicon.ico')
      );
    }
  }

  console.log('Favicons generated successfully!');
}

generateFavicons().catch(console.error); 