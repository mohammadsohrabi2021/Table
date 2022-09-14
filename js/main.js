const userForm = document.querySelector("#userForm");
const tbody = document.querySelector(".table-group-divider");
const submit = document.querySelector("#userFormSubmit");
const keys = ["id", "FirstName", "LastName", "Age", "Phone", "Email"];


let users = [];
function setUsers(newUsers) {
  users = [...newUsers];
  render(users);
}

function render(data = []) {
  tbody.innerHTML = "";
  data.forEach((user) => {
    const row = document.createElement("tr");
    row.id = user.id;
    for (let key of keys) {
      const td = document.createElement("td");
      td.innerText = user[key];
      row.appendChild(td);
    }
    const td = document.createElement("td");
     const deleteButton = document.createElement("button");
     deleteButton.classList.add("btn", "btn-danger");
     deleteButton.innerText = "DELETE";
     deleteButton.addEventListener("click", function (e) {
       tbody.removeChild(e.target.parentElement.parentElement);
     });

    td.appendChild(deleteButton);
    row.appendChild(td);
    tbody.appendChild(row);
  });
}

userForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  if (submit.value === "update") {
    updateUser(data);
  } else {
    data.id = Math.floor(Math.random() * 1000);
    setUsers([...users, data]);
  }
  submit.value = "create";
  e.target.reset();
});



