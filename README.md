# DÆDALE Portfolio

**Dynamic Automation & Electronics for Digital Advanced Learning in Engineering**

A modern, dynamic portfolio website showcasing automation, robotics, and engineering projects by Alexandre Radermacker.

## 🚀 Features

- **Dynamic Project Management**: Easy-to-edit project data system
- **Bilingual Support**: English and French language switching
- **Responsive Design**: Works perfectly on all devices
- **Modern Tech Stack**: Node.js, Express, and vanilla JavaScript
- **SEO Optimized**: Clean URLs and meta tags
- **Fast Loading**: Optimized assets and caching
- **Easy Deployment**: Ready for Render, Netlify, or any Node.js host

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Styling**: Custom CSS with CSS Grid and Flexbox
- **Icons**: Font Awesome
- **Fonts**: Inter (Google Fonts)
- **Deployment**: Render (recommended)

## 📁 Project Structure

```
daedale-portfolio/
├── server.js              # Express server
├── package.json           # Dependencies and scripts
├── render.yaml           # Render deployment config
├── data/
│   └── projects.js       # Project data (edit here!)
├── public/
│   ├── index.html        # Homepage
│   ├── projects.html     # Projects listing
│   ├── project-detail.html # Dynamic project details
│   ├── 404.html          # Error page
│   ├── css/
│   │   └── style.css     # Main stylesheet
│   ├── js/
│   │   └── app.js        # Main application logic
│   └── Images/           # Project images
└── scripts/
    ├── generate-project-pages.js
    └── build-assets.js
```

## 🚀 Quick Start

### Local Development

1. **Clone and install**:
   ```bash
   git clone <your-repo>
   cd daedale-portfolio
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Visit**: http://localhost:3000

### Production Deployment

#### Deploy to Render (Recommended)

1. **Connect your GitHub repo** to Render
2. **Use these settings**:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: Node.js
3. **Deploy!** 🚀

#### Manual Deployment

```bash
npm run build
npm start
```

## 📝 Adding Projects

### 1. Edit Project Data

Open `data/projects.js` and add your project:

```javascript
{
    id: "my-new-project",
    title: {
        en: "My New Project",
        fr: "Mon nouveau projet"
    },
    description: {
        en: "Project description in English",
        fr: "Description du projet en français"
    },
    image: "/Images/projects/my-new-project/main.jpg",
    gallery: [
        "/Images/projects/my-new-project/gallery1.jpg",
        "/Images/projects/my-new-project/gallery2.jpg"
    ],
    icon: "fas fa-robot",
    status: "completed", // completed, in-progress, planning
    technologies: ["Technology1", "Technology2"],
    featured: true, // Show on homepage
    details: {
        overview: {
            en: "Detailed description...",
            fr: "Description détaillée..."
        },
        features: [
            {
                en: "Feature 1",
                fr: "Fonctionnalité 1"
            }
        ]
        // ... more details
    }
}
```

### 2. Add Images

Create folder structure:
```
public/Images/projects/my-new-project/
├── main.jpg          # Main project image
├── gallery1.jpg      # Gallery image 1
├── gallery2.jpg      # Gallery image 2
└── gallery3.jpg      # Gallery image 3
```

### 3. Deploy

Push to your repository and Render will automatically deploy!

## 🌐 API Endpoints

- `GET /` - Homepage
- `GET /projects` - Projects listing
- `GET /projects/:id` - Project detail page
- `GET /api/projects` - Projects JSON API
- `GET /api/projects/:id` - Single project JSON API
- `GET /health` - Health check

## 🎨 Customization

### Colors and Styling

Edit CSS variables in `public/css/style.css`:

```css
:root {
    --primary-color: #0f4c3a;
    --accent-color: #10b981;
    --background-dark: #0f172a;
    /* ... more variables */
}
```

### Content

- **About section**: Edit directly in `public/index.html`
- **Experience**: Edit directly in `public/index.html`
- **Projects**: Edit in `data/projects.js`
- **Contact info**: Edit in `public/index.html`

## 📱 Responsive Design

The website is fully responsive and works on:
- 📱 Mobile phones (320px+)
- 📱 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Desktops (1200px+)

## 🔧 Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run build` - Build assets and generate pages
- `npm run generate-projects` - Generate static project pages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this for your own portfolio!

## 👨‍💻 Author

**Alexandre Radermacker**
- Email: radermacker.alexandre@gmail.com
- LinkedIn: [alexandre-radermacker](https://www.linkedin.com/in/alexandre-radermacker)
- GitHub: [wankeur](https://github.com/wankeur)

---

**DÆDALE** - *Dynamics Automation & Electronics for Digital Advanced Learning in Engineering*