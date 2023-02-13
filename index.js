const signIn = document.querySelector("#signin");
const register = document.querySelector("#regin");

signIn.addEventListener("click", function () {
  location.href = "login/login.html";
});

register.addEventListener("click", function () {
  location.href = "register/register.html";
});
