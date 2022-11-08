const bgBlur = document.querySelector(".blur-overlay");
const availableWorkers = document.querySelectorAll(".worker");
const appointmentWindow = document.querySelector("#appointment-window")
let currentWorkerSel = -1;

const calendarWindow = document.querySelector("#calendar-window");
const clientInfoWindow = document.querySelector("#client-info-window");
const scheduleWindow = document.querySelector("#schedule-window");
const serviceWindow = document.querySelector("#service-window");
const overviewWindow = document.querySelector("#overview-window");

const inputClientName = document.querySelector("#input-client-name");
const confirmClientInfoBtn = document.querySelector("#confirm-client-info-btn");
const confirmScheduleBtn = document.querySelector("#confirm-schedule-btn");
const confirmServiceBtn = document.querySelector("#confirm-service-btn");

/* Define um ID para cada prestador de acordo com a ordem da array
isso facilita encontrar quem está sendo selecionado */
addIdToEachWorker();

document.addEventListener("click", (e) => {
    targetEl = e.target;
    parentEl = targetEl.closest(".worker");

    if (parentEl !== null){
        let parentID = parentEl.id;
        selectWorker(parentID);

        // parentEl.classList.toggle("selected-worker");
        // focusOnWorker(true)
    }
})

function focusOnWorker(focused) {
    if (focused == true) {
    }else{
    }
}

function selectWorker(selectedID) {
  if (currentWorkerSel == selectedID) {
    currentWorkerSel = -1;
    availableWorkers.forEach((worker, index) => {
      worker.classList.remove("selected-worker");
    })
        
    resetWindowPage();
    bgBlur.classList.add("hidden")
    appointmentWindow.classList.add("hidden")
  } else {
    focusOnWorker(true);
    currentWorkerSel = selectedID;
    availableWorkers.forEach((worker, index) => {
      worker.classList.remove("selected-worker");
    })

    resetWindowPage();
    bgBlur.classList.remove("hidden")
    appointmentWindow.classList.remove("hidden")
    availableWorkers[selectedID].classList.add("selected-worker")
  }
}


// UTILIDADES
function addIdToEachWorker() {
    availableWorkers.forEach((worker, index) => {
        worker.setAttribute("id", index);
    });
}

// || CALENDARIO

document.addEventListener("click", (e) => {
  targetEl = e.target;
  parentEl = targetEl.closest(".worker");

  if (targetEl.classList.contains("calendar-pick-day")){
    calendarWindow.classList.add("hidden");
    clientInfoWindow.classList.remove("hidden");
  }
})

// || INFORMAÇÕES DO CLIENTE

confirmClientInfoBtn.addEventListener("click", (e) => {
  clientInfoWindow.classList.add("hidden");
  scheduleWindow.classList.remove("hidden");
})

confirmScheduleBtn.addEventListener("click", (e) => {
  scheduleWindow.classList.add("hidden");
  serviceWindow.classList.remove("hidden");
})

confirmServiceBtn.addEventListener("click", (e) => {
  serviceWindow.classList.add("hidden");
  overviewWindow.classList.remove("hidden");
})

function resetWindowPage() {
  calendarWindow.classList.remove("hidden");
  clientInfoWindow.classList.add("hidden");
  scheduleWindow.classList.add("hidden");
  serviceWindow.classList.add("hidden");
  overviewWindow.classList.add("hidden");
}