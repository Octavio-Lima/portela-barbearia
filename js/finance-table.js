import {PopUp_UpdateDetailWindow} from "./finance-page.js";
import {updateProfitCounter} from "./finance-page.js";
import {toMoneyFormat} from "./finance-page.js";
import {displayPopup} from "./finance-page.js";

export let savedEntries = [
    // {id:"", name:"", createType:"", dateCreated:"", datePayed:"", createBy:"", value:"", payType:""}
]


let userAccessType = localStorage.getItem("accessType");
let userName = localStorage.getItem("accessName");


// Seleção de Linhas
const ENTRY_TABLE = document.querySelector('tbody');
export let selectedEntry = null;
let entryList;

ENTRY_TABLE.addEventListener("click", (e) => {
    let entry = e.target.closest("tr");

    if (entry !== null) {
        selectRow(entry);
    }
})

function selectRow(entry) {
    entryList.forEach((row, index) => {
        row.classList.remove("selected");
    });

    entry.classList.add("selected");
    selectedEntry = entry;
}

export function removeEntry() {
    selectedEntry = null;
}

// Criar novo lançamento
export function addNewEntry(storeIt, id,  name, createType, dateCreated, datePayed, createBy, value, payType, tableIndex) {
    const ENTRY = document.createElement("tr");
    const ENTRY_NAME = document.createElement("td");
    const ENTRY_TYPE = document.createElement("td");
    const ENTRY_DATE_CREATED = document.createElement("td");
    const ENTRY_DATE_PAY = document.createElement("td");
    const ENTRY_CREATED_BY = document.createElement("td");
    const ENTRY_VALUE = document.createElement("td");
    const ENTRY_DETAIL = document.createElement("td");
    const ENTRY_DETAIL_BTN = document.createElement("button");
    const ENTRY_DETAIL_ICON = document.createElement("i");
    const ENTRY_EDITED_BY = document.createElement("p");
    const ENTRY_PAY_TYPE = document.createElement("p");
    const ENTRY_ID = document.createElement("p");
    const ENTRY_TABLE_INDEX = document.createElement("p");

    let isCredit = (createType === 'true');

    // Nova Entrada
    ENTRY.classList.add(isCredit ? "entry-credit" : "entry-debt");
    ENTRY.classList.add("entry");

    // Nome do Lançamento
    ENTRY_NAME.setAttribute('scope', 'row');
    ENTRY_NAME.innerText = name;
    ENTRY.appendChild(ENTRY_NAME);

    // Tipo de Lançamento
    ENTRY_TYPE.innerText = (isCredit ? "Entrada" : "Saída");
    ENTRY_TYPE.classList.add("d-none");
    ENTRY_TYPE.classList.add("d-md-table-cell");
    ENTRY.appendChild(ENTRY_TYPE);

    // Dia Criado
    ENTRY_DATE_CREATED.innerText = dateCreated;
    ENTRY_DATE_CREATED.classList.add("d-none");
    ENTRY_DATE_CREATED.classList.add("d-md-table-cell");
    ENTRY.appendChild(ENTRY_DATE_CREATED);

    // Dia Pago
    ENTRY_DATE_PAY.innerText = datePayed;
    ENTRY.appendChild(ENTRY_DATE_PAY);

    // Criado Por
    ENTRY_CREATED_BY.innerText = createBy;
    ENTRY_CREATED_BY.classList.add("d-none");
    ENTRY_CREATED_BY.classList.add("d-md-table-cell");
    ENTRY_CREATED_BY.classList.add("created-by");
    ENTRY.appendChild(ENTRY_CREATED_BY);

    // Valor
    ENTRY_VALUE.innerText = toMoneyFormat(value);
    ENTRY_VALUE.classList.add("value");
    ENTRY.appendChild(ENTRY_VALUE);

    // Detail Button
    ENTRY_DETAIL_ICON.classList.add("fa");
    ENTRY_DETAIL_ICON.classList.add("fa-bars");
    ENTRY_DETAIL_BTN.appendChild(ENTRY_DETAIL_ICON);
    
    ENTRY_DETAIL_BTN.setAttribute('type', 'button');
    ENTRY_DETAIL_BTN.classList.add("btn-show-detail");
    ENTRY_DETAIL_BTN.addEventListener("click", showDetailBtnEvent());
    ENTRY_DETAIL.classList.add("d-none");
    ENTRY_DETAIL.classList.add("d-md-table-cell");
    ENTRY_DETAIL.appendChild(ENTRY_DETAIL_BTN);
    ENTRY.appendChild(ENTRY_DETAIL);

    // Editado por
    ENTRY_EDITED_BY.classList.add("d-none")
    ENTRY_EDITED_BY.innerText = "";
    ENTRY.appendChild(ENTRY_EDITED_BY);

    // Tipo de Pagamento
    ENTRY_PAY_TYPE.classList.add("d-none")
    ENTRY_PAY_TYPE.innerText = payType;
    ENTRY.appendChild(ENTRY_PAY_TYPE);

    // ID
    ENTRY_ID.classList.add("d-none")
    ENTRY_ID.innerText = id;
    ENTRY.appendChild(ENTRY_ID);

    ENTRY_TABLE_INDEX.classList.add("d-none")
    ENTRY_TABLE_INDEX.classList.add("table-index")
    ENTRY_TABLE_INDEX.innerText = tableIndex;
    ENTRY.appendChild(ENTRY_TABLE_INDEX);
    
    ENTRY_TABLE.appendChild(ENTRY);

    // Store it, Update List and Total Value
    
    if (storeIt) {
        let newLocalStoreEntry = {
            id:"1", name:name, createType:createType, dateCreated:dateCreated, datePayed:datePayed, createBy:createBy, value:value, payType:payType
        }
        savedEntries.push(newLocalStoreEntry);
        localStorage.setItem("entryList", JSON.stringify(savedEntries));
    }

    entryList = document.querySelectorAll("tr");
    updateProfitCounter();
}

/* -- Detalhes do Lançamento */
function showDetailBtnEvent() {
    return function () {
        const parentEl = this.closest("tr");
        if (parentEl != null) {
            selectRow(parentEl);
            displayPopup(true, 3);
            PopUp_UpdateDetailWindow();
        }
    }
}

export function loadSavedEntries() {
    const storedEntries = JSON.parse(localStorage.getItem("entryList"));

    savedEntries = storedEntries;

    // Clear Table
    let tableList = document.querySelector("tbody")
    while (tableList.firstChild) {
        tableList.removeChild(tableList.firstChild);
    }

    if (!userAccessType.includes("proprietario")) {
            for (let index = 0; index < storedEntries.length; index++) {
                if (storedEntries[index].createBy == userName)
                {
                addNewEntry(false,
                    storedEntries[index].id,
                    storedEntries[index].name,
                    storedEntries[index].createType,
                    storedEntries[index].dateCreated,
                    storedEntries[index].datePayed,
                    storedEntries[index].createBy,
                    storedEntries[index].value,
                    storedEntries[index].payType,
                    index);
                }
        }
    } else {
        for (let index = 0; index < storedEntries.length; index++) {
            addNewEntry(false,
                storedEntries[index].id,
                storedEntries[index].name,
                storedEntries[index].createType,
                storedEntries[index].dateCreated,
                storedEntries[index].datePayed,
                storedEntries[index].createBy,
                storedEntries[index].value,
                storedEntries[index].payType,
                index);
            }
        }
    }

export function removedSavedEntry(entry) {

    let indexToDelete = entry.querySelector(".table-index").innerText;
    savedEntries.splice(indexToDelete, 1);

    localStorage.removeItem("entryList");
    localStorage.setItem("entryList", JSON.stringify(savedEntries));

    loadSavedEntries();
}

loadSavedEntries();

//  addNewEntry(false, "Pagamento do Cliente: Ana Silva Santos", 'true', "28/11/2022", "28/11/2022", "Administrador", 50, 0);
//  addNewEntry(false, "Pagamento do Cliente: Marcos Salvador", 'true', "08/01/2023", "08/01/2023", "Administrador", 30, 3);
//  addNewEntry(false, "Pagamento da Internet", 'false', "11/01/2023", "11/01/2023", "Administrador", 60, 3);