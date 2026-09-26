# 🎓 Student Performance Prediction & Anomaly Engine

![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Scikit--Learn](https://img.shields.io/badge/Scikit--Learn-Machine%20Learning-F7931E?style=for-the-badge&logo=scikitlearn&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-REST%20API-000000?style=for-the-badge&logo=flask&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-Audit%20Log-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![Accuracy](https://img.shields.io/badge/Accuracy-92.5%25-brightgreen?style=for-the-badge)

## 📌 Project Overview
Built a predictive machine learning system to analyze multi-dimensional student academic data, predict student academic outcome risks, and enable early intervention for at-risk students. Incorporates real-time anomaly detection (burnout, comprehension gaps) and logs all prediction events to an SQLite audit trail backend.

## 🚀 Key Highlights & Machine Learning Performance
- **High Model Accuracy**: Achieved **92.5% Test Accuracy** (exceeding the 85% requirement) with a **97.6% ROC-AUC Score** using Random Forest & Gradient Boosting Classifier algorithms.
- **Multi-dimensional Features**: Analyzed lecture attendance rates, weekly study habits, prior semester exam GPAs, assignment completion percentages, midterm scores, and daily sleep patterns.
- **Flask & SQLite Audit Logging**: Integrated database audit tracking (`student_audit.db`) for anomaly logging, tracking student risk probabilities over time.
- **Prescriptive Recommendations**: Automatically generates custom intervention plans (e.g., peer tutoring, counselor outreach, review modules) based on detected anomalies.

## 🛠️ Tech Stack
- **Machine Learning & Core**: Python, `scikit-learn`, `pandas`, `numpy`.
- **Backend & Database**: Flask, SQLite (`student_audit.db`).
- **Frontend Interface**: HTML5, CSS3, JavaScript, Chart.js.

## 🔗 Live Demo & Repository
- **Live Interactive Demo**: [https://eshanth1727.github.io/student-performance-prediction/](https://eshanth1727.github.io/student-performance-prediction/)
- **GitHub Repository**: [https://github.com/Eshanth1727/student-performance-prediction](https://github.com/Eshanth1727/student-performance-prediction)

## 📂 Repository Layout
```
student-performance-prediction/
│── index.html              # Interactive Predictor & Dashboard
│── app.js                  # Frontend ML Model Simulation & Chart Engine
│── train_model.py          # Scikit-Learn Model Training & SQLite Export
│── student_audit.db        # SQLite Database containing Student Audit Logs
│── students_data.json      # Processed Dataset JSON
│── model_metrics.json      # Trained Model Evaluation Metrics
└── README.md               # Project Documentation
```
