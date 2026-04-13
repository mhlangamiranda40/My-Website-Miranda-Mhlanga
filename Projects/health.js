let chartInstance = null;
let inventory = [], patients = [], staff = [];

function generateData(){
    inventory = [
        {item: "Pills", quantity: Math.floor(Math.random()*100), status: ""},
        {item: "Equipment", quantity: Math.floor(Math.random()*50), status: ""},
        {item: "Beds", quantity: Math.floor(Math.random()*30), status: ""}
    ];
    inventory.forEach(i => i.status = i.quantity<20 ? "Low" : "OK");
    const riskLevels = ["Low","Medium","High"];
    const wards = {Low:"Ward A", Medium:"Ward B", High:"Ward C"};
    patients = [];
    for(let i=1; i<=10; i++){
        let risk = riskLevels[Math.floor(Math.random()*3)];
        patients.push({name:"Patient "+i, riskLevel: risk, ward: wards[risk]});
    }
    const roles = ["Doctor","Nurse","Security","Receptionist"];
    const shifts = ["Morning","Afternoon","Night"];
    staff = [];
    roles.forEach(role=>{
        for(let i=1;i<=6;i++){
            staff.push({name: role+" "+i, role: role, shift: shifts[Math.floor(Math.random()*3)]});
        }
    });
    renderData();
}
function renderData(){
    const invTable = document.querySelector("#inventoryTable tbody");
    invTable.innerHTML = "";
    inventory.forEach(i=>{ invTable.innerHTML += `<tr><td>${i.item}</td><td>${i.quantity}</td><td>${i.status}</td></tr>`; });
    const patTable = document.querySelector("#patientsTable tbody");
    patTable.innerHTML = "";
    patients.forEach(p=>{ patTable.innerHTML += `<tr><td>${p.name}</td><td>${p.riskLevel}</td><td>${p.ward}</td></tr>`; });
    const stTable = document.querySelector("#staffTable tbody");
    stTable.innerHTML = "";
    staff.forEach(s=>{ stTable.innerHTML += `<tr><td>${s.name}</td><td>${s.role}</td><td>${s.shift}</td></tr>`; });
}
function generateChart(){
    const ctx = document.getElementById("healthChart").getContext("2d");
    if(chartInstance) chartInstance.destroy();
    const counts = {Low:0, Medium:0, High:0};
    patients.forEach(p=>counts[p.riskLevel]++);
    chartInstance = new Chart(ctx, {
        type:'bar',
        data:{ labels: Object.keys(counts), datasets:[{ label: 'Patients by Risk Level', data: Object.values(counts), backgroundColor: ['#36A2EB','#FFCE56','#FF6384'] }] },
        options:{responsive:true, scales:{y:{beginAtZero:true}}}
    });
}
function exportPDF(){
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Smart Health Report", 20, 20);
    let y = 30;
    doc.setFontSize(12);
    doc.text("Inventory:",10,y); y+=10;
    inventory.forEach(i=>{ doc.text(`${i.item} | ${i.quantity} | ${i.status}`,10,y); y+=10; });
    y+=5;
    doc.text("Patients:",10,y); y+=10;
    patients.forEach(p=>{ doc.text(`${p.name} | ${p.riskLevel} | ${p.ward}`,10,y); y+=10; });
    y+=5;
    doc.text("Staff:",10,y); y+=10;
    staff.forEach(s=>{ doc.text(`${s.name} | ${s.role} | ${s.shift}`,10,y); y+=10; });
    doc.save("Smart_Health_Report.pdf");
}