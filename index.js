const signIn = document.querySelector("#signin");
const register = document.querySelector("#regin");

// function signInTo() {
//   console.log("test");
//   window.onload = function () {
//     location.href = "login/login.html";
//   };
// }

signIn.addEventListener("click", function () {
  location.href = "login/login.html";
});

register.addEventListener("click", function () {
  location.href = "register/register.html";
});
// window.onload = function () {
//   location.href = "/login/login.html";
// };
