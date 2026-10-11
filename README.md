# 🏛️ CampusScore AI • College Student Future Score & Early Warning System

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FEshanth1727%2Fstudent-performance-prediction)
![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Machine Learning](https://img.shields.io/badge/ML-Regression%20%26%20Classification-F7931E?style=for-the-badge)
![College ERP](https://img.shields.io/badge/Portal-University%20Faculty%20ERP-003B57?style=for-the-badge)
![Vercel](https://img.shields.io/badge/Vercel-Live%20Deploy-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## 📌 Project Overview
**CampusScore AI** is a practical academic intelligence portal designed for college faculty advisors, mentors, and Heads of Departments (HOD). It solves the critical institutional challenge of identifying **weak students and prospective backlogs** early in the semester, allowing faculty to prescribe targeted remedial coaching before final exams occur.

Instead of abstract probabilities, the engine takes concrete academic data (Past CGPA, Attendance %, Internal Assessment Midterm marks, and Lab scores) and calculates:
1. **Predicted Future Final Exam Score (out of 100)**.
2. **Projected Semester CGPA**.
3. **Exact Passing Target Score** needed in the Semester End Exam (SEE) to clear without backlogs.
4. **University Detention Risk Alert** for students falling below the mandatory **75% attendance threshold**.

---

## 🚀 Key Faculty & Institutional Features
- **🔮 Individual Student Future Score Predictor**:
  - Enter Roll Number, Student Name, Attendance Rate %, Past CGPA, IA-1 marks (/30), IA-2 marks (/30), Lab %, and Self-Study hours.
  - Generates instant circular score gauge, grade category (Distinction, First Class, Second Class, Backlog Risk), and diagnostic breakdown.
  - Computes minimum exam marks required in finals (e.g., *"Needs at least 45/100 in SEE to clear subject"*).
- **👥 Batch Class Roster & Weak Student Finder**:
  - Complete Section A class roster (45 verified students).
  - One-click filters: **🚨 Weak Students Only (Predicted < 45)**, **⚠️ Attendance Shortage (< 75%)**, **🌟 Distinction (≥ 75)**.
  - 1-Click **"Export Weak Students List (CSV)"** for departmental meetings.
- **✉️ Official University Remedial & Parent Warning Notice**:
  - Built-in printable formal academic warning notice addressed to parents and student detailing the attendance shortage and mandatory remedial classes (`window.print()` / PDF support).
- **📊 Department Performance Analytics**:
  - Predicted grade distribution across the class.
  - Scatter analysis of Attendance vs Final Marks correlation.

---

## 🎯 Quick Mentor Demonstration Presets
Use the built-in preset chips to demonstrate the system to your mentor in 10 seconds:
1. **🚨 Critical Weak Student**: (Roll: `22CS108` - Karan Verma) | Attendance: 68%, IA-1: 13, IA-2: 10 $\rightarrow$ Predicted Final: **41.8 / 100** (At-Risk / Backlog Danger).
2. **🟡 Borderline Pass**: (Roll: `22CS115` - Rahul Sharma) | Attendance: 76%, IA-1: 14.5, IA-2: 14 $\rightarrow$ Predicted Final: **49.5 / 100** (Pass Class).
3. **⚠️ Attendance Shortage**: (Roll: `22CS122` - Sneha Reddy) | Good internal marks (22 & 20), but **58% Attendance** $\rightarrow$ Triggers University Detention Warning!
4. **🌟 Distinction Scholar**: (Roll: `22CS101` - Ananya Iyer) | Attendance: 94%, IA-1: 28.5, IA-2: 29 $\rightarrow$ Predicted Final: **92.4 / 100** (Distinction A+).

---

## 🛠️ Mathematical & Machine Learning Formulation
The predicted final exam score is formulated using multi-variable regression with university grading adjustments:

$$\text{Final Marks} = 0.35 \times \left(\frac{\text{CGPA}}{10} \times 100\right) + 0.40 \times \left(\frac{\text{IA}_1 + \text{IA}_2}{60} \times 100\right) + 0.15 \times \text{Labs} + 0.10 \times \text{Attendance} - P_{\text{att}} - P_{\text{drop}}$$

Where:
- $P_{\text{att}} = \max(0, (75 - \text{Attendance}) \times 0.45)$ penalizes attendance shortage below university minimum.
- $P_{\text{drop}} = 3.5$ applies if Internal 2 dropped by more than 20% compared to Internal 1 (indicating subject difficulty).

---

## 🌐 Instant Live Deployment on Vercel
1. Open **[vercel.com/new](https://vercel.com/new)** and click **Import** next to `student-performance-prediction`.
2. Leave all settings default (`Framework: Other`, Root: `./`).
3. Click **Deploy**. Your live university portal is live in ~10 seconds!

---

## 👤 Author
- **Eshanth Donikena**
- GitHub: [@Eshanth1727](https://github.com/Eshanth1727)
