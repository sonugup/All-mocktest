const form = document.querySelector(".form");
const emailField = form.querySelector("#email");
const passwordField = form.querySelector("#password");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = emailField.value;
  const password = passwordField.value;

  if (!email || !password) return false;

  fetch("https://reqres.in/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.err) return alert(data.error);
      localStorage.setItem("token", data.token);
      form.reset();
      return alert("login success");
    })
    .catch((err) => {
      console.log("err while login", err);
    });
});