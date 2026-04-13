let students = [];
const softwareModules = ["Programming", "HTML/CSS", "IoT"];
const infraModules = ["Security", "Operating Systems", "Penetration Testing"];

function isNumber(val, min=0, max=100){
    if(val === "" || isNaN(val)) return false;
    let n = Number(val);
    return n >= min && n <= max;
}
function isLetters(val){
    return /^[A-Za-z\s]+$/.test(val);
}
function showViewStudents(){
    document.getElementById('studentTable').style.display='block';
    document.getElementById('studentForm').style.display='none';
    renderTable();
}
function showAddStudent(){
    document.getElementById('studentForm').style.display='block';
    document.getElementById('studentTable').style.display='none';
    document.getElementById('studentName').value = '';
    document.getElementById('studentSpec').value = '';
    document.getElementById('module1').value = '';
    document.getElementById('module2').value = '';
    document.getElementById('module3').value = '';
    document.getElementById('attendance').value = '';
}
function resetDashboard(){
    document.getElementById('studentForm').style.display='none';
    document.getElementById('studentTable').style.display='none';
}
function addOrEditStudent(){
    const name = document.getElementById('studentName').value.trim();
    const spec = document.getElementById('studentSpec').value;
    const m1 = document.getElementById('module1').value.trim();
    const m2 = document.getElementById('module2').value.trim();
    const m3 = document.getElementById('module3').value.trim();
    const att = document.getElementById('attendance').value.trim();
    if(!isLetters(name)){ alert("Name must contain letters only"); return; }
    if(spec !== "Software" && spec !== "Infrastructure"){ alert("Select a specialization"); return; }
    if(!isNumber(m1) || !isNumber(m2) || !isNumber(m3)){ alert("Module scores must be numbers between 0-100"); return; }
    if(!isNumber(att)){ alert("Attendance must be 0-100"); return; }
    const student = { name, spec, modules: [Number(m1), Number(m2), Number(m3)], attendance: Number(att) };
    students.push(student);
    alert("Student added successfully!");
    renderTable();
    showViewStudents();
}
function analyzePerformance(student){
    const avg = student.modules.reduce((a,b)=>a+b,0)/student.modules.length;
    let performance = "", recommendation = "";
    if(avg >= 75 && student.attendance >= 80){ performance = "Excellent Student"; recommendation = "Maintain current performance."; }
    else if(avg >= 50){ performance = "Average Performance"; recommendation = "Increase study hours."; }
    else { performance = "At Risk"; recommendation = "Immediate intervention required."; }
    return {performance, recommendation};
}
function renderTable(){
    const tbody = document.querySelector("#studentsList tbody");
    tbody.innerHTML = "";
    students.forEach((stu, index)=>{
        const analysis = analyzePerformance(stu);
        const row = document.createElement("tr");
        row.innerHTML = `<td>${stu.name}</td><td>${stu.spec}</td><td>${stu.modules[0]}</td><td>${stu.modules[1]}</td><td>${stu.modules[2]}</td><td>${stu.attendance}</td><td>${analysis.performance}</td><td>${analysis.recommendation}</td><td><button onclick="editStudent(${index})">Edit</button></td>`;
        tbody.appendChild(row);
    });
}
function editStudent(index){
    const stu = students[index];
    showAddStudent();
    document.getElementById('studentName').value = stu.name;
    document.getElementById('studentSpec').value = stu.spec;
    document.getElementById('module1').value = stu.modules[0];
    document.getElementById('module2').value = stu.modules[1];
    document.getElementById('module3').value = stu.modules[2];
    document.getElementById('attendance').value = stu.attendance;
    students.splice(index,1);
}