const account = [
  {user:"joao", pass:"123", name:"joão pedro", access:'proprietario, barbeiro'},
  {user:"lucio", pass:"321", name:"lúcio xavier", access:'barbeiro'},
  {user:"gerencia", pass:"111", name:"Gerenciadores", access:'proprietario'}
]

function checkCredentials(event) {
  event.preventDefault();

  const user_input = document.getElementById("user");
  const pass_input = document.getElementById("pass");
  const wrong_cred = document.getElementById("wrong-cred-msg");

  if (checkUser(user_input.value, pass_input.value)) {
    window.open("../html/manage.html", "_self");
  } else {
    wrong_cred.classList.remove("d-none");
  }
}

function checkUser(input, passInput) {
  for (let index = 0; index < account.length; index++) {
    if (input == account[index].user && passInput == account[index].pass) {
      localStorage.setItem("accessName", account[index].name);
      localStorage.setItem("accessType", account[index].access);
      return true
    }
  }
}