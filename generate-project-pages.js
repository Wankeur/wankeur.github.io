// Script to generate individual project pages
const fs = require('fs');
const path = require('path');

// Import project data and generator
const projects = require('./data/projects.js');
const ProjectGenerator = require('./js/project-generator.js');

// Create projects directory if it doesn't exist
const projectsDir = './projects';
if (!fs.existsSync(projectsDir)) {
    fs.mkdirSync(projectsDir);
}

// Generate page for each project
const generator = new ProjectGenerator();

projects.forEach(project => {
    const pageContent = generator.generateProjectPage(project.id);
    const fileName = `${project.id}.html`;
    const filePath = path.join(projectsDir, fileName);
    
    fs.writeFileSync(filePath, pageContent);
    console.log(`✅ Generated: ${fileName}`);
});

console.log(`\n🎉 Generated ${projects.length} project pages!`);
console.log('\nTo add a new project:');
console.log('1. Edit data/projects.js');
console.log('2. Add images to Images/projects/[project-id]/');
console.log('3. Run: node generate-project-pages.js');
console.log('4. Run: npm run build');