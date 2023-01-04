const STORE_OPENS_AT = 8
const STORE_CLOSES_AT = 20
const EL_MAIN = document.querySelector("#schedule-list")

let entriesList = [];

function createEntry(hour, minute) {
  let el_entry = document.createElement("div");
  let el_time = document.createElement("h3");
  let el_entryInfo = document.createElement("div");
  let el_service = document.createElement("h4");
  let el_client = document.createElement("h4");
  let el_clientDetail = document.createElement("div");
  let el_phone = document.createElement("p");
  let el_insta = document.createElement("p");
  let el_spacer = document.createElement("span");
  
  el_entry.classList.add("schedule-entry");
  el_entryInfo.classList.add("row-info");
  el_clientDetail.classList.add("row-client-detail");
  el_spacer.classList.add("flex-space");

  el_time.innerText = formatTimeString(hour) + ":" + formatTimeString((15 * minute));

  el_entry.appendChild(el_time);
  el_entry.appendChild(el_entryInfo);
  el_entryInfo.appendChild(el_service);
  el_entryInfo.appendChild(el_client);
  el_entryInfo.appendChild(el_clientDetail);
  el_clientDetail.appendChild(el_phone);
  el_clientDetail.appendChild(el_spacer);
  el_clientDetail.appendChild(el_insta);

  EL_MAIN.appendChild(el_entry);
}

function addEntryInfo(time, minute, timeSpent, service, client, phone, insta) {
  let correctIndex = ((time * 4) + minute) - (STORE_OPENS_AT * 4);
  let entries = [];

  for (let i = 0; i < timeSpent; i++) {
    let j = correctIndex + i
    entries[i] = entriesList[j].children;
  }

  // let entry = entriesList[correctIndex].children;
  let rowInfo = entries[0].item(1).children;
  let clientInfo = rowInfo.item(2).children;

  let el_service = rowInfo.item(0);
  let el_name = rowInfo.item(1);
  let el_phone = clientInfo.item(0);
  let el_insta = clientInfo.item(2);

  for (let i = 0; i < timeSpent; i++) {
    if (i == 0) { entries[i].item(1).classList.add("row-busy-top"); entries[i].item(0).parentElement.classList.add("top"); } else
    if (i == timeSpent-1) { entries[i].item(1).classList.add("row-busy-bottom"); entries[i].item(0).parentElement.classList.add("base"); } else 
    { entries[i].item(1).classList.add("row-busy"); console.log("middle"); entries[i].item(0).parentElement.classList.add("middle"); entries[i].item(0).parentElement.children.item(0).classList.add("hidden"); } 
  }
  
  el_service.innerText = service;
  el_name.innerText = client;
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

addEntryInfo(11,2, 3,"corte de cabelo","João Silva","(31)94865-1465","@meuinstagram");
addEntryInfo(12,1, 5,"corte de cabelo","Guilherme","(31)91689-1125","@instagram");