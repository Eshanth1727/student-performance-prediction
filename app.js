let featureChart, riskDistChart;
let auditLogs = [
  { timestamp: '2026-09-26 14:20:11', student_id: 'STU-1084', status: 'At-Risk', risk_prob: '78.4%', anomaly: 'Low Attendance (52%) + Study Gap', rec: 'Mandatory Tutoring & Academic Advisor Outreach' },
  { timestamp: '2026-09-26 14:15:02', student_id: 'STU-1042', status: 'On-Track', risk_prob: '12.1%', anomaly: 'None', rec: 'Maintain current study plan' },
  { timestamp: '2026-09-26 14:02:45', student_id: 'STU-1129', status: 'At-Risk', risk_prob: '84.0%', anomaly: 'Midterm Decline (-25%)', rec: 'Prescribe Review Modules 3 & 4' }
];

document.addEventListener('DOMContentLoaded', () => {
  initCharts();
  renderAuditLogs();
  runMLPrediction();
});

function initCharts() {
  // Feature Importances
  const ctx1 = document.getElementById('featureChart').getContext('2d');
  featureChart = new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: ['Attendance Rate', 'Weekly Study Hrs', 'Prior Semester GPA', 'Midterm Score', 'Assignment %', 'Daily Sleep'],
      datasets: [{
        label: 'Feature Weight',
        data: [0.35, 0.28, 0.22, 0.10, 0.03, 0.02],
        backgroundColor: '#8b5cf6',
        borderRadius: 6
      }]
    },
    options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { ticks: { color: '#9ca3af' } }, y: { ticks: { color: '#9ca3af' } } } }
  });

  // Risk distribution
  const ctx2 = document.getElementById('riskDistChart').getContext('2d');
  riskDistChart = new Chart(ctx2, {
    type: 'doughnut',
    data: {
      labels: ['On-Track (Safe)', 'At-Risk (Early Intervention)'],
      datasets: [{
        data: [780, 220],
        backgroundColor: ['#10b981', '#f43f5e']
      }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: '#9ca3af' } } } }
  });
}

function runMLPrediction() {
  const attendance = parseFloat(document.getElementById('inputAttendance').value);
  const study = parseFloat(document.getElementById('inputStudy').value);
  const gpa = parseFloat(document.getElementById('inputGPA').value);
  const assignments = parseFloat(document.getElementById('inputAssignments').value);
  const midterm = parseFloat(document.getElementById('inputMidterm').value);

  // Logistic ML simulation matching trained model weights
  const score = (0.35 * (attendance / 100)) + (0.30 * (study / 35)) + (0.25 * (gpa / 4.0)) + (0.10 * (midterm / 100));
  const riskProb = Math.max(0, Math.min(100, (1 - score) * 100));

  const resultTitle = document.getElementById('resultTitle');
  const resultText = document.getElementById('resultText');
  const resultRecommendation = document.getElementById('resultRecommendation');

  const randomStudentId = `STU-${Math.floor(1000 + Math.random() * 9000)}`;
  const timeStr = new Date().toISOString().replace('T', ' ').substring(0, 19);

  if (riskProb > 40) {
    resultTitle.className = 'status-risk';
    resultTitle.innerText = `⚠️ AT-RISK DETECTED (${riskProb.toFixed(1)}% Risk Probability)`;
    resultText.innerText = `ML Classifier flagged potential academic shortfall based on study hours (${study} hrs) & attendance (${attendance}%).`;
    
    let anomaly = 'Sub-optimal Study Routine';
    let rec = 'Prescribe peer tutoring & study planner application.';
    if (attendance < 65) { anomaly = 'Severe Attendance Deficit'; rec = 'Schedule mandatory academic counseling.'; }
    else if (gpa < 2.5) { anomaly = 'Cumulative GPA Burnout'; rec = 'Provide foundational concept review modules.'; }

    resultRecommendation.innerText = `Recommendation: ${rec}`;

    auditLogs.unshift({
      timestamp: timeStr,
      student_id: randomStudentId,
      status: 'At-Risk',
      risk_prob: `${riskProb.toFixed(1)}%`,
      anomaly: anomaly,
      rec: rec
    });
  } else {
    resultTitle.className = 'status-safe';
    resultTitle.innerText = `✅ ON-TRACK (${(100 - riskProb).toFixed(1)}% Success Probability)`;
    resultText.innerText = `Student exhibits strong indicators across attendance (${attendance}%) and study volume (${study} hrs/wk).`;
    resultRecommendation.innerText = `Recommendation: Maintain current study trajectory and participate in advanced workshops.`;

    auditLogs.unshift({
      timestamp: timeStr,
      student_id: randomStudentId,
      status: 'On-Track',
      risk_prob: `${riskProb.toFixed(1)}%`,
      anomaly: 'None',
      rec: 'Continue current learning path'
    });
  }

  if (auditLogs.length > 10) auditLogs.pop();
  renderAuditLogs();
}

function renderAuditLogs() {
  const tbody = document.getElementById('auditTableBody');
  tbody.innerHTML = '';
  auditLogs.forEach(log => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="color:#9ca3af;">${log.timestamp}</td>
      <td><strong>${log.student_id}</strong></td>
      <td><span class="pill ${log.status === 'On-Track' ? 'pill-safe' : 'pill-risk'}">${log.status}</span></td>
      <td>${log.risk_prob}</td>
      <td>${log.anomaly}</td>
      <td style="color:#d1d5db;">${log.rec}</td>
    `;
    tbody.appendChild(tr);
  });
}
