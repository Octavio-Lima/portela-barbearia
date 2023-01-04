const STORE_OPENS_AT = 8
const STORE_CLOSES_AT = 20
const EL_MAIN = document.querySelector("#schedule-list")

let entriesList = [];

function createEntry(hour, minute) {

    /*
                <div class="d-flex flex-row">
                    <p class="m-0"><strong>Nome do cliente (</strong></p>
                    <p class="m-0"><strong>procedimento)</strong></p>
                </div>

                <div class="d-flex flex-row">
                    <p>Telefone</p>
                    <span class="flex-grow-1"></span>
                    <p>instagram</p>
                </div>
            */

    let EL_ENTRY = document.createElement("div");
    let EL_TIME = document.createElement("h3");
    let EL_DESCRIPTION = document.createElement("div");
    let EL_CLIENT_TOP_ROW = document.createElement("div");
    let EL_CLIENT_BOT_ROW = document.createElement("div");
    let EL_CLIENT = document.createElement("p");
    let EL_SERVICE = document.createElement("p");
    let EL_PHONE = document.createElement("p");
    let EL_INSTA = document.createElement("p");
    let EL_SPACER = document.createElement("span");
    let EL_SPACERTWO = document.createElement("span");


    EL_ENTRY.classList.add("schedule-entry");
    EL_TIME.classList.add("me-3");
    EL_DESCRIPTION.classList.add("d-flex");
    EL_DESCRIPTION.classList.add("flex-column");
    EL_CLIENT_TOP_ROW.classList.add("d-flex");
    EL_CLIENT_TOP_ROW.classList.add("flex-row");
    EL_CLIENT.classList.add("m-0");
    EL_SERVICE.classList.add("m-0");
    EL_CLIENT_BOT_ROW.classList.add("d-flex");
    EL_CLIENT_BOT_ROW.classList.add("flex-row");
    EL_SPACER.classList.add("flex-grow-1");
    EL_SPACERTWO.classList.add("flex-grow-1");

    EL_TIME.innerText = formatTimeString(hour) + ":" + formatTimeString((15 * minute));

    EL_CLIENT_BOT_ROW.appendChild(EL_INSTA);
    EL_CLIENT_BOT_ROW.appendChild(EL_SPACER);
    EL_CLIENT_BOT_ROW.appendChild(EL_PHONE);

    EL_CLIENT_TOP_ROW.appendChild(EL_SERVICE);
    EL_CLIENT_TOP_ROW.appendChild(EL_SPACERTWO);
    EL_CLIENT_TOP_ROW.appendChild(EL_CLIENT);

    EL_ENTRY.appendChild(EL_TIME);
    EL_DESCRIPTION.appendChild(EL_CLIENT_TOP_ROW);
    EL_DESCRIPTION.appendChild(EL_CLIENT_BOT_ROW);
    EL_ENTRY.appendChild(EL_DESCRIPTION);

    EL_MAIN.appendChild(EL_ENTRY);
}

function addEntryInfo(time, minute, timeSpent, service, client, phone, insta) {
    let correctIndex = ((time * 4) + minute) - (STORE_OPENS_AT * 4);
    let entries = [];

    for (let i = 0; i < timeSpent; i++) {
        let j = correctIndex + i
        entries[i] = entriesList[j].children;
    }

    // let entry = entriesList[correctIndex].children;
    let entryDescription = entries[0].item(1).children;
    let descriptionTop = entryDescription.item(0).children;
    let descriptionBot = entryDescription.item(1).children;

    let el_name = descriptionTop.item(0);
    let el_service = descriptionTop.item(2);
    let el_phone = descriptionBot.item(0);
    let el_insta = descriptionBot.item(2);

    for (let i = 0; i < timeSpent; i++) {
        if (i == 0) { entries[i].item(1).classList.add("row-busy-top"); entries[i].item(0).parentElement.classList.add("top"); } else
            if (i == timeSpent - 1) { entries[i].item(1).classList.add("row-busy-bottom"); entries[i].item(0).parentElement.classList.add("base"); } else { entries[i].item(1).classList.add("row-busy"); console.log("middle"); entries[i].item(0).parentElement.classList.add("middle"); entries[i].item(0).parentElement.children.item(0).classList.add("hidden"); }
    }

    el_name.innerHTML = "<strong>" + client + "</strong>";
    el_service.innerHTML = "<strong>" + service + "</strong>";
    el_phone.innerText = phone;
    el_insta.innerText = insta;

    // entry.item(3).innerText = service;
    // el_client.innerText = client;
    // el_phone.innerText = phone;
    // el_insta.innerText = insta;
}

for (let i = STORE_OPENS_AT; i < STORE_CLOSES_AT; i++) {
    createEntry(i, 0)
    createEntry(i, 1)
    createEntry(i, 2)
    createEntry(i, 3)
    updateEntryList()
}


// || Extra

function formatTimeString(n) {
    if (n <= 9) { return "0" + n; } else { return n }
}

function updateEntryList() {
    entriesList = document.querySelectorAll(".schedule-entry");
}

addEntryInfo(8, 2, 3, "corte de cabelo", "João Silva", "(31)94865-1465", "@meuinstagram");
addEntryInfo(11, 2, 3, "corte de cabelo", "João Silva", "(31)94865-1465", "@meuinstagram");
addEntryInfo(12, 1, 5, "corte de cabelo", "Guilherme", "(31)91689-1125", "@instagram");