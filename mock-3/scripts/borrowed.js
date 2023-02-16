const books_table = document.querySelector(".books_table");
const table_body = books_table.querySelector(".table_body");
console.log("script running data");
function getBooksData() {
  fetch("https://my-mock-server-tnse.onrender.com/books")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      appendBooks(data);
    })
    .catch((err) => {
      console.log("error while fetching books", err);
    });
}

function appendBooks(data) {
  table_body.innerHTML = "";
  data.forEach((book) => {
    const tableRow = document.createElement("tr");
    const bookImgCont = document.createElement("td");
    const bookImage = document.createElement("img");
    const bookName = document.createElement("td");
    const bookAuthor = document.createElement("td");
    const bookGenre = document.createElement("td");
    const bookCost = document.createElement("td");
    const bookEdition = document.createElement("td");
    const bookPublisher = document.createElement("td");

    bookImgCont.append(bookImage);
    bookImage.setAttribute("src", `${book.image_url}`);
    bookName.textContent = `${book.book_name}`;
    bookAuthor.textContent = `${book.author}`;
    bookGenre.textContent = `${book.genre}`;
    bookCost.textContent = `${book.cost}`;
    bookPublisher.textContent = `${book.publisher}`;
    bookEdition.textContent = `${book.edition}`;

    tableRow.append(
      bookImgCont,
      bookName,
      bookAuthor,
      bookGenre,
      bookEdition,
      bookPublisher,
      bookCost,
    );
    book.borrowed && table_body.append(tableRow);
  });
}

getBooksData();



