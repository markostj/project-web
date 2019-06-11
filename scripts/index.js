const todosList = document.querySelector(".todos");
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
const accountDetails = document.querySelector(".account-details");
const setupUI = user => {
  if (user) {
    const html = `
      <p>Logged in as ${user.email}</p>  
      
    `;
    accountDetails.innerHTML = html;
    loggedInLinks.forEach(item => (item.style.display = "block"));
    loggedOutLinks.forEach(item => (item.style.display = "none"));
  } else {
    accountDetails.innerHTML = "";

    loggedInLinks.forEach(item => (item.style.display = "none"));
    loggedOutLinks.forEach(item => (item.style.display = "block"));
  }
};

const setupTodos = data => {
  if (data.length) {
    let html = "";
    data = data.filter(doc => {
      return doc.data().uid == localStorage["UID"];
    });
    data.filter(doc => {
      const todo = doc.data();
      console.log(doc.id);
      deleteItem = doc.id;
      const li = `
      <li class="todo-data">
      <button  onclick="deleteData(deleteItem)" class="delete__btn">X</button>
      <div class="collapsible-header ">${todo.title}</div>
      <div class="collapsible-body ">${todo.content}</div>
      </li>
      `;
      html += li;
    });

    todosList.innerHTML = html;
  } else {
    todosList.innerHTML =
      '<h4 class="login__h4">Login to view ToDo or add new item List</h4>';
  }
};

function clearAllTodoCards() {
  todosList.innerHTML = "";
}

function allTodos() {
  clearAllTodoCards();
  console.log("all");
  let html = "";
  db.collection("todos")
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        if (doc.data().uid === localStorage["UID"]) {
          console.log(doc.id, " =>", doc.data());
          deleteItem = doc.id;
          const todo = doc.data();
          const li = `
            <li class="todo-data">
            <button  onclick="deleteData(deleteItem)" class="delete__btn">X</button>
            <div class="collapsible-header ">${todo.title}</div>
            <div class="collapsible-body ">${todo.content}</div>
            </li>
            `;
          html += li;
        }
        return html;
      });
      todosList.innerHTML = html;
    });
}

function workTodos() {
  clearAllTodoCards();
  console.log("work");
  let html = "";
  db.collection("todos")
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        if (
          doc.data().uid === localStorage["UID"] &&
          doc.data().category === "work"
        ) {
          console.log(doc.id, " =>", doc.data());
          const todo = doc.data();
          const li = `
            <li class="todo-data">
            <div class="collapsible-header ">${todo.title}</div>
            <div class="collapsible-body ">${todo.content}</div>
            </li>
            `;
          html += li;
        }
        return html;
      });
      todosList.innerHTML = html;
    });
}

function schoolTodos() {
  clearAllTodoCards();
  console.log("school");
  let html = "";
  db.collection("todos")
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        if (
          doc.data().uid === localStorage["UID"] &&
          doc.data().category === "school"
        ) {
          console.log(doc.id, " =>", doc.data());
          const todo = doc.data();
          const li = `
            <li class="todo-data">
            <div class="collapsible-header ">${todo.title}</div>
            <div class="collapsible-body ">${todo.content}</div>
            </li>
            `;
          html += li;
        }
        return html;
      });
      todosList.innerHTML = html;
    });
}

function otherTodos() {
  clearAllTodoCards();
  console.log("other");
  let html = "";
  db.collection("todos")
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        if (
          doc.data().uid === localStorage["UID"] &&
          doc.data().category === "other"
        ) {
          console.log(doc.id, " =>", doc.data());
          const todo = doc.data();
          const li = `
            <li class="todo-data">
            <div class="collapsible-header ">${todo.title}</div>
            <div class="collapsible-body ">${todo.content}</div>
            </li>
            `;
          html += li;
        }
        return html;
      });
      todosList.innerHTML = html;
    });
}

//deleting data
function deleteData(deleteItem) {
  console.log(deleteItem);
  db.collection("todos")
    .doc(deleteItem)
    .delete()
    .then(function() {
      console.log("Document successfully deleted!");
    })
    .catch(function(error) {
      console.error("Error removing document: ", error);
    });
}

document.addEventListener("DOMContentLoaded", function() {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});
