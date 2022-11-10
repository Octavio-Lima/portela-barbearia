const pageTitleElements = document.querySelectorAll(".page-title");
const pageNumberElements = document.querySelectorAll(".page-number");

addLineDecorations();

function addLineDecorations() {  // Adiciona uma linha de enfeite ao titulo e numero de cada pagina    
    pageTitleElements.forEach(title => {
        title.appendChild(createLine());
    });

    pageNumberElements.forEach((page) => {
        page.prepend(createLine());
    });
}

function createLine() {
    var newLine = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    newLine.setAttribute('height', '2')
    newLine.setAttribute('width', '5000')

    var lineDetails = document.createElementNS("http://www.w3.org/2000/svg", "line");
    lineDetails.setAttribute('x1','0px');
    lineDetails.setAttribute('y1','0px');
    lineDetails.setAttribute('x2','5000px');
    lineDetails.setAttribute('y2','0px');
    lineDetails.style.stroke = "#fff";
    lineDetails.style.strokeWidth = "10px";
    newLine.appendChild(lineDetails);

    return newLine;
}