async function searchPlayers() {
  const query = document.getElementById("searchInput").value;
  const res = await fetch(`/players?name=${query}`);
  const data = await res.json();

  const container = document.getElementById("players");
  container.innerHTML = "";

  data.forEach((player) => {
    const card = document.createElement("div");
    card.className = "player-card";
    card.innerHTML = `
      <img src="${player.image}" alt="${player.name}">
      <h3>${player.name}</h3>
      <p>${player.team} - ${player.position}</p>
    `;
    container.appendChild(card);
  });
}

async function simulateMatch() {
  const teamA = document.getElementById("teamA").value;
  const teamB = document.getElementById("teamB").value;
  const res = await fetch(`/simulate?teamA=${teamA}&teamB=${teamB}`);
  const data = await res.json();

  const resultDiv = document.getElementById("matchResult");
  resultDiv.innerHTML = `
    <h3>${data.teamA} ${data.scoreA} - ${data.scoreB} ${data.teamB}</h3>
    <p>Winner: ${data.winner}</p>
  `;
}
