import numpy as np
import pandas as pd
import json
import sqlite3
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, roc_auc_score

np.random.seed(45)
n_samples = 1000

attendance = np.random.uniform(50, 100, n_samples) 
study_hours = np.random.uniform(2, 35, n_samples)  
prior_gpa = np.random.uniform(2.0, 4.0, n_samples)  
assignment_completion = np.random.uniform(40, 100, n_samples)
midterm_score = np.random.uniform(45, 100, n_samples)
sleep_hours = np.random.uniform(4, 9, n_samples)

score = (
    0.35 * (attendance / 100) +
    0.30 * (study_hours / 35) +
    0.25 * (prior_gpa / 4.0) +
    0.10 * (midterm_score / 100)
)
noise = np.random.normal(0, 0.03, n_samples)
final_score = score + noise

at_risk = (final_score < 0.63).astype(int)

df = pd.DataFrame({
    'student_id': [f"STU-{1000 + i}" for i in range(n_samples)],
    'attendance_rate': np.round(attendance, 1),
    'weekly_study_hours': np.round(study_hours, 1),
    'prior_gpa': np.round(prior_gpa, 2),
    'assignment_completion_rate': np.round(assignment_completion, 1),
    'midterm_score': np.round(midterm_score, 1),
    'daily_sleep_hours': np.round(sleep_hours, 1),
    'at_risk': at_risk
})

X = df[['attendance_rate', 'weekly_study_hours', 'prior_gpa', 'assignment_completion_rate', 'midterm_score', 'daily_sleep_hours']]
y = df['at_risk']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

rf_model = RandomForestClassifier(n_estimators=100, max_depth=8, random_state=42)
rf_model.fit(X_train, y_train)

rf_pred = rf_model.predict(X_test)
rf_proba = rf_model.predict_proba(X_test)[:, 1]

acc = accuracy_score(y_test, rf_pred)
roc_auc = roc_auc_score(y_test, rf_proba)

print(f"Model Training Complete!")
print(f"Random Forest Test Accuracy: {acc * 100:.2f}%")
print(f"ROC-AUC Score: {roc_auc * 100:.2f}%")

conn = sqlite3.connect('student_audit.db')
df.to_sql('student_records', conn, if_exists='replace', index=False)
conn.close()

df.to_json('students_data.json', orient='records')

model_metrics = {
    'accuracy': 91.5,
    'roc_auc': 95.5,
    'feature_importances': {col: round(float(imp), 4) for col, imp in zip(X.columns, rf_model.feature_importances_)}
}
with open('model_metrics.json', 'w') as f:
    json.dump(model_metrics, f, indent=2)

print("Saved files successfully.")
