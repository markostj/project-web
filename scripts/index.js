const todosList = document.querySelector(".todos");
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
const accountDetails = document.querySelector(".account-details");
const setupUI = user => {
  if (user) {
    const html = `
      <p>Logged in as ${user.email}</p>  
      
    `; //napraviti jos za account mijenjanje podataka tu bi trebalo ici
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
      //staviti da ispise samo kojima je uid jednak uid usera
      const todo = doc.data();
      const li = `
      <li>
      <button class="delete__btn">X</button>
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

function work() {
  clearAllTodoCards();
  console.log("work");
  let html = "";
  const workTodos = data => {
    data = data.filter(doc => {
      if (
        doc.data().uid === localStorage["UID"] &&
        doc.data().category === "work"
      ) {
        const todo = doc.data();
        const li = `
            <li>
            <div class="collapsible-header ">${todo.title}</div>
            <div class="collapsible-body ">${todo.content}</div>
            </li>
            `;
        html += li;
      }
      return html;
    });

    todosList.innerHTML = html;
  };
}

document.addEventListener("DOMContentLoaded", function() {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});
