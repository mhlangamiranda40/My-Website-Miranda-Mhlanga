let contracts = JSON.parse(localStorage.getItem("contracts")) || [];

function addContract(){
    const name = document.getElementById("projectName").value.trim();
    const status = document.getElementById("status").value;
    if(name === ""){ alert("Project name required."); return; }
    if(!/^[a-zA-Z0-9\s]+$/.test(name)){ alert("Invalid characters in project name."); return; }
    contracts.push({name,status});
    localStorage.setItem("contracts",JSON.stringify(contracts));
    document.getElementById("projectName").value="";
    displayContracts();
}
function displayContracts() {
    const list = document.getElementById("contractList");
    list.innerHTML = "";
    contracts.forEach((contract, index) => {
        const li = document.createElement("li");
        li.textContent = contract.name + " — " + contract.status;
        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.style.marginLeft = "15px";
        delBtn.style.padding = "4px 8px";
        delBtn.style.border = "none";
        delBtn.style.borderRadius = "5px";
        delBtn.style.background = "#b8a4e3";
        delBtn.style.color = "white";
        delBtn.style.cursor = "pointer";
        delBtn.addEventListener("click", () => {
            contracts.splice(index, 1);
            localStorage.setItem("contracts", JSON.stringify(contracts));
            displayContracts();
        });
        li.appendChild(delBtn);
        list.appendChild(li);
    });
}
displayContracts();