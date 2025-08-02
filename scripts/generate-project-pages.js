// Script to generate individual project pages (for static fallback)
const fs = require('fs-extra');
const path = require('path');

// Import project data
const projects = require('../data/projects.js');

// Create projects directory if it doesn't exist
const projectsDir = './public/projects';
if (!fs.existsSync(projectsDir)) {
    fs.mkdirSync(projectsDir, { recursive: true });
}

// Generate page for each project (static fallback)
projects.forEach(project => {
    const pageContent = generateProjectPage(project);
    const fileName = `${project.id}.html`;
    const filePath = path.join(projectsDir, fileName);
    
    fs.writeFileSync(filePath, pageContent);
    console.log(`✅ Generated: ${fileName}`);
});

function generateProjectPage(project) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${project.title.en} - DÆDALE</title>
    <meta name="description" content="${project.description.en}">
    <link rel="stylesheet" href="/css/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="icon" type="image/png" href="/Images/favicon.png">
    <script>
        // Redirect to dynamic route
        window.location.href = '/projects/${project.id}';
    </script>
</head>
<body>
    <div class="loading-container">
        <div class="loading">Redirecting...</div>
    </div>
</body>
</html>`;
}

console.log(`\n🎉 Generated ${projects.length} project pages!`);
console.log('\nTo add a new project:');
console.log('1. Edit data/projects.js');
console.log('2. Add images to Images/projects/[project-id]/');
console.log('3. Run: npm run generate-projects');
console.log('4. Deploy to Render');