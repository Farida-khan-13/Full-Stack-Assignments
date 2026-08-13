const STORAGE_KEY = "studentResultRecords_v1";
const PASS_MARK = 35;
const MAX_MARKS_PER_SUBJECT = 100;

const subjects = [
  { key: "htmlMarks", name: "HTML5" },
  { key: "cssMarks", name: "CSS3" },
  { key: "jsMarks", name: "JavaScript" },
  { key: "communicationMarks", name: "Communication" },
  { key: "databaseMarks", name: "Database" }
];

const form = document.getElementById("studentForm");
const formMessage = document.getElementById("formMessage");
const resultSection = document.getElementById("resultSection");
const statusBadge = document.getElementById("statusBadge");

function getRecords() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Could not read saved student records:", error);
    return [];
  }
}

function saveRecords(records) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    return true;
  } catch (error) {
    console.error("Could not save student records:", error);
    formMessage.textContent = "The result was calculated, but the browser could not save it. Check your browser storage settings.";
    return false;
  }
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[character]));
}

function readAndValidateForm() {
  const studentName = document.getElementById("studentName").value.trim();
  const rollNumber = document.getElementById("rollNumber").value.trim();
  const email = document.getElementById("email").value.trim();
  const course = document.getElementById("course").value.trim();

  if (studentName.length < 2) throw new Error("Please enter a name with at least 2 characters.");
  if (!rollNumber) throw new Error("Please enter the student's roll number.");
  if (!email || !document.getElementById("email").checkValidity()) throw new Error("Please enter a valid email address.");
  if (!course) throw new Error("Please enter the course or class.");

  const marks = {};
  for (const subject of subjects) {
    const input = document.getElementById(subject.key);
    const rawValue = input.value.trim();
    if (rawValue === "") throw new Error(`Please enter marks for ${subject.name}.`);
    const value = Number(rawValue);
    if (!Number.isFinite(value) || !Number.isInteger(value) || value < 0 || value > MAX_MARKS_PER_SUBJECT) {
      throw new Error(`${subject.name} marks must be a whole number from 0 to 100.`);
    }
    marks[subject.name] = value;
  }

  const values = Object.values(marks);
  const total = values.reduce((sum, mark) => sum + mark, 0);
  const percentage = Number(((total / (subjects.length * MAX_MARKS_PER_SUBJECT)) * 100).toFixed(2));
  const subjectsPassed = values.filter((mark) => mark >= PASS_MARK).length;
  const result = subjectsPassed === subjects.length ? "PASS" : "FAIL";

  return {
    studentName,
    rollNumber,
    email,
    course,
    marks,
    total,
    maximumMarks: subjects.length * MAX_MARKS_PER_SUBJECT,
    percentage,
    subjectsPassed,
    subjectsTotal: subjects.length,
    result,
    createdAt: new Date().toISOString()
  };
}

function showResult(student) {
  document.getElementById("resultName").textContent = student.studentName;
  document.getElementById("resultRoll").textContent = student.rollNumber;
  document.getElementById("resultCourse").textContent = student.course;
  document.getElementById("totalMarks").textContent = `${student.total} / ${student.maximumMarks}`;
  document.getElementById("percentage").textContent = `${student.percentage.toFixed(2)}%`;
  document.getElementById("subjectsPassed").textContent = `${student.subjectsPassed} / ${student.subjectsTotal}`;

  statusBadge.textContent = student.result;
  statusBadge.classList.toggle("fail", student.result === "FAIL");

  document.getElementById("marksTable").innerHTML = subjects.map((subject) => {
    const mark = student.marks[subject.name];
    const passed = mark >= PASS_MARK;
    return `<tr>
      <td>${escapeHTML(subject.name)}</td>
      <td>${mark} / ${MAX_MARKS_PER_SUBJECT}</td>
      <td class="${passed ? "outcome-pass" : "outcome-fail"}">${passed ? "Pass" : "Fail"}</td>
    </tr>`;
  }).join("");

  document.getElementById("jsonOutput").textContent = JSON.stringify(student, null, 2);
  resultSection.hidden = false;
  resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderRecords() {
  const records = getRecords();
  const emptyState = document.getElementById("recordsEmpty");
  const tableWrap = document.getElementById("recordsTableWrap");
  const tableBody = document.getElementById("recordsTable");

  emptyState.hidden = records.length > 0;
  tableWrap.hidden = records.length === 0;

  tableBody.innerHTML = records.slice().reverse().map((student) => `
    <tr>
      <td>${escapeHTML(student.studentName)}</td>
      <td>${escapeHTML(student.rollNumber)}</td>
      <td>${student.total} / ${student.maximumMarks}</td>
      <td>${Number(student.percentage).toFixed(2)}%</td>
      <td class="${student.result === "PASS" ? "outcome-pass" : "outcome-fail"}">${escapeHTML(student.result)}</td>
    </tr>
  `).join("");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.textContent = "";

  try {
    const student = readAndValidateForm();
    const records = getRecords();
    const duplicate = records.some((record) =>
      String(record.rollNumber).toLowerCase() === student.rollNumber.toLowerCase()
    );

    if (duplicate) {
      formMessage.textContent = "That roll number already exists. Use a unique roll number for each student.";
      document.getElementById("rollNumber").focus();
      return;
    }

    records.push(student);
    saveRecords(records);
    showResult(student);
    renderRecords();
  } catch (error) {
    formMessage.textContent = error.message || "Please check the details and try again.";
  }
});

form.addEventListener("reset", () => {
  formMessage.textContent = "";
});

document.getElementById("clearRecordsBtn").addEventListener("click", () => {
  const records = getRecords();
  if (records.length === 0) {
    formMessage.textContent = "There are no saved records to clear.";
    return;
  }

  if (window.confirm("Delete all saved student records from this browser? This cannot be undone.")) {
    localStorage.removeItem(STORAGE_KEY);
    renderRecords();
    resultSection.hidden = true;
    formMessage.textContent = "All saved records have been cleared.";
  }
});

renderRecords();
