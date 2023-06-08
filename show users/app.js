const usersContainerElem = document.querySelector(".users-container");
const deleteModalElem = document.querySelector(".delete-modal");
const editModalElem = document.querySelector(".edit-modal");
const nameInput = document.querySelector(".edit-modal .name");
const lnameInput = document.querySelector(".edit-modal .lname");
const passwordInput = document.querySelector(".edit-modal .password");
let allUsers;
let userID = null;

function getDatas() {
  fetch("https://login-page1-1ccde-default-rtdb.firebaseio.com/user.json")
    .then((response) => response.json())
    .then((data) => {
      allUsers = data;

      usersContainerElem.innerHTML = "";

      if (allUsers) {
        allUsers = Object.entries(allUsers);

        allUsers.forEach((item) => {
          usersContainerElem.insertAdjacentHTML(
            "beforeend",
            `
          <div class="user">
          <div class="user__img"></div>
          <div class="user__infos">
            <div class="user__name">${item[1].name} - ${item[1].lname}</div>
            <div class="user__password">Your password : ${item[1].password}</div>
          </div>
          <div class="user__buttons">
            <button class="user__delete" onclick="showDeleteModal('${item[0]}')">Delete</button>
            <button class="user__edit" onclick="showEditModal('${item[0]}')">Edit</button>
          </div>
        </div>
          `
          );
        });
      }
    });
}

// open and close modal

function showDeleteModal(id) {
  userID = id;
  deleteModalElem.classList.add("visible");
}

function closeModal() {
  deleteModalElem.classList.remove("visible");
  editModalElem.classList.remove("visible");
}

// Delete And Edit

async function deleteUser() {
  await fetch(
    `https://login-page1-1ccde-default-rtdb.firebaseio.com/user/${userID}.json`,
    {
      method: "DELETE",
    }
  )
    .then((response) => {
      console.log(response);
    })
    .catch((err) => console.log(err));

  getDatas();
  closeModal();
}

function showEditModal(id) {
  userID = id;
  editModalElem.classList.add("visible");
}

async function editUser() {

  let editedUser = {
    name: nameInput.value,
    lname: lnameInput.value,
    password: passwordInput.value,
  };

  await fetch(
    `https://login-page1-1ccde-default-rtdb.firebaseio.com/user/${userID}.json`,
    {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(editedUser),
    }
  )
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      console.log(data);

      getDatas();
      closeModal();
    });
    
}

window.addEventListener("load", () => {
  getDatas();
});
