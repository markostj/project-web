const todosList = document.querySelector(".todos");
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
const accountDetails = document.querySelector(".account-details");

const setupUI = user => {
  if (user) {
    const html = `
      <p>Logged in as ${user.email}</p>  
    `; //napraviti jos za account mijenjanje podataka
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
    data.forEach(doc => {
      const todo = doc.data();
      const li = `
      <li>
      <div class="collapsible-header ">${todo.title}</div>
      <div class="collapsible-body ">${todo.content}</div>
      </li>
      `;
      html += li;
    });

    todosList.innerHTML = html;
  } else {
    todosList.innerHTML = '<h4 class="login__h4">Login to view ToDo List</h4>';
  }
};

document.addEventListener("DOMContentLoaded", function() {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});
