# 📋 What You Need to Run the Project

## ✅ Minimum Requirements (Simplest Setup)

To run this project, you only need **3 things**:

### 1. **Python 3.11 or Higher**
```bash
# Check if you have it:
python3 --version

# Should show: Python 3.11.x or higher
```

**Don't have it?** Download from: https://www.python.org/downloads/

### 2. **pip (Python Package Manager)**
```bash
# Check if you have it:
pip --version

# Usually comes with Python
```

### 3. **The Project Files**
All the files in this directory (you already have these!)

---

## 🚀 Quick Start (3 Commands)

```bash
# 1. Create virtual environment
python3 -m venv venv

# 2. Activate it and install dependencies
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r backend/requirements-simple.txt

# 3. Run the project
python backend/app.py
```

**That's it!** Your backend is running on http://localhost:5000

---

## 📦 What Gets Installed

When you run `pip install -r backend/requirements-simple.txt`, it installs:

1. **Flask** - Web framework
2. **Flask-SQLAlchemy** - Database ORM
3. **Flask-JWT-Extended** - Authentication
4. **Flask-CORS** - Cross-origin requests
5. **Werkzeug** - Security utilities
6. **python-dotenv** - Environment variables

**Total size:** ~50MB

**Database:** SQLite (no installation needed, file-based)

---

## 🎯 What You DON'T Need

❌ **Docker** - Optional (only for production deployment)
❌ **PostgreSQL** - Optional (SQLite works fine for development)
❌ **Node.js** - Not needed for backend (only for frontend later)
❌ **Any other database** - SQLite is included
❌ **Web server** - Flask has built-in development server

---

## 💻 System Requirements

**Operating System:**
- ✅ macOS (any recent version)
- ✅ Linux (Ubuntu, Debian, Fedora, etc.)
- ✅ Windows 10/11

**Hardware:**
- RAM: 2GB minimum (4GB recommended)
- Disk Space: 500MB
- Processor: Any modern CPU

---

## 🔧 Optional (For Advanced Setup)

### If You Want Docker:
- **Docker Desktop** - https://www.docker.com/products/docker-desktop/
- Includes Docker and Docker Compose
- Makes deployment easier

### If You Want PostgreSQL:
- **PostgreSQL 15** - https://www.postgresql.org/download/
- More production-ready than SQLite
- Requires additional configuration

---

## 📝 Step-by-Step Setup

### Step 1: Verify Python
```bash
python3 --version
# Should show 3.11 or higher
```

### Step 2: Create Virtual Environment
```bash
cd residential-rental-portal
python3 -m venv venv
```

### Step 3: Activate Virtual Environment
```bash
# On macOS/Linux:
source venv/bin/activate

# On Windows:
venv\Scripts\activate

# You should see (venv) in your terminal
```

### Step 4: Install Dependencies
```bash
pip install -r backend/requirements-simple.txt

# Wait for installation to complete (~1-2 minutes)
```

### Step 5: Run the Backend
```bash
python backend/app.py

# You should see:
# * Running on http://127.0.0.1:5000
```

### Step 6: Seed the Database (Optional but Recommended)
```bash
# In a NEW terminal window:
source venv/bin/activate
python backend/seed_data.py

# Creates sample data (users, towers, units, amenities)
```

### Step 7: Test It
```bash
# In another terminal:
curl http://localhost:5000

# Or open in browser: http://localhost:5000
```

---

## ✅ Verification Checklist

After setup, you should be able to:

- [ ] Run `python3 --version` (shows 3.11+)
- [ ] See `venv/` folder in project directory
- [ ] Run `python backend/app.py` without errors
- [ ] Access http://localhost:5000 in browser
- [ ] See API response with endpoints list
- [ ] Login with: admin@rental.com / admin123

---

## 🐛 Common Issues & Solutions

### Issue: "python3: command not found"
**Solution:** Install Python from python.org

### Issue: "pip: command not found"
**Solution:** 
```bash
python3 -m ensurepip --upgrade
```

### Issue: "Permission denied"
**Solution:**
```bash
chmod +x backend/app.py
```

### Issue: "Port 5000 already in use"
**Solution:**
```bash
# Find what's using it:
lsof -i :5000

# Kill it:
kill -9 <PID>
```

### Issue: "Module not found"
**Solution:**
```bash
# Make sure venv is activated (you should see (venv) in terminal)
source venv/bin/activate

# Reinstall:
pip install -r backend/requirements-simple.txt
```

---

## 📊 What You'll Have After Setup

```
residential-rental-portal/
├── venv/                    # Virtual environment (created)
│   ├── bin/
│   ├── lib/
│   └── ...
├── backend/
│   ├── instance/
│   │   └── rental_portal.db # Database file (created)
│   ├── routes/
│   ├── app.py
│   └── ...
└── ... (documentation)
```

---

## 🎯 Summary: What You Need

### To Run the Project:
1. ✅ Python 3.11+
2. ✅ pip
3. ✅ Project files

### To Install:
```bash
pip install -r backend/requirements-simple.txt
```

### To Run:
```bash
python backend/app.py
```

### To Test:
```bash
curl http://localhost:5000
```

---

## 🎉 That's All You Need!

**No complex setup, no database installation, no Docker required.**

Just Python and the project files. Everything else is handled automatically!

---

## 📞 Quick Help

**Can't install Python?**
→ Download from: https://www.python.org/downloads/

**Installation fails?**
→ Make sure you're in the project directory
→ Make sure virtual environment is activated

**Server won't start?**
→ Check if port 5000 is free
→ Check for error messages

**Need more help?**
→ Check PROJECT_README.md for detailed instructions
→ Check DEMO_RESULTS.md for working examples

---

**🚀 Ready to start? Run these 3 commands:**

```bash
python3 -m venv venv
source venv/bin/activate && pip install -r backend/requirements-simple.txt
python backend/app.py
```

**Your backend will be running on http://localhost:5000** 🎊
