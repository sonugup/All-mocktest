const date_form = document.querySelector(".date_form");
const start_date_field = document.querySelector("#start_date");
const end_date_field = document.querySelector("#end_date");

date_form.addEventListener("submit", (e) => {
  e.preventDefault();
  let startDate = start_date_field.value;
  let endDate = end_date_field.value;
  startDate && endDate && getData(startDate, endDate);
});

function getData(start_date, end_date) {
  //https://www.balldontlie.io/api/v1/games?start_date=2019-01-30&end_date=2019-02-09
  fetch(
    `https://www.balldontlie.io/api/v1/games?start_date=${start_date}&end_date=${end_date}`
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

//getting the container
let section_games = document.querySelector(".section_games");
function appendData(data) {
  if (!data) return alert("No Games found");
  data.forEach((gameInfo) => {
    let { date, home_team_score, season, status, visitor_team_score } =
      gameInfo;
    let { full_name: home_team_name, divison: home_division } =
      gameInfo.home_team;
    let { full_name: visitor_team_name, divison: visitor_division } =
      gameInfo.visitor_team;
    date = date.substring(0, 10);
    let gameInfoDiv = document.createElement("div");
    gameInfoDiv.classList.add("game_info");
    gameInfoDiv.innerHTML = `
    <div class="team team1">
          <img class="basket_ball_img" src="./images/basket_ball.jpg" alt="" />
          <h1 class="team_name">${home_team_name}</h1>
          <p class="date">Date: ${date}</p>
          <p class="season">Season: ${season}</p>
          <p class="status">Status: ${status}</p>
          <p class="score home_team">Home Team Score: ${home_team_score}</p>
          <p class="division">Divison ${home_division}</p>
          <p class="result">${
            home_team_score > visitor_team_score ? "Won" : "Lost"
          }</p>
        </div>
        <div class="team team2">
          <img class="basket_ball_img" src="./images/basket_ball.jpg" alt="" />
          <h1 class="team_name">${visitor_team_name}</h1>
          <p class="date">Date: ${date}</p>
          <p class="season">Season: ${season}</p>
          <p class="status">Status: ${status}</p>
          <p class="score home_team">visitors Team Score: ${visitor_team_score}</p>
          <p class="division">Divison ${visitor_division}</p>
          <p class="result">${
            visitor_team_score > home_team_score ? "Won" : "Lost"
          }</p>
        </div>
    `;
    // const team1 = gameInfo.querySelector(".team1");
    // const result1 = team1.querySelector(".result");
    // const team2 = gameInfo.querySelector(".team2");
    // const result2 = team2.querySelector(".result");

    // if (home_team_score > visitor_team_score) {
    //   result1.textContent = "Won";
    //   result2.textContent = "Lost";
    //   result1.style.color = "green";
    //   result2.style.color = "red";
    // } else {
    //   result2.textContent = "Won";
    //   result1.textContent = "Lost";
    //   result2.style.color = "green";
    //   result1.style.color = "red";
    // }
    section_games.append(gameInfoDiv);
  });
}