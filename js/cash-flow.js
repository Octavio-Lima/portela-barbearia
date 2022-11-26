function createEntry(horario, nome) {
  let section = document.createElement("SECTION");
  let paymentTime = document.createElement("p");
  let clientName = document.createElement("h2");
  let services = document.createElement("p");
  let product = document.createElement("p");
  let product2 = document.createElement("p");
  let totalPrice = document.createElement("h2");
  let paymentMethod = document.createElement("p");
  let change = document.createElement("p");
  let totalPriceDiv = document.createElement("div");
  totalPriceDiv.classList.add("total-price");
  
  paymentTime.innerHTML = "25 NOV, 12:00";
  clientName.innerHTML = "Faux Nom";
  services.innerHTML = "Corte de cabelo";
  product.innerHTML = "Shampoo";
  product2.innerHTML = "Cerveja";
  totalPrice.innerHTML = "total: R$ 0,00";
  paymentMethod.innerHTML = "forma de pagamento: Dinheiro";
  change.innerHTML = "Troco: R$ 0,00";

  section.appendChild(paymentTime);
  section.appendChild(clientName);
  section.appendChild(services);
  section.appendChild(product);
  section.appendChild(product2);
  section.appendChild(totalPriceDiv);
  totalPriceDiv.appendChild(totalPrice);
  totalPriceDiv.appendChild(paymentMethod);
  totalPriceDiv.appendChild(change);

  document.body.appendChild(section);
}

createEntry()
createEntry()