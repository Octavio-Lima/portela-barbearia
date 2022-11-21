var user = "joao";
var pass = "123";

function checkCredentials(event) {
  event.preventDefault();

  const user_input = document.getElementById("user");
  const pass_input = document.getElementById("pass");
  const wrong_cred = document.getElementById("wrong-cred-msg");

  if (user_input.value == user && pass_input.value == pass) {
    window.open("../html/manage.html", "_self");
  } else {
    wrong_cred.style.display = 'block'
  }
}