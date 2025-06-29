#!/bin/bash
echo ""
echo "========================================"
echo "   DAEDALE Deployment Helper"
echo "========================================"
echo ""

echo "Building production site..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    echo ""
    exit 1
fi

echo ""
echo "✅ Build successful!"
echo ""
echo "📁 Files ready in 'dist' folder"
echo ""
echo "🚀 Next steps:"
echo "1. Open your web hosting control panel"
echo "2. Navigate to your website root directory"
echo "3. Upload ALL contents of the 'dist' folder"
echo "4. Replace existing files when prompted"
echo "5. Visit your live website to see changes"
echo ""
echo "🔗 Your admin panel will remain local-only for security"
echo ""