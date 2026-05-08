const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imgDir = 'public/images';
const images = [
    { name: 'logo.png', width: 256, quality: 70 },
    { name: 'favicon.png', width: 32, quality: 70 },
    { name: 'hero-bg.jpg', width: 1600, quality: 50 },
    { name: 'interior-detailing.jpg', width: 1200, quality: 60 },
    { name: 'leather-seat-cleaning.jpg', width: 1200, quality: 60 }
];

async function optimize() {
    for (const img of images) {
        const inputPath = path.join(imgDir, img.name);
        const outputPath = path.join(imgDir, 'opt_' + img.name);

        if (!fs.existsSync(inputPath)) {
            console.log(`File not found: ${inputPath}`);
            continue;
        }

        console.log(`Optimizing ${img.name}...`);
        
        try {
            let pipeline = sharp(inputPath);
            if (img.width) {
                pipeline = pipeline.resize(img.width);
            }
            
            if (img.name.endsWith('.png')) {
                await pipeline.png({ quality: img.quality, compressionLevel: 9 }).toFile(outputPath);
            } else {
                await pipeline.jpeg({ quality: img.quality, progressive: true }).toFile(outputPath);
            }
            
            const oldSize = fs.statSync(inputPath).size;
            const newSize = fs.statSync(outputPath).size;
            console.log(`Done ${img.name}: ${oldSize} -> ${newSize} bytes (${Math.round((oldSize - newSize) / oldSize * 100)}% reduction)`);
            
            // Replace original with optimized
            fs.unlinkSync(inputPath);
            fs.renameSync(outputPath, inputPath);
        } catch (err) {
            console.error(`Error optimizing ${img.name}:`, err);
        }
    }
}

optimize();
