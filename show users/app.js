const usersContainerElem = document.querySelector(".users-container");
const deleteModalElem = document.querySelector(".delete-modal");
let allUsers;
let userID = null;

function getDatas() {
  fetch("https://login-page1-1ccde-default-rtdb.firebaseio.com/user.json")
    .then((response) => response.json())
    .then((data) => {
      allUsers = data;

      if (allUsers) {
        allUsers = Object.entries(allUsers);

        usersContainerElem.innerHTML = "";

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

function showDeleteModal(id) {
  userID = id;
  deleteModalElem.classList.add("visible");
}

function closeModal() {
  deleteModalElem.classList.remove("visible");
}

async function deleteUser() {
  await fetch(
    `https://login-page1-1ccde-default-rtdb.firebaseio.com/user/${userID}.json`,
    {
      method: "DELETE",
    }
  )
    .then((response) => console.log(response))
    .catch((err) => console.log(err));

  getDatas();
  closeModal();
}

function showEditModal(id) {
  userID = id;
  console.log(userID);
}

window.addEventListener("load", () => {
  getDatas();
});
