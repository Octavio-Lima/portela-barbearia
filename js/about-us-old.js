const pages = document.querySelectorAll(".page-container");

let currentPage = 0;

document.addEventListener('contextmenu', function(ev) {
  ev.preventDefault();

  if (currentPage < 3) {
    currentPage++;
    showPages(currentPage);
  }
  return false;
}, false);

document.addEventListener('click', function(ev) {
  ev.preventDefault();

  if (currentPage > 0) {
    currentPage--;
    showPages(currentPage);
  }
  return false;
}, false);

function showPages(activatePage) {
  pages.forEach((page) => {
    page.classList.add("hidden");
  });

  pages[activatePage].classList.remove("hidden");
}