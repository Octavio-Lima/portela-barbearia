const services_element = document.querySelectorAll(".services")

const service_list = [ // serviço, preço, minutos
  ['CORTE', 'R$ 25,00', 30],
  ['BARBOTERAPIA', 'R$ 25,00', 60],
  ['SOBRANCELHA', 'R$ 10,00', 10]
]

updateServiceList();

function updateServiceList() {
  services_element.forEach((serviceEl, index) => {
    serviceEl.querySelector(".service-name").innerHTML = service_list[index][0];
    serviceEl.querySelector(".service-price").innerHTML = service_list[index][1];
  });
}

{/* <td class="service-price">R$25,00</td> */}