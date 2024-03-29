const nameInput = document.querySelector(".name-input");
const lastNameInput = document.querySelector(".lname-input");
const passwordInput = document.querySelector(".password-input");
const submitBtn = document.querySelector(".submit-btn");

async function sendDatas(e) {
  e.preventDefault();

  if (
    nameInput.value !== "" &&
    lastNameInput.value !== "" &&
    passwordInput.value !== ""
  ) {

    let newUser = {
      name: nameInput.value,
      lname: lastNameInput.value,
      password: passwordInput.value,
    };

    await fetch(
      "https://login-page1-1ccde-default-rtdb.firebaseio.com/user.json",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(newUser),
      }
    )
      .then((data) => {
        if (data.status === 200) {
          console.log(data);
          resetInputs();
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Please turn you vpn on :)))");
      });
  }
}

function resetInputs() {
  nameInput.value = "";
  lastNameInput.value = "";
  passwordInput.value = "";
}

submitBtn.addEventListener("click", sendDatas);
