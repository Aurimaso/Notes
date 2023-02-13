document.querySelector("form").addEventListener("submit", loginForm);
const nameEl = document.querySelector(".name");
const surnameEl = document.querySelector(".surname");

async function loginForm(e) {
  e.preventDefault();
  //   const name = e.target.elements.name.value;
  //   const surname = e.target.elements.surname.value;

  //   const post = {
  //     Name: name,
  //     Surname: surname,
  //   };

  console.log("1");

  const result = await fetch(
    `https://testapi.io/api/Aurimaso/resource/userInformation`
  );

  const people = await result.json();

  const peopleArray = people.data;
  const names = peopleArray[0].Name;
  //   console.log(names);

  for (i = 0; i <= 3; i++) {
    console.log(i);
    if (
      peopleArray[i].Name === nameEl.value &&
      peopleArray[i].Surname === surnameEl.value
    ) {
      location.href = "/app/app.html";
      localStorage.setItem("email", peopleArray[i].Email);
      localStorage.setItem("name", peopleArray[i].Name);
      localStorage.setItem("surname", peopleArray[i].Surname);
      console.log("ar veikiam??");
    }
  }

  //   console.log(people.data);
  //   console.log(peopleArray["Name"].includes(nameEl.textContent));

  //   await peopleArray.forEach((element) => {
  //     if (peopleArray[element].Name === nameEl.value) {
  //       location.href = "app/app.html";
  //     }
  //   });
  //   fetch("https://testapi.io/api/Evaldas/resource/userInformation", {
  //     method: "GET",
  //     headers: { "Content-type": "application/json" },
  //     body: JSON.stringify(post),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((error) => console.log(error));
}
