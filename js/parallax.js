const mouseUI = document.querySelector(".mouse-coor")

document.onmousemove = (event) => {
    const {
      clientX,
      clientY
    } = event
    mouseUI.innerHTML = "x: " + clientX + " / y: " + clientY;
  }