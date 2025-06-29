# 🚀 Install Node.js - Quick Guide

## The Problem
You're seeing this error because Node.js is not installed on your computer:
```
'npm' n'est pas reconnu en tant que commande interne
'node' n'est pas reconnu en tant que commande interne
```

## ✅ Solution: Install Node.js

### Step 1: Download Node.js
1. Go to: **https://nodejs.org/**
2. Click the **green "LTS" button** (recommended version)
3. Download will start automatically

### Step 2: Install Node.js
1. **Run the downloaded installer**
2. **Click "Next"** through all the steps
3. **Accept the license agreement**
4. **Keep all default settings**
5. **Click "Install"**
6. **Restart your computer** when installation is complete

### Step 3: Verify Installation
1. **Open Command Prompt** (Windows key + R, type `cmd`, press Enter)
2. **Type**: `node --version`
3. **Type**: `npm --version`
4. You should see version numbers (like `v18.17.0` and `9.6.7`)

### Step 4: Try Again
1. **Navigate to your project folder**
2. **Double-click** `start-admin.bat`
3. **Wait for**: "Server running on port 3001"
4. **Open browser**: http://localhost:3001/admin.html

## 🎯 What Node.js Does
- **npm**: Package manager (installs dependencies)
- **node**: JavaScript runtime (runs the server)
- **Required for**: Admin panel backend functionality

## 🔧 Alternative: Manual Commands
After installing Node.js, you can also use:
```bash
npm install
npm run local
```

## 🆘 Still Having Issues?

### Windows Users:
- Make sure to **restart Command Prompt** after installing Node.js
- Try **running as Administrator**

### Check PATH:
- Node.js should automatically add itself to your system PATH
- If not, you may need to add it manually

### Verify Installation Location:
- Default Windows location: `C:\Program Files\nodejs\`
- Should contain `node.exe` and `npm.cmd`

## 📱 Quick Test
Open Command Prompt and run:
```bash
where node
where npm
```
This should show the installation paths.

---

**Once Node.js is installed, your admin panel will work perfectly!** 🎉