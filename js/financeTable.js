let allEntries = document.querySelectorAll(".table-row");
let entryValue = document.querySelectorAll(".value");
let entrySumValues = document.querySelectorAll(".value-sum");
const addEntryButton = document.querySelector("#add-entry");
const delEntryButton = document.querySelector("#del-entry");
const confirmDelEntry = document.querySelector("#confirm-del-button")
const filterEntryButton = document.querySelector("#filter-entry");
const financeTable = document.querySelector('table');
const blockBgElement = document.querySelector(".block-bg-elements");
const delEntryDiagBox = document.querySelector("#del-entry-window");
const cancelDiagBox = document.querySelector("#cancel-button")
const allDiagWindow = document.querySelectorAll(".dialog-window")
const addEntryDiagBox = document.querySelector("#add-entry-diag-box")
const confirmAddEntryButton = document.querySelector("#confirm-add-entry-button")

const entryNameInputValue = document.querySelector("#input-entry-name")
const entryDateInputValue = document.querySelector("#entry-date")
const entryValueInputValue = document.querySelector("#entry-value")
const IN_ENTRY_TYPE = document.querySelector("#entry-type")

let accessType = localStorage.getItem("accessType");
let accessName = localStorage.getItem("accessName");

const date = new Date();

let date_today = date.getDate();
let date_month = date.getMonth() + 1;
let date_year = date.getFullYear();
let currentDate = `${date_today}/${date_month}/${date_year}`;

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
  const EL_TOTAL_PROFIT = document.getElementById("total-profits");
  let sum = 0;

  // atualizar valores presentes na tabela
  entryValue = document.querySelectorAll(".value");
  let convertedRowValue = [];

  // Remover Cifrão e trocar virgulas por pontos
  entryValue.forEach((rowValue, index) => {
    let replaceComma = rowValue.textContent.replace(',','.');
    let removeSign = replaceComma.slice(2);
    let isDebt = rowValue.closest(".table-row").classList.contains("entry-type-debt");
    sum += (isDebt ? -parseFloat(removeSign) : parseFloat(removeSign));
  });
  //"R$"
  EL_TOTAL_PROFIT.innerHTML = "Total Mês Atual: " + toMoneyFormat(sum);
}

// Adicionar novos lançamentos
function addNewEntry(name, createType, dateCreated, datePayed, createBy, value) {
  const newEntry = document.createElement("tr");
  newEntry.classList.add("table-row");

  let isTrue = (createType === 'true');
  newEntry.classList.add(isTrue ? "entry-type-profit" : "entry-type-debt");

  const entryName = document.createElement("td");
  entryName.innerText = name;
  newEntry.appendChild(entryName);

  const entryType = document.createElement("td");
  entryType.innerText = (isTrue ? "Entrada" : "Saída");
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
  entryValueSum.classList.add("value-sum");
  const entryShowMoreBtn = document.createElement("button");
  entryShowMoreBtn.classList.add("fa");
  entryShowMoreBtn.classList.add("fa-bars");
  entryShowMoreBtn.classList.add("show-more-btn");
  entryValueSum.appendChild(entryShowMoreBtn);
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

    addNewEntry(entryNameInputValue.value, IN_ENTRY_TYPE.value,currentDate,entryDateInputValue.value, accessName,toMoneyFormat(entryValueInputValue.value),"");
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

function toMoneyFormat(value) {
  let convertToString = "" + value;
  let number = parseFloat(convertToString, 10); //console.log(number);
  let addDecimal = number.toFixed(2); //console.log(addDecimal);
  let replaceDot = addDecimal.replace('.', ','); //console.log(replaceDot);

  let result = convertToString;

  for (let index = addDecimal.length-2; index >= 0; index--) {
    if (index % 3 === 0) {
      let splitSta = result.slice(0, index);
      let splitEnd = result.slice(addDecimal.length-index);
      result = "" + splitSta + "." + splitEnd;
      // console.log(index);
      // console.log("divided by 3");
      // console.log(splitSta);
      // console.log(splitEnd);
      // console.log(addDecimal);
    }
  }

  return "R$" + replaceDot;
}

addNewEntry("primeiro lançamento",'true',"28/11/2020","02/04/2024", accessName,toMoneyFormat(170.30),"");
addNewEntry("Pagamento Dr. Mario",'false',"01/12/1990","30/12/1994", accessName,toMoneyFormat(900.00),"");