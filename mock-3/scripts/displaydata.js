const books_container = document.querySelector(".books_container");

function getBooksData(queries = "") {
  fetch(`https://my-mock-server-tnse.onrender.com/books?${queries}`)
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
  books_container.innerHTML = "";
  data.forEach((book) => {
    const bookCard = document.createElement("div");
    const bookImgDiv = document.createElement("div");
    const bookImg = document.createElement("img");
    bookImgDiv.append(bookImg);
    const bookInfoDiv = document.createElement("div");
    const bookName = document.createElement("p");
    const bookAuthor = document.createElement("p");
    const bookGenre = document.createElement("p");
    const bookCost = document.createElement("td");
    const bookEdition = document.createElement("p");
    const bookPublisher = document.createElement("p");
    const borrowBtn = document.createElement("button");
    borrowBtn.classList.add("btn", "borrowBtn");
    borrowBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      dealWithBorrow(book);
    });

    borrowBtn.textContent = "borrow";
    bookInfoDiv.append(
      bookName,
      bookAuthor,
      bookGenre,
      bookCost,
      bookEdition,
      bookPublisher,
      borrowBtn
    );

    bookImg.setAttribute("src", `${book.image_url}`);
    bookName.textContent = `Name ${book.book_name}`;
    bookAuthor.textContent = `Author ${book.author}`;
    bookGenre.textContent = `Genre ${book.genre}`;
    bookCost.textContent = `Cost ${book.cost}`;
    bookPublisher.textContent = `Publisher ${book.publisher}`;
    bookEdition.textContent = `Edition ${book.edition}`;

    // adding classes
    bookCard.classList.add("book_card");
    bookImgDiv.classList.add("book_img_div");
    bookInfoDiv.classList.add("book_info_div");

    bookCard.append(bookImgDiv, bookInfoDiv);
    books_container.append(bookCard);
  });
}

getBooksData();

const borrowModal = document.querySelector(".borrow_modal");
const borrowBookName = borrowModal.querySelector(".borrow_book_name");
const borrowBookAuthor = borrowModal.querySelector(".borrow_book_author");
const borrowBookEdition = borrowModal.querySelector(".borrow_book_edition");

const closeModal = borrowModal.querySelector(".close");
closeModal.addEventListener("click", (e) => {
  e.stopPropagation();
  borrowModal.classList.toggle("show_modal");
});

const confirmModal = borrowModal.querySelector(".confirm");

function dealWithBorrow(book) {
  borrowModal.classList.toggle("show_modal");

  borrowBookName.textContent = book.book_name;
  borrowBookAuthor.textContent = book.author;
  borrowBookEdition.textContent = book.edition;

  confirmModal.addEventListener("click", (e) => {
    e.stopPropagation();
    confirmBorrow();
  });
  function confirmBorrow() {
    fetch(`https://my-mock-server-tnse.onrender.com/books/${book.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ borrowed: true }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        borrowModal.classList.toggle("show_modal");
      })
      .catch((err) => {
        console.log("error while fetching books", err);
      });
  }
}

// sorting and filtering
const sort = document.querySelector("#sort");

sort.addEventListener("change", (e) => {
  e.stopPropagation();
  let query = "";
  if (sort.value == "asc") {
    query = "_sort=cost&_order=asc";
  } else if (sort.value == "dsc") {
    query = "_sort=cost&_order=desc";
  }
  getBooksData(query);
});

const filter = document.querySelector("#filter_by_genre");

filter.addEventListener("change", (e) => {
  e.stopPropagation();
  let query;
  query = `genre=${filter.value}`;
  getBooksData(query);
});
