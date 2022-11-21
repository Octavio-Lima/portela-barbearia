const availableWorkers = document.querySelectorAll(".worker");
const appointmentWindow = document.querySelector("#appointment-window")
const cal_daysEl = document.querySelectorAll(".calendar-pick-day");
let currentWorkerSel = -1;

const calendarWindow = document.querySelector("#calendar-window");
const clientInfoWindow = document.querySelector("#client-info-window");
const scheduleWindow = document.querySelector("#schedule-window");
const serviceWindow = document.querySelector("#service-window");
const overviewWindow = document.querySelector("#overview-window");

const inputNomeCliente = document.querySelector("#input-client-name");
const inputCelularCliente = document.querySelector("#input-client-phone");
const inputEmailCliente = document.querySelector("#input-client-email");
const inputInstagramCliente = document.querySelector("#input-client-instagram");

const schedule_table = document.getElementById("schedule-table");

// Agendamento de horarios
var schedule_storeOpensAt = 8;
var schedule_storeClosesAt = 20;

// Variables
var selectedNextMonth = false;

const date = new Date();
const currentYear = date.getFullYear();
const currentMonth = date.getMonth();
const nextMonth = ((currentMonth + 1) >= 12 ? 0 : currentMonth + 1); // o maximo de meses são 11, se for maior volta pra 0
const nextYear = date.getFullYear()+1;

const cal_monthFirstDay = new Date(currentYear, currentMonth, 1).getDay();
const cal_monthTotalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

function cal_nextMonthFirstDay() {
    var year;
    if (nextMonth == 0) { year = nextYear; } else { year = currentYear; }

    return new Date(year, nextMonth, 1).getDay();
}

function cal_nextMonthTotalDays() {
    var year;
    if (nextMonth == 0) { year = nextYear; } else { year = currentYear; }

    return new Date(year, nextMonth + 1, 0).getDate();
}

// Retorna o ano correto se o mês que vem for ano novo
function cal_nextMonthYear() {
    if (mesAgendado == 0 && nextMonth == 0) { return nextYear; } else { return currentYear; }
}

// || MUDAR DE JANELAS

const windowPages = [ // Agrupar todas as janelas em uma array só
    calendarWindow,
    clientInfoWindow,
    serviceWindow,
    scheduleWindow,
    overviewWindow
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

//  ||  Declarações Iniciais   ||  //------------------------------------------------------------

// Define um ID para cada prestador de acordo com a ordem da array
availableWorkers.forEach((worker, index) => { worker.setAttribute("id", index); });

// Informações do cliente para agendamento

var diaAgendado;
var mesAgendado;
var anoAgendado;
var nomeCliente;
var celularCliente;
var emailCliente;
var instagramCliente;
var servicosSelecionados;
var horarioAgendado;

//  ||  Selecionar Prestador   ||  //------------------------------------------------------------

document.addEventListener("click", (e) => {
    targetEl = e.target;
    parentEl = targetEl.closest(".worker");

    if (parentEl !== null){
        let parentID = parentEl.id;
        selectWorker(parentID);
    }
})


function selectWorker(selectedID) {
    if (currentWorkerSel == selectedID) {
        currentWorkerSel = -1;
        availableWorkers.forEach((worker, index) => {
            worker.classList.remove("selected-worker");
        })
            
        switchBetweenWindows(-1);
        scheduleDisplay(false);
        resetAllScheduleInfo();
    } else {
        currentWorkerSel = selectedID;
        availableWorkers.forEach((worker, index) => {
            worker.classList.remove("selected-worker");
        })

        availableWorkers[selectedID].classList.add("selected-worker");
        switchBetweenWindows(-1);
        scheduleDisplay(true);
    }
}

// || INFORMAÇÕES DO CLIENTE

serviceWindow.addEventListener("click", (e) => {
    targetEl = e.target;
    parentEl = targetEl.closest("tr");
    checkbox = targetEl.closest("input");


    if (parentEl !== null){
        let checkbox = parentEl.querySelector("input");

        if (parentEl.classList.contains("selected")) {
            checkbox.checked = false;
            parentEl.classList.remove("selected");
        } else {
            checkbox.checked = true;
            parentEl.classList.add("selected");
        }
    }
})

function resetAllScheduleInfo() {
    diaAgendado = 0;
    mesAgendado = currentMonth;
    anoAgendado = currentYear;
    nomeCliente = '';
    celularCliente = '';
    emailCliente = '';
    instagramCliente = '';
    serviçosSelecionados = 0;
    horarioAgendado = '';

    var allCalendarDays = document.querySelectorAll(".calendar-pick-day");
    allCalendarDays.forEach(days => {
        days.classList.remove("selected-day");
    });

    inputNomeCliente.value = '';
    inputCelularCliente.value = '';
    inputEmailCliente.value = '';
    inputInstagramCliente.value = '';
}

appointmentWindow.addEventListener("click", (e) => {
    tarEl = e.target;

    // || SELECIONAR DIAS NO CALENDARIO
    if (tarEl.classList.contains("calendar-pick-day")) {
        // desmarca todos os outros dias do calendario
        var allCalendarDays = document.querySelectorAll(".calendar-pick-day");
        allCalendarDays.forEach(days => {
            days.classList.remove("selected-day");
        });

        // marcar o dia selecionado
        tarEl.classList.toggle("selected-day");

        // converte dia string do calendario para int
        selectDay(parseInt(tarEl.closest(".selected-day").innerText, 10));
    }
})

function selectDay(day) {
    diaAgendado = day;
    mesAgendado = (selectedNextMonth ? nextMonth : currentMonth);
    anoAgendado = (cal_nextMonthYear());
}

function scheduleDisplay(showBox) {
    const blur_background = document.querySelector(".blur-overlay");
    const linkContainer = document.querySelector(".links-container");
    const footer = document.querySelector("footer");
    const diagBoxSpace = document.querySelector("#diag-box-space");
    const footerSpacer = document.querySelector("#footer-spacer");

    // Quando é selecionado um barbeiro
    if (showBox) {
        blur_background.classList.remove("hidden");
        appointmentWindow.classList.remove("hidden");
        linkContainer.classList.add("hidden");
        footer.classList.add("hidden");
        diagBoxSpace.classList.remove("hidden");
        footerSpacer.classList.add("hidden");
    }

    // Quando sair da tela de agendamentos
    if (!showBox) {
        blur_background.classList.add("hidden")
        appointmentWindow.classList.add("hidden")
        linkContainer.classList.remove("hidden");
        footer.classList.remove("hidden");
        diagBoxSpace.classList.add("hidden");
        footerSpacer.classList.remove("hidden");
    }
}


function switchBetweenWindows(index) {
    if (index >= 0) {
        if (index == 1) { // saindo do calendario
            if (diaAgendado <= 0 || diaAgendado >= 32) {
                alert("Por favor, selecione um dia valido para que seja possível prosseguir com o agendamento");
            } else {
                windowPages.forEach(page => { page.classList.add("hidden"); });
                windowPages[index].classList.remove("hidden"); // exibe a pagina com o numero informado se o index for >= 0
            }
        } else
        if (index == 2) { // saindo do preenchimento do formulario do cliente
            nomeCliente = inputNomeCliente.value;
            celularCliente = inputCelularCliente.value;
            emailCliente = inputEmailCliente.value;
            instagramCliente = inputInstagramCliente.value;
            updateServiceTitle();

            if (!nomeCliente || !celularCliente || !emailCliente || !instagramCliente) {
                alert("Por favor, preencha todas as informações para que seja possível prosseguir");
            } else {
                windowPages.forEach(page => { page.classList.add("hidden"); });
                windowPages[index].classList.remove("hidden"); // exibe a pagina com o numero informado se o index for >= 0
            }
        } else
        if (index == 3) { // saindo do selecionamento do serviço / produto
            //serviçosSelecionados

            // console.log(nomeCliente,celularCliente,emailCliente,instagramCliente)

            if (!nomeCliente || !celularCliente || !emailCliente || !instagramCliente) {
                alert("Por favor, preencha todas as informações para que seja possível prosseguir");
            } else {
                windowPages.forEach(page => { page.classList.add("hidden"); });
                windowPages[index].classList.remove("hidden"); // exibe a pagina com o numero informado se o index for >= 0
            }
        }
        if (index == 4) { // saindo do agendamento de horario
            

            updateClientSummaryInfo();
            // console.log(nomeCliente,celularCliente,emailCliente,instagramCliente)

            if (!horarioAgendado) {
                alert("Por favor, selecione um horario disponivel para que seja possível prosseguir");
            } else {
                windowPages.forEach(page => { page.classList.add("hidden"); });
                windowPages[index].classList.remove("hidden"); // exibe a pagina com o numero informado se o index for >= 0
            }
        }
        if (index == 5) { // saindo do selecionamento do serviço
            nomeCliente = inputNomeCliente.value;
            celularCliente = inputCelularCliente.value;
            emailCliente = inputEmailCliente.value;
            instagramCliente = inputInstagramCliente.value;

            // console.log(nomeCliente,celularCliente,emailCliente,instagramCliente)

            if (!nomeCliente || !celularCliente || !emailCliente || !instagramCliente) {
                alert("Por favor, preencha todas as informações para que seja possível prosseguir");
            } else {
                windowPages.forEach(page => { page.classList.add("hidden"); });
                windowPages[index].classList.remove("hidden"); // exibe a pagina com o numero informado se o index for >= 0
            }
        }
    } else {
        windowPages.forEach(page => { page.classList.add("hidden"); }); // esconde tudo
        windowPages[0].classList.remove("hidden");  // se for -1,mas  reseta para o calendario, e fecha a janela principal
        appointmentWindow.classList.add("hidden");
    }
}


//  ||  Janela de Agendamento   ||  //------------------------------------------------------------

//  ||  Calendario

function updateCalendar(showNextMonth) { // Cabeçalho do calendario | Atualizar dias disponiveis no calendario
    const cal_titleEl = document.querySelector("#calendar-month-name");
    const cal_prevArrowEl = document.querySelector("#previous-month");
    const cal_nextArrowEl = document.querySelector("#next-month");

    if (showNextMonth) {
        cal_prevArrowEl.classList.remove("hide-arrow");
        cal_nextArrowEl.classList.add("hide-arrow");
        cal_titleEl.innerText = monthNames[nextMonth] + " / " + cal_nextMonthYear();
        enableAllDays();

        for (let index = 0; index < 35; index++) {
            if (index < cal_nextMonthFirstDay()) { cal_daysEl[index].innerText = ""; }
            if (index >= cal_nextMonthFirstDay()) { cal_daysEl[index].innerText = index - cal_nextMonthFirstDay() + 1; }
            if (index > cal_nextMonthTotalDays() + cal_nextMonthFirstDay() - 1) { cal_daysEl[index].innerText = ""; }
        }
    } else
    if (!showNextMonth) {
        cal_prevArrowEl.classList.add("hide-arrow");
        cal_nextArrowEl.classList.remove("hide-arrow");
        cal_titleEl.innerText = monthNames[currentMonth] + " / " + currentYear;
        disablePastDays();

        for (let index = 0; index <  35; index++) {
            if (index < cal_monthFirstDay) { cal_daysEl[index].innerText = ""; }
            if (index >= cal_monthFirstDay) { cal_daysEl[index].innerText = index - cal_monthFirstDay + 1; }
            if (index > cal_monthTotalDays + cal_monthFirstDay - 1) { cal_daysEl[index].innerText = ""; }
        }
    }
}

function disablePastDays() { // Desabilita dias anteriores, para evitar agendamentos em dias passados
    var today = date.getDate();

    for (let index = 0; index < (today + cal_monthFirstDay -1); index++) {
        cal_daysEl[index].classList.add("disabled-day");        
    }

    // remove a classe de selecionado em todos os dias do calendario 
    cal_daysEl.forEach(days => { 
        days.classList.remove("selected-day");
    });

    diaAgendado = 0; // marca como nenhum dia foi selecionado
    selectedNextMonth = false;
}

function enableAllDays() { // habilita todos os dias, pois é o mês que vem
    cal_daysEl.forEach(day => {
        day.classList.remove("selected-day");
        day.classList.remove("disabled-day");    
    });

    diaAgendado = 0; // marca como nenhum dia foi selecionado
    selectedNextMonth = true;
}

// || Tela de Serviço

function updateServiceTitle() {
    const service_title = document.querySelector("#service-title");

    service_title.innerText = diaAgendado + " " + monthNames[mesAgendado] + ", " + anoAgendado;
}

// || Tela de Agendamento de Horario

// function updateSchedule() {
//   const service_title = document.querySelector("#schedule-title");

//   service_title.innerText = diaAgendado + " " + monthNames[mesAgendado] + ", " + anoAgendado;
// }

function updateSchedule(value) {
  for (let index = schedule_storeOpensAt; index < schedule_storeClosesAt; index++) {
    schedule_table.append(createScheduleTime(index, false, 0));
    schedule_table.append(createScheduleTime(index, false, 15));
    schedule_table.append(createScheduleTime(index, false, 30));
    schedule_table.append(createScheduleTime(index, false, 45));
  }
}

function disableSchedule(timeToDisable, minuteToDisable, ammount) {
  var correctIndex = ((timeToDisable * 4) + minuteToDisable) - (schedule_storeOpensAt * 4);
  var allTimeInSchedule = document.querySelectorAll(".schedule");
  
  allTimeInSchedule.forEach(timeElement => {
    timeElement.classList.remove("selected")
  });


  // evita que numeros errados façam alguma coisa
  if (correctIndex < schedule_storeOpensAt || correctIndex > allTimeInSchedule.length) {
    return 0;
  }

  for (let index = 0; index < ammount; index++) {
    var indexToChance = correctIndex + index;

    if (indexToChance < allTimeInSchedule.length) {
      allTimeInSchedule[indexToChance].classList.add("unavailable");
      allTimeInSchedule[indexToChance].firstChild.lastChild.classList.remove("hidden"); // msg de indisponivel
    } else {
      return 0;
    }
  }


  return 0;
}

function createScheduleTime(time, unavailable, minute) {
  var tableRow = document.createElement("tr");
  tableRow.classList.add("schedule");

  var tableData = document.createElement("td");
  if (unavailable) { tableRow.classList.add("unavailable"); }

  var schedule_time = document.createElement("p");
  schedule_time.innerHTML = formatNumbers(time) + ":" + formatNumbers(minute);

  var unavailable_msg = document.createElement("p");
  unavailable_msg.innerHTML = "HORARIO INDISPONÍVEL";
  unavailable_msg.classList.add("hidden");

  tableData.appendChild(schedule_time);
  tableData.appendChild(unavailable_msg);
  tableRow.appendChild(tableData);

  return tableRow;
}

schedule_table.addEventListener("click", (e) => {
  targetEl = e.target.closest("tr");

  if (targetEl != null)
  {
    if (!targetEl.classList.contains("unavailable"))
    {
      var allTimeInSchedule = document.querySelectorAll(".schedule");
      allTimeInSchedule.forEach(timeElement => { timeElement.classList.remove("selected") });
    
      targetEl.classList.add("selected");
      horarioAgendado = targetEl.firstChild.firstChild.innerHTML;
      console.log(horarioAgendado);
    }
  }
})

//  ||  Resumo das informações do cliente
function updateClientSummaryInfo() {
  const clientInfoSummary_clientName = document.querySelector("#summary-client-name");
  const clientInfoSummary_clientNumber = document.querySelector("#summary-client-number");
  const clientInfoSummary_clientInstagram = document.querySelector("#summary-client-instagram");
  const clientInfoSummary_clientDate = document.querySelector("#summary-client-date");

  clientInfoSummary_clientName.innerHTML = nomeCliente;
  clientInfoSummary_clientNumber.innerHTML = celularCliente;
  clientInfoSummary_clientInstagram.innerHTML = instagramCliente;

  clientInfoSummary_clientDate.innerHTML = diaAgendado + " " + monthNames[mesAgendado] + ", " + anoAgendado + "- " + horarioAgendado;
  //8 NOVEMBRO, 2022- 18H00
}

function formatNumbers(n) {
  return (n < 10 ? '0' : '') + n;
}


//  ||  Declarações Iniciais   ||  //------------------------------------------------------------

updateCalendar(false);
resetAllScheduleInfo();
updateSchedule();
disableSchedule(12, 0, 4);
disableSchedule(18, 2, 2);