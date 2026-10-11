// CampusScore AI • College Student Future Score & Early Warning System
// Faculty Portal Academic Engine

// 45 Verified College Students Roster (CSE 5th Semester - Section A)
const CLASS_ROSTER = [
  { roll: "22CS101", name: "Ananya Iyer", att: 94.0, gpa: 9.10, ia1: 28.5, ia2: 29.0, labs: 95, study: 20 },
  { roll: "22CS102", name: "Aarav Patel", att: 88.5, gpa: 8.40, ia1: 25.0, ia2: 26.0, labs: 88, study: 16 },
  { roll: "22CS103", name: "Aditya Kulkarni", att: 78.0, gpa: 6.90, ia1: 18.0, ia2: 17.5, labs: 75, study: 10 },
  { roll: "22CS104", name: "Pooja Sharma", att: 82.0, gpa: 7.30, ia1: 20.0, ia2: 21.0, labs: 80, study: 12 },
  { roll: "22CS105", name: "Rohan Nair", att: 72.0, gpa: 6.10, ia1: 15.0, ia2: 12.0, labs: 68, study: 8 },
  { roll: "22CS106", name: "Meera Menon", att: 91.0, gpa: 8.80, ia1: 26.0, ia2: 27.0, labs: 92, study: 18 },
  { roll: "22CS107", name: "Siddharth Das", att: 64.0, gpa: 5.40, ia1: 11.0, ia2: 9.5, labs: 58, study: 5 },
  { roll: "22CS108", name: "Karan Verma", att: 68.0, gpa: 5.80, ia1: 13.0, ia2: 10.0, labs: 62, study: 6 },
  { roll: "22CS109", name: "Neha Chawla", att: 85.0, gpa: 7.60, ia1: 22.0, ia2: 21.5, labs: 84, study: 14 },
  { roll: "22CS110", name: "Vikram Singh", att: 59.0, gpa: 5.10, ia1: 10.0, ia2: 8.0, labs: 52, study: 4 },
  { roll: "22CS111", name: "Deepak Choudhary", att: 79.5, gpa: 7.10, ia1: 19.0, ia2: 18.5, labs: 78, study: 11 },
  { roll: "22CS112", name: "Kavya Swaminathan", att: 96.0, gpa: 9.40, ia1: 29.0, ia2: 29.5, labs: 98, study: 22 },
  { roll: "22CS113", name: "Manish Gupta", att: 61.5, gpa: 5.60, ia1: 12.0, ia2: 9.0, labs: 60, study: 5 },
  { roll: "22CS114", name: "Rhea Sen", att: 83.0, gpa: 7.50, ia1: 21.5, ia2: 22.0, labs: 82, study: 13 },
  { roll: "22CS115", name: "Rahul Sharma", att: 76.0, gpa: 6.20, ia1: 14.5, ia2: 14.0, labs: 70, study: 8 },
  { roll: "22CS116", name: "Tanvi Deshmukh", att: 89.0, gpa: 8.20, ia1: 24.0, ia2: 25.0, labs: 87, study: 15 },
  { roll: "22CS117", name: "Varun Reddy", att: 73.5, gpa: 6.40, ia1: 16.0, ia2: 15.0, labs: 72, study: 9 },
  { roll: "22CS118", name: "Divya Nambiar", att: 92.5, gpa: 8.90, ia1: 27.0, ia2: 27.5, labs: 94, study: 19 },
  { roll: "22CS119", name: "Harsh Vardhan", att: 54.0, gpa: 4.90, ia1: 9.0, ia2: 7.5, labs: 48, study: 4 },
  { roll: "22CS120", name: "Ishita Roy", att: 84.0, gpa: 7.70, ia1: 22.5, ia2: 23.0, labs: 85, study: 14 },
  { roll: "22CS121", name: "Nikhil Joshi", att: 70.0, gpa: 6.00, ia1: 14.0, ia2: 11.5, labs: 65, study: 7 },
  { roll: "22CS122", name: "Sneha Reddy", att: 58.0, gpa: 7.10, ia1: 22.0, ia2: 20.0, labs: 80, study: 12 },
  { roll: "22CS123", name: "Gaurav Malhotra", att: 77.0, gpa: 6.80, ia1: 17.5, ia2: 17.0, labs: 74, study: 10 },
  { roll: "22CS124", name: "Akash Banerjee", att: 86.5, gpa: 8.00, ia1: 23.5, ia2: 24.0, labs: 86, study: 15 },
  { roll: "22CS125", name: "Bhavna Mishra", att: 66.0, gpa: 5.70, ia1: 12.5, ia2: 10.5, labs: 61, study: 6 },
  { roll: "22CS126", name: "Chirag Singhania", att: 81.0, gpa: 7.20, ia1: 19.5, ia2: 20.0, labs: 79, study: 12 },
  { roll: "22CS127", name: "Esha Ghosh", att: 90.0, gpa: 8.50, ia1: 25.5, ia2: 26.0, labs: 90, study: 17 },
  { roll: "22CS128", name: "Farhan Ali", att: 62.0, gpa: 5.30, ia1: 11.5, ia2: 8.5, labs: 55, study: 5 },
  { roll: "22CS129", name: "Gitanjali Rao", att: 95.0, gpa: 9.20, ia1: 28.0, ia2: 28.5, labs: 96, study: 21 },
  { roll: "22CS130", name: "Himanshu Rawat", att: 74.0, gpa: 6.30, ia1: 15.5, ia2: 14.5, labs: 71, study: 8 },
  { roll: "22CS131", name: "Indira Pillai", att: 87.0, gpa: 8.10, ia1: 24.0, ia2: 24.5, labs: 88, study: 16 },
  { roll: "22CS132", name: "Jayesh Shah", att: 69.0, gpa: 5.90, ia1: 13.5, ia2: 11.0, labs: 64, study: 7 },
  { roll: "22CS133", name: "Kriti Saxena", att: 83.5, gpa: 7.40, ia1: 21.0, ia2: 21.5, labs: 83, study: 13 },
  { roll: "22CS134", name: "Lalit Mohan", att: 56.0, gpa: 5.00, ia1: 10.0, ia2: 7.0, labs: 50, study: 3 },
  { roll: "22CS135", name: "Madhav Bhat", att: 78.5, gpa: 7.00, ia1: 18.5, ia2: 18.0, labs: 76, study: 11 },
  { roll: "22CS136", name: "Nandini Bhatt", att: 93.0, gpa: 9.00, ia1: 27.5, ia2: 28.0, labs: 93, study: 20 },
  { roll: "22CS137", name: "Omkar Jadhav", att: 67.0, gpa: 5.80, ia1: 13.0, ia2: 10.5, labs: 63, study: 6 },
  { roll: "22CS138", name: "Pranav Dixit", att: 80.5, gpa: 7.25, ia1: 20.0, ia2: 20.5, labs: 81, study: 12 },
  { roll: "22CS139", name: "Richa Aggarwal", att: 88.0, gpa: 8.30, ia1: 24.5, ia2: 25.5, labs: 89, study: 16 },
  { roll: "22CS140", name: "Suresh Pillai", att: 71.5, gpa: 6.15, ia1: 14.5, ia2: 13.0, labs: 67, study: 8 },
  { roll: "22CS141", name: "Tanya Kapoor", att: 85.5, gpa: 7.80, ia1: 23.0, ia2: 23.5, labs: 86, study: 15 },
  { roll: "22CS142", name: "Umesh Chand", att: 53.0, gpa: 4.70, ia1: 8.5, ia2: 6.5, labs: 45, study: 3 },
  { roll: "22CS143", name: "Vaishnavi Iyer", att: 91.5, gpa: 8.70, ia1: 26.5, ia2: 27.0, labs: 91, study: 18 },
  { roll: "22CS144", name: "Yashwant Sinha", att: 75.0, gpa: 6.50, ia1: 16.5, ia2: 15.5, labs: 73, study: 9 },
  { roll: "22CS145", name: "Zoya Khan", att: 82.5, gpa: 7.45, ia1: 21.0, ia2: 22.0, labs: 82, study: 13 }
];

// Active Evaluated Student
let activeStudent = {
  roll: "22CS108",
  name: "Karan Verma",
  subject: "CS501 - Database Management Systems",
  priorCGPA: 5.80,
  attendance: 68.0,
  ia1: 13.0,
  ia2: 10.0,
  labs: 62.0,
  study: 6.0,
  predScore: 41.8,
  predCGPA: 5.7,
  targetScore: 45,
  status: "weak",
  grade: "Pass / Backlog Danger (D)",
  anomalies: [],
  remedial: []
};

// Roster Filter State
let currentRosterFilter = 'all';

// Chart Instances
let internalTrajectoryChart = null;
let weightContributionChart = null;
let gradeDistChart = null;
let attVsScoreChart = null;

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
  initRosterTable();
  initAnalyticsCharts();
  initPredictorCharts();
  computeFutureScore(false);
  updateKPISummary();
});

// Calculate Future Score Regression Logic
function calculateScore(s) {
  // 1. Academic Baseline from Prior CGPA (0.0 - 10.0 scale) -> 35% weight
  const baseFromGPA = (s.gpa / 10.0) * 35.0;

  // 2. Continuous Internal Assessment IA1 & IA2 (each /30, total /60) -> 40% weight
  const iaAvg = ((s.ia1 + s.ia2) / 60.0) * 40.0;

  // 3. Assignments & Practical Lab Performance (/100) -> 15% weight
  const labContrib = (s.labs / 100.0) * 15.0;

  // 4. Regular Attendance Factor (/100) -> 10% weight
  const attContrib = (s.att / 100.0) * 10.0;

  // Raw predicted marks (0 - 100)
  let rawScore = baseFromGPA + iaAvg + labContrib + attContrib;

  // Institutional Rule Penalties
  // Penalty for Attendance Shortage (<75% university rule)
  if (s.att < 75.0) {
    const shortage = 75.0 - s.att;
    rawScore -= (shortage * 0.45); // Deducts internal attendance credit
  }

  // Trajectory Penalty: If IA-2 dropped significantly from IA-1
  if (s.ia2 < (s.ia1 * 0.8)) {
    rawScore -= 3.5; // Concept drop penalty
  }

  // Self-study bonus/penalty
  const studyDiff = (s.study - 10.0) * 0.25;
  rawScore += studyDiff;

  // Clamp within realistic final exam marks
  const finalMarks = Math.max(18.0, Math.min(98.5, +rawScore.toFixed(1)));
  
  // Projected semester CGPA
  const projCGPA = Math.max(3.5, Math.min(9.9, +(finalMarks / 10.0).toFixed(2)));

  // Target marks needed in Final Exam to avoid backlog (pass threshold = 40 total / 35 in SEE)
  const internalAggregate = (s.ia1 + s.ia2) / 2.0; // /30
  const targetSEE = Math.max(35, Math.min(75, Math.round(50 - (internalAggregate * 0.6))));

  // Status and Grade classification
  let status = "safe";
  let grade = "First Class (A)";
  if (finalMarks < 45.0) {
    status = "weak";
    grade = finalMarks < 40.0 ? "Backlog Risk / Fail (F)" : "Borderline Pass (D)";
  } else if (finalMarks < 60.0) {
    status = "borderline";
    grade = "Second Class (B)";
  } else if (finalMarks >= 75.0) {
    status = "distinction";
    grade = "First Class with Distinction (A+)";
  }

  return {
    finalMarks,
    projCGPA,
    targetSEE,
    status,
    grade
  };
}

// Compute active student prediction
function computeFutureScore(shouldAnimate = false) {
  const roll = document.getElementById('inpRollNo').value || "22CS108";
  const name = document.getElementById('inpName').value || "Karan Verma";
  const subject = document.getElementById('inpSubject').value;
  const priorCGPA = parseFloat(document.getElementById('inpPriorCGPA').value) || 6.0;
  const att = parseFloat(document.getElementById('inpAttendance').value);
  const ia1 = parseFloat(document.getElementById('inpIA1').value);
  const ia2 = parseFloat(document.getElementById('inpIA2').value);
  const labs = parseFloat(document.getElementById('inpLabs').value);
  const study = parseFloat(document.getElementById('inpStudy').value);

  // Run calculation
  const res = calculateScore({
    roll, name, gpa: priorCGPA, att, ia1, ia2, labs, study
  });

  // Diagnostics & Anomaly identification
  const anomalies = [];
  const remedial = [];

  if (att < 75.0) {
    anomalies.push({ type: 'tag-red', text: `🚨 Attendance Shortage: ${att.toFixed(1)}% (<75% Cutoff)` });
    remedial.push(`Issue Official Attendance Shortage Warning Notice to parents immediately.`);
    remedial.push(`Student must submit medical/leave certification to avoid semester exam detention.`);
  }

  if (ia2 < (ia1 * 0.8)) {
    const dropPct = (((ia1 - ia2) / ia1) * 100).toFixed(0);
    anomalies.push({ type: 'tag-yellow', text: `📉 Internal-2 Dropped by ${dropPct}% vs IA-1` });
    remedial.push(`Mandatory enrollment in 12-hour Department Remedial Classes (Modules 3 & 4).`);
  }

  if (ia1 < 12.0 && ia2 < 12.0) {
    anomalies.push({ type: 'tag-red', text: `⚠️ Failed Internal Cutoff in both IA-1 and IA-2` });
    remedial.push(`Schedule Special Improvement Assignment to recover 5 internal marks.`);
  }

  if (labs < 60.0) {
    anomalies.push({ type: 'tag-yellow', text: `🔬 Lab Record & Assignment Deficit (${labs.toFixed(0)}%)` });
    remedial.push(`Assign Peer Mentor (High Performing Senior) for lab concept coaching.`);
  }

  if (anomalies.length === 0) {
    anomalies.push({ type: 'tag-green', text: `✓ Attendance Criteria Satisfied (${att.toFixed(1)}%)` });
    anomalies.push({ type: 'tag-green', text: `✓ Consistent Internal Assessment Trajectory` });
    remedial.push(`Maintain current academic momentum and target university distinction rank.`);
    remedial.push(`Encourage participation in technical paper presentations and hackathons.`);
  }

  // Save to activeStudent state
  activeStudent = {
    roll, name, subject, priorCGPA,
    attendance: att, ia1, ia2, labs, study,
    predScore: res.finalMarks,
    predCGPA: res.projCGPA,
    targetScore: res.targetSEE,
    status: res.status,
    grade: res.grade,
    anomalies, remedial
  };

  renderOutputUI();
  updatePredictorCharts();
}

// Render Prediction Result Panel
function renderOutputUI() {
  const { predScore, targetScore, status, grade, anomalies, remedial } = activeStudent;

  // Meter Circle Animation (circumference 440)
  const meter = document.getElementById('scoreMeter');
  const offset = 440 - (440 * (predScore / 100));
  meter.style.strokeDashoffset = offset;
  
  if (status === 'weak') {
    meter.style.stroke = 'var(--accent-rose)';
  } else if (status === 'borderline') {
    meter.style.stroke = 'var(--accent-amber)';
  } else {
    meter.style.stroke = 'var(--accent-emerald)';
  }

  document.getElementById('predFinalScore').innerText = predScore.toFixed(1);

  // Status Pill
  const pill = document.getElementById('predStatusPill');
  if (status === 'weak') {
    pill.className = 'status-pill pill-danger';
    pill.innerHTML = `<span>●</span> Critical Weak Student (At-Risk)`;
  } else if (status === 'borderline') {
    pill.className = 'status-pill pill-warning';
    pill.innerHTML = `<span>●</span> Borderline Pass Student`;
  } else {
    pill.className = 'status-pill pill-safe';
    pill.innerHTML = `<span>●</span> On-Track / Good Standing`;
  }

  document.getElementById('predGradeText').innerText = `Projected Grade: ${grade}`;
  document.getElementById('targetExamScore').innerText = `${targetScore} / 100`;

  // Explanation
  const desc = document.getElementById('predExplanation');
  if (status === 'weak') {
    desc.innerText = `Student is at severe risk of failing or course backlog. Low internal assessment performance and attendance deficits compound to create academic shortfall. Immediate remedial intervention required.`;
  } else if (status === 'borderline') {
    desc.innerText = `Student is hovering around the minimum passing line. A solid performance in the Semester End Examination (SEE) is required to secure clear pass without carryover backlogs.`;
  } else {
    desc.innerText = `Student exhibits solid academic discipline with consistent internal assessment metrics and high attendance compliance.`;
  }

  // Diagnostic Badges
  const badgesBox = document.getElementById('diagBadgesContainer');
  badgesBox.innerHTML = '';
  anomalies.forEach(a => {
    const span = document.createElement('span');
    span.className = `alert-tag ${a.type}`;
    span.innerText = a.text;
    badgesBox.appendChild(span);
  });

  // Remedial Plan List
  const remList = document.getElementById('remedialList');
  remList.innerHTML = '';
  remedial.forEach((item, idx) => {
    const li = document.createElement('li');
    li.className = 'remedial-item';
    li.innerHTML = `<span class="num">${idx + 1}</span><span>${item}</span>`;
    remList.appendChild(li);
  });
}

// Sliders live text sync
function onDataChanged() {
  const att = parseFloat(document.getElementById('inpAttendance').value).toFixed(1);
  const ia1 = parseFloat(document.getElementById('inpIA1').value).toFixed(1);
  const ia2 = parseFloat(document.getElementById('inpIA2').value).toFixed(1);
  const labs = parseFloat(document.getElementById('inpLabs').value);
  const study = parseFloat(document.getElementById('inpStudy').value);

  const badgeAtt = document.getElementById('badgeAttendance');
  badgeAtt.innerText = `${att}%`;
  badgeAtt.className = `val-badge ${parseFloat(att) < 75 ? 'danger' : 'success'}`;

  document.getElementById('badgeIA1').innerText = `${ia1} / 30`;
  document.getElementById('badgeIA2').innerText = `${ia2} / 30`;
  document.getElementById('badgeLabs').innerText = `${labs}%`;
  document.getElementById('badgeStudy').innerText = `${study} hrs`;

  computeFutureScore(false);
}

// Quick Test Presets (For Mentor Demonstration)
function loadStudentPreset(type) {
  if (type === 'critical') {
    document.getElementById('inpRollNo').value = "22CS108";
    document.getElementById('inpName').value = "Karan Verma";
    document.getElementById('inpPriorCGPA').value = "5.80";
    setSliderValues(68.0, 13.0, 10.0, 62, 6);
  } else if (type === 'borderline') {
    document.getElementById('inpRollNo').value = "22CS115";
    document.getElementById('inpName').value = "Rahul Sharma";
    document.getElementById('inpPriorCGPA').value = "6.20";
    setSliderValues(76.0, 14.5, 14.0, 70, 8);
  } else if (type === 'detention') {
    document.getElementById('inpRollNo').value = "22CS122";
    document.getElementById('inpName').value = "Sneha Reddy";
    document.getElementById('inpPriorCGPA').value = "7.10";
    setSliderValues(58.0, 22.0, 20.0, 80, 12);
  } else if (type === 'distinction') {
    document.getElementById('inpRollNo').value = "22CS101";
    document.getElementById('inpName').value = "Ananya Iyer";
    document.getElementById('inpPriorCGPA').value = "9.10";
    setSliderValues(94.0, 28.5, 29.0, 95, 20);
  }
}

function setSliderValues(att, ia1, ia2, labs, study) {
  document.getElementById('inpAttendance').value = att;
  document.getElementById('inpIA1').value = ia1;
  document.getElementById('inpIA2').value = ia2;
  document.getElementById('inpLabs').value = labs;
  document.getElementById('inpStudy').value = study;
  onDataChanged();
}

// Initialize Predictor Mini Charts
function initPredictorCharts() {
  // Trajectory Chart (IA-1 vs IA-2)
  const ctxTraj = document.getElementById('internalTrajectoryChart').getContext('2d');
  internalTrajectoryChart = new Chart(ctxTraj, {
    type: 'bar',
    data: {
      labels: ['IA-1 (Midterm 1)', 'IA-2 (Midterm 2)'],
      datasets: [{
        label: 'Marks Obtained',
        data: [13, 10],
        backgroundColor: ['#6366f1', '#f43f5e'],
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: { max: 30, ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
        x: { ticks: { color: '#cbd5e1' }, grid: { display: false } }
      },
      plugins: { legend: { display: false } }
    }
  });

  // Component Weight Breakdown
  const ctxW = document.getElementById('weightContributionChart').getContext('2d');
  weightContributionChart = new Chart(ctxW, {
    type: 'bar',
    data: {
      labels: ['Prior CGPA (35%)', 'Internals (40%)', 'Labs (15%)', 'Attendance (10%)'],
      datasets: [{
        label: 'Contribution',
        data: [20.3, 15.3, 9.3, 6.8],
        backgroundColor: ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'],
        borderRadius: 4
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } },
        y: { ticks: { color: '#cbd5e1' }, grid: { display: false } }
      },
      plugins: { legend: { display: false } }
    }
  });
}

function updatePredictorCharts() {
  if (!internalTrajectoryChart || !weightContributionChart) return;

  const { ia1, ia2, priorCGPA, labs, attendance } = activeStudent;

  internalTrajectoryChart.data.datasets[0].data = [ia1, ia2];
  internalTrajectoryChart.data.datasets[0].backgroundColor = [
    '#6366f1',
    ia2 < ia1 ? '#f43f5e' : '#10b981'
  ];
  internalTrajectoryChart.update('none');

  const cGPA = +((priorCGPA / 10.0) * 35).toFixed(1);
  const cIA = +(((ia1 + ia2) / 60.0) * 40).toFixed(1);
  const cLab = +((labs / 100.0) * 15).toFixed(1);
  const cAtt = +((attendance / 100.0) * 10).toFixed(1);

  weightContributionChart.data.datasets[0].data = [cGPA, cIA, cLab, cAtt];
  weightContributionChart.update('none');
}

// Tab 2: Class Roster Table
function initRosterTable() {
  filterRoster();
}

function setRosterFilter(filter) {
  currentRosterFilter = filter;
  document.getElementById('fAll').classList.toggle('active', filter === 'all');
  document.getElementById('fWeak').classList.toggle('active', filter === 'weak');
  document.getElementById('fShortage').classList.toggle('active', filter === 'shortage');
  document.getElementById('fDistinction').classList.toggle('active', filter === 'distinction');
  filterRoster();
}

function filterRoster() {
  const query = (document.getElementById('rosterSearch')?.value || '').trim().toLowerCase();
  const tbody = document.getElementById('rosterTableBody');
  tbody.innerHTML = '';

  let filtered = CLASS_ROSTER.map(s => {
    const calc = calculateScore(s);
    return { ...s, ...calc };
  });

  if (query) {
    filtered = filtered.filter(s => s.roll.toLowerCase().includes(query) || s.name.toLowerCase().includes(query));
  }

  if (currentRosterFilter === 'weak') {
    filtered = filtered.filter(s => s.finalMarks < 45.0);
  } else if (currentRosterFilter === 'shortage') {
    filtered = filtered.filter(s => s.att < 75.0);
  } else if (currentRosterFilter === 'distinction') {
    filtered = filtered.filter(s => s.finalMarks >= 75.0);
  }

  filtered.forEach(s => {
    const tr = document.createElement('tr');
    const isWeak = s.finalMarks < 45.0;
    const isShortage = s.att < 75.0;

    tr.innerHTML = `
      <td class="font-mono"><strong>${s.roll}</strong></td>
      <td>${s.name}</td>
      <td style="color: ${isShortage ? '#f87171' : '#cbd5e1'}; font-weight: ${isShortage ? '700' : 'normal'};">
        ${s.att.toFixed(1)}% ${isShortage ? '⚠️' : ''}
      </td>
      <td class="font-mono">${s.gpa.toFixed(2)}</td>
      <td>${s.ia1.toFixed(1)}</td>
      <td>${s.ia2.toFixed(1)}</td>
      <td class="font-mono" style="font-weight: 800; color: ${isWeak ? '#fb7185' : s.finalMarks >= 75 ? '#34d399' : '#fff'};">
        ${s.finalMarks.toFixed(1)}
      </td>
      <td>
        <span class="status-pill ${isWeak ? 'pill-danger' : s.finalMarks >= 75 ? 'pill-safe' : 'pill-warning'}" style="padding:2px 8px; font-size:0.7rem;">
          ${s.grade.split('(')[0].trim()}
        </span>
      </td>
      <td>
        <button class="btn-load-row" onclick="loadStudentFromRoster('${s.roll}')">
          Load ↗
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  document.getElementById('rosterCountBadge').innerText = `${filtered.length} of ${CLASS_ROSTER.length} Students`;
}

function loadStudentFromRoster(roll) {
  const target = CLASS_ROSTER.find(s => s.roll === roll);
  if (!target) return;

  document.getElementById('inpRollNo').value = target.roll;
  document.getElementById('inpName').value = target.name;
  document.getElementById('inpPriorCGPA').value = target.gpa.toFixed(2);
  setSliderValues(target.att, target.ia1, target.ia2, target.labs, target.study);

  switchPortalTab('predictor');
}

// Tab 3: Department Analytics Charts
function initAnalyticsCharts() {
  // Compute class-wide statistics
  const scoredClass = CLASS_ROSTER.map(s => calculateScore(s));

  let distinction = 0, firstClass = 0, secondClass = 0, weakFail = 0;
  scoredClass.forEach(s => {
    if (s.finalMarks >= 75) distinction++;
    else if (s.finalMarks >= 60) firstClass++;
    else if (s.finalMarks >= 45) secondClass++;
    else weakFail++;
  });

  // Grade Distribution Doughnut
  const ctxGrade = document.getElementById('gradeDistChart').getContext('2d');
  gradeDistChart = new Chart(ctxGrade, {
    type: 'doughnut',
    data: {
      labels: [
        `Distinction (≥75): ${distinction}`,
        `First Class (60-74): ${firstClass}`,
        `Second Class (45-59): ${secondClass}`,
        `Weak / Backlog (<45): ${weakFail}`
      ],
      datasets: [{
        data: [distinction, firstClass, secondClass, weakFail],
        backgroundColor: ['#10b981', '#6366f1', '#f59e0b', '#f43f5e'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: { color: '#cbd5e1', font: { size: 11, family: 'Outfit' }, padding: 12 }
        }
      },
      cutout: '68%'
    }
  });

  // Attendance vs Final Score Scatter
  const ctxAtt = document.getElementById('attVsScoreChart').getContext('2d');
  const scatterPoints = CLASS_ROSTER.map(s => {
    const sc = calculateScore(s);
    return { x: s.att, y: sc.finalMarks };
  });

  attVsScoreChart = new Chart(ctxAtt, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Students (Attendance vs Score)',
        data: scatterPoints,
        backgroundColor: scatterPoints.map(p => p.y < 45 ? '#f43f5e' : p.y >= 75 ? '#10b981' : '#6366f1'),
        pointRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          min: 45, max: 100,
          title: { display: true, text: 'Attendance Rate (%)', color: '#64748b' },
          ticks: { color: '#94a3b8' },
          grid: { color: 'rgba(255,255,255,0.05)' }
        },
        y: {
          min: 20, max: 100,
          title: { display: true, text: 'Predicted Final Score (/100)', color: '#64748b' },
          ticks: { color: '#94a3b8' },
          grid: { color: 'rgba(255,255,255,0.05)' }
        }
      },
      plugins: { legend: { display: false } }
    }
  });
}

// Update Header KPIs
function updateKPISummary() {
  const scored = CLASS_ROSTER.map(s => calculateScore(s));
  const total = scored.length;
  const avg = (scored.reduce((acc, s) => acc + s.finalMarks, 0) / total).toFixed(1);
  const weak = scored.filter(s => s.finalMarks < 45.0).length;
  const shortage = CLASS_ROSTER.filter(s => s.att < 75.0).length;

  document.getElementById('kpiClassStrength').innerText = total;
  document.getElementById('kpiClassMean').innerText = avg;
  document.getElementById('kpiWeakCount').innerText = weak;
  document.getElementById('kpiDetentionCount').innerText = shortage;
}

// Tab Switching
function switchPortalTab(tabId) {
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(p => p.classList.remove('active'));

  const tabBtn = Array.from(document.querySelectorAll('.nav-tab')).find(b => b.innerText.toLowerCase().includes(tabId));
  if (tabBtn) tabBtn.classList.add('active');

  const pane = document.getElementById(`tab-${tabId}`);
  if (pane) pane.classList.add('active');

  if (tabId === 'analytics') {
    setTimeout(() => {
      if (gradeDistChart) gradeDistChart.resize();
      if (attVsScoreChart) attVsScoreChart.resize();
    }, 50);
  }
}

// CSV Export for Weak Students
function exportWeakStudentsCSV() {
  const weakStudents = CLASS_ROSTER.map(s => {
    const calc = calculateScore(s);
    return { ...s, ...calc };
  }).filter(s => s.finalMarks < 45.0 || s.att < 75.0);

  let csv = "RollNo,StudentName,Attendance%,PriorCGPA,IA1_Marks,IA2_Marks,PredictedFinalScore,TargetToPass,Status,RemedialActionNeeded\n";
  weakStudents.forEach(s => {
    const remedialFlag = s.finalMarks < 45.0 ? "Mandatory Remedial Classes" : "Attendance Undertaking";
    csv += `"${s.roll}","${s.name}",${s.att.toFixed(1)},${s.gpa.toFixed(2)},${s.ia1.toFixed(1)},${s.ia2.toFixed(1)},${s.finalMarks.toFixed(1)},${s.targetSEE},"${s.grade}","${remedialFlag}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Weak_Students_Action_List_CSE_SecA_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// Official University Parent / Remedial Notice Modal
function openNoticeModal() {
  const modal = document.getElementById('noticeModal');

  document.getElementById('notRollNo').innerText = activeStudent.roll;
  document.getElementById('notName').innerText = activeStudent.name;
  document.getElementById('notSubject').innerText = activeStudent.subject;
  document.getElementById('notAttendance').innerText = `${activeStudent.attendance.toFixed(1)}% ${activeStudent.attendance < 75 ? '(<75% Shortage)' : ''}`;
  document.getElementById('notScores').innerText = `${activeStudent.ia1.toFixed(1)} / 30 and ${activeStudent.ia2.toFixed(1)} / 30`;
  document.getElementById('notPredScore').innerText = `${activeStudent.predScore.toFixed(1)} / 100 (${activeStudent.grade})`;

  document.getElementById('notAttBody').innerText = `${activeStudent.attendance.toFixed(1)}%`;
  document.getElementById('notTargetBody').innerText = `${activeStudent.targetScore} marks`;

  modal.classList.add('active');
}

function closeNoticeModal() {
  document.getElementById('noticeModal').classList.remove('active');
}

function closeNoticeOnBackdrop(e) {
  if (e.target.id === 'noticeModal') {
    closeNoticeModal();
  }
}
