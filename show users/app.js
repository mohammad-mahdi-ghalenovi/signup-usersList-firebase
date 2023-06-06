let allUsers;

function getDatas() {
  fetch("https://login-page1-1ccde-default-rtdb.firebaseio.com/user.json")
    .then((response) => response.json())
    .then((data) => {
      allUsers = data;

      console.log(allUsers);
    });
}

window.addEventListener("load", () => {
  getDatas();
});
