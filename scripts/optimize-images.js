const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '../public');
const imageFiles = [
  '2E725D0E-E0E7-49D1-AF18-87FC132B7612.jpeg',
  '8B126C29-1D4C-433F-955C-207F639A33F1.jpeg'
];

async function optimizeImage(filename) {
  const inputPath = path.join(publicDir, filename);
  const outputPath = path.join(publicDir, `optimized-${filename}`);

  if (!fs.existsSync(inputPath)) {
    console.log(`File not found: ${filename}`);
    return;
  }

  const beforeSize = fs.statSync(inputPath).size;

  try {
    await sharp(inputPath)
      .jpeg({ quality: 85, progressive: true })
      .resize(1200, null, { // 最大幅1200px
        withoutEnlargement: true,
        fit: 'inside'
      })
      .toFile(outputPath);

    const afterSize = fs.statSync(outputPath).size;
    const reduction = ((beforeSize - afterSize) / beforeSize * 100).toFixed(2);

    console.log(`${filename}:`);
    console.log(`  Before: ${(beforeSize / 1024 / 1024).toFixed(2)}MB`);
    console.log(`  After: ${(afterSize / 1024 / 1024).toFixed(2)}MB`);
    console.log(`  Reduction: ${reduction}%`);

    // 元のファイルを最適化されたファイルで置き換え
    fs.renameSync(inputPath, path.join(publicDir, `original-${filename}`));
    fs.renameSync(outputPath, inputPath);
    console.log(`  Replaced ${filename} with optimized version`);
    console.log('');
  } catch (error) {
    console.error(`Error optimizing ${filename}:`, error);
  }
}

async function main() {
  console.log('Optimizing images...\n');

  for (const file of imageFiles) {
    await optimizeImage(file);
  }

  console.log('Done!');
}

main();
