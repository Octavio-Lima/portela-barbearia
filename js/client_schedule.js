const EL_CALENDAR_DAY = document.querySelectorAll(".calendar-pick-day");
const EL_WINDOW_APPOINTMENT = document.querySelector("main-pop-up")
const EL_BLUR = document.querySelector(".blur-overlay");
const EL_WINDOW_SPACER = document.querySelector("#diag-box-space");
const EL_CLOSE_SCHEDULE_WINDOW = document.querySelector("#cancel-schedule");
const EL_LINK_CONTAINER = document.querySelector(".links-container");
const EL_FOOTER = document.querySelector("footer");
const EL_FOOTER_SPACER = document.querySelector("#footer-spacer");
const EL_BARBERS = document.querySelectorAll(".barber");
EL_BARBERS.forEach((worker, index) => { worker.setAttribute("id", index); }); // Define um ID para cada barbeiro

let selectedBarber = 0;

//  ||  Selecionar BARBEIRO   //---------------------------------------------------------------------------

document.addEventListener("click", (e) => {
  targetEl = e.target;
  barberEl = targetEl.closest(".barber");

  if (barberEl !== null) {  // Seleciona o barbeiro selecionado
    activateBarber(barberEl.id);
  }
})

function activateBarber(id) {
  displayScheduler(true, false);
  addRemoveElementClass(EL_BARBERS, false, "selected-worker")
  EL_BARBERS.forEach(el => { el.children.item(1).classList.remove("text-glow");});
  EL_BARBERS[id].classList.add("selected-worker");
  EL_BARBERS[id].children.item(1).classList.add("text-glow");
  selectedBarber = id;
}

function displayScheduler(show, clearInput) {
  if (show) { // Quando é selecionado um barbeiro
    EL_BLUR.classList.remove("hidden");
    EL_WINDOW_APPOINTMENT.classList.remove("hidden");
    EL_WINDOW_SPACER.classList.remove("hidden");
    EL_CLOSE_SCHEDULE_WINDOW.classList.remove("hidden");
    EL_LINK_CONTAINER.classList.add("hidden");
    EL_FOOTER.classList.add("hidden");
    EL_FOOTER_SPACER.classList.add("hidden");
  } else { // Quando sair da tela de agendamentos
    EL_BLUR.classList.add("hidden")
    EL_WINDOW_APPOINTMENT.classList.add("hidden")
    EL_WINDOW_SPACER.classList.add("hidden");
    EL_CLOSE_SCHEDULE_WINDOW.classList.add("hidden");
    EL_LINK_CONTAINER.classList.remove("hidden");
    EL_FOOTER.classList.remove("hidden");
    EL_FOOTER_SPACER.classList.remove("hidden");
    EL_BARBERS.forEach(el => { el.children.item(1).classList.remove("text-glow");});
  }

  setActiveWindow(0);

  if (clearInput) {
    resetAllScheduleInfo()
  }
}



//  ||  Janela Principal  //---------------------------------------------------------------------------

// Variables
let isNextMonth = false;

const EL_WINDOW_CALENDAR = document.querySelector("#calendar-window");
const EL_WINDOW_CLIENT_INFO = document.querySelector("#client-info-window");
const EL_WINDOW_SCHEDULE = document.querySelector("#schedule-window");
const EL_WINDOW_SERVICE = document.querySelector("#service-window");
const EL_WINDOW_OVERVIEW = document.querySelector("#overview-window");
const EL_SCHEDULE_TABLE = document.getElementById("schedule-list");
const IN_CLIENT_NAME = document.querySelector("#input-client-name");
const IN_CLIENT_PHONE = document.querySelector("#input-client-phone");
const IN_CLIENT_EMAIL = document.querySelector("#input-client-email");
const IN_CLIENT_INSTA = document.querySelector("#input-client-instagram");
const EL_CALENDAR_DAY_HEADER = document.querySelectorAll(".calendar-day-header")

let StoreOpensAt = 8;
let StoreClosesAt = 20;
let storeWorkDays = [0, 0, 1, 1, 1, 1, 1]; // domingo a segunda

let data_day;
let data_month;
let data_year;
let data_clientName;
let data_clientPhone;
let data_clientEmail;
let data_clientInsta;
let data_services;
let data_time;
let data_minute = 0;
let data_totalPrice = 0;

let disableScheduleList = []

let hasUpdatedSchedule = false;
let hasUpdatedServices = false;

let calendarStartsWithDay = 1; // 0 = domingo, 1 = segunda, 2 = ...

// MUDAR DE JANELAS

const windowPages = [ // Agrupar todas as janelas em uma array só
  EL_WINDOW_CALENDAR,
  EL_WINDOW_CLIENT_INFO,
  EL_WINDOW_SERVICE,
  EL_WINDOW_SCHEDULE,
  EL_WINDOW_OVERVIEW
]

const monthNames = [
  "JANEIRO",
  "FEVEREIRO",
  "MARÇO",
  "ABRIL",
  "MAIO",
  "JUNHO",
  "JULHO",
  "AGOSTO",
  "SETEMBRO",
  "OUTUBRO",
  "NOVEMBRO",
  "DEZEMBRO"
]

const date = new Date();
const currentYear = date.getFullYear();
const currentMonth = date.getMonth();
const nextMonth = ((currentMonth + 1) >= 12 ? 0 : currentMonth + 1); // o maximo de meses são 11, se for maior volta pra 0
const nextYear = date.getFullYear()+1;

const cal_monthFirstDay = new Date(currentYear, currentMonth, 1).getDay();
const cal_monthTotalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

const service_list = [ // serviço, preço, id, minutos (15*n)
  ['CORTE', 25, 0, 2],
  ['BARBOTERAPIA', 25, 1, 4],
  ['SOBRANCELHA', 10, 2, 1],
  ['CERVEJA', 10, 3, 0]
]

function setActiveWindow(index) {
  if (checkWindowRequirement(index)) {
    updateInformation(index);
    addRemoveElementClass(windowPages, true, "hidden")
    windowPages[index].classList.remove("hidden");
  }
}

function checkWindowRequirement(index) {
  if (index == 0) { return true; }
  if (index == 1) { // conferir calendario
    if ((diaAgendado <= 0 || diaAgendado >= 32)) {
      alert("Por favor, selecione um dia valido para que seja possível prosseguir com o agendamento");
    } else return true
  }
  if (index == 2) { // conferir formulario do cliente
    data_clientName = IN_CLIENT_NAME.value;
    data_clientInsta = IN_CLIENT_INSTA.value;
    data_clientEmail = IN_CLIENT_EMAIL.value;
    data_clientPhone = IN_CLIENT_PHONE.value;
    if ((!data_clientName || data_clientPhone.length < 11 || !checkEmail(data_clientEmail) || !data_clientInsta)) {
      alert("Por favor, preencha todas as informações para que seja possível prosseguir");
    } else return true
  }
  if (index == 3) { // conferir selecionamento do serviço / produto
    if ((!data_clientName || !data_clientPhone || !data_clientEmail || !data_clientInsta)) {
      alert("Por favor, preencha todas as informações para que seja possível prosseguir");
    } else return true
  }
  if (index == 4) { // conferir agendamento de horario
    if (!data_time) {
      alert("Por favor, selecione um horário disponivel para que seja possível prosseguir");
    } else return true
  }
  if (index == 5) { // conferir selecionamento do serviço
    if ((!data_clientName || !data_clientPhone || !data_clientEmail || !data_clientInsta)) {
      alert("Por favor, preencha todas as informações para que seja possível prosseguir");
    } else return true
  }

  return false;
}

//  ||  Calendario     //---------------------------------------------------------------------------

EL_WINDOW_CALENDAR.addEventListener("click", (e) => {
  let day = e.target;

  // || SELECIONAR DIAS NO CALENDARIO
  if (day.classList.contains("calendar-pick-day")) {
    addRemoveElementClass(EL_CALENDAR_DAY, false, "selected-day"); // desmarca todos os outros dias do calendario
    day.classList.add("selected-day"); // marcar o dia selecionado

    // converte dia string do calendario para int
    storeDate(parseInt(day.closest(".selected-day").innerText, 10));
  }
})

function storeDate(day) {
  diaAgendado = day;
  data_month = (isNextMonth ? nextMonth : currentMonth);
  data_year = (cal_nextMonthYear());
}

const EL_CAL_PREV = document.querySelector("#previous-month");
const EL_CAL_NEXT = document.querySelector("#next-month");

EL_CAL_PREV.addEventListener("click", (e) => { updateCalendar(false); })
EL_CAL_NEXT.addEventListener("click", (e) => { updateCalendar(true); })

function updateCalendar(showNextMonth) { // Cabeçalho do calendario | Atualizar dias disponiveis no calendario
  const EL_CAL_TITLE = document.querySelector("#month-name");

  let difference = calendarStartsWithDay - 7;

  let firstDay = (showNextMonth ? cal_nextMonthFirstDay() : cal_monthFirstDay) - calendarStartsWithDay;
  let totalDays = (showNextMonth ? cal_nextMonthTotalDays() : cal_monthTotalDays);
  let month = (showNextMonth ? nextMonth : currentMonth);
  let year = (showNextMonth ? cal_nextMonthYear() : currentYear);
  
  let correctIndex = ((firstDay < 0) ? (firstDay + calendarStartsWithDay - (difference)) : firstDay);
  
  for (let index = 0; index < 42; index++) {
    if (index < correctIndex) { EL_CALENDAR_DAY[index].innerText = ""; }
    if (index >= correctIndex) { EL_CALENDAR_DAY[index].innerText = index - correctIndex + 1; }
    if (index > totalDays + correctIndex - 1) { EL_CALENDAR_DAY[index].innerText = ""; }
  }
  
  EL_CAL_TITLE.innerText = monthNames[month] + " / " + year;
  if (showNextMonth) { enableAllDays(); } else { disablePastDays();}
  if (showNextMonth) {
    EL_CAL_PREV.classList.remove("hide-arrow");
    EL_CAL_NEXT.classList.add("hide-arrow"); 
  } else { 
    EL_CAL_PREV.classList.add("hide-arrow");
    EL_CAL_NEXT.classList.remove("hide-arrow");
  }

}

function disablePastDays() { // Desabilita dias anteriores, para evitar agendamentos em dias passados
    let today = date.getDate();

    for (let index = 0; index < (today + cal_monthFirstDay -1); index++) {
        EL_CALENDAR_DAY[index].classList.add("disabled-day");        
    }

    // remove a classe de selecionado em todos os dias do calendario 
    addRemoveElementClass(EL_CALENDAR_DAY, false, "selected-day");

    diaAgendado = 0; // marca como nenhum dia foi selecionado
    isNextMonth = false;
}

function disableEntireColumn(day) { // Desabilita dias anteriores, para evitar agendamentos em dias passados
  for (let index = 0; index < 6; index++) {
    let dayToDisable = -calendarStartsWithDay + day + (index * 7);
    if (dayToDisable < 0) {
      EL_CALENDAR_DAY[dayToDisable + 7].classList.add("unavailable-day");
    } else {
      EL_CALENDAR_DAY[dayToDisable].classList.add("unavailable-day");        
    }
  }

  // remove a classe de selecionado em todos os dias do calendario 
  addRemoveElementClass(EL_CALENDAR_DAY, false, "selected-day");
}

function enableAllDays() { // habilita todos os dias, pois é o mês que vem
  addRemoveElementClass(EL_CALENDAR_DAY, false, "selected-day");
  addRemoveElementClass(EL_CALENDAR_DAY, false, "disabled-day");

  diaAgendado = 0; // marca como nenhum dia foi selecionado
  isNextMonth = true;
}

function shiftCalendarDays() {
  let oldOrder = new Array();
  for (let i = 0; i < 7; i++) { oldOrder[i] = EL_CALENDAR_DAY_HEADER[i]; }

  const elements = oldOrder.splice(0, calendarStartsWithDay);
  
  for (let i = 0; i < elements.length; i++) { oldOrder.push(elements[i]); }

  let dayName = ['Dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab']

  EL_CALENDAR_DAY_HEADER.forEach((day, index) => {
    let correctIndex = index + calendarStartsWithDay;
    if (correctIndex > 6) {
      day.innerText = dayName[correctIndex - 7];
    } else {
      day.innerText = dayName[correctIndex];
    }
  });
}

//  ||  Informações do cliente     //---------------------------------------------------------------------------



//  ||  Serviços     //---------------------------------------------------------------------------

EL_WINDOW_SERVICE.addEventListener("click", (e) => {
  let targetEl = e.target;
  let parentEl = targetEl.closest("tr");

  if (parentEl !== null){
    let tar_id = parseInt(parentEl.id, 10);

    if (parentEl.classList.contains("selected")) {
      parentEl.classList.remove("selected");
      data_minute -= service_list[tar_id][3]
      data_totalPrice -= service_list[tar_id][1]
    } else {
      parentEl.classList.add("selected");
      data_minute += service_list[tar_id][3]
      data_totalPrice += service_list[tar_id][1]
    }
    
    let totalTime = document.getElementById("total-time").innerHTML = 
    "Total Time: " + data_minute * 15 + " Minutes | Preço Total: " + stringToPrice(data_totalPrice);
  }
})


function updateServiceTable() {  // atualizar tabela de serviços
  if (!hasUpdatedServices) {
    hasUpdatedServices = true;
    const table = document.querySelector("#service-table");
  
    for (let index = 0; index < service_list.length; index++) {
      table.appendChild(createServiceElement(service_list[index][0], stringToPrice(service_list[index][1]), service_list[index][2]))
    }
  }
}

function createServiceElement(service, price, id) {
  let tableRow = document.createElement("tr");
  tableRow.classList.add("services");
  tableRow.id = id;

  let serviceName = document.createElement("td");
  serviceName.classList.add("service-name");
  serviceName.innerHTML = service;

  let servicePrice = document.createElement("td");
  servicePrice.classList.add("service-price");
  servicePrice.innerHTML = price;

  tableRow.appendChild(serviceName);
  tableRow.appendChild(servicePrice);

  return tableRow;
}

//  ||  Horarios disponiveis   ||  //---------------------------------------------------------------------------

EL_SCHEDULE_TABLE.addEventListener("click", (e) => {
  targetEl = e.target.closest(".schedule-entry");

  if (targetEl != null)
  {
    if (!targetEl.classList.contains("unavailable"))
    {
      let allTimeInSchedule = document.querySelectorAll(".schedule-entry");
      addRemoveElementClass(allTimeInSchedule, false, "selected");
    
      targetEl.classList.add("selected");
      data_time = targetEl.firstChild.firstChild.innerHTML;
    }
  }
})

function updateServiceTitle() {
  const service_title = document.querySelector("#service-title");

  service_title.innerText = diaAgendado + " " + monthNames[data_month] + ", " + data_year;
}

function updateSchedule() {
  if (!hasUpdatedSchedule) {
    hasUpdatedSchedule = true;

    for (let i = StoreOpensAt; i < StoreClosesAt; i++) {
      EL_SCHEDULE_TABLE.append(createScheduleTime(i, 0));
      EL_SCHEDULE_TABLE.append(createScheduleTime(i, 15));
      EL_SCHEDULE_TABLE.append(createScheduleTime(i, 30));
      EL_SCHEDULE_TABLE.append(createScheduleTime(i, 45));
  
      if (i == StoreClosesAt-1) {
        for (let j = 0; j < disableScheduleList.length; j++) {
          disableSchedule(disableScheduleList[j][0], disableScheduleList[j][1], disableScheduleList[j][2], disableScheduleList[j][3]);
        }
      }
    }
  }
}

function createScheduleTime(time, minute) {
  let entry = document.createElement("div");
  let row = document.createElement("div");
  let sch_time = document.createElement("p");
  let sch_description = document.createElement("p");
  
  entry.classList.add("schedule-entry");
  row.classList.add("sch-entry-container");
  sch_description.classList.add("hidden");

  sch_time.innerText = formatNumbers(time) + ":" + formatNumbers(minute);
  sch_description.innerText = " - HORáRIO INDISPONÍVEL";

  row.appendChild(sch_time);
  row.appendChild(sch_description);
  entry.appendChild(row);

  return entry;
}

function disableSchedule(timeToDisable, minuteToDisable, ammount, isOccupied) {
  let correctIndex = ((timeToDisable * 4) + minuteToDisable) - (StoreOpensAt * 4);
  let allTimeInSchedule = document.querySelectorAll(".schedule-entry");
  let entries = [];
  
  addRemoveElementClass(allTimeInSchedule, false, "selected");

  // evita que numeros errados façam alguma coisa
  if (correctIndex < 0 || correctIndex > allTimeInSchedule.length) {
    return;
  }

  for (let i = 0; i < ammount; i++) {
    let j = correctIndex + i
    entries[i] = allTimeInSchedule[j];
  }

  let rowType = (isOccupied ? "row-busy" : "row-unav")

  for (let i = 0; i < ammount; i++) {
    let indexToChance = correctIndex + i;

    if (indexToChance < allTimeInSchedule.length) {
      allTimeInSchedule[indexToChance].classList.add("unavailable");
      allTimeInSchedule[indexToChance].firstChild.lastChild.classList.remove("hidden"); // msg de indisponivel
      if (isOccupied) { allTimeInSchedule[indexToChance].firstChild.lastChild.innerText = "horário ocupado" }

      if (entries.length > 0) {
        if (i == 0) { entries[i].classList.add(rowType + "-top"); } else
        if (i == ammount-1) { entries[i].classList.add(rowType + "-base"); } else 
        { entries[i].classList.add(rowType); } 
      }
    } else {
      return;
    }
    
  }
}

function addToDisableList(timeToDisable, minuteToDisable, ammount, isOccupied) {
  let array = [timeToDisable, minuteToDisable, ammount, isOccupied]
  disableScheduleList.push(array);
}


//  ||  Resumo informações do cliente   ||  //---------------------------------------------------------------------------

function updateClientSummaryInfo() {
  const EL_SUM_CLIENT_NAME = document.querySelector("#summary-client-name");
  const EL_SUM_CLIENT_NUMB = document.querySelector("#summary-client-number");
  const EL_SUM_CLIENT_INST = document.querySelector("#summary-client-instagram");
  const EL_SUM_CLIENT_DATE = document.querySelector("#summary-client-date");

  EL_SUM_CLIENT_NAME.innerHTML = data_clientName;
  EL_SUM_CLIENT_NUMB.innerHTML = data_clientPhone;
  EL_SUM_CLIENT_INST.innerHTML = data_clientInsta;
  EL_SUM_CLIENT_DATE.innerHTML = diaAgendado + " " + monthNames[data_month] + ", " + data_year + "- " + data_time.replace(':', 'H');
}

//  || Utilidades    ---------------------------------------------------------------------------

function formatNumbers(n) { return (n < 10 ? '0' : '') + n; }

function formatInstagramHandle(input){ 
  let str_length = input.length;
  if (str_length > 0 && !input.includes("@")) { input = "@" + input }
  IN_CLIENT_INSTA.value = input; 
}

function formatPhoneNmb(value, input){

  // Letras, e outros caracteres que deverá ignorar
  if ((event.keyCode >= 58 && event.keyCode <= 90) || (event.keyCode >= 106)) { 
    event.preventDefault();
  }
  
  // Numeros
  if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) { 
    event.preventDefault();
    value += input;
  }

  value = value.replace(/\D/g,'');  
  value = value.substring(0,11);

  let size = value.length;
  if(size == 0) {
    value = value;
  }else if(size < 3) {
    value = '('+value;
  }else if(size < 8) {
    value = '('+value.substring(0,2)+') ' + value.substring(2,7);
  }else{
    value = '('+value.substring(0,2)+') ' + value.substring(2,7) + '-' + value.substring(7,11);
  }

  IN_CLIENT_PHONE.value = value; 
  data_clientPhone = value.replace(/\D/g,'');
}

function stringToPrice(value) {
  let formatedText = ("R$ " + value.toFixed(2));
  formatedText = formatedText.replace('.',',');
  return formatedText;
}


function resetAllScheduleInfo() {
  diaAgendado = 0;
  data_month = currentMonth;
  data_year = currentYear;
  data_clientName = '';
  data_clientPhone = '';
  data_clientEmail = '';
  data_clientInsta = '';
  data_time = '';

  IN_CLIENT_NAME.value = '';
  IN_CLIENT_PHONE.value = '';
  IN_CLIENT_EMAIL.value = '';
  IN_CLIENT_INSTA.value = '';

  addRemoveElementClass(EL_CALENDAR_DAY, false, "selected-day");
}

function cal_nextMonthFirstDay() {
  let year;
  if (nextMonth == 0) { year = nextYear; } else { year = currentYear; }

  return new Date(year, nextMonth, 1).getDay();
}

function cal_nextMonthTotalDays() {
  let year;
  if (nextMonth == 0) { year = nextYear; } else { year = currentYear; }

  return new Date(year, nextMonth + 1, 0).getDate();
}

function cal_nextMonthYear() {
  if (data_month == 0 && nextMonth == 0) { return nextYear; } else { return currentYear; }
}

function checkEmail(input) {
  if (input.includes("@") && input.includes(".com")) { return true; } else { return false; }
}

function addRemoveElementClass(Element, addClass, className) {
  Element.forEach(el => {
    if (addClass) {
      el.classList.add(className);
    } else {
      el.classList.remove(className);
    }
  })
}

function updateInformation(index) {
  if (index == 0) { updateCalendar(isNextMonth); } else
  if (index == 1) {  } else
  if (index == 2) { updateServiceTable(); } else
  if (index == 3) { updateSchedule(); } else
  if (index == 4) { updateClientSummaryInfo(); }
}

// displayScheduler(true, true); // mostrar janela
/*activateBarber(0); // ativar barbeiro
setActiveWindow(0); // selecionar janela*/



addToDisableList(8, 0, 4, false);
addToDisableList(18, 2, 2, false);
addToDisableList(14, 0, 4, true);

disableEntireColumn(0)
disableEntireColumn(1)


shiftCalendarDays();