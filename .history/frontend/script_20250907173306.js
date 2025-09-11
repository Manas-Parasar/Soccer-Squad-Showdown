window.updateOpponentSelectedPlayerCount = function () {
  try {
    let count = 0;
    const MAX_PLAYERS = 11; // Assuming MAX_PLAYERS is a global constant or accessible

    // 1. Try to compute from JavaScript data model (window.selectedOpponentPlayers)
    if (
      typeof window.selectedOpponentPlayers !== "undefined" &&
      Array.isArray(window.selectedOpponentPlayers)
    ) {
      count = window.selectedOpponentPlayers.length;
    } else if (
      typeof window.opponentLineup !== "undefined" &&
      Array.isArray(window.opponentLineup)
    ) {
      // Fallback to opponentLineup if it exists and is an array
      count = window.opponentLineup.filter(
        (slot) => slot && slot.player !== null
      ).length;
    } else {
      // 2. Fall back to counting DOM elements
      const opponentPlayerElements = document.querySelectorAll(
        ".opponent .player-card, .opponent-slot .assigned, .position-slot.opponent img.player"
      );
      count = opponentPlayerElements.length;
    }

    // 3. Update the UI element
    let opponentCountElement =
      document.getElementById("opponentSelectedCount") ||
      document.querySelector("[data-opponent-count]");

    // If the element doesn't exist, create it dynamically

    if (!opponentCountElement) {
      opponentCountElement = document.createElement("span");
      opponentCountElement.id = "opponentSelectedCount";
      opponentCountElement.setAttribute("data-opponent-count", ""); // Add data attribute for future selection
      // Find a suitable parent to append to.
      // opponentSelectedPlayerCountSpan is a good candidate for a nearby element.
      const parentForOpponentCountElement = document.getElementById(
        "opponent-selected-player-count"
      );
      if (
        parentForOpponentCountElement &&
        parentForOpponentCountElement.parentNode
      ) {
        parentForOpponentCountElement.parentNode.insertBefore(
          opponentCountElement,
          parentForOpponentCountElement.nextSibling
        );
        console.info("Dynamically created #opponentSelectedCount element.");
      } else {
        // Fallback to appending to body if no suitable parent found, though less ideal for styling
        document.body.appendChild(opponentCountElement);
        console.warn(
          "Dynamically created #opponentSelectedCount element and appended to body. Consider placing it in a more appropriate parent element for styling."
        );
      }
    }
    if (opponentCountElement) {
      opponentCountElement.textContent = count;
    }

    // Also update the existing opponentSelectedPlayerCountSpan and confirmOpponentTeamBtn if they exist
    const opponentSelectedPlayerCountSpan = document.getElementById(
      "opponent-selected-player-count"
    );
    if (opponentSelectedPlayerCountSpan) {
      opponentSelectedPlayerCountSpan.textContent = count;
    }

    const confirmOpponentTeamBtn = document.getElementById(
      "confirm-opponent-team-btn"
    );
    if (confirmOpponentTeamBtn) {
      // Assuming isValidOpponentTeam is defined globally or accessible
      // For now, I'll just use the count for disabling, as isValidOpponentTeam might not be global
      confirmOpponentTeamBtn.disabled = count !== MAX_PLAYERS;
    }

    return count;
  } catch (error) {
    console.error("Error in updateOpponentSelectedPlayerCount:", error);
    return 0; // Return 0 or handle error as appropriate
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // --- DOM Elements ---
  const playerSourceSelection = document.getElementById(
    "player-source-selection"
  );
  const predefinedPlayersBtn = document.getElementById(
    "predefined-players-btn"
  );
  const apiPlayersBtn = document.getElementById("api-players-btn");

  const playerSelectionSection = document.getElementById(
    "player-selection-section"
  );
  const availablePlayersDiv = document.getElementById("available-players");
  const selectedPlayersDiv = document.getElementById("selected-players");
  const selectedPlayerCountSpan = document.getElementById(
    "selected-player-count"
  );
  const confirmTeamBtn = document.getElementById("confirm-team-btn");
  const lineupDisplay = document.getElementById("lineup-display"); // New element

  const formationSelectionSection = document.getElementById(
    "formation-selection-section"
  );
  const formationOptionsDiv = document.getElementById("formation-options");
  const simulateMatchBtn = document.getElementById("simulate-match-btn");

  const matchResultsSection = document.getElementById("match-results-section");
  const playByPlayContent = document.getElementById("play-by-play-content");
  const chemistryContent = document.getElementById("chemistry-content");
  const analysisContent = document.getElementById("analysis-content");
  const keepTeamBtn = document.getElementById("keep-team-btn");
  const changePlayersBtn = document.getElementById("change-players-btn");

  const tournamentSection = document.getElementById("tournament-section");
  const tournamentTypeSelect = document.getElementById(
    "tournament-type-select"
  );
  const userTournamentScoreSpan = document.getElementById(
    "user-tournament-score"
  );
  const aiTournamentScoreSpan = document.getElementById("ai-tournament-score");
  const startTournamentBtn = document.getElementById("start-tournament-btn");

  const opponentSelectionSection = document.getElementById(
    "opponent-selection-section"
  );
  const opponentAvailablePlayersDiv = document.getElementById(
    "opponent-available-players"
  );
  const opponentSelectedPlayersDiv = document.getElementById(
    "opponent-selected-players"
  );
  const opponentSelectedPlayerCountSpan = document.getElementById(
    "opponent-selected-player-count"
  );
  const confirmOpponentTeamBtn = document.getElementById(
    "confirm-opponent-team-btn"
  );
  const aiGeneratedOpponentRadio = document.getElementById(
    "ai-generated-opponent"
  );
  const pickOpponentTeamRadio = document.getElementById("pick-opponent-team");

  const homeLink = document.getElementById("home-link"); // Added ID to Home link
  const navbarBrand = document.getElementById("navbar-brand"); // Added ID to Navbar Brand

  // New Results Page Elements
  const gameResultsPage = document.getElementById("game-results-page");
  const finalScoreSpan = document.getElementById("final-score");
  const matchWinnerParagraph = document.getElementById("match-winner");
  const viewDetailedResultsBtn = document.getElementById(
    "view-detailed-results-btn"
  );
  const reSimMatchBtn = document.getElementById("re-sim-match-btn");
  const nextGameTournamentBtn = document.getElementById(
    "next-game-tournament-btn"
  );

  const goBackButtons = document.querySelectorAll(".go-back-btn"); // All go back buttons

  const tournamentCompleteSection = document.getElementById(
    "tournament-complete-section"
  );
  const tournamentWinnerSpan = document.getElementById("tournament-winner");
  const finalTournamentScoreSpan = document.getElementById(
    "final-tournament-score"
  );
  const resetTournamentBtn = document.getElementById("reset-tournament-btn");

  // --- State Variables ---
  const MAX_PLAYERS = 11;
  let allPlayersData = []; // Will be populated from predefinedPlayers object
  let selectedPlayers = []; // Stores user's player objects
  let lineup = new Array(MAX_PLAYERS).fill(null);
  let selectedOpponentPlayers = []; // Stores opponent's player objects
  let currentFormation = null;
  let tournament = {};
  let draggedPlayerIndex = null;

  // --- Predefined Player Data ---
  const predefinedPlayers = {
    goalkeepers: [
      {
        name: "Neuer",
        preferredPosition: "GK",
        secondaryPositions: [],
        baseRating: 92,
        pace: 60,
        dribbling: 65,
        passing: 70,
        shooting: 50,
        defending: 55,
        physical: 80,
        goalkeeping: 92,
        imageUrl: "images/neuer.jpg",
      },
      {
        name: "Buffon",
        preferredPosition: "GK",
        secondaryPositions: [],
        baseRating: 90,
        pace: 58,
        dribbling: 60,
        passing: 68,
        shooting: 48,
        defending: 53,
        physical: 78,
        goalkeeping: 90,
        imageUrl: "images/buffon.jpg",
      },
      {
        name: "Casillas",
        preferredPosition: "GK",
        secondaryPositions: [],
        baseRating: 89,
        pace: 62,
        dribbling: 63,
        passing: 69,
        shooting: 49,
        defending: 54,
        physical: 79,
        goalkeeping: 89,
        imageUrl: "images/casillas.jpg",
      },
      {
        name: "Ter Stegen",
        preferredPosition: "GK",
        secondaryPositions: [],
        baseRating: 91,
        pace: 61,
        dribbling: 66,
        passing: 72,
        shooting: 51,
        defending: 56,
        physical: 81,
        goalkeeping: 91,
        imageUrl: "images/terstegen.jpg",
      },
    ],
    defenders: [
      {
        name: "Alba",
        preferredPosition: "LB",
        secondaryPositions: ["LWB"],
        baseRating: 86,
        pace: 88,
        dribbling: 80,
        passing: 82,
        shooting: 65,
        defending: 84,
        physical: 75,
        goalkeeping: 0,
        imageUrl: "images/alba.jpg",
      },
      {
        name: "Maldini",
        preferredPosition: "LB",
        secondaryPositions: ["CB"],
        baseRating: 94,
        pace: 80,
        dribbling: 75,
        passing: 78,
        shooting: 60,
        defending: 95,
        physical: 90,
        goalkeeping: 0,
        imageUrl: "images/maldini.jpg",
      },
      {
        name: "Marcelo",
        preferredPosition: "LB",
        secondaryPositions: ["LWB", "LM"],
        baseRating: 85,
        pace: 85,
        dribbling: 88,
        passing: 87,
        shooting: 70,
        defending: 78,
        physical: 70,
        goalkeeping: 0,
        imageUrl: "images/marcelo.jpg",
      },
      {
        name: "Cancelo",
        preferredPosition: "LB",
        secondaryPositions: ["RB", "CM"],
        baseRating: 87,
        pace: 86,
        dribbling: 89,
        passing: 88,
        shooting: 72,
        defending: 80,
        physical: 78,
        goalkeeping: 0,
        imageUrl: "images/cancelo.jpg",
      },
      {
        name: "Araujo",
        preferredPosition: "CB",
        secondaryPositions: ["RB"],
        baseRating: 87,
        pace: 82,
        dribbling: 70,
        passing: 70,
        shooting: 55,
        defending: 88,
        physical: 90,
        goalkeeping: 0,
        imageUrl: "images/araujo.jpg",
      },
      {
        name: "Van Dijk",
        preferredPosition: "CB",
        secondaryPositions: [],
        baseRating: 91,
        pace: 78,
        dribbling: 70,
        passing: 75,
        shooting: 60,
        defending: 92,
        physical: 93,
        goalkeeping: 0,
        imageUrl: "images/vandijk.jpg",
      },
      {
        name: "Ramos",
        preferredPosition: "CB",
        secondaryPositions: ["RB"],
        baseRating: 90,
        pace: 75,
        dribbling: 70,
        passing: 72,
        shooting: 68,
        defending: 91,
        physical: 92,
        goalkeeping: 0,
        imageUrl: "images/ramos.jpg",
      },
      {
        name: "Pique",
        preferredPosition: "CB",
        secondaryPositions: [],
        baseRating: 88,
        pace: 70,
        dribbling: 68,
        passing: 70,
        shooting: 58,
        defending: 89,
        physical: 88,
        goalkeeping: 0,
        imageUrl: "images/pique.jpg",
      },
      {
        name: "Kounde",
        preferredPosition: "RB",
        secondaryPositions: ["CB"],
        baseRating: 86,
        pace: 85,
        dribbling: 80,
        passing: 78,
        shooting: 60,
        defending: 85,
        physical: 82,
        goalkeeping: 0,
        imageUrl: "images/kounde.jpg",
      },
      {
        name: "Alves",
        preferredPosition: "RB",
        secondaryPositions: [],
        baseRating: 84,
        pace: 83,
        dribbling: 85,
        passing: 86,
        shooting: 68,
        defending: 78,
        physical: 75,
        goalkeeping: 0,
        imageUrl: "images/alves.jpg",
      },
      {
        name: "Carvajal",
        preferredPosition: "RB",
        secondaryPositions: [],
        baseRating: 83,
        pace: 80,
        dribbling: 78,
        passing: 79,
        shooting: 65,
        defending: 82,
        physical: 78,
        goalkeeping: 0,
        imageUrl: "images/carvajal.jpg",
      },
      {
        name: "Trent",
        preferredPosition: "RB",
        secondaryPositions: ["CM", "RW"],
        baseRating: 87,
        pace: 80,
        dribbling: 85,
        passing: 90,
        shooting: 75,
        defending: 78,
        physical: 78,
        goalkeeping: 0,
        imageUrl: "images/trent.jpg",
      },
    ],
    midfielders: [
      {
        name: "Zidane",
        preferredPosition: "CAM",
        secondaryPositions: ["CM"],
        baseRating: 94,
        pace: 75,
        dribbling: 95,
        passing: 92,
        shooting: 85,
        defending: 60,
        physical: 80,
        goalkeeping: 0,
        imageUrl: "images/zidane.jpg",
      },
      {
        name: "Maradona",
        preferredPosition: "CAM",
        secondaryPositions: ["LW", "RW"],
        baseRating: 95,
        pace: 80,
        dribbling: 98,
        passing: 90,
        shooting: 88,
        defending: 55,
        physical: 70,
        goalkeeping: 0,
        imageUrl: "images/maradona.jpg",
      },
      {
        name: "De Bruyne",
        preferredPosition: "CAM",
        secondaryPositions: ["CM"],
        baseRating: 93,
        pace: 78,
        dribbling: 88,
        passing: 94,
        shooting: 90,
        defending: 65,
        physical: 80,
        goalkeeping: 0,
        imageUrl: "images/debruyne.jpg",
      },
      {
        name: "Bellingham",
        preferredPosition: "CAM",
        secondaryPositions: ["CM"],
        baseRating: 89,
        pace: 82,
        dribbling: 85,
        passing: 87,
        shooting: 80,
        defending: 75,
        physical: 88,
        goalkeeping: 0,
        imageUrl: "images/bellingham.jpg",
      },
      {
        name: "Iniesta",
        preferredPosition: "CM",
        secondaryPositions: ["CAM"],
        baseRating: 92,
        pace: 70,
        dribbling: 92,
        passing: 95,
        shooting: 70,
        defending: 65,
        physical: 68,
        goalkeeping: 0,
        imageUrl: "images/iniesta.jpg",
      },
      {
        name: "Xavi",
        preferredPosition: "CM",
        secondaryPositions: ["CDM"],
        baseRating: 91,
        pace: 65,
        dribbling: 88,
        passing: 96,
        shooting: 60,
        defending: 70,
        physical: 65,
        goalkeeping: 0,
        imageUrl: "images/xavi.jpg",
      },
      {
        name: "Modric",
        preferredPosition: "CM",
        secondaryPositions: ["CAM"],
        baseRating: 90,
        pace: 70,
        dribbling: 90,
        passing: 93,
        shooting: 75,
        defending: 70,
        physical: 70,
        goalkeeping: 0,
        imageUrl: "images/modric.jpg",
      },
      {
        name: "Kroos",
        preferredPosition: "CM",
        secondaryPositions: ["CDM"],
        baseRating: 89,
        pace: 60,
        dribbling: 85,
        passing: 94,
        shooting: 80,
        defending: 72,
        physical: 75,
        goalkeeping: 0,
        imageUrl: "images/kroos.jpg",
      },
      {
        name: "Pedri",
        preferredPosition: "CM",
        secondaryPositions: ["CAM"],
        baseRating: 88,
        pace: 75,
        dribbling: 90,
        passing: 92,
        shooting: 70,
        defending: 70,
        physical: 70,
        goalkeeping: 0,
        imageUrl: "images/pedri.jpg",
      },
      {
        name: "Valverde",
        preferredPosition: "CDM",
        secondaryPositions: ["CM"],
        baseRating: 87,
        pace: 85,
        dribbling: 80,
        passing: 82,
        shooting: 80,
        defending: 85,
        physical: 88,
        goalkeeping: 0,
        imageUrl: "images/valverde.jpg",
      },
      {
        name: "Rodri",
        preferredPosition: "CDM",
        secondaryPositions: ["CB"],
        baseRating: 89,
        pace: 65,
        dribbling: 75,
        passing: 88,
        shooting: 70,
        defending: 90,
        physical: 90,
        goalkeeping: 0,
        imageUrl: "images/rodri.jpg",
      },
      {
        name: "Busquets",
        preferredPosition: "CDM",
        secondaryPositions: ["CM"],
        baseRating: 88,
        pace: 55,
        dribbling: 80,
        passing: 90,
        shooting: 60,
        defending: 88,
        physical: 80,
        goalkeeping: 0,
        imageUrl: "images/busquets.jpg",
      },
    ],
    forwards: [
      {
        name: "Messi",
        preferredPosition: "RW",
        secondaryPositions: ["CAM"],
        baseRating: 96,
        pace: 85,
        dribbling: 98,
        passing: 90,
        shooting: 95,
        defending: 35,
        physical: 65,
        goalkeeping: 0,
        imageUrl: "images/messi.jpg",
      },
      {
        name: "Salah",
        preferredPosition: "RW",
        secondaryPositions: ["LW"],
        baseRating: 90,
        pace: 90,
        dribbling: 88,
        passing: 80,
        shooting: 90,
        defending: 40,
        physical: 75,
        goalkeeping: 0,
        imageUrl: "images/salah.jpg",
      },
      {
        name: "Bale",
        preferredPosition: "RW",
        secondaryPositions: ["ST"],
        baseRating: 87,
        pace: 92,
        dribbling: 85,
        passing: 78,
        shooting: 88,
        defending: 30,
        physical: 80,
        goalkeeping: 0,
        imageUrl: "images/bale.jpg",
      },
      {
        name: "Yamal",
        preferredPosition: "RW",
        secondaryPositions: [],
        baseRating: 84,
        pace: 88,
        dribbling: 90,
        passing: 80,
        shooting: 80,
        defending: 30,
        physical: 68,
        goalkeeping: 0,
        imageUrl: "images/yamal.jpg",
      },
      {
        name: "Haaland",
        preferredPosition: "ST",
        secondaryPositions: ["LW"],
        baseRating: 91,
        pace: 90,
        dribbling: 75,
        passing: 70,
        shooting: 95,
        defending: 30,
        physical: 90,
        goalkeeping: 0,
        imageUrl: "images/haaland.jpg",
      },
      {
        name: "Lewandowski",
        preferredPosition: "ST",
        secondaryPositions: [],
        baseRating: 90,
        pace: 80,
        dribbling: 80,
        passing: 75,
        shooting: 93,
        defending: 30,
        physical: 85,
        goalkeeping: 0,
        imageUrl: "images/lewandowski.jpg",
      },
      {
        name: "Benzema",
        preferredPosition: "ST",
        secondaryPositions: ["CAM"],
        baseRating: 89,
        pace: 78,
        dribbling: 85,
        passing: 82,
        shooting: 90,
        defending: 35,
        physical: 80,
        goalkeeping: 0,
        imageUrl: "images/benzema.jpg",
      },
      {
        name: "Suarez",
        preferredPosition: "ST",
        secondaryPositions: [],
        baseRating: 88,
        pace: 75,
        dribbling: 85,
        passing: 78,
        shooting: 90,
        defending: 40,
        physical: 82,
        goalkeeping: 0,
        imageUrl: "images/suarez.jpg",
      },
      {
        name: "Ronaldo",
        preferredPosition: "LW",
        secondaryPositions: ["ST", "RW"],
        baseRating: 92,
        pace: 88,
        dribbling: 85,
        passing: 78,
        shooting: 95,
        defending: 30,
        physical: 88,
        goalkeeping: 0,
        imageUrl: "images/ronaldo.jpg",
      },
      {
        name: "Neymar",
        preferredPosition: "LW",
        secondaryPositions: ["CAM"],
        baseRating: 91,
        pace: 88,
        dribbling: 95,
        passing: 88,
        shooting: 85,
        defending: 30,
        physical: 70,
        goalkeeping: 0,
        imageUrl: "images/neymar.jpg",
      },
      {
        name: "Ronaldinho",
        preferredPosition: "LW",
        secondaryPositions: ["CAM"],
        baseRating: 93,
        pace: 80,
        dribbling: 96,
        passing: 90,
        shooting: 85,
        defending: 40,
        physical: 75,
        goalkeeping: 0,
        imageUrl: "images/ronaldinho.jpg",
      },
      {
        name: "Mbappe",
        preferredPosition: "LW",
        secondaryPositions: ["ST", "RW"],
        baseRating: 94,
        pace: 96,
        dribbling: 90,
        passing: 82,
        shooting: 92,
        defending: 30,
        physical: 78,
        goalkeeping: 0,
        imageUrl: "images/mbappe.jpg",
      },
    ],
  };

  // Formation requirements: [GK, DEF, MID, FWD]
  const formationRequirements = {
    "4-3-3": { GK: 1, LB: 1, CB: 2, RB: 1, CM: 2, CAM: 1, LW: 1, ST: 1, RW: 1 },
    "4-4-2": { GK: 1, LB: 1, CB: 2, RB: 1, LM: 1, CM: 2, RM: 1, ST: 2 },
    "3-5-2": { GK: 1, CB: 3, LWB: 1, RWB: 1, CDM: 2, CAM: 1, ST: 2 },
    "4-2-3-1": {
      GK: 1,
      LB: 1,
      CB: 2,
      RB: 1,
      CDM: 2,
      CAM: 1,
      LW: 1,
      RW: 1,
      ST: 1,
    },
  };

  // Positional groups for rating calculation
  const positionGroups = {
    GK: ["GK"],
    DEF: ["LB", "CB", "RB", "LWB", "RWB"],
    MID: ["CDM", "CM", "CAM", "LM", "RM"],
    FWD: ["LW", "ST", "RW"],
  };

  // Suitability factors for rating calculation based on position difference
  const positionSuitability = {
    preferred: 1.0, // No penalty
    secondary: 0.95, // 5% penalty
    sameGroup: 0.8, // 20% penalty for positions in the same group but not preferred/secondary
    adjacentGroup: 0.6, // 40% penalty for positions in adjacent groups
    farGroup: 0.3, // 70% penalty for positions in far groups
  };

  // Define adjacency between position groups
  const positionGroupAdjacency = {
    GK: ["DEF"],
    DEF: ["GK", "MID"],
    MID: ["DEF", "FWD"],
    FWD: ["MID"],
  };

  // Function to get the group of a position
  function getPositionGroup(position) {
    for (const group in positionGroups) {
      if (positionGroups[group].includes(position)) {
        return group;
      }
    }
    return "UNKNOWN";
  }

  // Calculates a player's rating based on their assigned position
  function calculatePlayerRating(player, assignedPosition) {
    let rating = player.baseRating;

    if (player.preferredPosition === assignedPosition) {
      return Math.round(rating * positionSuitability.preferred);
    }

    if (player.secondaryPositions.includes(assignedPosition)) {
      return Math.round(rating * positionSuitability.secondary);
    }

    const preferredGroup = getPositionGroup(player.preferredPosition);
    const assignedGroup = getPositionGroup(assignedPosition);

    if (preferredGroup === assignedGroup) {
      return Math.round(rating * positionSuitability.sameGroup);
    }

    if (
      positionGroupAdjacency[preferredGroup] &&
      positionGroupAdjacency[preferredGroup].includes(assignedGroup)
    ) {
      return Math.round(rating * positionSuitability.adjacentGroup);
    }

    // If not in the same group, secondary, or adjacent, it's a far group
    return Math.round(rating * positionSuitability.farGroup);
  }

  // --- Functions ---

  function saveTournament() {
    tournament.userTeam = lineup
      .filter((slot) => slot && slot.player !== null)
      .map((slot) => slot.player);
    localStorage.setItem("tournament", JSON.stringify(tournament));
  }

  function loadTournament() {
    const savedTournament = localStorage.getItem("tournament");
    if (savedTournament) {
      tournament = JSON.parse(savedTournament);
      // Reconstruct lineup to ensure it has the slot structure
      if (
        tournament.lineup &&
        tournament.lineup.length > 0 &&
        !tournament.lineup[0].slotId
      ) {
        // Old format detected, reconstruct
        const newLinearLineup = [];
        const formationConfig = formationRequirements[tournament.formation];
        for (const posType in formationConfig) {
          for (let i = 0; i < formationConfig[posType]; i++) {
            const existingPlayer = tournament.lineup.find(
              (p) => p && p.position === posType
            );
            newLinearLineup.push({
              slotId: `${posType}${i + 1}`,
              positionType: posType,
              player: existingPlayer || null,
            });
            if (existingPlayer) {
              // Mark as processed to avoid duplicates if multiple slots for same position type
              tournament.lineup = tournament.lineup.filter(
                (p) => p !== existingPlayer
              );
            }
          }
        }
        lineup = newLinearLineup;
      } else {
        // New format or empty, use directly
        lineup = tournament.lineup;
      }

      selectedPlayers = lineup
        .filter((slot) => slot.player !== null)
        .map((slot) => slot.player); // Re-populate selectedPlayers from new lineup structure
      currentFormation = tournament.formation;
      updateTournamentUI();
      renderLineup();
    } else {
      tournament = {
        round: 0,
        maxRounds: parseInt(tournamentTypeSelect.value),
        userTeam: [],
        lineup: [],
        opponents: [],
        results: [],
        userWins: 0,
        aiWins: 0,
        draws: 0,
        opponentSelectionMode: "aiGenerated",
      };
    }
  }

  function updateTournamentUI() {
    userTournamentScoreSpan.textContent = tournament.userWins;
    aiTournamentScoreSpan.textContent = tournament.aiWins;
    tournamentTypeSelect.value = tournament.maxRounds;
  }

  // Loads predefined players from the hardcoded data
  function loadPredefinedPlayers() {
    allPlayersData = [
      ...predefinedPlayers.forwards,
      ...predefinedPlayers.midfielders,
      ...predefinedPlayers.defenders,
      ...predefinedPlayers.goalkeepers,
    ];
    playerSourceSelection.classList.add("d-none");
    formationSelectionSection.classList.remove("d-none"); // Show formation selection first
    renderPlayers(allPlayersData, availablePlayersDiv, true); // CRITICAL: Render available players here
  }

  // Renders players into a given container
  function renderPlayers(players, container, isSelectable, isOpponent = false) {
    container.innerHTML = "";

    players.forEach((player) => {
      const playerItem = document.createElement("div");
      playerItem.classList.add("player-card");
      playerItem.dataset.name = player.name;
      playerItem.dataset.preferredPosition = player.preferredPosition;

      playerItem.innerHTML = `
                <img src="${player.imageUrl}" alt="${player.name}" class="player-img">
                <div class="player-details">
                    <strong>${player.name}</strong>
                    <small>(${player.preferredPosition})</small>
                </div>
                <div class="player-card-buttons">
                    <button class="btn btn-sm btn-primary add-player-btn">Add</button>
                    <button class="btn btn-sm btn-secondary details-player-btn">Details</button>
                </div>
            `;

      if (isSelectable) {
        const addButton = playerItem.querySelector(".add-player-btn");
        const detailsButton = playerItem.querySelector(".details-player-btn");

        addButton.addEventListener("click", (e) => {
          e.stopPropagation();
          if (isOpponent) {
            handleOpponentPlayerSelection(player);
          } else {
            handlePlayerSelection(player);
          }
        });

        detailsButton.addEventListener("click", (e) => {
          e.stopPropagation();
          showPlayerDetails(player);
        });
      }
      container.appendChild(playerItem);
    });
  }

  function showPlayerDetails(player) {
    const isPlayerInLineup = lineup.some(
      (p) => p && p.player && p.player.name === player.name
    );
    const currentAssignedPosition = isPlayerInLineup
      ? lineup.find((p) => p && p.player && p.player.name === player.name)
          .positionType
      : null;
    const displayedRating = isPlayerInLineup
      ? calculatePlayerRating(player, currentAssignedPosition)
      : player.baseRating;

    const modalContent = `
            <div class="modal fade" id="player-details-modal" tabindex="-1" aria-labelledby="player-details-modal-label" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="player-details-modal-label">${
                              player.name
                            }</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="text-center">
                                <img src="${player.imageUrl}" alt="${
      player.name
    }" class="img-fluid rounded-circle mb-3" style="width: 150px; height: 150px;">
                            </div>
                            <ul class="list-group">
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    Preferred Position
                                    <span class="badge bg-primary rounded-pill">${
                                      player.preferredPosition
                                    }</span>
                                </li>
                                ${
                                  player.secondaryPositions &&
                                  player.secondaryPositions.length > 0
                                    ? `
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    Secondary Positions
                                    <span class="badge bg-info rounded-pill">${player.secondaryPositions.join(
                                      ", "
                                    )}</span>
                                </li>
                                `
                                    : ""
                                }
                                <li class="list-group-item d-flex justify-content-between align-items-center">
                                    Overall Rating
                                    <span class="badge bg-success rounded-pill">${displayedRating}</span>
                                </li>
                                ${
                                  player.pace
                                    ? `<li class="list-group-item d-flex justify-content-between align-items-center">Pace<span class="badge bg-secondary rounded-pill">${player.pace}</span></li>`
                                    : ""
                                }
                                ${
                                  player.dribbling
                                    ? `<li class="list-group-item d-flex justify-content-between align-items-center">Dribbling<span class="badge bg-secondary rounded-pill">${player.dribbling}</span></li>`
                                    : ""
                                }
                                ${
                                  player.passing
                                    ? `<li class="list-group-item d-flex justify-content-between align-items-center">Passing<span class="badge bg-secondary rounded-pill">${player.passing}</span></li>`
                                    : ""
                                }
                                ${
                                  player.shooting
                                    ? `<li class="list-group-item d-flex justify-content-between align-items-center">Shooting<span class="badge bg-secondary rounded-pill">${player.shooting}</span></li>`
                                    : ""
                                }
                                ${
                                  player.defending
                                    ? `<li class="list-group-item d-flex justify-content-between align-items-center">Defending<span class="badge bg-secondary rounded-pill">${player.defending}</span></li>`
                                    : ""
                                }
                                ${
                                  player.physical
                                    ? `<li class="list-group-item d-flex justify-content-between align-items-center">Physical<span class="badge bg-secondary rounded-pill">${player.physical}</span></li>`
                                    : ""
                                }
                                ${
                                  player.goalkeeping
                                    ? `<li class="list-group-item d-flex justify-content-between align-items-center">Goalkeeping<span class="badge bg-secondary rounded-pill">${player.goalkeeping}</span></li>`
                                    : ""
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;

    const modalElement = document.createElement("div");
    modalElement.innerHTML = modalContent;
    document.body.appendChild(modalElement);

    const modal = new bootstrap.Modal(
      document.getElementById("player-details-modal")
    );
    modal.show();

    const modalInstance = document.getElementById("player-details-modal");
    modalInstance.addEventListener("hidden.bs.modal", () => {
      modalElement.remove();
    });
  }

  function showPositionSelectionModal(playerData) {
    if (!currentFormation) {
      alert("Please select a formation first.");
      return;
    }

    // Create buttons for all slots in the current lineup, indicating if they are filled
    const positionButtonsHtml = lineup
      .map((slot) => {
        const isFilled = slot.player !== null;
        const filledPlayerName = isFilled ? slot.player.name : "";
        const buttonClass = isFilled
          ? "btn-outline-secondary"
          : "btn-outline-primary";
        const buttonText = isFilled
          ? `${slot.positionType} (${filledPlayerName})`
          : slot.positionType;
        return `<button type="button" class="btn btn-sm ${buttonClass} position-btn" data-slot-id="${slot.slotId}">${buttonText}</button>`;
      })
      .join("");

    const modalContent = `
            <div class="modal fade" id="position-selection-modal" tabindex="-1" aria-labelledby="position-selection-modal-label" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="position-selection-modal-label">Select Position for ${playerData.name}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>Choose a position for ${playerData.name}:</p>
                            <div class="d-flex flex-wrap justify-content-center gap-2" id="available-positions-container">
                                ${positionButtonsHtml}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

    const modalElement = document.createElement("div");
    modalElement.innerHTML = modalContent;
    document.body.appendChild(modalElement);

    const modal = new bootstrap.Modal(
      document.getElementById("position-selection-modal")
    );
    modal.show();

    document
      .getElementById("available-positions-container")
      .addEventListener("click", (event) => {
        if (event.target.classList.contains("position-btn")) {
          const selectedSlotId = event.target.dataset.slotId;
          const targetSlot = lineup.find(
            (slot) => slot.slotId === selectedSlotId
          );

          if (targetSlot.player) {
            if (
              confirm(
                `${targetSlot.positionType} is already occupied by ${targetSlot.player.name}. Do you want to replace them?`
              )
            ) {
              // Remove existing player from selectedPlayers
              selectedPlayers = selectedPlayers.filter(
                (p) => p.name !== targetSlot.player.name
              );
              targetSlot.player = null; // Clear the slot
            } else {
              modal.hide();
              return; // User cancelled replacement
            }
          }

          targetSlot.player = playerData; // Assign the player to the slot
          selectedPlayers.push(playerData); // Add to selectedPlayers
          updateSelectedPlayerCount();
          renderLineup();
          modal.hide();
        }
      });

    const positionModalInstance = document.getElementById(
      "position-selection-modal"
    );
    positionModalInstance.addEventListener("hidden.bs.modal", () => {
      modalElement.remove();
    });
  }

  // Updates the count of selected players and button state
  function updateSelectedPlayerCount() {
    selectedPlayerCountSpan.textContent = selectedPlayers.filter(
      (p) => p
    ).length;
    confirmTeamBtn.disabled = !isValidTeam(); // Check if team is valid based on formation

    // Update 'selected' class for players in available list
    allPlayersData.forEach((player) => {
      const playerElement = availablePlayersDiv.querySelector(
        `[data-name="${player.name}"]`
      );
      if (playerElement) {
        if (selectedPlayers.some((p) => p && p.name === player.name)) {
          playerElement.classList.add("selected");
        } else {
          playerElement.classList.remove("selected");
        }
      }
    });
    renderLineup(); // Update lineup display whenever selected players change
  }

  // Checks if the selected team is valid based on current formation requirements
  function isValidTeam() {
    // Count actual players in the lineup (slots that are not null)
    const actualPlayersInLineup = lineup.filter(
      (slot) => slot && slot.player !== null
    ).length;
    if (actualPlayersInLineup !== MAX_PLAYERS) {
      return false;
    }

    const formationConfig = formationRequirements[currentFormation];
    const currentCounts = {};

    // Initialize counts for all positions in the current formation
    for (const posType in formationConfig) {
      currentCounts[posType] = 0;
    }

    // Count players in the lineup by their specific positionType
    lineup.forEach((slot) => {
      if (slot.player && currentCounts.hasOwnProperty(slot.positionType)) {
        currentCounts[slot.positionType]++;
      }
    });

    // Check if current counts match required counts for each position
    for (const posType in formationConfig) {
      if (currentCounts[posType] !== formationConfig[posType]) {
        return false;
      }
    }
    return true;
  }

  // Checks if the selected opponent team is valid (always 4-4-2 for now)
  function isValidOpponentTeam() {
    if (selectedOpponentPlayers.length !== MAX_PLAYERS) {
      return false;
    }
    // AI team always uses 4-4-2 requirements
    const aiFormationRequirements = formationRequirements["4-4-2"];
    const currentCounts = {};

    // Initialize counts for all positions in the AI's 4-4-2 formation
    for (const posType in aiFormationRequirements) {
      currentCounts[posType] = 0;
    }

    // Count players in the opponent's selected team by their specific position
    selectedOpponentPlayers.forEach((player) => {
      if (player && currentCounts.hasOwnProperty(player.position)) {
        currentCounts[player.position]++;
      }
    });

    // Check if current counts match required counts for each position in AI's 4-4-2
    for (const posType in aiFormationRequirements) {
      if (currentCounts[posType] !== aiFormationRequirements[posType]) {
        return false;
      }
    }
    return true;
  }

  function handlePlayerSelection(playerData) {
    if (!currentFormation) {
      alert("Please select a formation first.");
      return;
    }

    // Check if player is already in the lineup
    const existingPlayerSlot = lineup.find(
      (slot) => slot.player && slot.player.name === playerData.name
    );

    if (existingPlayerSlot) {
      // Player is already in lineup, so remove them
      existingPlayerSlot.player = null;
      selectedPlayers = selectedPlayers.filter(
        (p) => p.name !== playerData.name
      ); // Remove from selectedPlayers
      updateSelectedPlayerCount();
      renderLineup(); // Re-render the lineup to show changes
    } else {
      // Player is not in lineup, show position selection
      if (selectedPlayers.length >= MAX_PLAYERS) {
        alert(
          `Your team is already full (${MAX_PLAYERS} players). Please remove a player first.`
        );
        return;
      }
      showPositionSelectionModal(playerData);
    }
  }

  // Helper function to get information about a lineup slot based on its index
  function getLineupSlotInfo(index) {
    const formation = currentFormation;
    if (!formation) return null;

    const formationConfig = formationRequirements[formation];
    let currentLinearIndex = 0;
    for (const posType in formationConfig) {
      for (let i = 0; i < formationConfig[posType]; i++) {
        if (currentLinearIndex === index) {
          return { positionType: posType, indexInFormation: i };
        }
        currentLinearIndex++;
      }
    }
    return null;
  }

  // Handles adding/removing players from the opponent's team
  function handleOpponentPlayerSelection(playerData) {
    const index = selectedOpponentPlayers.findIndex(
      (p) => p.name === playerData.name
    );

    if (index > -1) {
      selectedOpponentPlayers.splice(index, 1);
    } else {
      if (selectedOpponentPlayers.length < MAX_PLAYERS) {
        // For simplicity, AI team always uses 4-4-2 requirements
        const currentPositionCount = selectedOpponentPlayers.filter(
          (p) => p.position === playerData.position
        ).length;
        const requiredCount = {
          Goalkeeper: 1,
          Defender: 4,
          Midfielder: 4,
          Forward: 2,
        }[playerData.preferredPosition];

        if (currentPositionCount < requiredCount) {
          selectedOpponentPlayers.push(playerData);
        } else {
          alert(
            `Opponent team can only have ${requiredCount} ${playerData.position}s for a 4-4-2 formation.`
          );
          return;
        }
      } else {
        alert(`Opponent team can only have ${MAX_PLAYERS} players.`);
        return;
      }
    }
    renderPlayers(
      selectedOpponentPlayers,
      opponentSelectedPlayersDiv,
      true,
      true
    ); // Re-render selected opponent players
    if (typeof window.updateOpponentSelectedPlayerCount === "function") {
      window.updateOpponentSelectedPlayerCount();
    }
  }

  function getPositionInfo(positionType, indexInFormation) {
    const formation = currentFormation;
    if (!formation) return { x: 0, y: 0 };

    // Define base positions for each specific role within a formation
    // Coordinates are percentages (x from left, y from top)
    const positions = {
      "4-3-3": {
        GK: [{ x: 50, y: 90 }],
        LB: [{ x: 10, y: 70 }],
        CB: [
          { x: 35, y: 75 },
          { x: 65, y: 75 },
        ],
        RB: [{ x: 90, y: 70 }],
        CM: [
          { x: 25, y: 45 },
          { x: 75, y: 45 },
        ],
        CAM: [{ x: 50, y: 40 }],
        LW: [{ x: 15, y: 15 }],
        ST: [{ x: 50, y: 10 }],
        RW: [{ x: 85, y: 15 }],
      },
      "4-4-2": {
        GK: [{ x: 50, y: 90 }],
        LB: [{ x: 10, y: 70 }],
        CB: [
          { x: 35, y: 75 },
          { x: 65, y: 75 },
        ],
        RB: [{ x: 90, y: 70 }],
        LM: [{ x: 10, y: 45 }],
        CM: [
          { x: 35, y: 40 },
          { x: 65, y: 40 },
        ],
        RM: [{ x: 90, y: 45 }],
        ST: [
          { x: 35, y: 15 },
          { x: 65, y: 15 },
        ],
      },
      "3-5-2": {
        GK: [{ x: 50, y: 90 }],
        CB: [
          { x: 25, y: 75 },
          { x: 50, y: 80 },
          { x: 75, y: 75 },
        ],
        LWB: [{ x: 10, y: 50 }],
        RWB: [{ x: 90, y: 50 }],
        CDM: [
          { x: 30, y: 45 },
          { x: 70, y: 45 },
        ],
        CAM: [{ x: 50, y: 35 }],
        ST: [
          { x: 35, y: 15 },
          { x: 65, y: 15 },
        ],
      },
      "4-2-3-1": {
        GK: [{ x: 50, y: 90 }],
        LB: [{ x: 10, y: 70 }],
        CB: [
          { x: 35, y: 75 },
          { x: 65, y: 75 },
        ],
        RB: [{ x: 90, y: 70 }],
        CDM: [
          { x: 35, y: 50 },
          { x: 65, y: 50 },
        ],
        CAM: [{ x: 50, y: 30 }],
        LW: [{ x: 20, y: 25 }],
        RW: [{ x: 80, y: 25 }],
        ST: [{ x: 50, y: 10 }],
      },
    };

    // Get the specific positions for the current formation and position type
    const specificPositions =
      positions[formation] && positions[formation][positionType];

    if (specificPositions && specificPositions[indexInFormation]) {
      return specificPositions[indexInFormation];
    } else {
      // Fallback if position type or formation not found
      return { x: 0, y: 0 };
    }
  }

  // Renders the visual lineup on the soccer field
  function renderLineup() {
    const lineupDisplayField = document.getElementById("lineup-display");
    lineupDisplayField.innerHTML = "";
    lineupDisplayField.className = `soccer-field formation-${currentFormation}`;

    if (!currentFormation) {
      lineupDisplayField.innerHTML =
        '<p class="text-center text-muted mt-5">Select a formation first to see the lineup.</p>';
      return;
    }

    lineup.forEach((slot) => {
      const posType = slot.positionType;
      // Extract index from slotId (e.g., "CM1" -> 0, "CM2" -> 1)
      const i = parseInt(slot.slotId.match(/\d+/)[0]) - 1;

      const playerSlot = document.createElement("div");
      playerSlot.classList.add("player-slot");
      playerSlot.dataset.positionType = posType; // Store the specific position type
      playerSlot.dataset.slotId = slot.slotId; // Store the unique slot ID

      const positionCoords = getPositionInfo(posType, i);
      playerSlot.style.left = `${positionCoords.x}%`;
      playerSlot.style.top = `${positionCoords.y}%`;
      playerSlot.style.transform = `translate(-50%, -50%)`; // Center the slot

      if (slot.player) {
        const adjustedRating = calculatePlayerRating(
          slot.player,
          slot.positionType
        );
        playerSlot.innerHTML = `
                    <div class="player-card">
                        <img src="${slot.player.imageUrl}" alt="${slot.player.name}">
                        <div class="player-info">
                            <strong>${slot.player.name}</strong>
                            <small>${slot.positionType} - OVR: ${adjustedRating}</small>
                        </div>
                    </div>
                `;
      } else {
        playerSlot.innerHTML = `<span>${posType}</span>`; // Show position type if no player
      }
      lineupDisplayField.appendChild(playerSlot);
    });
  }

  function handlePlayerDrop(e, targetSlot) {
    const targetPositionType = targetSlot.dataset.positionType;

    if (draggedPlayer) {
      // Check if the dragged player can play in this position
      if (
        draggedPlayer.preferredPosition === targetPositionType ||
        draggedPlayer.secondaryPositions.includes(targetPositionType)
      ) {
        // Find the first empty slot in the lineup array
        let emptySlotIndex = lineup.indexOf(null);

        // If no empty slot, find the player currently in the target slot's position
        // and remove them to make space for the new player.
        if (emptySlotIndex === -1) {
          const existingPlayerInTargetSlot = lineup.find(
            (p) => p && p.position === targetPositionType
          );
          if (existingPlayerInTargetSlot) {
            const existingPlayerIndex = lineup.indexOf(
              existingPlayerInTargetSlot
            );
            lineup[existingPlayerIndex] = null;
            emptySlotIndex = existingPlayerIndex; // Use this cleared slot
          }
        }

        if (emptySlotIndex !== -1) {
          lineup[emptySlotIndex] = {
            ...draggedPlayer,
            position: targetPositionType,
          }; // Assign the dropped position
          selectedPlayers = lineup.filter((p) => p); // Update selectedPlayers
          updateSelectedPlayerCount();
          renderLineup();
        } else {
          alert(
            "No empty slots available in the lineup and cannot replace existing player in this position."
          );
        }
      } else {
        alert(`${draggedPlayer.name} cannot play in ${targetPositionType}.`);
      }
      draggedPlayer = null; // Reset dragged player
    }
  }

  // Handles formation selection
  function handleFormationSelection(formation) {
    currentFormation = formation;
    lineup = []; // Initialize as empty array

    const formationConfig = formationRequirements[currentFormation];
    for (const posType in formationConfig) {
      for (let i = 0; i < formationConfig[posType]; i++) {
        lineup.push({
          slotId: `${posType}${i + 1}`,
          positionType: posType,
          player: null,
        });
      }
    }
    selectedPlayers = [];
    // Visually indicate active formation
    document.querySelectorAll(".formation-btn").forEach((btn) => {
      if (btn.dataset.formation === formation) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
    // After selecting formation, show player selection section
    formationSelectionSection.classList.add("d-none");
    playerSelectionSection.classList.remove("d-none");

    // Ensure the lineup display container exists and is correctly set up
    let lineupContainer = document.getElementById("lineup-container");
    if (!lineupContainer) {
      lineupContainer = document.createElement("div");
      lineupContainer.id = "lineup-container";
      lineupContainer.className = "row mt-4";
      lineupContainer.innerHTML = `
                <div class="col-12">
                    <h4 class="text-center">Your Lineup</h4>
                    <div id="lineup-display" class="soccer-field">
                        <!-- Visual representation of the lineup will go here -->
                    </div>
                </div>
            `;
      playerSelectionSection.appendChild(lineupContainer);
    }

    // Clear selected players and re-render available players for new formation
    updateSelectedPlayerCount();
    renderPlayers(allPlayersData, availablePlayersDiv, true); // Render available players for user
    renderLineup(); // Render initial empty lineup based on formation
  }

  // Simulates the match (client-side logic)
  function simulateMatch() {
    if (!isValidTeam()) {
      alert(
        "Please select exactly 11 players and ensure all position requirements for the chosen formation are met."
      );
      return;
    }

    tournament.round++;
    tournament.userTeam = selectedPlayers;
    tournament.lineup = lineup;
    tournament.formation = currentFormation;

    let aiTeamPlayers;
    if (tournament.opponentSelectionMode === "aiGenerated") {
      aiTeamPlayers = generateAITeam().players;
    } else {
      // userPicked
      if (!isValidOpponentTeam()) {
        alert(
          "Please select exactly 11 players for the opponent team and ensure all position requirements for a 4-4-2 formation are met."
        );
        return;
      }
      aiTeamPlayers = selectedOpponentPlayers;
    }
    tournament.opponents.push(aiTeamPlayers);

    // --- Game Simulation Logic ---
    const userTeam = {
      players: selectedPlayers.filter((p) => p),
      formation: currentFormation,
      strength: calculateTeamStrength(selectedPlayers.filter((p) => p)),
    };

    const aiTeam = {
      players: aiTeamPlayers,
      formation: "4-4-2", // AI always plays 4-4-2 for simplicity
      strength: calculateTeamStrength(aiTeamPlayers),
    };

    let playByPlay = "";
    let userScore = 0;
    let aiScore = 0;

    // New detailed stats
    let userShots = 0;
    let aiShots = 0;
    let userPossession = 0;
    let aiPossession = 0;
    let userPasses = 0;
    let aiPasses = 0;

    playByPlay += `Match Start: User Team (${userTeam.strength}) vs AI Team (${aiTeam.strength})\n\n`;

    // Simple simulation loop
    for (let i = 0; i < 10; i++) {
      // Simulate 10 "phases" of play
      const userAttackChance =
        userTeam.strength / (userTeam.strength + aiTeam.strength);
      const aiAttackChance =
        aiTeam.strength / (userTeam.strength + aiTeam.strength);

      // Simulate possession
      if (Math.random() < userAttackChance) {
        userPossession += Math.random() * 10; // User keeps possession more
      } else {
        aiPossession += Math.random() * 10; // AI keeps possession
      }

      // Simulate passes (more passes for higher possession)
      userPasses += Math.floor(Math.random() * (userPossession / 10 + 5));
      aiPasses += Math.floor(Math.random() * (aiPossession / 10 + 5));

      if (Math.random() < userAttackChance) {
        playByPlay += `Minute ${i * 9 + 1}: User Team attacks! `;
        userShots++;
        if (Math.random() < 0.6) {
          // Chance to get a shot
          const userAttackingPlayers = userTeam.players.filter(
            (p) =>
              getGeneralPositionType(p.position) === "Forward" ||
              getGeneralPositionType(p.position) === "Midfielder"
          );
          const attackingPlayer =
            userAttackingPlayers.length > 0
              ? userAttackingPlayers[
                  Math.floor(Math.random() * userAttackingPlayers.length)
                ]
              : { name: "Unknown Attacker" };
          playByPlay += `${attackingPlayer.name} takes a shot! `;
          if (Math.random() < 0.4) {
            // Chance to score
            userScore++;
            playByPlay += `GOAL! User Team scores! (${userScore}-${aiScore})\n`;
          } else {
            const aiDefendingPlayers = aiTeam.players.filter(
              (p) =>
                getGeneralPositionType(p.position) === "Goalkeeper" ||
                getGeneralPositionType(p.position) === "Defender"
            );
            const defendingPlayer =
              aiDefendingPlayers.length > 0
                ? aiDefendingPlayers[
                    Math.floor(Math.random() * aiDefendingPlayers.length)
                  ]
                : { name: "Unknown Defender" };
            playByPlay += `${defendingPlayer.name} makes a save/block!\n`;
          }
        } else {
          playByPlay += `Attack thwarted by AI defense.\n`;
        }
      } else if (Math.random() < aiAttackChance) {
        playByPlay += `Minute ${i * 9 + 1}: AI Team attacks! `;
        aiShots++;
        if (Math.random() < 0.6) {
          // Chance to get a shot
          const aiAttackingPlayers = aiTeam.players.filter(
            (p) =>
              getGeneralPositionType(p.position) === "Forward" ||
              getGeneralPositionType(p.position) === "Midfielder"
          );
          const attackingPlayer =
            aiAttackingPlayers.length > 0
              ? aiAttackingPlayers[
                  Math.floor(Math.random() * aiAttackingPlayers.length)
                ]
              : { name: "Unknown Attacker" };
          playByPlay += `${attackingPlayer.name} takes a shot! `;
          if (Math.random() < 0.4) {
            // Chance to score
            aiScore++;
            playByPlay += `GOAL! AI Team scores! (${userScore}-${aiScore})\n`;
          } else {
            const userDefendingPlayers = userTeam.players.filter(
              (p) =>
                getGeneralPositionType(p.position) === "Goalkeeper" ||
                getGeneralPositionType(p.position) === "Defender"
            );
            const defendingPlayer =
              userDefendingPlayers.length > 0
                ? userDefendingPlayers[
                    Math.floor(Math.random() * userDefendingPlayers.length)
                  ]
                : { name: "Unknown Defender" };
            playByPlay += `${defendingPlayer.name} makes a save/block!\n`;
          }
        } else {
          playByPlay += `Attack thwarted by User defense.\n`;
        }
      } else {
        playByPlay += `Minute ${
          i * 9 + 1
        }: Midfield battle. No clear chance.\n`;
      }
    }

    playByPlay += `\nFull Time! Final Score: User Team ${userScore} - ${aiScore} AI Team\n`;

    // Normalize possession to percentages
    const totalPossession = userPossession + aiPossession;
    userPossession =
      totalPossession > 0
        ? Math.round((userPossession / totalPossession) * 100)
        : 50;
    aiPossession = 100 - userPossession;

    let postMatchAnalysisHtml = `
            <h4 class="text-center mb-3">Match Statistics</h4>
            <div class="mb-3">
                <p class="mb-1">Goals: <span class="float-end">${userScore} - ${aiScore}</span></p>
                <div class="progress" style="height: 20px;">
                    <div class="progress-bar bg-primary" role="progressbar" style="width: ${
                      (userScore / (userScore + aiScore || 1)) * 100
                    }%" aria-valuenow="${userScore}" aria-valuemin="0" aria-valuemax="${
      userScore + aiScore
    }"></div>
                    <div class="progress-bar bg-danger" role="progressbar" style="width: ${
                      (aiScore / (userScore + aiScore || 1)) * 100
                    }%" aria-valuenow="${aiScore}" aria-valuemin="0" aria-valuemax="${
      userScore + aiScore
    }"></div>
                </div>
            </div>
            <div class="mb-3">
                <p class="mb-1">Shots: <span class="float-end">${userShots} - ${aiShots}</span></p>
                <div class="progress" style="height: 20px;">
                    <div class="progress-bar bg-primary" role="progressbar" style="width: ${
                      (userShots / (userShots + aiShots || 1)) * 100
                    }%" aria-valuenow="${userShots}" aria-valuemin="0" aria-valuemax="${
      userShots + aiShots
    }"></div>
                    <div class="progress-bar bg-danger" role="progressbar" style="width: ${
                      (aiShots / (userShots + aiShots || 1)) * 100
                    }%" aria-valuenow="${aiShots}" aria-valuemin="0" aria-valuemax="${
      userShots + aiShots
    }"></div>
                </div>
            </div>
            <div class="mb-3">
                <p class="mb-1">Possession: <span class="float-end">${userPossession}% - ${aiPossession}%</span></p>
                <div class="progress" style="height: 20px;">
                    <div class="progress-bar bg-primary" role="progressbar" style="width: ${userPossession}%" aria-valuenow="${userPossession}" aria-valuemin="0" aria-valuemax="100"></div>
                    <div class="progress-bar bg-danger" role="progressbar" style="width: ${aiPossession}%" aria-valuenow="${aiPossession}" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
            <div class="mb-3">
                <p class="mb-1">Passes: <span class="float-end">${userPasses} - ${aiPasses}</span></p>
                <div class="progress" style="height: 20px;">
                    <div class="progress-bar bg-primary" role="progressbar" style="width: ${
                      (userPasses / (userPasses + aiPasses || 1)) * 100
                    }%" aria-valuenow="${userPasses}" aria-valuemin="0" aria-valuemax="${
      userPasses + aiPasses
    }"></div>
                    <div class="progress-bar bg-danger" role="progressbar" style="width: ${
                      (aiPasses / (userPasses + aiPasses || 1)) * 100
                    }%" aria-valuenow="${aiPasses}" aria-valuemin="0" aria-valuemax="${
      userPasses + aiPasses
    }"></div>
                </div>
            </div>
        `;

    let matchWinnerText = "It's a draw!";
    if (userScore > aiScore) {
      tournament.userWins++;
      matchWinnerText = `User Team wins!`;
    } else if (aiScore > userScore) {
      tournament.aiWins++;
      matchWinnerText = `AI Team wins!`;
    } else {
      tournament.draws++;
    }

    tournament.results.push({
      userScore,
      aiScore,
      userShots,
      aiShots,
      userPossession,
      aiPossession,
      userPasses,
      aiPasses,
    });
    saveTournament();

    // Display results on detailed match analysis section
    playByPlayContent.textContent = playByPlay;
    chemistryContent.textContent = `Team Chemistry Score: ${calculateTeamChemistry(
      selectedPlayers.filter((p) => p)
    )}/100`;
    analysisContent.innerHTML = postMatchAnalysisHtml;

    // Display results on the new game results page
    finalScoreSpan.textContent = `Final Score: ${userScore} - ${aiScore}`;
    matchWinnerParagraph.textContent = matchWinnerText;

    playerSelectionSection.classList.add("d-none");
    formationSelectionSection.classList.add("d-none");
    gameResultsPage.style.display = "block"; // Show the new results page

    updateTournamentUI();

    // Check for tournament winner
    if (
      tournament.userWins >= Math.ceil(tournament.maxRounds / 2) ||
      tournament.aiWins >= Math.ceil(tournament.maxRounds / 2)
    ) {
      let tournamentWinner = "";
      if (tournament.userWins > tournament.aiWins) {
        tournamentWinner = "User Team";
      } else if (tournament.aiWins > tournament.userWins) {
        tournamentWinner = "AI Team";
      } else {
        tournamentWinner = "It's a draw!";
      }
      tournamentWinnerSpan.textContent = tournamentWinner;
      finalTournamentScoreSpan.textContent = `User ${tournament.userWins} - ${tournament.aiWins} AI (${tournament.draws} draws)`;
      gameResultsPage.style.display = "none"; // Hide game results page
      tournamentCompleteSection.style.display = "block"; // Show tournament complete section
    }
  }

  // Calculates team strength based on adjusted player ratings
  function calculateTeamStrength(teamPlayers) {
    let totalAdjustedRating = 0;
    teamPlayers.forEach((player) => {
      const assignedPosition = player.position; // The position the player is currently assigned in the lineup
      const adjustedRating = calculatePlayerRating(player, assignedPosition);
      totalAdjustedRating += adjustedRating;
    });
    return Math.round(totalAdjustedRating / teamPlayers.length); // Average adjusted rating
  }

  // Helper to get general position type from specific position
  function getGeneralPositionType(specificPosition) {
    if (["ST", "LW", "RW"].includes(specificPosition)) return "Forward";
    if (
      ["CM", "CAM", "CDM", "LM", "RM", "LWB", "RWB"].includes(specificPosition)
    )
      return "Midfielder";
    if (["CB", "LB", "RB", "LWB", "RWB"].includes(specificPosition))
      return "Defender";
    if (specificPosition === "GK") return "Goalkeeper";
    return "Unknown";
  }

  // Generates a random AI team
  function generateAITeam() {
    const aiPlayers = [];
    const availableForwards = [...predefinedPlayers.forwards];
    const availableMidfielders = [...predefinedPlayers.midfielders];
    const availableDefenders = [...predefinedPlayers.defenders];
    const availableGoalkeepers = [...predefinedPlayers.goalkeepers];

    // Shuffle and pick players for AI team (simplified 4-4-2 for AI)
    function getRandomPlayers(arr, count) {
      const shuffled = arr.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    }

    aiPlayers.push(...getRandomPlayers(availableGoalkeepers, 1));
    aiPlayers.push(...getRandomPlayers(availableForwards, 2));
    aiPlayers.push(...getRandomPlayers(availableMidfielders, 4));
    aiPlayers.push(...getRandomPlayers(availableDefenders, 4));

    return { players: aiPlayers, formation: "4-4-2" }; // AI always plays 4-4-2 for simplicity
  }

  // Calculates a simple team chemistry score
  function calculateTeamChemistry(teamPlayers) {
    // This is a very basic placeholder.
    // In a real game, this would involve factors like:
    // - Players from the same club/nationality
    // - Players with complementary play styles
    // - Player morale/form
    // - Manager's preferred tactics
    let chemistry = 50; // Base chemistry

    // Example: Boost for having a balanced team (simplified)
    const gkCount = teamPlayers.filter(
      (p) => getGeneralPositionType(p.position) === "Goalkeeper"
    ).length;
    const defCount = teamPlayers.filter(
      (p) => getGeneralPositionType(p.position) === "Defender"
    ).length;
    const midCount = teamPlayers.filter(
      (p) => getGeneralPositionType(p.position) === "Midfielder"
    ).length;
    const fwdCount = teamPlayers.filter(
      (p) => getGeneralPositionType(p.position) === "Forward"
    ).length;

    if (gkCount === 1 && defCount >= 3 && midCount >= 3 && fwdCount >= 2) {
      chemistry += 20; // Bonus for a somewhat balanced team
    }

    // Example: Penalty for too many players of same type (e.g., 5 forwards)
    if (fwdCount > 4 || defCount > 5) {
      chemistry -= 10;
    }

    return Math.max(0, Math.min(100, chemistry)); // Keep between 0 and 100
  }

  // Resets the game to initial state
  function resetGame() {
    localStorage.removeItem("tournament");
    selectedPlayers = [];
    lineup = new Array(MAX_PLAYERS).fill(null);
    selectedOpponentPlayers = [];
    currentFormation = null;
    tournament = {};
    loadTournament();

    updateSelectedPlayerCount();
    renderPlayers([], selectedPlayersDiv, true); // Clear user selected players display
    renderPlayers([], opponentSelectedPlayersDiv, true, true); // Clear opponent selected players display
    availablePlayersDiv.innerHTML = ""; // Clear available players
    opponentAvailablePlayersDiv.innerHTML = ""; // Clear opponent available players
    document
      .querySelectorAll(".formation-btn")
      .forEach((btn) => btn.classList.remove("active"));
    simulateMatchBtn.disabled = true;
    confirmOpponentTeamBtn.disabled = true;

    matchResultsSection.classList.add("d-none");
    formationSelectionSection.classList.add("d-none");
    playerSelectionSection.classList.add("d-none");
    opponentSelectionSection.style.display = "none";
    playerSourceSelection.classList.add("d-none"); // Hide player source selection initially
    gameResultsPage.style.display = "none"; // Hide game results page
    tournamentCompleteSection.style.display = "none";
    tournamentSection.style.display = "block"; // Show tournament section

    lineupDisplay.innerHTML = ""; // Clear lineup display
    aiGeneratedOpponentRadio.checked = true; // Reset opponent type to AI Generated
  }

  // Advances to the next game of the tournament
  function nextGameOfTournament() {
    gameResultsPage.style.display = "none"; // Hide results page
    matchResultsSection.classList.add("d-none"); // Hide detailed results

    // Check if tournament is complete
    if (
      tournament.userWins >= tournament.maxRounds / 2 + 0.5 ||
      tournament.aiWins >= tournament.maxRounds / 2 + 0.5
    ) {
      // Tournament already won by someone, this button shouldn't be active
      // This case should ideally be handled by disabling the button or showing tournament complete section earlier
      return;
    }

    // Generate new AI opponent for the next round if in AI generated mode
    if (tournament.opponentSelectionMode === "aiGenerated") {
      const newAiTeam = generateAITeam().players;
      // Update the last opponent in the tournament.opponents array
      // Or, if you want to keep a history of all AI teams, push it
      // For now, let's assume we just need the current AI opponent
      tournament.opponents[tournament.opponents.length - 1] = newAiTeam; // Overwrite last AI team
    } else {
      // If user picked opponent, they need to pick again
      selectedOpponentPlayers = []; // Clear selected opponent players
      opponentSelectedPlayerCountSpan.textContent = "0";
      confirmOpponentTeamBtn.disabled = true;
      renderPlayers(allPlayersData, opponentAvailablePlayersDiv, true, true); // Re-render for opponent selection
      opponentSelectionSection.style.display = "block"; // Show opponent selection
      return; // Exit to let user pick opponent
    }

    // Reset for next game
    selectedPlayers = []; // Clear user's selected players for new selection
    lineup = new Array(MAX_PLAYERS).fill(null); // Clear lineup
    currentFormation = null; // Clear current formation
    document
      .querySelectorAll(".formation-btn")
      .forEach((btn) => btn.classList.remove("active")); // Deactivate formation buttons
    simulateMatchBtn.disabled = true; // Disable simulate button until team is ready

    // Transition to formation selection for the user to pick a new team/formation
    formationSelectionSection.style.display = "block";
    playerSelectionSection.classList.add("d-none"); // Hide player selection if it was visible
    renderPlayers(allPlayersData, availablePlayersDiv, true); // Render available players for user
    renderLineup(); // Render empty lineup

    saveTournament(); // Save updated tournament state
  }

  // --- Event Listeners ---
  predefinedPlayersBtn.addEventListener("click", () => {
    if (tournament.opponentSelectionMode === "aiGenerated") {
      playerSourceSelection.classList.add("d-none");
      formationSelectionSection.classList.remove("d-none");
      renderPlayers(allPlayersData, availablePlayersDiv, true); // Render for user selection
    } else {
      // userPicked
      playerSourceSelection.classList.add("d-none");
      opponentSelectionSection.classList.remove("d-none");
      renderPlayers(allPlayersData, opponentAvailablePlayersDiv, true, true); // Render for opponent selection
    }
  });

  apiPlayersBtn.addEventListener("click", () =>
    alert(
      "API integration is coming soon! Please use pre-defined players for now."
    )
  );

  confirmTeamBtn.addEventListener("click", () => {
    if (isValidTeam()) {
      playerSelectionSection.classList.add("d-none");
      simulateMatchBtn.disabled = false; // Enable simulate button
      simulateMatch(); // Directly simulate after confirming team
    } else {
      alert(
        `Please select exactly ${MAX_PLAYERS} players and ensure all position requirements for the chosen formation are met.`
      );
    }
  });

  confirmOpponentTeamBtn.addEventListener("click", () => {
    if (isValidOpponentTeam()) {
      opponentSelectionSection.classList.add("d-none");
      playerSourceSelection.classList.remove("d-none"); // Go back to player source selection for user
    } else {
      alert(
        `Please select exactly ${MAX_PLAYERS} players for the opponent team and ensure all position requirements for a 4-4-2 formation are met.`
      );
    }
  });

  formationOptionsDiv.addEventListener("click", (event) => {
    if (event.target.classList.contains("formation-btn")) {
      handleFormationSelection(event.target.dataset.formation);
    }
  });

  // simulateMatchBtn.addEventListener('click', simulateMatch); // Removed, now called by confirmTeamBtn

  viewDetailedResultsBtn.addEventListener("click", () => {
    gameResultsPage.classList.add("d-none");
    matchResultsSection.classList.remove("d-none");
  });

  reSimMatchBtn.addEventListener("click", simulateMatch);
  nextGameTournamentBtn.addEventListener("click", nextGameOfTournament);
  resetTournamentBtn.addEventListener("click", resetGame);

  // Tournament type selection
  tournamentTypeSelect.addEventListener("change", (event) => {
    tournament.maxRounds = parseInt(event.target.value);
    saveTournament();
  });

  // Opponent type selection
  aiGeneratedOpponentRadio.addEventListener("change", () => {
    tournament.opponentSelectionMode = "aiGenerated";
    saveTournament();
  });

  pickOpponentTeamRadio.addEventListener("change", () => {
    tournament.opponentSelectionMode = "userPicked";
    saveTournament();
  });

  // Start Tournament button functionality
  startTournamentBtn.addEventListener("click", () => {
    console.log("Start Tournament button clicked.");

    // Initialize tournament state
    tournament.round = 0;
    tournament.userWins = 0;
    tournament.aiWins = 0;
    tournament.draws = 0;
    tournament.results = [];
    tournament.opponents = []; // Clear previous opponents
    tournament.maxRounds = parseInt(tournamentTypeSelect.value);
    tournament.opponentSelectionMode = document.querySelector(
      'input[name="opponentType"]:checked'
    ).value; // Fix: Added missing comma

    saveTournament();
    updateTournamentUI();

    tournamentSection.classList.add("d-none");
    if (tournament.opponentSelectionMode === "aiGenerated") {
      tournament.opponents.push(generateAITeam().players); // Generate first AI opponent
      playerSourceSelection.classList.remove("d-none");
    } else {
      // userPicked
      opponentSelectionSection.classList.remove("d-none");
      renderPlayers(allPlayersData, opponentAvailablePlayersDiv, true, true); // Render for opponent selection
    }
  });

  // Navbar Home and Brand link functionality
  homeLink.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default link behavior
    resetGame();
  });

  navbarBrand.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default link behavior
    resetGame();
  });

  // Go Back button functionality
  goBackButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const currentSection = event.target.closest(".card").id;
      const targetSectionId = event.target.dataset.targetSection;
      const targetSection = document.getElementById(targetSectionId);

      // Hide current section
      document.getElementById(currentSection).classList.add("d-none");

      // Show target section
      targetSection.classList.remove("d-none");

      // Specific logic for going back
      if (targetSectionId === "player-source-selection") {
        // If going back to player source, ensure available players are rendered
        renderPlayers(allPlayersData, availablePlayersDiv, true);
      } else if (targetSectionId === "formation-selection-section") {
        // If going back to formation, clear selected players and re-render available
        selectedPlayers = [];
        updateSelectedPlayerCount();
        renderPlayers(allPlayersData, availablePlayersDiv, true);
        renderLineup();
      } else if (targetSectionId === "opponent-selection-section") {
        // If going back to opponent selection, re-render opponent available players
        renderPlayers(allPlayersData, opponentAvailablePlayersDiv, true, true);
      }
      // When going back from game results page, clear selected players and reset formation
      else if (targetSectionId === "player-selection-section") {
        selectedPlayers = [];
        currentFormation = null;
        updateSelectedPlayerCount();
        renderPlayers(allPlayersData, availablePlayersDiv, true);
        renderLineup();
      }
    });
  });

  // Initial setup
  // Ensure all sections are hidden except tournament section on initial load
  playerSourceSelection.classList.add("d-none");
  playerSelectionSection.classList.add("d-none");
  formationSelectionSection.classList.add("d-none");
  matchResultsSection.classList.add("d-none");
  opponentSelectionSection.style.display = "none";
  gameResultsPage.style.display = "none"; // Hide game results page
  tournamentCompleteSection.style.display = "none";
  tournamentSection.style.display = "block"; // Show tournament section

  // Populate allPlayersData initially so it's ready for any selection mode
  allPlayersData = [
    ...predefinedPlayers.forwards,
    ...predefinedPlayers.midfielders,
    ...predefinedPlayers.defenders,
    ...predefinedPlayers.goalkeepers,
  ];

  // Add dynamic secondary positions (RM for RW, LM for LW)
  allPlayersData.forEach((player) => {
    if (
      player.preferredPosition === "RW" &&
      !player.secondaryPositions.includes("RM")
    ) {
      player.secondaryPositions.push("RM");
    }
    if (
      player.preferredPosition === "LW" &&
      !player.secondaryPositions.includes("LM")
    ) {
      player.secondaryPositions.push("LM");
    }
  });

  loadTournament();
  updateSelectedPlayerCount(); // Call once to set initial state of confirmTeamBtn
  if (typeof window.updateOpponentSelectedPlayerCount === "function") {
    window.updateOpponentSelectedPlayerCount(); // Call once to set initial state of confirmOpponentTeamBtn
  }
});
