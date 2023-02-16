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
    const editBtnCont = document.createElement("td");
    const deleteBtnCont = document.createElement("td");
    const editBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    editBtn.classList.add("btn", "edit_btn");
    deleteBtn.classList.add("btn", "delete_btn");

    editBtn.textContent = "Edit";
    deleteBtn.textContent = "Delete";

    editBtnCont.append(editBtn);
    deleteBtnCont.append(deleteBtn);

    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      handleDelete(book.id);
    });

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
      editBtnCont,
      deleteBtnCont
    );
    table_body.append(tableRow);
  });
}

getBooksData();

function handleDelete(id) {
  fetch(`https://my-mock-server-tnse.onrender.com/books/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      getBooksData();
    })
    .catch((err) => {
      console.log("error while fetching books", err);
    });
}


//commit file