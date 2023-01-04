let allEntries = document.querySelectorAll("tr");
let entryValue = document.querySelectorAll(".value");
const addEntryButton = document.querySelector("#add-entry");
const delEntryButton = document.querySelector("#del-entry");
const confirmDelEntry = document.querySelector("#confirm-del-button")
const BTN_FILTER = document.querySelector("#filter-entry");
const financeTable = document.querySelector('tbody');
const blockBgElement = document.querySelector(".block-bg-elements");
const delEntryDiagBox = document.querySelector("#del-entry-window");
const cancelDiagBox = document.querySelector("#cancel-button")
const allDiagWindow = document.querySelectorAll(".dialog-window")
const addEntryDiagBox = document.querySelector("#add-entry-diag-box")
const EL_EDIT_ENTRY = document.getElementById("edit-entry-diag-box")
const confirmAddEntryButton = document.querySelector("#confirm-add-entry-button")
const BTN_EDIT_ENTRY = document.getElementById("edit-entry");
let btn_show_detail = document.querySelectorAll(".show-more-btn");

const OP_ADD_ENTRY_PAYTYPE = document.getElementById("pay-type");

const IN_EDIT_ENTRY_NAME = document.getElementById("edit-entry-name");
const IN_EDIT_ENTRY_DATE = document.getElementById("edit-entry-date");
const IN_EDIT_ENTRY_PRICE = document.getElementById("edit-entry-price");
const IN_EDIT_ENTRY_TYPE = document.getElementById("edit-entry-type");
const OP_EDIT_ENTRY_PAYTYPE = document.getElementById("edit-pay-type");

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

let selectedEntry = null;

// Seleção de Linhas
function selectRow(selectedRow) {
  allEntries = document.querySelectorAll("tr");
  allEntries.forEach((row, index) => {
    row.classList.remove("selected");
  });

  selectedRow.classList.add("selected");
  selectedEntry = selectedRow;
}

document.addEventListener("click", (e) => {
  e.preventDefault();
  const parentEl = e.target.closest("tr");

  if (parentEl !== null)
  {
    selectRow(parentEl);
  }
})

// Calcular Valor Total
function updateTotalProfit() {
  const EL_TOTAL_PROFIT = document.getElementById("total-profits");
  let sum = 0;

  // atualizar valores presentes na tabela
  entryValue = document.querySelectorAll(".value");
  let convertedRowValue = [];

  // Remover Cifrão e trocar virgulas por pontos
  entryValue.forEach((rowValue, index) => {
    if (rowValue !== null) {
      let replaceComma = rowValue.textContent.replace(',','.');
      let removeSign = replaceComma.slice(2);
      let isDebt = rowValue.closest("tr").classList.contains("table-danger");
      sum += (isDebt ? -parseFloat(removeSign) : parseFloat(removeSign));
    }
  });
  //"R$"
  EL_TOTAL_PROFIT.innerHTML = "Total Mês Atual: " + toMoneyFormat(sum);
}

BTN_FILTER.addEventListener("click", (e) => {
  updateTotalProfit();
})

delEntryButton.addEventListener("click", (e) => {
    e.preventDefault();
    
    let entryToDelete = document.querySelector(".selected");
    if (entryToDelete !== null) {
      displayPopup(true, 2); // janela de eliminar lançamento
    }
})

// || Janela de Popup ------------------------------------------------------------------------

function displayPopup(display, windowIndex) {
  if (display) {
    blockBgElement.classList.remove("d-none");
    allDiagWindow[windowIndex].classList.remove("d-none");
  } else {
    blockBgElement.classList.add("d-none");
    allDiagWindow.forEach(window => { window.classList.add("d-none"); });
  }
}

/* -- Janela de adicionar lançamentos */
addEntryButton.addEventListener("click", (e) => {
  displayPopup(true, 0);
})

// Criar novo lançamento
function addNewEntry(name, createType, dateCreated, datePayed, createBy, value, payType) {

  
/* <tr class="table-danger">
  <td scope="row" colspan="3">Primeiro Lançamento</th>
  <td>Entrada</td>
  <td>28/11/2020</td>
  <td>02/04/2024</td>
  <td>Administrador</td>
  <td>R$170,30</td>
  <td><i class="fa fa-bars"></i></td>
</tr> */


/* <button type="button" class="btn btn-default">
  <span class="glyphicon glyphicon-align-left"></span>
</button> */


  const newEntry = document.createElement("tr");
  const entryName = document.createElement("td");
  const entryType = document.createElement("td");
  const entryDateCreated = document.createElement("td");
  const entryCreatedBy = document.createElement("td");
  const entryValue = document.createElement("td");
  const entryDetail = document.createElement("td");
  const entryDetailBtn = document.createElement("button");
  const entryDetailIcon = document.createElement("i");
  const entryDatePayed = document.createElement("td");
  const entryEditedBy = document.createElement("p");
  const entryPayType = document.createElement("p");

  let isTrue = (createType === 'true');

  newEntry.classList.add(isTrue ? "table-primary" : "table-danger");

  entryName.setAttribute('scope','row');
  entryName.setAttribute('colspan','3');
  entryName.classList.add("table-data");
  
  entryName.innerText = name;
  entryType.innerText = (isTrue ? "Entrada" : "Saída");
  entryDateCreated.innerText = dateCreated;
  entryDatePayed.innerText = datePayed;
  entryCreatedBy.innerText = createBy;
  entryValue.innerText = value;
  entryPayType.innerText = payType;
  
  entryValue.classList.add("value");

  entryDetailBtn.setAttribute('type','button');
  entryDetailBtn.classList.add("btn");
  entryDetailBtn.classList.add("btn-default");

  entryDetailIcon.classList.add("fa");
  entryDetailIcon.classList.add("fa-bars");
  entryDetailIcon.classList.add("show-more-btn");
  entryEditedBy.classList.add("d-none")
  entryPayType.classList.add("d-none")

  entryDetailBtn.addEventListener("click", showDetailBtnEvent());
  
  newEntry.appendChild(entryName);
  newEntry.appendChild(entryType);
  newEntry.appendChild(entryDateCreated);
  newEntry.appendChild(entryDatePayed);
  newEntry.appendChild(entryCreatedBy);
  newEntry.appendChild(entryValue);
  entryDetailBtn.appendChild(entryDetailIcon);
  entryDetail.appendChild(entryDetailBtn);
  newEntry.appendChild(entryDetail);
  newEntry.appendChild(entryEditedBy);
  newEntry.appendChild(entryPayType);
  financeTable.appendChild(newEntry);

  updateTotalProfit();
}

/* -- Editar Lançamentos */

document.getElementById("edit-entry").addEventListener("click", (e) => {
  e.preventDefault();
  
  if (selectedEntry !== null) {
    displayPopup(true, 1)
    editEntryBox(true);
  }
})

function editEntryBox(showBox) {
  let entry = selectedEntry.children;
  let isTrue = (entry.item(1).innerHTML === 'Entrada');
  let dateStr = entry.item(3).innerHTML.replace(/\D/g,''); 

  let day =  parseInt(dateStr.slice(0, 2));
  let month = (parseInt(dateStr.slice(2, 4)) - 1);
  let year = parseInt(dateStr.slice(4, 8));

  let dateFromEntry = new Date();
  dateFromEntry.setDate(day)
  dateFromEntry.setMonth(month)
  dateFromEntry.setFullYear(year);

  IN_EDIT_ENTRY_NAME.value = entry.item(0).innerText;
  IN_EDIT_ENTRY_DATE.valueAsDate = dateFromEntry;
  IN_EDIT_ENTRY_PRICE.value = toNumberFormat(entry.item(5).innerHTML); 
  IN_EDIT_ENTRY_TYPE.value = (isTrue ? "true" : "false");;
  OP_EDIT_ENTRY_PAYTYPE.value = entry.item(8).innerText;
}

function saveEditedEntry() {
  displayPopup(false);

  let isTrue = (IN_EDIT_ENTRY_TYPE.value === 'true');
  let entry = selectedEntry.children;

  entry.item(0).innerHTML = IN_EDIT_ENTRY_NAME.value;
  entry.item(1).innerHTML = (isTrue ? "Entrada" : "Saída");
  entry.item(3).innerHTML = IN_EDIT_ENTRY_DATE.value;
  entry.item(5).innerHTML = toMoneyFormat(IN_EDIT_ENTRY_PRICE.value);
  entry.item(7).innerHTML = accessName;
  entry.item(8).innerHTML = OP_EDIT_ENTRY_PAYTYPE.value;

  selectedEntry.classList.add(isTrue ? "table-primary" : "table-danger");
  selectedEntry.classList.remove(isTrue ? "table-danger" : "table-primary");

  updateTotalProfit();
}


confirmDelEntry.addEventListener("click", (e) => {
  e.preventDefault();

  let entryToDelete = document.querySelector(".selected");
  if (entryToDelete !== null) {
    entryToDelete.remove();
    updateTotalProfit();
    displayPopup(false);
  }else{
    displayPopup(false);
  }
})

/* -- Detalhes do Lançamento */

function showDetailBtnEvent() {
  return function() {
    const parentEl = this.closest("tr");
    if (parentEl != null){
      selectRow(parentEl);
      displayPopup(true, 3);
      updateEntryDetail();
    }
  }
}

function updateEntryDetail() {
  const DETAIL_NAME = document.getElementById("det-name");
  const DETAIL_TOTAL_VALUE = document.getElementById("det-total-value");
  const DETAIL_PAY_TYPE = document.getElementById("det-pay-type");
  const DETAIL_PAYED_IN = document.getElementById("det-payed-in");
  const DETAIL_CREATED_IN = document.getElementById("det-created-in");
  const DETAIL_CREATED_BY = document.getElementById("det-created-by");
  const DETAIL_EDITED_BY = document.getElementById("det-edited-by");

  let entry = selectedEntry.children;

  const PAYTYPE = ["Dinheiro", "Cartão de Débito", "Cartão de Crédito", "Pix"]

  DETAIL_NAME.innerText = entry.item(0).innerHTML
  DETAIL_TOTAL_VALUE.innerText = entry.item(5).innerText
  DETAIL_PAY_TYPE.innerText = PAYTYPE[parseInt(entry.item(8).innerText)];
  DETAIL_PAYED_IN.innerText = entry.item(3).innerText
  DETAIL_CREATED_IN.innerText = entry.item(2).innerText
  DETAIL_CREATED_BY.innerText = entry.item(4).innerText;
  DETAIL_EDITED_BY.innerText = entry.item(7).innerText;

  let hasBeenEdited = (entry.item(7).innerText.length > 0)
  if (hasBeenEdited) { 
    DETAIL_EDITED_BY.parentElement.classList.remove("d-none"); 
  } else { 
    DETAIL_EDITED_BY.parentElement.classList.add("d-none"); 
  }
}

confirmAddEntryButton.addEventListener("click", (e) => {
  e.preventDefault();

  addNewEntry(entryNameInputValue.value, IN_ENTRY_TYPE.value,currentDate,entryDateInputValue.value, accessName,toMoneyFormat(entryValueInputValue.value), OP_ADD_ENTRY_PAYTYPE.value);
  displayPopup(false);
})

document.addEventListener("click", (e) => {
  e.preventDefault();
  const targetEl = e.target;
  let id = targetEl.id;

  if (id == "cancel-button") {
    displayPopup(false);
  }
  
  if (targetEl.classList.contains("block-bg-elements")){
    displayPopup(false);
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

function toNumberFormat(value) {
  let removeSigns = value.slice(2);
  let number = parseFloat(removeSigns, 10); //console.log(number);
  let addDecimal = number.toFixed(2); //console.log(addDecimal);
  let replaceDot = addDecimal.replace('.', ','); //console.log(replaceDot);

  return replaceDot;
}

addNewEntry("primeiro lançamento",'true',"28/11/2020","02/04/2024", "Administrador",toMoneyFormat(170.30),0);
addNewEntry("Segundo Lançamento",'false',"01/12/1990","30/12/1994", "Administrador",toMoneyFormat(900.00),3);