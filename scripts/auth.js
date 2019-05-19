auth.onAuthStateChanged(user => {
  if (user) {
    db.collection("todos").onSnapshot(snapshot => {
      setupTodos(snapshot.docs);
      setupUI(user);
    });
  } else {
    setupUI();
    setupTodos([]);
  }
});

const createForm = document.querySelector("#create-form");
createForm.addEventListener("submit", e => {
  e.preventDefault();

  db.collection("todos")
    .add({
      //tu dohvacamo nasu kolekciju
      title: createForm["title"].value,
      content: createForm["content"].value //trebamo dodati jos id-eve kako bi prepoznali kasnije za completed i order po kojima cemo moci drag&drop
    }) // mozda isto dodati za timestamp kad je napravljeno
    .then(() => {
      const modal = document.querySelector("#modal-create");
      M.Modal.getInstance(modal).close();
      createForm.reset();
    })
    .catch(error => {
      console.log(error.message);
    });
});

//signup
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", e => {
  e.preventDefault();

  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value; //napraviti provjere za email
  if (email) {
    console.log(`email je okej`);
  }

  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    const modal = document.querySelector("#modal-signup");
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
});

//logout
const logout = document.querySelector("#logout");
logout.addEventListener("click", e => {
  e.preventDefault();
  auth.signOut().then(() => {
    alert("Odlogirali ste se");
  });
});

const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", e => {
  e.preventDefault();

  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;

  auth.signInWithEmailAndPassword(email, password).then(cred => {
    const modal = document.querySelector("#modal-login");
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });
});
