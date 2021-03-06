auth.onAuthStateChanged(user => {
  if (user) {
    db.collection("todos").onSnapshot(
      snapshot => {
        setupTodos(snapshot.docs);
        setupUI(user);
      },
      err => {
        console.log(err.message);
      }
    );
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
      content: createForm["content"].value,
      category: createForm["category"].value,
      uid: localStorage["UID"]
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
  const password = signupForm["signup-password"].value;

  auth
    .createUserWithEmailAndPassword(email, password)
    .then(cred => {
      localStorage["UID"] = cred.user.uid;
      var UID = localStorage["UID"];
      console.log(UID);
      return db
        .collection("users")
        .doc(cred.user.uid)
        .set({
          email: signupForm["signup-email"].value,
          uid: cred.user.uid
        });
    })
    .then(() => {
      const modal = document.querySelector("#modal-signup");
      M.Modal.getInstance(modal).close();
      signupForm.reset();
      signupForm.querySelector(".modals__error").innerHTML = "";
    })
    .catch(err => {
      signupForm.querySelector(".modals__error").innerHTML = err.message;
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

  auth
    .signInWithEmailAndPassword(email, password)
    .then(cred => {
      localStorage["UID"] = cred.user.uid;
      var UID = localStorage["UID"];
      console.log(UID);
      const modal = document.querySelector("#modal-login");
      M.Modal.getInstance(modal).close();
      loginForm.reset();
      loginForm.querySelector(".modals__error").innerHTML = "";
    })
    .catch(err => {
      loginForm.querySelector(".modals__error").innerHTML = err.message;
    });
});

//update email
const changeForm = document.querySelector("#change-form");
changeForm.addEventListener("submit", e => {
  e.preventDefault();
  const email = changeForm["change-email"].value;
  console.log(email);
  var user = firebase.auth().currentUser;
  const modal = document.querySelector("#change-form");
  user
    .updateEmail(email)
    .then(function() {
      console.log("email changed");
    })
    .catch(function(error) {
      console.log(error);
    });
});

//delete account
function deleteUser() {
  var user = firebase.auth().currentUser;
  user
    .delete()
    .then(function() {
      // User deleted.
    })
    .catch(function(error) {
      // An error happened.
    });
}
