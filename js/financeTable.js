let allEntries = document.querySelectorAll(".table-row");
let entryValue = document.querySelectorAll(".value");
let entrySumValues = document.querySelectorAll(".value-sum");
const addEntryButton = document.querySelector("#add-entry");
const delEntryButton = document.querySelector("#del-entry");
const confirmDelEntry = document.querySelector("#confirm-del-button")
const filterEntryButton = document.querySelector("#filter-entry");
const financeTable = document.querySelector('table');
const blockBgElement = document.querySelector(".block-bg-elements");
const delEntryDiagBox = document.querySelector(".del-entry-diag-box");
const cancelDiagBox = document.querySelector("#cancel-button")
const allDiagWindow = document.querySelectorAll(".dialog-window")
const addEntryDiagBox = document.querySelector(".add-entry-diag-box")
const confirmAddEntryButton = document.querySelector("#confirm-add-entry-button")

const entryNameInputValue = document.querySelector("#entry-name")
const entryDateInputValue = document.querySelector("#entry-date")
const entryValueInputValue = document.querySelector("#entry-value")

calculateSumByRow();

// Seleção de Linhas
function selectRow(selectedRow) {
    allEntries = document.querySelectorAll(".table-row");
    allEntries.forEach((row, index) => {
        row.classList.remove("selected");
    });

    selectedRow.classList.toggle("selected");
}

document.addEventListener("click", (e) => {
    e.preventDefault();
    const parentEl = e.target.closest("tr");

    if (parentEl !== null)
    {
        if (parentEl.classList.contains("table-row")){
            selectRow(parentEl);
        }
    }
})

// Calcular Valor Total
function calculateSumByRow() {
    // atualizar valores presentes na tabela
    entryValue = document.querySelectorAll(".value");
    entrySumValues = document.querySelectorAll(".value-sum");
    let convertedRowValue = [];
    let totalSum = [];

    // Remover Cifrão e trocar virgulas por pontos
    entryValue.forEach((rowValue, index) => {
        let replaceComma = rowValue.textContent.replace(',','.');
        let removeSign = replaceComma.slice(3);
        convertedRowValue[index] = parseFloat(removeSign)
        totalSum[index] = 0; // inicializar array
    });

    // Calcular valor total por linha
    entrySumValues.forEach((rowSumValue, index) => {
        if (index > 0) {
            totalSum[index] += (totalSum[index-1] + convertedRowValue[index]);
        }else{
            totalSum[index] += (convertedRowValue[index]);
        }
        
        rowSumValue.textContent = ("R$ " + totalSum[index].toFixed(2));
        rowSumValue.textContent = rowSumValue.textContent.replace('.',',');
    });
}

// Adicionar novos lançamentos
function addNewEntry(name, createType, dateCreated, datePayed, createBy, value) {
    const newEntry = document.createElement("tr");
    newEntry.classList.add("table-row");

    const entryName = document.createElement("td");
    entryName.innerText = name;
    newEntry.appendChild(entryName);

    const entryType = document.createElement("td");
    entryType.innerText = createType;
    newEntry.appendChild(entryType);
    
    const entryDateCreated = document.createElement("td");
    entryDateCreated.innerText = dateCreated;
    newEntry.appendChild(entryDateCreated);

    const entryDatePayed = document.createElement("td");
    entryDatePayed.innerText = datePayed;
    newEntry.appendChild(entryDatePayed);

    const entryCreatedBy = document.createElement("td");
    entryCreatedBy.innerText = createBy;
    newEntry.appendChild(entryCreatedBy);

    const entryValue = document.createElement("td");
    entryValue.innerText = value;
    entryValue.classList.add("value");
    newEntry.appendChild(entryValue);

    const entryValueSum = document.createElement("td");
    entryValueSum.innerText = "R$ 0,00";
    entryValueSum.classList.add("value-sum");
    newEntry.appendChild(entryValueSum);

    financeTable.appendChild(newEntry);
    calculateSumByRow();
}

addEntryButton.addEventListener("click", (e) => {
    e.preventDefault();
    
    dialogBoxAdd(true);
})

filterEntryButton.addEventListener("click", (e) => {
    e.preventDefault();

    calculateSumByRow();
})

delEntryButton.addEventListener("click", (e) => {
    e.preventDefault();
    
    let entryToDelete = document.querySelector(".selected");
    if (entryToDelete !== null) {
        dialogBox(true)
    }
})

// Caixa de Dialogo
function dialogBox(showBox) {
    if (showBox == true) {
        blockBgElement.classList.remove("hidden");
        delEntryDiagBox.classList.remove("hidden");
    }else{
        blockBgElement.classList.add("hidden");
        allDiagWindow.forEach(window => {
            window.classList.add("hidden");
        });
    }
}

function dialogBoxAdd(showBox) {
    if (showBox == true) {
        blockBgElement.classList.remove("hidden");
        addEntryDiagBox.classList.remove("hidden");
    }else{
        blockBgElement.classList.add("hidden");
        addEntryDiagBox.classList.add("hidden");
    }
}


confirmDelEntry.addEventListener("click", (e) => {
    e.preventDefault();

    let entryToDelete = document.querySelector(".selected");
    if (entryToDelete !== null) {
        entryToDelete.remove();
        calculateSumByRow();
        dialogBox(false);
    }else{
        dialogBox(false);
    }
})

confirmAddEntryButton.addEventListener("click", (e) => {
    e.preventDefault();

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}/${month}/${year}`;

    addNewEntry(entryNameInputValue.value,"Manual",currentDate,entryDateInputValue.value, "Admin 8","R$ " + entryValueInputValue.value,"");
    dialogBoxAdd(false);
})

document.addEventListener("click", (e) => {
    e.preventDefault();
    const targetEl = e.target;
    let id = targetEl.id;

    if (id == "cancel-button"){
        dialogBoxAdd(false);
        dialogBox(false);
    }
    
    if (targetEl.classList.contains("block-bg-elements")){
        dialogBoxAdd(false);
        dialogBox(false);
    }
})


cancelDiagBox.addEventListener("click", (e) => {
    e.preventDefault();

})