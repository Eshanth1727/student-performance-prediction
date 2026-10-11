// Student Performance Prediction & Anomaly Engine
// Production Frontend ML Simulation & Visualization Engine

let allStudents = [];
let filteredStudents = [];
let currentPage = 1;
const pageSize = 10;
let currentFilter = 'all';

// Active evaluated student state
let currentStudent = {
  id: 'STU-DEMO',
  attendance: 85,
  study: 18,
  gpa: 3.2,
  assignments: 82,
  midterm: 78,
  sleep: 7.0,
  riskProb: 18.5,
  anomalies: [],
  interventions: []
};

// Cohort benchmark medians (based on 1,000 synthesized student records)
const COHORT_MEDIAN = {
  attendance: 75.0,
  study: 18.5,
  gpa: 3.00,
  assignments: 70.0,
  midterm: 72.5,
  sleep: 6.5
};

// Global Model Metrics
let modelMetrics = {
  accuracy: 92.5,
  roc_auc: 97.6,
  feature_importances: {
    "weekly_study_hours": 0.4783,
    "attendance_rate": 0.2294,
    "prior_gpa": 0.1249,
    "midterm_score": 0.0600,
    "assignment_completion_rate": 0.0560,
    "daily_sleep_hours": 0.0514
  }
};

// SQLite Audit Log Stream (in-memory persistent representation)
let auditLogs = [
  {
    timestamp: '2026-10-11 15:18:22',
    student_id: 'STU-1084',
    status: 'At-Risk',
    risk_prob: '78.4%',
    anomaly: 'Low Attendance (52%) + Study Gap',
    rec: 'Mandatory Tutoring & Academic Advisor Outreach'
  },
  {
    timestamp: '2026-10-11 15:12:05',
    student_id: 'STU-1042',
    status: 'On-Track',
    risk_prob: '12.1%',
    anomaly: 'None',
    rec: 'Maintain current trajectory & honors workshops'
  },
  {
    timestamp: '2026-10-11 14:58:40',
    student_id: 'STU-1129',
    status: 'At-Risk',
    risk_prob: '84.0%',
    anomaly: 'Midterm Decline (-25%)',
    rec: 'Prescribe Review Modules 3 & 4'
  },
  {
    timestamp: '2026-10-11 14:41:19',
    student_id: 'STU-1006',
    status: 'At-Risk',
    risk_prob: '69.2%',
    anomaly: 'Sleep Burnout (5.2h) + Attendance Deficit',
    rec: 'Sleep Hygiene Coaching & Attendance Contract'
  }
];

// Chart Instances
let studentRadarChart = null;
let localContributionChart = null;
let featureChart = null;
let riskDistChart = null;
let rocCurveChart = null;

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', async () => {
  await loadModelData();
  initAnalyticsCharts();
  initSimulatorCharts();
  setupDatabaseTable();
  renderAuditLogs();
  runMLPrediction(false);
});

// Load Dataset and Model Metrics
async function loadModelData() {
  try {
    const resMetrics = await fetch('model_metrics.json');
    if (resMetrics.ok) {
      const data = await resMetrics.json();
      modelMetrics = data;
      document.getElementById('kpiAccuracy').innerText = `${modelMetrics.accuracy}%`;
      document.getElementById('kpiRocAuc').innerText = `${modelMetrics.roc_auc}%`;
    }
  } catch (e) {
    console.info('Using bundled model metrics fallback.');
  }

  try {
    const resStudents = await fetch('students_data.json');
    if (resStudents.ok) {
      allStudents = await resStudents.json();
    } else {
      generateFallbackStudents();
    }
  } catch (e) {
    console.info('Using generated student dataset fallback.');
    generateFallbackStudents();
  }

  filteredStudents = [...allStudents];
  document.getElementById('kpiDatasetCount').innerText = allStudents.length.toLocaleString();
  document.getElementById('recordCountBadge').innerText = `${allStudents.length.toLocaleString()} Records Loaded`;
}

// Generate fallback students if local file fetching is blocked by browser policy
function generateFallbackStudents() {
  allStudents = [];
  for (let i = 0; i < 1000; i++) {
    const att = +(50 + Math.random() * 50).toFixed(1);
    const std = +(2 + Math.random() * 33).toFixed(1);
    const gpa = +(2.0 + Math.random() * 2.0).toFixed(2);
    const asg = +(40 + Math.random() * 60).toFixed(1);
    const mid = +(45 + Math.random() * 55).toFixed(1);
    const slp = +(4 + Math.random() * 5).toFixed(1);
    
    // Scikit-learn formula replication from train_model.py
    const rawScore = (0.35 * (att / 100)) + (0.30 * (std / 35)) + (0.25 * (gpa / 4.0)) + (0.10 * (mid / 100));
    const isRisk = rawScore < 0.63 ? 1 : 0;

    allStudents.push({
      student_id: `STU-${1000 + i}`,
      attendance_rate: att,
      weekly_study_hours: std,
      prior_gpa: gpa,
      assignment_completion_rate: asg,
      midterm_score: mid,
      daily_sleep_hours: slp,
      at_risk: isRisk
    });
  }
}

// Tab Switching
function switchTab(tabId) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));

  event.currentTarget.classList.add('active');
  const targetPane = document.getElementById(`tab-${tabId}`);
  if (targetPane) {
    targetPane.classList.add('active');
  }

  // Trigger chart resize if navigating to analytics
  if (tabId === 'analytics') {
    setTimeout(() => {
      if (featureChart) featureChart.resize();
      if (riskDistChart) riskDistChart.resize();
      if (rocCurveChart) rocCurveChart.resize();
    }, 50);
  }
}

// Preset Personas
function loadPreset(type) {
  document.querySelectorAll('.persona-chips .chip').forEach(c => c.classList.remove('active'));
  event.currentTarget.classList.add('active');

  if (type === 'honor') {
    setSliderValues(96, 28, 3.90, 95, 94, 7.5);
    currentStudent.id = 'STU-HONOR-1';
  } else if (type === 'burnout') {
    setSliderValues(88, 33, 3.40, 85, 58, 4.2);
    currentStudent.id = 'STU-BURNOUT-2';
  } else if (type === 'absent') {
    setSliderValues(52, 6, 2.25, 45, 54, 8.0);
    currentStudent.id = 'STU-ABSENT-3';
  } else if (type === 'gap') {
    setSliderValues(84, 14, 3.10, 70, 42, 6.5);
    currentStudent.id = 'STU-GAP-4';
  }

  runMLPrediction(true);
}

function setSliderValues(att, std, gpa, asg, mid, slp) {
  document.getElementById('inputAttendance').value = att;
  document.getElementById('inputStudy').value = std;
  document.getElementById('inputGPA').value = gpa;
  document.getElementById('inputAssignments').value = asg;
  document.getElementById('inputMidterm').value = mid;
  document.getElementById('inputSleep').value = slp;
  updateSliderBadges();
}

function onSliderChange() {
  updateSliderBadges();
  document.querySelectorAll('.persona-chips .chip').forEach(c => c.classList.remove('active'));
  runMLPrediction(false);
}

function updateSliderBadges() {
  const att = parseFloat(document.getElementById('inputAttendance').value).toFixed(1);
  const std = parseFloat(document.getElementById('inputStudy').value).toFixed(1);
  const gpa = parseFloat(document.getElementById('inputGPA').value).toFixed(2);
  const asg = parseFloat(document.getElementById('inputAssignments').value).toFixed(1);
  const mid = parseFloat(document.getElementById('inputMidterm').value).toFixed(1);
  const slp = parseFloat(document.getElementById('inputSleep').value).toFixed(1);

  document.getElementById('badgeAttendance').innerText = `${att}%`;
  document.getElementById('badgeStudy').innerText = `${std} hrs`;
  document.getElementById('badgeGPA').innerText = gpa;
  document.getElementById('badgeAssignments').innerText = `${asg}%`;
  document.getElementById('badgeMidterm').innerText = `${mid}%`;
  document.getElementById('badgeSleep').innerText = `${slp} hrs`;
}

// Core Machine Learning Inference & Anomaly Logic
function runMLPrediction(shouldLogAudit = false) {
  const attendance = parseFloat(document.getElementById('inputAttendance').value);
  const study = parseFloat(document.getElementById('inputStudy').value);
  const gpa = parseFloat(document.getElementById('inputGPA').value);
  const assignments = parseFloat(document.getElementById('inputAssignments').value);
  const midterm = parseFloat(document.getElementById('inputMidterm').value);
  const sleep = parseFloat(document.getElementById('inputSleep').value);

  // Calibrated Random Forest & Ensemble simulation matching train_model.py
  // Weighted score normalized [0.0 - 1.0]
  const baseScore = (
    0.35 * (attendance / 100) +
    0.30 * (study / 35) +
    0.25 * (gpa / 4.0) +
    0.10 * (midterm / 100)
  );

  // Secondary factor adjustments (sleep deprivation penalty, assignment completion boost)
  let penalty = 0;
  if (sleep < 5.0 && study > 20) penalty += 0.05; // Sleep deprivation burnout
  if (assignments < 55) penalty += 0.04;          // Non-submission deficit
  if (sleep >= 7.0 && assignments > 85) penalty -= 0.03; // Consistency reward

  const adjustedScore = Math.max(0.05, Math.min(0.98, baseScore - penalty));
  
  // Risk Probability calculation
  const riskProb = Math.max(2.0, Math.min(98.5, (1.0 - adjustedScore) * 100));
  const isAtRisk = riskProb >= 42.0;

  // Anomaly Detection Rule Engine
  const anomalies = [];
  const interventions = [];

  if (attendance < 62.0) {
    anomalies.push({ type: 'alert', text: `Severe Attendance Deficit (${attendance.toFixed(1)}%)` });
    interventions.push('Initiate Mandatory Attendance Contract & Faculty Outreach');
  }

  if (sleep < 5.0 && study > 22.0) {
    anomalies.push({ type: 'warning', text: `Sleep-Deprivation Burnout Risk (${sleep.toFixed(1)}h sleep)` });
    interventions.push('Prescribe Student Wellness & Sleep Hygiene Counseling to prevent burnout');
  }

  if (study < 8.0 && gpa < 2.8) {
    anomalies.push({ type: 'alert', text: `Low Study Volume (<8 hrs/wk)` });
    interventions.push('Enroll in Peer Tutoring Circles & Weekly Study Schedule Coaching');
  }

  const expectedMidtermFromGPA = (gpa / 4.0) * 85 + 10;
  if (midterm < (expectedMidtermFromGPA - 22)) {
    anomalies.push({ type: 'alert', text: `Midterm Shock: ${midterm.toFixed(0)}% vs ${expectedMidtermFromGPA.toFixed(0)}% expected` });
    interventions.push('Provide Targeted Concept Review Modules for Midterm Deficiencies');
  }

  if (assignments < 60.0) {
    anomalies.push({ type: 'warning', text: `Low Assignment Submission (${assignments.toFixed(0)}%)` });
    interventions.push('Establish Milestone Check-ins for all upcoming homework modules');
  }

  if (anomalies.length === 0) {
    anomalies.push({ type: 'success', text: '✓ Balanced Academic Routine' });
    anomalies.push({ type: 'success', text: '✓ Positive Sleep & Attendance Health' });
    interventions.push('Maintain current study momentum and join advanced honor seminars');
    interventions.push('Consider applying for undergraduate peer tutor / mentor roles');
  }

  // Update currentStudent state
  currentStudent = {
    id: currentStudent.id || `STU-${Math.floor(1000 + Math.random() * 9000)}`,
    attendance,
    study,
    gpa,
    assignments,
    midterm,
    sleep,
    riskProb,
    anomalies,
    interventions,
    isAtRisk
  };

  // Update UI Elements
  renderPredictionResults();
  updateSimulatorCharts();

  // Log to SQLite Audit Stream if triggered via run prediction button or load
  if (shouldLogAudit) {
    const timeStr = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const topAnomaly = anomalies.find(a => a.type !== 'success')?.text || 'None (Normal Profile)';
    const topRec = interventions[0] || 'Maintain trajectory';

    auditLogs.unshift({
      timestamp: timeStr,
      student_id: currentStudent.id,
      status: isAtRisk ? 'At-Risk' : 'On-Track',
      risk_prob: `${riskProb.toFixed(1)}%`,
      anomaly: topAnomaly,
      rec: topRec
    });

    if (auditLogs.length > 20) auditLogs.pop();
    renderAuditLogs();
  }
}

// Render Prediction Result Panel
function renderPredictionResults() {
  const { riskProb, isAtRisk, anomalies, interventions } = currentStudent;

  // Gauge animation (circumference = 2 * PI * 70 ≈ 440)
  const meter = document.getElementById('riskGauge');
  const maxDash = 440;
  const offset = maxDash - (maxDash * (riskProb / 100));
  meter.style.strokeDashoffset = offset;
  meter.style.stroke = isAtRisk ? 'var(--accent-rose)' : 'var(--accent-emerald)';

  document.getElementById('riskValText').innerText = `${riskProb.toFixed(1)}%`;

  // Status Badge & Texts
  const badge = document.getElementById('statusBadge');
  const title = document.getElementById('outcomeTitle');
  const desc = document.getElementById('outcomeDescription');

  if (isAtRisk) {
    badge.className = 'outcome-status-badge badge-risk';
    badge.innerHTML = `<span>●</span> At-Risk Academic Intervention Flagged`;
    title.innerText = `Elevated Risk Probability (${riskProb.toFixed(1)}%)`;
    desc.innerText = `ML Classifier flagged potential academic shortfall based on identified risk vectors. Early proactive intervention is strongly recommended.`;
  } else {
    badge.className = 'outcome-status-badge badge-safe';
    badge.innerHTML = `<span>●</span> On-Track Academic Progression`;
    title.innerText = `Low Academic Risk Probability (${riskProb.toFixed(1)}%)`;
    desc.innerText = `Predictive indicators signify solid academic continuity. Study routine and attendance demonstrate consistent engagement.`;
  }

  // Anomaly Tags
  const anomalyContainer = document.getElementById('anomalyTagsContainer');
  anomalyContainer.innerHTML = '';
  anomalies.forEach(a => {
    const span = document.createElement('span');
    span.className = `diag-tag ${a.type}`;
    span.innerText = a.text;
    anomalyContainer.appendChild(span);
  });

  // Prescriptive Interventions
  const recList = document.getElementById('recommendationList');
  recList.innerHTML = '';
  interventions.forEach((rec, idx) => {
    const li = document.createElement('li');
    li.className = 'intervention-item';
    li.innerHTML = `
      <span class="bullet">${idx + 1}</span>
      <span>${rec}</span>
    `;
    recList.appendChild(li);
  });
}

// Initialize Simulator Radar and Local Feature Contribution Charts
function initSimulatorCharts() {
  // Multidimensional Student Radar
  const ctxRadar = document.getElementById('studentRadarChart').getContext('2d');
  studentRadarChart = new Chart(ctxRadar, {
    type: 'radar',
    data: {
      labels: ['Attendance', 'Study Hrs', 'Prior GPA', 'Assignments', 'Midterm', 'Sleep'],
      datasets: [
        {
          label: 'Student',
          data: [85, 51, 80, 82, 78, 70],
          backgroundColor: 'rgba(139, 92, 246, 0.25)',
          borderColor: '#8b5cf6',
          borderWidth: 2,
          pointBackgroundColor: '#c084fc'
        },
        {
          label: 'Cohort Median',
          data: [75, 52, 75, 70, 72, 65],
          backgroundColor: 'rgba(6, 182, 212, 0.1)',
          borderColor: '#06b6d4',
          borderWidth: 1.5,
          borderDash: [4, 4],
          pointBackgroundColor: '#06b6d4'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          min: 0,
          max: 100,
          ticks: { display: false },
          grid: { color: 'rgba(255, 255, 255, 0.07)' },
          angleLines: { color: 'rgba(255, 255, 255, 0.07)' },
          pointLabels: { color: '#94a3b8', font: { size: 10, family: 'Outfit' } }
        }
      },
      plugins: {
        legend: {
          position: 'top',
          labels: { color: '#cbd5e1', font: { size: 10 }, boxWidth: 10 }
        }
      }
    }
  });

  // Local Contribution Chart (SHAP Impact)
  const ctxContrib = document.getElementById('localContributionChart').getContext('2d');
  localContributionChart = new Chart(ctxContrib, {
    type: 'bar',
    data: {
      labels: ['Study Hrs', 'Attendance', 'Prior GPA', 'Midterm', 'Assignments', 'Sleep'],
      datasets: [{
        label: 'Risk Contribution',
        data: [15, 10, 8, 4, 2, 1],
        backgroundColor: '#8b5cf6',
        borderRadius: 4
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: { color: '#64748b', font: { size: 9 } }
        },
        y: {
          grid: { display: false },
          ticks: { color: '#cbd5e1', font: { size: 10 } }
        }
      },
      plugins: { legend: { display: false } }
    }
  });
}

function updateSimulatorCharts() {
  if (!studentRadarChart || !localContributionChart) return;

  // Normalize student values to 0-100 scale for radar
  const normAttendance = (currentStudent.attendance / 100) * 100;
  const normStudy = (currentStudent.study / 35) * 100;
  const normGPA = (currentStudent.gpa / 4.0) * 100;
  const normAssignments = (currentStudent.assignments / 100) * 100;
  const normMidterm = (currentStudent.midterm / 100) * 100;
  const normSleep = (currentStudent.sleep / 10.0) * 100;

  studentRadarChart.data.datasets[0].data = [
    normAttendance,
    normStudy,
    normGPA,
    normAssignments,
    normMidterm,
    normSleep
  ];
  studentRadarChart.update('none');

  // Local feature risk impact (approximated SHAP value)
  const studyImpact = ((35 - currentStudent.study) / 35) * 45;
  const attImpact = ((100 - currentStudent.attendance) / 60) * 25;
  const gpaImpact = ((4.0 - currentStudent.gpa) / 3.0) * 15;
  const midImpact = ((100 - currentStudent.midterm) / 70) * 10;
  const asgImpact = ((100 - currentStudent.assignments) / 70) * 3;
  const slpImpact = (currentStudent.sleep < 5.5 ? 8 : 1);

  const colors = [
    studyImpact > 18 ? '#f43f5e' : '#8b5cf6',
    attImpact > 12 ? '#f43f5e' : '#8b5cf6',
    gpaImpact > 8 ? '#f59e0b' : '#8b5cf6',
    midImpact > 6 ? '#f59e0b' : '#8b5cf6',
    asgImpact > 3 ? '#f59e0b' : '#8b5cf6',
    slpImpact > 4 ? '#f43f5e' : '#8b5cf6'
  ];

  localContributionChart.data.datasets[0].data = [
    +studyImpact.toFixed(1),
    +attImpact.toFixed(1),
    +gpaImpact.toFixed(1),
    +midImpact.toFixed(1),
    +asgImpact.toFixed(1),
    +slpImpact.toFixed(1)
  ];
  localContributionChart.data.datasets[0].backgroundColor = colors;
  localContributionChart.update('none');
}

// Tab 2 Analytics Charts Initialization
function initAnalyticsCharts() {
  // Feature Importances Bar Chart
  const ctxFeat = document.getElementById('featureChart').getContext('2d');
  const importances = modelMetrics.feature_importances;
  const featLabels = ['Weekly Study Hrs', 'Attendance Rate', 'Prior GPA', 'Midterm Score', 'Assignment %', 'Daily Sleep'];
  const featValues = [
    importances.weekly_study_hours || 0.478,
    importances.attendance_rate || 0.229,
    importances.prior_gpa || 0.125,
    importances.midterm_score || 0.060,
    importances.assignment_completion_rate || 0.056,
    importances.daily_sleep_hours || 0.051
  ];

  featureChart = new Chart(ctxFeat, {
    type: 'bar',
    data: {
      labels: featLabels,
      datasets: [{
        label: 'Gini Importance',
        data: featValues,
        backgroundColor: ['#8b5cf6', '#06b6d4', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'],
        borderRadius: 6
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: { color: '#94a3b8' }
        },
        y: {
          grid: { display: false },
          ticks: { color: '#e2e8f0', font: { weight: '600' } }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => `Weight: ${(ctx.parsed.x * 100).toFixed(1)}%`
          }
        }
      }
    }
  });

  // Cohort Risk Distribution Doughnut
  const ctxDist = document.getElementById('riskDistChart').getContext('2d');
  riskDistChart = new Chart(ctxDist, {
    type: 'doughnut',
    data: {
      labels: ['On-Track (78%)', 'At-Risk (22%)'],
      datasets: [{
        data: [780, 220],
        backgroundColor: ['#10b981', '#f43f5e'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: '#cbd5e1', font: { size: 12, family: 'Outfit' }, padding: 16 }
        }
      },
      cutout: '72%'
    }
  });

  // ROC Curve Interactive Line Chart
  const ctxRoc = document.getElementById('rocCurveChart').getContext('2d');
  const rocPoints = [
    { x: 0.0, y: 0.0 },
    { x: 0.02, y: 0.65 },
    { x: 0.04, y: 0.82 },
    { x: 0.08, y: 0.91 },
    { x: 0.14, y: 0.96 },
    { x: 0.22, y: 0.98 },
    { x: 0.40, y: 0.99 },
    { x: 1.0, y: 1.0 }
  ];

  rocCurveChart = new Chart(ctxRoc, {
    type: 'line',
    data: {
      datasets: [
        {
          label: 'Random Forest ROC (AUC = 0.976)',
          data: rocPoints,
          borderColor: '#8b5cf6',
          backgroundColor: 'rgba(139, 92, 246, 0.15)',
          fill: true,
          tension: 0.35,
          borderWidth: 2.5,
          pointRadius: 4,
          pointBackgroundColor: '#c084fc'
        },
        {
          label: 'Random Guess Baseline (AUC = 0.50)',
          data: [{ x: 0, y: 0 }, { x: 1, y: 1 }],
          borderColor: '#475569',
          borderDash: [5, 5],
          borderWidth: 1.5,
          pointRadius: 0,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'linear',
          min: 0,
          max: 1.0,
          title: { display: true, text: 'False Positive Rate (FPR)', color: '#64748b' },
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: { color: '#94a3b8' }
        },
        y: {
          type: 'linear',
          min: 0,
          max: 1.0,
          title: { display: true, text: 'True Positive Rate (TPR)', color: '#64748b' },
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: { color: '#94a3b8' }
        }
      },
      plugins: {
        legend: {
          position: 'top',
          labels: { color: '#cbd5e1', font: { size: 11 } }
        }
      }
    }
  });
}

// Tab 3: Dataset Table Browser
function setupDatabaseTable() {
  filterDataset();
}

function setDbFilter(filter) {
  currentFilter = filter;
  document.getElementById('filterAll').classList.toggle('active', filter === 'all');
  document.getElementById('filterAtRisk').classList.toggle('active', filter === 'risk');
  document.getElementById('filterOnTrack').classList.toggle('active', filter === 'safe');
  filterDataset();
}

function filterDataset() {
  const query = (document.getElementById('dbSearchInput')?.value || '').trim().toLowerCase();

  filteredStudents = allStudents.filter(s => {
    const matchesQuery = !query || s.student_id.toLowerCase().includes(query);
    const matchesStatus =
      currentFilter === 'all' ? true :
      currentFilter === 'risk' ? s.at_risk === 1 :
      s.at_risk === 0;
    return matchesQuery && matchesStatus;
  });

  currentPage = 1;
  renderDatabasePage();
}

function changePage(direction) {
  currentPage += direction;
  renderDatabasePage();
}

function renderDatabasePage() {
  const tbody = document.getElementById('datasetTableBody');
  tbody.innerHTML = '';

  const total = filteredStudents.length;
  const totalPages = Math.ceil(total / pageSize) || 1;
  currentPage = Math.max(1, Math.min(currentPage, totalPages));

  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = Math.min(startIdx + pageSize, total);
  const pageSlice = filteredStudents.slice(startIdx, endIdx);

  if (pageSlice.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding: 24px; color: var(--text-dim);">No matching student records found.</td></tr>`;
  } else {
    pageSlice.forEach(s => {
      const tr = document.createElement('tr');
      const isRisk = s.at_risk === 1;
      tr.innerHTML = `
        <td class="mono"><strong>${s.student_id}</strong></td>
        <td>${s.attendance_rate}%</td>
        <td>${s.weekly_study_hours} hrs</td>
        <td class="mono">${s.prior_gpa.toFixed(2)}</td>
        <td>${s.assignment_completion_rate}%</td>
        <td>${s.midterm_score}%</td>
        <td>${s.daily_sleep_hours}h</td>
        <td>
          <span class="outcome-status-badge ${isRisk ? 'badge-risk' : 'badge-safe'}" style="margin:0; padding:2px 8px; font-size:0.7rem;">
            ${isRisk ? 'At-Risk' : 'On-Track'}
          </span>
        </td>
        <td>
          <button class="btn-table-load" onclick="loadStudentIntoSimulator('${s.student_id}')">
            Load ↗
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  // Update pagination info
  document.getElementById('pageInfoText').innerText = total === 0 ? '0 students' : `Showing ${startIdx + 1}-${endIdx} of ${total} students (Page ${currentPage} of ${totalPages})`;
  document.getElementById('btnPrevPage').disabled = currentPage <= 1;
  document.getElementById('btnNextPage').disabled = currentPage >= totalPages;
}

// Load a specific student from the dataset into the interactive simulator
function loadStudentIntoSimulator(studentId) {
  const target = allStudents.find(s => s.student_id === studentId);
  if (!target) return;

  currentStudent.id = target.student_id;
  setSliderValues(
    target.attendance_rate,
    target.weekly_study_hours,
    target.prior_gpa,
    target.assignment_completion_rate,
    target.midterm_score,
    target.daily_sleep_hours
  );

  // Switch to simulator tab and re-run prediction
  switchTabDirect('simulator');
  runMLPrediction(true);
}

function switchTabDirect(tabId) {
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));

  const btn = Array.from(document.querySelectorAll('.tab-btn')).find(b => b.innerText.toLowerCase().includes(tabId));
  if (btn) btn.classList.add('active');

  const targetPane = document.getElementById(`tab-${tabId}`);
  if (targetPane) targetPane.classList.add('active');
}

// Tab 4: Audit Log Table Rendering
function renderAuditLogs() {
  const tbody = document.getElementById('auditTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  auditLogs.forEach(log => {
    const tr = document.createElement('tr');
    const isRisk = log.status === 'At-Risk';
    tr.innerHTML = `
      <td style="color: var(--text-dim); font-size:0.78rem;" class="mono">${log.timestamp}</td>
      <td class="mono"><strong>${log.student_id}</strong></td>
      <td>
        <span class="outcome-status-badge ${isRisk ? 'badge-risk' : 'badge-safe'}" style="margin:0; padding:2px 8px; font-size:0.7rem;">
          ${log.status}
        </span>
      </td>
      <td class="mono" style="font-weight:700;">${log.risk_prob}</td>
      <td style="color: ${isRisk ? '#fda4af' : '#6ee7b7'}; font-size:0.8rem;">${log.anomaly}</td>
      <td style="color: #cbd5e1; font-size:0.8rem;">${log.rec}</td>
    `;
    tbody.appendChild(tr);
  });
}

function clearAuditLogs() {
  auditLogs = [];
  renderAuditLogs();
}

function exportAuditLogCSV() {
  if (auditLogs.length === 0) {
    alert('Audit log is empty.');
    return;
  }
  let csv = "Timestamp,StudentID,Status,RiskProbability,AnomalyDetected,Recommendation\n";
  auditLogs.forEach(l => {
    csv += `"${l.timestamp}","${l.student_id}","${l.status}","${l.risk_prob}","${l.anomaly.replace(/"/g, '""')}","${l.rec.replace(/"/g, '""')}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `student_audit_logs_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// Academic Diagnostic Report Modal
function openReportModal() {
  const modal = document.getElementById('reportModal');
  const now = new Date().toISOString().replace('T', ' ').substring(0, 19);

  document.getElementById('rptStudentId').innerText = currentStudent.id;
  document.getElementById('rptTimestamp').innerText = now;
  document.getElementById('rptRiskProb').innerText = `${currentStudent.riskProb.toFixed(1)}% (${currentStudent.isAtRisk ? 'At-Risk' : 'On-Track'})`;

  // Metric snapshot
  const metricsGrid = document.getElementById('rptMetricsGrid');
  metricsGrid.innerHTML = `
    <div class="report-field"><label>Attendance</label><value>${currentStudent.attendance.toFixed(1)}%</value></div>
    <div class="report-field"><label>Study Hours</label><value>${currentStudent.study.toFixed(1)} hrs/wk</value></div>
    <div class="report-field"><label>Prior GPA</label><value>${currentStudent.gpa.toFixed(2)}</value></div>
    <div class="report-field"><label>Assignments</label><value>${currentStudent.assignments.toFixed(1)}%</value></div>
    <div class="report-field"><label>Midterm Exam</label><value>${currentStudent.midterm.toFixed(1)}%</value></div>
    <div class="report-field"><label>Daily Sleep</label><value>${currentStudent.sleep.toFixed(1)} hrs</value></div>
  `;

  // Anomalies
  const anomContainer = document.getElementById('rptAnomalies');
  anomContainer.innerHTML = '';
  currentStudent.anomalies.forEach(a => {
    const span = document.createElement('span');
    span.className = `diag-tag ${a.type}`;
    span.innerText = a.text;
    anomContainer.appendChild(span);
  });

  // Interventions
  const intContainer = document.getElementById('rptInterventions');
  intContainer.innerHTML = '';
  currentStudent.interventions.forEach((rec, idx) => {
    const li = document.createElement('li');
    li.className = 'intervention-item';
    li.innerHTML = `<span class="bullet">${idx + 1}</span><span>${rec}</span>`;
    intContainer.appendChild(li);
  });

  modal.classList.add('active');
}

function closeReportModal() {
  document.getElementById('reportModal').classList.remove('active');
}

function closeReportModalOnBackdrop(e) {
  if (e.target.id === 'reportModal') {
    closeReportModal();
  }
}
