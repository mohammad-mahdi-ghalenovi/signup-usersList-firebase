const usersContainerElem = document.querySelector(".users-container");
let allUsers;

function getDatas() {
  fetch("https://login-page1-1ccde-default-rtdb.firebaseio.com/user.json")
    .then((response) => response.json())
    .then((data) => {
      allUsers = data;

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
          <button class="user__delete">Delete</button>
          <button class="user__edit">Edit</button>
        </div>
      </div>
        `
        );
      });
    });
}

window.addEventListener("load", () => {
  getDatas();
});
