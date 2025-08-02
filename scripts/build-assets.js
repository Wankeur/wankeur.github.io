// Build script for optimizing assets
const fs = require('fs-extra');
const path = require('path');

console.log('🔧 Building assets...');

// Ensure public directories exist
const directories = [
    'public/css',
    'public/js',
    'public/Images'
];

directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        console.log(`📁 Created directory: ${dir}`);
    }
});

// Copy Images to public folder if they exist
if (fs.existsSync('Images')) {
    fs.copySync('Images', 'public/Images');
    console.log('📸 Copied Images to public folder');
}

console.log('✅ Assets built successfully!');