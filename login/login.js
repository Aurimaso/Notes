document.querySelector("form").addEventListener("submit", loginForm);
const nameEl = document.querySelector(".name");
const surnameEl = document.querySelector(".surname");

async function loginForm(e) {
  e.preventDefault();

  const result = await fetch(
    `https://testapi.io/api/Aurimaso/resource/userInformation`
  );

  const people = await result.json();

  const peopleArray = people.data;
  const names = peopleArray[0].Name;

  for (i = 0; i <= 3; i++) {
    if (
      peopleArray[i].Name === nameEl.value &&
      peopleArray[i].Surname === surnameEl.value
    ) {
      location.href = "/app/app.html";
      localStorage.setItem("email", peopleArray[i].Email);
      localStorage.setItem("name", peopleArray[i].Name);
      localStorage.setItem("surname", peopleArray[i].Surname);
    }
  }
}
