let chartInstance = null;
let applicants = [];

function generateApplicants(){
    applicants = [];
    const names = ["John","Emily","Michael","Sarah","David","Anna","Peter","Linda","James","Sophia"];
    for(let i=0;i<10;i++){
        let income = Math.floor(Math.random()*80000) + 20000;
        let debt = Math.floor(Math.random()*50000);
        let creditScore = Math.floor(Math.random()*300) + 500;
        let status = evaluateLoan(income, debt, creditScore);
        applicants.push({name: names[i], income, debt, creditScore, status});
    }
    renderApplicants();
}
function evaluateLoan(income, debt, score){
    if(score < 600 || debt > income*0.5) return "Denied";
    if(score >= 700 && debt < income*0.4) return "Approved";
    return "Review Required";
}
function renderApplicants(){
    const table = document.querySelector("#applicantsTable tbody");
    table.innerHTML = "";
    applicants.forEach(a=>{
        table.innerHTML += `<tr><td>${a.name}</td><td>${a.income}</td><td>${a.debt}</td><td>${a.creditScore}</td><td>${a.status}</td></tr>`;
    });
}
function generateChart(){
    const ctx = document.getElementById("loanChart").getContext("2d");
    if(chartInstance) chartInstance.destroy();
    let counts = {Approved:0, Denied:0, "Review Required":0};
    applicants.forEach(a=>counts[a.status]++);
    chartInstance = new Chart(ctx,{
        type:'bar',
        data:{ labels: Object.keys(counts), datasets:[{label:'Loan Status', data: Object.values(counts), backgroundColor:['#36A2EB','#FF6384','#FFCE56'] }] },
        options:{responsive:true, scales:{y:{beginAtZero:true}}}
    });
}
function exportPDF(){
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Smart Loan Report", 20, 20);
    let y = 30;
    doc.setFontSize(12);
    applicants.forEach(a=>{
        doc.text(`${a.name} | Income: ${a.income} | Debt: ${a.debt} | Credit Score: ${a.creditScore} | Status: ${a.status}`,10,y);
        y+=10;
    });
    doc.save("Smart_Loan_Report.pdf");
}