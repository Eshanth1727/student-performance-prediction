# 🎓 Student Performance Prediction & Anomaly Engine

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FEshanth1727%2Fstudent-performance-prediction)
![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Scikit--Learn](https://img.shields.io/badge/Scikit--Learn-Machine%20Learning-F7931E?style=for-the-badge&logo=scikitlearn&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-REST%20API-000000?style=for-the-badge&logo=flask&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-Audit%20Log-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![Accuracy](https://img.shields.io/badge/Accuracy-92.5%25-brightgreen?style=for-the-badge)
![ROC-AUC](https://img.shields.io/badge/ROC--AUC-97.6%25-blueviolet?style=for-the-badge)
![Vercel](https://img.shields.io/badge/Vercel-Production%20Ready-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## 📌 Project Overview
The **Student Performance Prediction & Anomaly Engine** is an intelligent academic risk classification system designed to analyze multi-dimensional student academic data, identify at-risk students before final evaluations, detect behavioral and comprehension anomalies (e.g., burnout, attendance collapse, concept gaps), and generate personalized prescriptive intervention plans.

All inference events are audited and logged with SQLite database compatibility (`student_audit.db`).

---

## 🚀 Key Highlights & Machine Learning Performance
- **High Model Accuracy**: Achieved **92.5% Test Accuracy** (exceeding the 85% requirement baseline) and a **97.6% ROC-AUC Score** using Random Forest and Gradient Boosting algorithms.
- **Multidimensional Feature Analysis**: Evaluates lecture attendance rates, weekly study habits, prior semester GPAs, assignment completion percentages, midterm exam performance, and daily sleep routines.
- **Interactive What-If Risk Simulator**: Real-time slider simulator with animated risk probability gauge, explainability radar charts, and quick-test mentor presets (*Honor Scholar*, *Midterm Burnout*, *Chronic Absenteeism*, *Concept Gap*).
- **SQLite Audit Trail & Real-time Stream**: Logs all evaluation transactions with timestamped anomaly metadata, exportable as CSV or JSON.
- **Student Database Browser**: Searchable and filterable database interface with 1,000 verified student records (`students_data.json`).
- **Academic Diagnostic Report Generator**: One-click printable PDF diagnostic report for advisors and mentors.

---

## 🌐 Live Interactive Demo & Deployment

### Option 1: Instant 1-Click Deploy to Vercel
Click the button below to deploy this live demo directly to your Vercel account:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FEshanth1727%2Fstudent-performance-prediction)

#### Manual 30-Second Vercel Deployment:
1. Log in to [Vercel](https://vercel.com) using your GitHub account.
2. Click **"Add New..."** → **"Project"**.
3. Select your repository `student-performance-prediction` and click **"Import"**.
4. Leave all settings at default (`Framework Preset: Other` / Root directory `./`).
5. Click **"Deploy"**. Your live demo URL will be generated in under 15 seconds!

### Option 2: Enable GitHub Pages
1. Go to your GitHub repository: `https://github.com/Eshanth1727/student-performance-prediction`.
2. Click **Settings** → **Pages** (under the "Code and automation" section).
3. Under **Branch**, select `main` and folder `/ (root)`.
4. Click **Save**. Your GitHub Pages URL will go live at:
   - `https://eshanth1727.github.io/student-performance-prediction/`

---

## 🛠️ Tech Stack & Architecture
- **Machine Learning & Core**: Python 3.11, `scikit-learn`, `pandas`, `numpy`.
- **Backend & Database**: Flask REST API, SQLite (`student_audit.db`).
- **Frontend & Visualization**: HTML5, Vanilla CSS3 (Dark Glassmorphic UI), Modern JavaScript (ES6+), Chart.js (Radar, Bar, Doughnut, ROC Curve).
- **Deployment**: Vercel (`vercel.json`), GitHub Pages (`.nojekyll`).

---

## 📂 Repository Layout
```
student-performance-prediction/
│── index.html              # Interactive Predictor, Analytics & Cohort Dashboard
│── app.js                  # Frontend ML Simulation, Chart Engine & Data Browser
│── vercel.json             # Vercel Production Deployment & Header Config
│── package.json            # Node/npm Configuration & Deployment Scripts
│── train_model.py          # Scikit-Learn Model Training & SQLite Export
│── student_audit.db        # SQLite Database containing Student Audit Logs
│── students_data.json      # Processed Cohort Dataset (1,000 Records)
│── model_metrics.json      # Trained Model Evaluation Metrics (Accuracy, AUC, Importances)
│── .nojekyll               # GitHub Pages Static Bypass
└── README.md               # Project Documentation & Live Demo Setup
```

---

## 💻 Local Setup & Development
To run the live interactive demo locally:

```bash
# Clone the repository
git clone https://github.com/Eshanth1727/student-performance-prediction.git
cd student-performance-prediction

# Run using any static server or Python
python -m http.server 3000
# OR using Node
npx serve -l 3000
```
Open `http://localhost:3000` in your web browser.

---

## 👤 Author
- **Eshanth Donikena**
- GitHub: [@Eshanth1727](https://github.com/Eshanth1727)
