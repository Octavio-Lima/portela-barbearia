const bgBlur = document.querySelector(".blur-overlay");
const availableWorkers = document.querySelectorAll(".worker");
const appointmentWindow = document.querySelector("#appointment-window")
let currentWorkerSel = -1;

const calendarWindow = document.querySelector("#calendar-window");
const clientInfoWindow = document.querySelector("#client-info-window");
const scheduleWindow = document.querySelector("#schedule-window");
const serviceWindow = document.querySelector("#service-window");
const overviewWindow = document.querySelector("#overview-window");

const linkContainer = document.querySelector(".links-container");
const footer = document.querySelector("footer");
const diagBoxSpace = document.querySelector("#diag-box-space");
const footerSpacer = document.querySelector("#footer-spacer");

/* Define um ID para cada prestador de acordo com a ordem da array
isso facilita encontrar quem está sendo selecionado */
availableWorkers.forEach((worker, index) => {
    worker.setAttribute("id", index);
});

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
        bgBlur.classList.add("hidden")
        appointmentWindow.classList.add("hidden")
        linkContainer.classList.remove("hidden");
        footer.classList.remove("hidden");
        diagBoxSpace.classList.add("hidden");
        footerSpacer.classList.remove("hidden");
    } else {
        currentWorkerSel = selectedID;
        availableWorkers.forEach((worker, index) => {
            worker.classList.remove("selected-worker");
        })

        switchBetweenWindows(-1);
        bgBlur.classList.remove("hidden")
        appointmentWindow.classList.remove("hidden")
        linkContainer.classList.add("hidden");
        footer.classList.add("hidden");
        availableWorkers[selectedID].classList.add("selected-worker")
        diagBoxSpace.classList.remove("hidden");
        footerSpacer.classList.add("hidden");
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

// || MUDAR DE JANELAS

const windowPages = [ // Agrupar todas as janelas em uma array só
    calendarWindow,
    clientInfoWindow,
    serviceWindow,
    scheduleWindow,
    overviewWindow
]

appointmentWindow.addEventListener("click", (e) => {
    tarEl = e.target;
    let buttonID = tarEl.id;

    if (buttonID == "pick-day-btn") { switchBetweenWindows(1); }
    if (buttonID == "confirm-client-info-btn") { switchBetweenWindows(2); }
    if (buttonID == "confirm-service-btn") { switchBetweenWindows(3); }
    if (buttonID == "confirm-schedule-btn") { switchBetweenWindows(4); }
    if (buttonID == "finish-scheduling") { selectWorker(currentWorkerSel); }
})

function switchBetweenWindows(index) {
    windowPages.forEach(page => {
        page.classList.add("hidden");
    });

    if (index >= 0) {
        windowPages[index].classList.remove("hidden"); // exibe a pagina com o numero informado se o index for >= 0
    }else{
        windowPages[0].classList.remove("hidden");  // se for -1,mas  reseta para o calendario, e fecha a janela principal
        appointmentWindow.classList.add("hidden");
    }
}