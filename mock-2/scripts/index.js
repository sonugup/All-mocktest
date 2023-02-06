const section_players = document.querySelector(".section_players");

//getting the pagination container
const pagination_container = document.querySelector(
  ".section_players_pagination"
);
const prev_btn = pagination_container.querySelector(".prev_page");
const next_btn = pagination_container.querySelector(".next_page");
let current_page_field = pagination_container.querySelector("#current_page");
let current_page = Number(current_page_field.textContent);

//getting the modal container
const modal_container = document.querySelector(".player_detail_modal");
const modal_name = modal_container.querySelector(".modal_name");
const modal_pos = modal_container.querySelector(".modal_pos");
const team_name = modal_container.querySelector(".team_name");
const team_abbr = modal_container.querySelector(".team_abbr");
const team_conference = modal_container.querySelector(".team_conference");
const team_division = modal_container.querySelector(".team_division");
const team_city = modal_container.querySelector(".team_city");
const close_modal = modal_container.querySelector(".close_btn");

close_modal.addEventListener("click", (e) => {
  e.stopPropagation();
  document.body.classList.toggle("make_blur");
  modal_container.classList.toggle("show_modal");
});

next_btn.addEventListener("click", (e) => {
  // console.log("next_btn clicked");
  if (current_page === 1) {
    prev_btn.disabled = true;
  } else if (current_page > 1) prev_btn.disabled = false;
  current_page++;
  current_page_field.textContent = current_page;
  getData(current_page);
});

prev_btn.addEventListener("click", (e) => {
  if (current_page === 1) {
    e.target.disabled = true;
    return;
  }
  current_page--;
  current_page_field.textContent = current_page;
  getData(current_page);
});

//function to fetch the data
function getData(current_page) {
  //www.balldontlie.io/api/v1/players?page=2&per_page=10
  console.log(current_page);
  fetch(
    `https://www.balldontlie.io/api/v1/players?page=${current_page}&per_page=${10}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data && appendData(data.data);
    })
    .catch((err) => {
      console.log("error occured while fetching players", err);
    });
}

function appendModalData(data) {
  let { id, first_name, height_feet, height_inches, last_name, position } =
    data;
  let { team_id, abbreviation, city, conference, division, full_name, name } =
    data.team;
  modal_name.textContent = `name: ${first_name} ${last_name}`;
  modal_pos.textContent = `position: ${position}`;

  team_name.textContent = `Name: ${full_name}`;
  team_abbr.textContent = `Abbr: ${name}`;
  team_conference.textContent = `Conference: ${conference}`;
  team_division.textContent = `Division: ${division}`;
  team_city.textContent = `City: ${city}`;
}

function appendData(data) {
  section_players.innerHTML = "";
  data.forEach((player) => {
    //extracting player info from player object
    let { id, first_name, height_feet, height_inches, last_name, position } =
      player;

    //creating the html elements for players card
    let player_card = document.createElement("div");
    let player_img = document.createElement("img");
    let player_name = document.createElement("p");
    let player_pos = document.createElement("p");
    let showBtn = document.createElement("button");

    //setting up classes for styles
    player_card.classList.add("player_card");
    player_img.classList.add("player_img");
    player_name.classList.add("player_name");
    player_pos.classList.add("player_pos");
    showBtn.classList.add("btn", "showBtn");

    //adding function to show modal once user clicks on showbutton
    showBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      appendModalData(player);
      document.body.classList.toggle("make_blur");
      modal_container.classList.toggle("show_modal");
    });

    //adding content inside the cards
    player_name.textContent = `Name: ${first_name} ${last_name}`;
    player_pos.textContent = `Position: ${position}`;
    player_img.setAttribute("src", "./img/img.jpg");
    showBtn.textContent = "team details";

    //append the elements inside player card
    player_card.append(player_img, player_name, player_pos, showBtn);

    //appneding the player card to the container
    section_players.append(player_card);
  });
}

getData(1);