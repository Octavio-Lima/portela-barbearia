import {addNewEntry} from "./finance-table.js";
import {removeEntry} from "./finance-table.js";
import {savedEntries} from "./finance-table.js";
import {selectedEntry} from "./finance-table.js";
import {removedSavedEntry} from "./finance-table.js";

const blockBgElement = document.querySelector(".block-bg-elements");
const cancelDiagBox = document.querySelectorAll(".cancel-button")
const allDiagWindow = document.querySelectorAll(".pop-up")

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
let currentDate = `${twoNumberFormat(date_today)}/${twoNumberFormat(date_month)}/${twoNumberFormat(date_year)}`;

let EL_ADD_ENTRY_DAY = document.getElementById("add-entry-day");
let EL_ADD_ENTRY_MONTH = document.getElementById("add-entry-month");
let EL_ADD_ENTRY_YEAR = document.getElementById("add-entry-year");

// || Usuario Ativo

const EL_ACTIVE_USER = document.getElementById("active-user-name");
EL_ACTIVE_USER.innerText = accessName;

// || BOTÕES DE AÇÃO ---------------------------------------------------------------------
/* Janela de adicionar lançamentos */
document.getElementById("button-add-entry").addEventListener("click", function() {
    displayPopup(true, 0)
})

document.getElementById("confirm-add-entry-button").addEventListener("click", function() {
    checklist_addNewEntry();
})

function checklist_addNewEntry() {
    if (entryNameInputValue.value == "") { displayAlert("Informações Incompletas", "Deve ser preenchido o nome do lançamento para que seja possível cria-lo") } else
    if (EL_ADD_ENTRY_DAY.value == "0") { displayAlert("Informações Incompletas", "Deve ser escolhido um dia válido para que seja possível cria-lo") } else 
    if (EL_ADD_ENTRY_MONTH.value == "0") { displayAlert("Informações Incompletas", "Deve ser escolhido um mês válido para que seja possível cria-lo") } else
    if (EL_ADD_ENTRY_YEAR.value == "0") { displayAlert("Informações Incompletas", "Deve ser escolhido um ano válido para que seja possível cria-lo") } else
    if (OP_ADD_ENTRY_PAYTYPE.value == "0") { displayAlert("Informações Incompletas", "Deve ser escolhido a forma de pagamento do lançamento para que seja possível cria-lo") } else
    if (IN_ENTRY_TYPE.value == "0") { displayAlert("Informações Incompletas", "Deve ser escolhido o tipo de pagamento do lançamento para que seja possível cria-lo") } else
    {
        let dateInput = `${twoNumberFormat(EL_ADD_ENTRY_DAY.value)}/${twoNumberFormat(EL_ADD_ENTRY_MONTH.value)}/${EL_ADD_ENTRY_YEAR.value}`
        addNewEntry(true, 1 , entryNameInputValue.value, IN_ENTRY_TYPE.value, currentDate, dateInput, accessName, entryValueInputValue.value, OP_ADD_ENTRY_PAYTYPE.value, savedEntries.length);
        displayPopup(false);
    }
}

/* Janela de Apagar lançamentos */
document.getElementById("button-del-entry").addEventListener("click", function() {
    if (selectedEntry !== null) {
        displayPopup(true, 2); // janela de eliminar lançamento
    } else {
        displayAlert("Ação Incorreta", "deve ser selecionado um lançamento para que seja possível exclui-lo")
    }
})

document.getElementById("button-confirm-del").addEventListener("click", function() {
    if (selectedEntry !== null) {
        removedSavedEntry(selectedEntry);
        selectedEntry.remove();
        updateProfitCounter();
    }

    removeEntry();
    displayPopup(false);
})

/* Janela de Editar lançamentos */
document.getElementById("button-edit-entry").addEventListener("click", function() {
    if (selectedEntry !== null) {
        displayPopup(true, 1)
        PopUp_UpdateEditWindow(true);
    } else {
        displayAlert("Ação Incorreta", "deve ser selecionado um lançamento para que seja possível altera-lo")
    }
})

document.getElementById("button-confirm-edit").addEventListener("click", function() {
    saveEditedEntry();
})

/* Janela para filtar lançamentos*/
document.getElementById("button-filter-entry").addEventListener("click", function() {
    let filterContainer = document.getElementById("filter-container");
    filterContainer.classList.toggle("d-none")
})

/* Janela para Detalhes do Lançamentos */
document.getElementById("button-show-detail").addEventListener("click", function() {
    if (selectedEntry !== null) {
            displayPopup(true, 3);
            PopUp_UpdateDetailWindow();
    } else {
        displayAlert("Ação Incorreta", "deve ser selecionado um lançamento para que seja possível ver seus detalhes")
    }
})

// || Janela de Popup ------------------------------------------------------------------------

export function displayPopup(display, windowIndex) {
    if (display) {
        blockBgElement.classList.remove("d-none");
        allDiagWindow[windowIndex].classList.remove("d-none");
    } else {
        blockBgElement.classList.add("d-none");
        allDiagWindow.forEach(window => { window.classList.add("d-none"); });
    }

    // reset forms
    document.getElementById("add-entry-form").reset();

    // remove alert boxes
    let alertBox = document.querySelector(".alert-box");
    if (alertBox != null) { alertBox.remove(); }
}

function PopUp_UpdateEditWindow(showBox) {
    let entry = selectedEntry.children;
    let isTrue = (entry.item(1).innerHTML === 'Entrada');
    let dateStr = entry.item(3).innerHTML.replace(/\D/g, '');

    let day = parseInt(dateStr.slice(0, 2));
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

    selectedEntry.classList.add(isTrue ? "entry-credit" : "entry-debt");
    selectedEntry.classList.remove(isTrue ? "entry-debt" : "entry-credit");

    updateProfitCounter();
}

/* -- Detalhes do Lançamento */

export function PopUp_UpdateDetailWindow() {
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
    DETAIL_PAY_TYPE.innerText = entry.item(8).innerText;
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

cancelDiagBox.forEach(button => {
    button.addEventListener("click", function() { displayPopup(false); })
});

blockBgElement.addEventListener("click", function() {
    displayPopup(false);
})

// || ALERTA ----------------

let el_alert = document.querySelector(".alert-box");
let el_alertTitle = document.getElementById("alert-title");
let el_alertMsg = document.getElementById("alert-message");

function displayAlert(title, message) {
    if (el_alert != null) {
        el_alert.remove();
    }

    createAlert();
    el_alertTitle.innerText = title;
    el_alertMsg.innerText = message;
}

function createAlert() {

    // <div class="alert-box">
    //     <div class="d-flex">
    //         <p id="alert-title">Header do Alerta</p>
    //         <span class="flex-grow-1"></span>
    //         <button class=" fa-solid fa-xmark"></button>
    //     </div>
    //     <hr>
    //     <p id="alert-message">Corpo do Alerta</p>
    // </div>


    el_alert = document.createElement("div")
    el_alert.classList.add("alert-box");

    let el_alertHeader = document.createElement("div");
    el_alertHeader.classList.add("d-flex");

    el_alertTitle = document.createElement("p");
    el_alertTitle.id = "alert-title";

    let el_alertSpan = document.createElement("span");
    el_alertSpan.classList.add("flex-grow-1");

    let el_alertButton = document.createElement("button");
    el_alertButton.classList.add("fa-solid");
    el_alertButton.classList.add("fa-xmark");
    el_alertButton.addEventListener("click", closeAlert());

    let el_alertHR = document.createElement("hr");

    el_alertMsg = document.createElement("p");
    el_alertMsg.id = "alert-message";

    el_alertHeader.appendChild(el_alertTitle);
    el_alertHeader.appendChild(el_alertSpan);
    el_alertHeader.appendChild(el_alertButton);

    el_alert.appendChild(el_alertHeader);
    el_alert.appendChild(el_alertHR);
    el_alert.appendChild(el_alertMsg);

    document.body.appendChild(el_alert);
}

function closeAlert() {
    return function () {
        const alertBox = this.closest(".alert-box");
        if (alertBox != null) { alertBox.remove(); }
    }
}


// || OUTROS ---------------------

export function toMoneyFormat(value) {
    let convertToString = "" + value;
    let number = parseFloat(convertToString, 10); //console.log(number);
    let addDecimal = number.toFixed(2); //console.log(addDecimal);
    let replaceDot = addDecimal.replace('.', ','); //console.log(replaceDot);

    let result = convertToString;

    for (let index = addDecimal.length - 2; index >= 0; index--) {
        if (index % 3 === 0) {
            let splitSta = result.slice(0, index);
            let splitEnd = result.slice(addDecimal.length - index);
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

function twoNumberFormat(value) {
    if (value <= 9) {
        return "0" + value;
    } else {
        return value;
    }
}

// Calcular Valor Total
let entryValueList;

export function updateProfitCounter() {
    let listLength = JSON.parse(localStorage.getItem("entryList")).length;
    let tableLength = document.querySelector("tbody").childNodes.length;

    if (listLength == tableLength)
    {
        updateTotalProfit();
        updateWorkerTotalProfit(0, "joão pedro");
        updateWorkerTotalProfit(1, "lúcio xavier");
    }
}

function updateTotalProfit() {
    const EL_TOTAL_PROFIT = document.getElementById("total-profits");
    let sum = 0;

    // atualizar valores presentes na tabela
    entryValueList = document.querySelectorAll(".value");

    // Remover Cifrão e trocar virgulas por pontos
    entryValueList.forEach((rowValue) => {
        if (rowValue !== null) {
            let replaceComma = rowValue.textContent.replace(',', '.');
            let removeSign = replaceComma.slice(2);
            let isDebt = rowValue.closest("tr").classList.contains("entry-debt");
            sum += (isDebt ? -parseFloat(removeSign) : parseFloat(removeSign));
        }
    });

    //"R$"
    if (sum < 0) { EL_TOTAL_PROFIT.classList.add("red-text"); } else { EL_TOTAL_PROFIT.classList.remove("red-text");}
    EL_TOTAL_PROFIT.innerText = toMoneyFormat(sum);
}

function updateWorkerTotalProfit(worker_id, worker_name) {
    const EL_WORKER_PROFIT = document.getElementById("total-profits-worker-" + worker_id);
    let sum = 0;

    // atualizar valores presentes na tabela
    let entryCreatedByList = document.querySelectorAll(".created-by")
    let entryList = new Array;
    for (let index = 0; index < entryCreatedByList.length; index++) {
        if (entryCreatedByList[index].innerText == worker_name) {
            entryList.push(entryCreatedByList[index].closest("tr"))
        }
    }

    let entryListValue = new Array;
    for (let index = 0; index < entryList.length; index++) {
        entryListValue.push(entryList[index].querySelector(".value"))
    }

    // Remover Cifrão e trocar virgulas por pontos
    entryListValue.forEach((rowValue) => {
        if (rowValue !== null) {
            let replaceComma = rowValue.textContent.replace(',', '.');
            let removeSign = replaceComma.slice(2);
            let isDebt = rowValue.closest("tr").classList.contains("entry-debt");
            sum += (isDebt ? -parseFloat(removeSign) : parseFloat(removeSign));
        }
    });

    // //"R$"
    if (sum < 0) { EL_WORKER_PROFIT.classList.add("red-text"); } else { EL_WORKER_PROFIT.classList.remove("red-text");}
    EL_WORKER_PROFIT.innerText = toMoneyFormat(sum);
}

function updateAvailableDate() {    

    const date = new Date();

    let date_today = date.getDate();
    let date_month = date.getMonth() + 1;
    let date_year = date.getFullYear();
    let currentDate = `${date_today}/${date_month}/${date_year}`;

    for (let index = (date_year - 5); index <= (date_year + 5); index++) {
        EL_ADD_ENTRY_YEAR.appendChild(createOption(index));
    }

    for (let index = 0; index <= 12; index++) {
        EL_ADD_ENTRY_MONTH.appendChild(createOption(index));
    }

    for (let index = 0; index <= 31; index++) {
        EL_ADD_ENTRY_DAY.appendChild(createOption(index));
    }

    
}

function createOption(value) {
    let el_option = document.createElement("option")
    let fullNumber = ((value <= 9)? "0" + value : value )
    el_option.value = value;
    el_option.innerText = fullNumber;

    return el_option;
}

updateAvailableDate();