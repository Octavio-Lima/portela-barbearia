const page_title = document.querySelectorAll(".page-title");
const page_number = document.querySelectorAll(".page-number");

function addLineDecorations() {  // Adiciona uma linha de enfeite ao titulo e numero de cada pagina    
  page_title.forEach(title => {
    title.appendChild(createLine());
  });

  page_number.forEach((page) => {
    page.prepend(createLine());
  });
}

function createLine() {
  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute('height', '2')
  svg.setAttribute('width', '5000')

  var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute('x1','0px');
  line.setAttribute('y1','0px');
  line.setAttribute('x2','5000px');
  line.setAttribute('y2','0px');
  line.style.stroke = "#fff";
  line.style.strokeWidth = "10px";
  svg.appendChild(line);

  return svg;
}