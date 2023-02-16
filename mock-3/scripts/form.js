const form = document.querySelector(".form");
const bookImgField = form.querySelector("#book_img");
const bookNameField = form.querySelector("#name");
const bookAuthorField = form.querySelector("#author");
const bookGenreField = form.querySelector("#genre");
const bookEditionField = form.querySelector("#edition");
const bookPublisherField = form.querySelector("#publisher");
const bookCostField = form.querySelector("#cost");
bookImgField.value = "https://m.media-amazon.com/images/I/5165He67NEL.jpg";
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const image_url = bookImgField.value;
  const book_name = bookNameField.value;
  const author = bookAuthorField.value;
  const genre = bookGenreField.value;
  const edition = bookEditionField.value;
  const publisher = bookPublisherField.value;
  const cost = +bookCostField.value;
  const borrowed = false;

  if (
    !image_url ||
    !book_name ||
    !author ||
    !genre ||
    !edition ||
    !publisher ||
    !cost
  )
    return alert("Please fill all fields");

  let newBook = {
    image_url,
    book_name,
    author,
    genre,
    edition,
    publisher,
    borrowed,
    cost,
  };
  fetch("https://my-mock-server-tnse.onrender.com/books", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newBook),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      form.reset();
      return alert("post success");
    })
    .catch((err) => console.log(err));
});