const displayName = document.querySelector("h2");
displayName.textContent = `Hello, ${localStorage.getItem(
  "name"
)} ${localStorage.getItem("surname")}`;

document.querySelector(".logOut").addEventListener("click", () => {
  location.href = "/front_end_baigiamasis/index.html";
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
  console.log(email);

  const post = {
    Type: type,
    Content: content,
    endDate: date,
    Email: email,
  };

  console.log("1");
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
    const containerEl = document.createElement("table");
    containerEl.id = "post_id_" + post.id;
    containerEl.style.border = "1px solid black";
    containerEl.style.padding = "5px";
    containerEl.style.height = "200px";
    containerEl.style.width = "fit-content";
    containerEl.style.borderRadius = "5px";
    containerEl.style.backgroundColor = "#5996e3";

    const typeLabel = document.createElement("p");
    typeLabel.textContent = "Type";

    const contentLabel = document.createElement("p");
    contentLabel.textContent = "Content";

    const updateDateLabel = document.createElement("p");
    updateDateLabel.textContent = "Update date";

    const endDateLabel = document.createElement("p");
    endDateLabel.textContent = "End date";

    const typeEl = document.createElement("td");
    typeEl.className = ".titleClass";
    typeEl.style.width = "170px";
    typeEl.style.height = "50px";
    typeEl.style.display = "block";
    typeEl.style.overflow = "auto";
    typeEl.style.whiteSpace = "nowrap";
    typeEl.style.borderRadius = "5px";
    typeEl.style.backgroundColor = "white";
    typeEl.textContent = post.Type;
    // containerEl.append(typeEl);

    const typeDivEl = document.createElement("div");
    typeDivEl.append(typeLabel);
    typeDivEl.append(typeEl);
    containerEl.append(typeDivEl);

    const contentEl = document.createElement("td");
    contentEl.className = "contentClass";
    contentEl.style.display = "inline-block";
    contentEl.style.overflowX = "hidden";
    contentEl.style.overflowY = "scroll";
    contentEl.style.whiteSpace = "normal";
    contentEl.style.width = "450px";
    contentEl.style.height = "120px";
    contentEl.style.borderRadius = "5px";
    contentEl.style.backgroundColor = "white";
    contentEl.textContent = post.Content;
    // containerEl.append(contentEl);

    const contentDivEl = document.createElement("div");
    contentDivEl.append(contentLabel);
    contentDivEl.append(contentEl);
    containerEl.append(contentDivEl);

    const updatedEl = document.createElement("td");
    updatedEl.className = "updatedClass";
    updatedEl.style.width = "80px";
    updatedEl.style.borderRadius = "5px";
    updatedEl.style.backgroundColor = "white";
    updatedEl.textContent = post.updatedAt.slice(0, 10);
    containerEl.append(updatedEl);

    const updateDateDivEl = document.createElement("div");
    updateDateDivEl.append(updateDateLabel);
    updateDateDivEl.append(updatedEl);
    containerEl.append(updateDateDivEl);

    const dateEl = document.createElement("td");
    dateEl.className = "dateClass";
    dateEl.style.width = "80px";
    dateEl.style.borderRadius = "5px";
    dateEl.style.backgroundColor = "white";
    dateEl.textContent = post.endDate;
    containerEl.append(dateEl);

    const dateDivEl = document.createElement("div");
    dateDivEl.append(endDateLabel);
    dateDivEl.append(dateEl);
    containerEl.append(dateDivEl);

    const editButtonEl = document.createElement("button");
    editButtonEl.className = "editDeleteButton";
    editButtonEl.addEventListener("click", openEditModal);
    // editButtonEl.style.marginBottom = "5px";
    editButtonEl.style.width = "60px";
    editButtonEl.style.borderRadius = "5px";
    editButtonEl.textContent = "Edit";
    containerEl.append(editButtonEl);

    const deleteButtonEl = document.createElement("button");
    deleteButtonEl.className = "editDeleteButton";
    deleteButtonEl.addEventListener("click", deletePost);
    deleteButtonEl.style.borderRadius = "5px";
    deleteButtonEl.style.width = "60px";
    deleteButtonEl.textContent = "Delete";
    containerEl.append(deleteButtonEl);

    // const buttonsDivEl = document.createElement("div");
    // buttonsDivEl.append(editButtonEl);
    // buttonsDivEl.append(deleteButtonEl);
    // containerEl.append(buttonsDivEl);

    document.querySelector(".posts").append(containerEl);
  });
}

function openEditModal(e) {
  modal.style.display = "flex";

  const idValue = e.target.parentElement.id.substring(8);

  const typeValue = document.querySelector(
    `#${e.target.parentElement.id} td`
  ).textContent;
  console.log(typeValue);

  const contentValue = document.querySelector(
    `#${e.target.parentElement.id} .contentClass`
  ).textContent;

  console.log(contentValue);

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
      location.href = "/front_end_baigiamasis/app/app.html";
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
