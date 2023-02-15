const displayName = document.querySelector("h2");
displayName.textContent = `Hello, ${localStorage.getItem(
  "name"
)} ${localStorage.getItem("surname")}`;

document.querySelector(".logOut").addEventListener("click", () => {
  location.href = "/index.html";
});

// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

document
  .querySelector(".createPostForm")
  .addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();
  const type = e.target.elements.type.value;
  const content = e.target.elements.content.value;
  const date = e.target.elements.endDate.value;
  const email = localStorage.getItem("email");

  const post = {
    Type: type,
    Content: content,
    endDate: date,
    Email: email,
  };

  fetch("https://testapi.io/api/Aurimaso/resource/toDoList", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(post),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      document.querySelector(".posts").innerHTML = "";
      getPosts();
    })
    .catch((error) => console.log(error));
}

function getPosts() {
  fetch("https://testapi.io/api/Aurimaso/resource/toDoList")
    .then((res) => res.json())
    .then((data) => {
      for (i = 0; i <= data.data.length; i++) {
        if (data.data[i].Email === localStorage.getItem("email")) {
          createPostsHTML([data.data[i]]);
        }
      }
    })
    .catch((error) => console.log(error));
}

function createPostsHTML(data) {
  data.forEach((post) => {
    const maincontainer = document.createElement("div");
    maincontainer.className = "maincontainer";
    maincontainer.id = "post_id_" + post.id;

    const cardEl = document.createElement("div");
    cardEl.className = "thecard";

    const frontCard = document.createElement("div");
    frontCard.className = "thefront";

    const backCard = document.createElement("div");
    backCard.id = "post_id_" + post.id;
    backCard.className = "theback";

    cardEl.append(frontCard);
    cardEl.append(backCard);

    maincontainer.append(cardEl);

    const updateDateLabel = document.createElement("p");
    updateDateLabel.textContent = "Update date";

    const endDateLabel = document.createElement("p");
    endDateLabel.textContent = "End date";

    const typeEl = document.createElement("td");
    typeEl.className = "titleClass";
    typeEl.textContent = post.Type;

    const typeDivEl = document.createElement("div");
    typeDivEl.append(typeEl);
    frontCard.append(typeDivEl);

    const contentEl = document.createElement("td");
    contentEl.className = "contentClass";
    contentEl.textContent = post.Content;

    const contentDivEl = document.createElement("div");
    contentDivEl.append(contentEl);
    backCard.append(contentDivEl);

    const updatedEl = document.createElement("td");
    updatedEl.className = "updatedClass";
    updatedEl.textContent = post.updatedAt.slice(0, 10);

    const dateEl = document.createElement("td");
    dateEl.className = "dateClass";
    dateEl.textContent = post.endDate;

    const dateDivEl = document.createElement("div");
    dateDivEl.style.display = "inline-flex";
    dateDivEl.append(endDateLabel);
    dateDivEl.append(dateEl);
    dateDivEl.append(updateDateLabel);
    dateDivEl.append(updatedEl);
    backCard.append(dateDivEl);

    const editButtonEl = document.createElement("button");
    editButtonEl.style.display = "inline-block";
    editButtonEl.className = "editDeleteButton";
    editButtonEl.addEventListener("click", openEditModal);
    editButtonEl.textContent = "Edit";
    backCard.append(editButtonEl);

    const deleteButtonEl = document.createElement("button");
    deleteButtonEl.style.display = "inline-block";
    deleteButtonEl.className = "editDeleteButton";
    deleteButtonEl.addEventListener("click", deletePost);
    deleteButtonEl.textContent = "Delete";
    backCard.append(deleteButtonEl);

    document.querySelector(".posts").append(maincontainer);
  });
}

function openEditModal(e) {
  modal.style.display = "flex";

  const idValue = e.target.parentElement.id.substring(8);

  const typeValue = document.querySelector(
    `#${e.target.parentElement.id} td`
  ).textContent;

  const contentValue = document.querySelector(
    `#${e.target.parentElement.id} .contentClass`
  ).textContent;

  const dateValue = document.querySelector(
    `#${e.target.parentElement.id} .updatedClass`
  ).textContent;

  console.log(dateValue);
  const inputDate = document.querySelector(
    `#${e.target.parentElement.id} .dateClass`
  ).textContent;

  document.querySelector(".editPostForm").elements.id.value = idValue;
  document.querySelector(".editPostForm").elements.type.value = typeValue;
  document.querySelector(".editPostForm").elements.content.value = contentValue;
  document.querySelector(".editPostForm").elements.endDate.value = dateValue;
}

function deletePost(e) {
  const idValue = e.target.parentElement.id.substring(8);

  fetch(`https://testapi.io/api/Aurimaso/resource/toDoList/${idValue}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.ok) {
        document.querySelector(`#${e.target.parentElement.id}`).remove();
      }
    })
    .catch((error) => console.log(error));
}

getPosts();

document
  .querySelector(".editPostForm")
  .addEventListener("submit", submitEditForm);

function submitEditForm(e) {
  e.preventDefault();
  const type = e.target.elements.type.value;
  const content = e.target.elements.content.value;
  const id = e.target.elements.id.value;
  const date = e.target.elements.endDate.value;
  const email = localStorage.getItem("email");

  const post = {
    Type: type,
    Content: content,
    endDate: date,
    Email: email,
  };

  fetch(`https://testapi.io/api/Aurimaso/resource/toDoList/${id}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(post),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      modal.style.display = "none";
      location.href = "/app/app.html";
    })
    .catch((error) => console.log(error));
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const cursor = document.querySelector(".cursor");

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = "white";
});

window.addEventListener("mousemove", function (e) {
  coords.x = e.clientX;
  coords.y = e.clientY;
});

function animateCircles() {
  let x = coords.x;
  let y = coords.y;

  cursor.style.top = x;
  cursor.style.left = y;

  const colors = [
    "#e66465",
    "#e86475",
    "#e76584",
    "#e56893",
    "#e06da2",
    "#da72b0",
    "#d178bd",
    "#c77fc8",
    "#bb85d2",
    "#ae8cda",
    "#a092e0",
    "#9198e5",
  ];

  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";

    circle.style.scale = (circles.length - index) / circles.length;
    circle.style.backgroundColor = colors[index % colors.length];

    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });

  requestAnimationFrame(animateCircles);
}

animateCircles();
