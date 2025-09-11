const playBtn = document.getElementById("playBtn");
const playerSelect = document.querySelector(".player-select");
const mainMenu = document.querySelector(".main-menu");
const matchField = document.querySelector(".match-field");
const playerList = document.getElementById("playerList");
const startMatchBtn = document.getElementById("startMatchBtn");

playBtn.onclick = () => {
  mainMenu.classList.add("hidden");
  playerSelect.classList.remove("hidden");
};

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", async () => {
  const query = searchInput.value;
  playerList.innerHTML = "Loading...";

  const res = await fetch(`/api/search/${query}`);
  const players = await res.json();
  playerList.innerHTML = "";

  players.forEach((p) => {
    const div = document.createElement("div");
    div.innerHTML = `<img src="${p.image}" width="50" height="50"> ${p.name} - ${p.position}`;
    div.classList.add("player");
    playerList.appendChild(div);
  });
});

startMatchBtn.onclick = () => {
  playerSelect.classList.add("hidden");
  matchField.classList.remove("hidden");
  startMatch();
};

function startMatch() {
  const field = document.getElementById("field");
  const players = document.querySelectorAll(".player");

  players.forEach((p, i) => {
    const img = document.createElement("img");
    img.src = p.querySelector("img").src;
    img.classList.add("player");
    img.style.left = `${50 + i * 100}px`;
    img.style.top = `${200}px`;
    field.appendChild(img);

    setInterval(() => {
      img.style.left = `${Math.random() * 750}px`;
      img.style.top = `${Math.random() * 350}px`;
    }, 1000 + i * 500);
  });
}
