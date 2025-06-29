# DÆDALE Admin Panel - Quick Start Guide

## 🚀 Super Easy Setup

### Windows Users:
1. **Double-click** `start-admin.bat`
2. Wait for "Server running on port 3001"
3. Open your browser to: `http://localhost:3001/admin.html`
4. Login with: `admin` / `password`

### Mac/Linux Users:
1. **Double-click** `start-admin.sh` (or run `./start-admin.sh` in terminal)
2. Wait for "Server running on port 3001"
3. Open your browser to: `http://localhost:3001/admin.html`
4. Login with: `admin` / `password`

### Alternative (Any OS):
```bash
npm install
npm run local
```

## 📝 Using the Admin Panel

### Adding a New Project:
1. Click "Add Project" button
2. Fill in the form:
   - **Project ID**: Unique identifier (e.g., "my-new-project")
   - **Titles**: English and French versions
   - **Descriptions**: English and French versions
   - **Status**: Planning, In Progress, or Completed
   - **Icon**: Font Awesome class (e.g., "fas fa-robot")
   - **Featured**: Check if you want it on the homepage
   - **Technologies**: Add tech tags one by one

3. Click "Save Project"

### Editing Projects:
- Click the edit (pencil) icon on any project card
- Modify the fields
- Click "Save Project"

### Deleting Projects:
- Click the delete (trash) icon on any project card
- Confirm deletion

## 🔄 Publishing Changes

After making changes in the admin panel:

1. **Stop the server** (Ctrl+C)
2. **Build the site**: `npm run build`
3. **Upload the `dist` folder** to your live website

## 🔧 Why Not VS Code Live Server?

VS Code Live Server only serves static files - it can't run the Node.js backend needed for:
- User authentication
- Database operations
- Project CRUD operations
- File writing

The Node.js server provides all the admin functionality while keeping it secure (local-only).

## 🛡️ Security

- Admin panel only works on `localhost:3001`
- Live website shows helpful message instead of login
- No admin functionality exposed on live site
- All data stored in local JSON files

## 📁 Project Structure

```
├── admin.html          # Admin panel interface
├── admin.js           # Admin panel logic
├── server.js          # Node.js backend
├── data/
│   ├── projects.json  # Your projects data
│   └── users.json     # Admin credentials
├── start-admin.bat    # Windows startup script
└── start-admin.sh     # Mac/Linux startup script
```

## 🆘 Troubleshooting

**Port 3001 already in use?**
- Kill other processes using port 3001
- Or change the port in `server.js`

**Can't access admin panel?**
- Make sure you're using `localhost:3001`, not `127.0.0.1:5173`
- Check that the server started successfully

**Changes not showing on live site?**
- Run `npm run build` after making changes
- Upload the entire `dist` folder to your live site