let employees = [];
let chartInstance = null;
const resultMsg = document.getElementById("resultMsg");

function validateNumber(value){
    return !(value === "" || isNaN(value));
}
function resetInputs(){
    document.getElementById("employee").value = "";
    document.getElementById("revenue").value = "";
    document.getElementById("expenses").value = "";
}
function addEmployee(){
    let name = document.getElementById("employee").value.trim();
    let revenue = document.getElementById("revenue").value;
    let expenses = document.getElementById("expenses").value;
    if(name === "" || !validateNumber(revenue) || !validateNumber(expenses)){
        resultMsg.innerText = "Please enter valid values";
        return;
    }
    let profit = Number(revenue) - Number(expenses);
    let idx = employees.findIndex(emp => emp.name.toLowerCase() === name.toLowerCase());
    if(idx >= 0){
        employees[idx] = {name, revenue:Number(revenue), expenses:Number(expenses), profit};
    } else {
        employees.push({name, revenue:Number(revenue), expenses:Number(expenses), profit});
    }
    updateTable();
    resetInputs();
    resultMsg.innerText = "";
}
function updateTable(){
    let tbody = document.querySelector("#employeeTable tbody");
    tbody.innerHTML = "";
    employees.forEach(emp => {
        let row = `<tr><td>${emp.name}</td><td>${emp.revenue}</td><td>${emp.expenses}</td><td>${emp.profit}</td></tr>`;
        tbody.innerHTML += row;
    });
}
function generateChart(){
    if(employees.length === 0){
        resultMsg.innerText = "Add employees first";
        return;
    }
    let type = document.getElementById("chartType").value;
    let labels = employees.map(emp => emp.name);
    let data = employees.map(emp => emp.profit);
    let ctx = document.getElementById("chartCanvas").getContext("2d");
    if(chartInstance) chartInstance.destroy();
    chartInstance = new Chart(ctx, {
        type: type,
        data: {
            labels: labels,
            datasets: [{
                label: 'Profit',
                data: data,
                backgroundColor: ["#4B0082", "#9370DB", "#8A2BE2", "#D8BFD8", "#E6E6FA"],
                borderColor: "#4B0082",
                borderWidth: 1
            }]
        },
        options: { responsive: true, plugins: { legend: { display: true } } }
    });
}
function exportPDF(){
    if(employees.length === 0){
        resultMsg.innerText = "No data to export";
        return;
    }
    const { jsPDF } = window.jspdf;
    let doc = new jsPDF();
    doc.text("Business Intelligence Report", 10, 10);
    let startY = 20;
    employees.forEach(emp => {
        doc.text(`${emp.name}: Revenue ${emp.revenue}, Expenses ${emp.expenses}, Profit ${emp.profit}`, 10, startY);
        startY += 10;
    });
    doc.save("Business_Report.pdf");
}