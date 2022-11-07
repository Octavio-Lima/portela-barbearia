const bgBlur = document.querySelector(".blur-overlay");
const availableWorkers = document.querySelectorAll(".worker");
let currentWorkerSel = -1;

// Define um ID para cada prestador, para facilitar encontrar quem está sendo selecionado
addIdToEachWorker();

document.addEventListener("click", (e) => {
    e.preventDefault();

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
        bgBlur.classList.remove("hidden")
    }else{
        bgBlur.classList.add("hidden")
    }
}

function selectWorker(selectedID) {
    if (currentWorkerSel == selectedID) {
        currentWorkerSel = -1;
        focusOnWorker(false);
        availableWorkers.forEach((worker, index) => {
            worker.classList.remove("selected-worker");
        })
    } else {
        focusOnWorker(true);
        currentWorkerSel = selectedID;
        availableWorkers.forEach((worker, index) => {
            worker.classList.remove("selected-worker");
        })

        availableWorkers[selectedID].classList.add("selected-worker")
    }
}


// UTILIDADES
function addIdToEachWorker() {
    availableWorkers.forEach((worker, index) => {
        worker.setAttribute("id", index);
    });
}