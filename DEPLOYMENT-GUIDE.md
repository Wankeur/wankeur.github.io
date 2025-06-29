# 🚀 Deploying Local Changes to Live Website

## 📋 Quick Workflow

### 1. Make Changes Locally
- Run your local admin panel: `npm run local`
- Add/edit projects at `http://localhost:3001/admin.html`
- Make any other modifications to your site

### 2. Build the Updated Site
```bash
npm run build
```
This creates an updated `dist` folder with all your changes.

### 3. Upload to Live Website
**Option A: Manual Upload (Most Common)**
- Open your web hosting control panel (cPanel, FileZilla, etc.)
- Upload the **entire `dist` folder contents** to your website root
- Replace existing files

**Option B: Git Deployment (If Available)**
```bash
git add .
git commit -m "Updated projects and content"
git push origin main
```

## 🔄 Detailed Steps

### Step 1: Local Development
1. **Start local server**: Double-click `start-admin.bat`
2. **Open admin panel**: http://localhost:3001/admin.html
3. **Login**: admin / password
4. **Make your changes**: Add/edit/delete projects
5. **Stop server**: Press Ctrl+C

### Step 2: Build for Production
```bash
npm run build
```

**What this does:**
- Compiles your site for production
- Copies all necessary files to `dist` folder
- Updates project data in `dist/data/projects.json`
- Optimizes assets and files

### Step 3: Upload to Live Site

#### Method 1: cPanel File Manager
1. **Login to your hosting cPanel**
2. **Open File Manager**
3. **Navigate to your website root** (usually `public_html`)
4. **Upload all files from `dist` folder**
5. **Replace existing files when prompted**

#### Method 2: FTP Client (FileZilla)
1. **Connect to your hosting via FTP**
2. **Navigate to website root directory**
3. **Upload entire `dist` folder contents**
4. **Overwrite existing files**

#### Method 3: Hosting Provider's Upload Tool
- Most hosting providers have drag-and-drop upload interfaces
- Upload the `dist` folder contents to your website root

## 📁 What Gets Updated

When you run `npm run build`, these files are updated in `dist`:

```
dist/
├── index.html              # Homepage with new projects
├── projects.html           # Projects page
├── admin.html              # Admin panel (shows local-only message)
├── data/projects.json      # Your updated project data
├── projects/               # Individual project pages
│   ├── your-new-project.html
│   └── ...
└── assets/                 # Optimized CSS, JS, images
```

## 🎯 Important Notes

### ✅ What Transfers:
- ✅ New projects you added
- ✅ Modified project content
- ✅ Updated project data
- ✅ Any HTML/CSS changes
- ✅ New project detail pages

### ❌ What Doesn't Transfer:
- ❌ Admin panel functionality (stays local-only)
- ❌ Node.js server (not needed on live site)
- ❌ Database operations (live site is static)

### 🔒 Security:
- Live site shows "Local Access Only" message for admin
- No admin functionality exposed publicly
- All admin features require local server

## 🛠️ Automation Options

### Option 1: Batch Script for Windows
Create `deploy.bat`:
```batch
@echo off
echo Building site...
npm run build
echo.
echo ✅ Build complete!
echo.
echo Now upload the 'dist' folder contents to your live website.
echo.
pause
```

### Option 2: Shell Script for Mac/Linux
Create `deploy.sh`:
```bash
#!/bin/bash
echo "Building site..."
npm run build
echo ""
echo "✅ Build complete!"
echo ""
echo "Now upload the 'dist' folder contents to your live website."
```

### Option 3: Git Hooks (Advanced)
If your hosting supports Git deployment:
```bash
# Add deployment script to package.json
"scripts": {
  "deploy": "npm run build && git add dist && git commit -m 'Deploy updates' && git push"
}
```

## 🔄 Typical Workflow

1. **Local Development**:
   ```bash
   npm run local
   # Make changes in admin panel
   # Ctrl+C to stop
   ```

2. **Build & Deploy**:
   ```bash
   npm run build
   # Upload dist folder to live site
   ```

3. **Verify**:
   - Check your live website
   - Verify new projects appear
   - Confirm admin shows local-only message

## 🆘 Troubleshooting

**Changes not showing on live site?**
- Clear browser cache (Ctrl+F5)
- Check if all files uploaded correctly
- Verify `data/projects.json` was updated

**Admin panel accessible on live site?**
- This should NOT happen with our setup
- If it does, re-upload `admin.html` and `admin.js`

**Build command fails?**
- Run `npm install` first
- Check for any error messages
- Ensure all files are saved

## 📱 Quick Reference

| Action | Command |
|--------|---------|
| Start local admin | `npm run local` |
| Build for production | `npm run build` |
| Install dependencies | `npm install` |
| View local admin | `http://localhost:3001/admin.html` |

---

**Remember**: Your live website becomes a static site with dynamic content, while admin functionality stays safely on your local machine! 🔒