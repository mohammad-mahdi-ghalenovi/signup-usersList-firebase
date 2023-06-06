const nameInput = document.querySelector(".name-input");
const lastNameInput = document.querySelector(".lname-input");
const passwordInput = document.querySelector(".password-input");
const submitBtn = document.querySelector(".submit-btn");

async function sendDatas(e) {
  e.preventDefault();

  let newUser = {
    id: 1,
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
    .then((response) => response)
    .then((data) => {
      if (data.status === 200) {
        resetInputs();
      }
    })
    .catch((err) => {
      console.log(err);
      alert("Please turn you vpn on :)))");
    });
}


function resetInputs() {
  nameInput.value = "";
  lastNameInput.value = "";
  passwordInput.value = "";
}

submitBtn.addEventListener("click", sendDatas);
