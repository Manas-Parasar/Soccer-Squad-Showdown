document.addEventListener("DOMContentLoaded", () => {
  try {
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
          // opponentSelectedPlayerCountSpan is a good candidate for a nearby element.
          const parentForOpponentCountElement = document.getElementById(
            "opponent-selected-player-count"
          );
          // Ensure we have an element reference to update or insert
          let opponentCountElement = document.getElementById(
            "opponentSelectedCount"
          );
          if (!opponentCountElement) {
            opponentCountElement = document.createElement("span");
            opponentCountElement.id = "opponentSelectedCount";
            opponentCountElement.style.marginLeft = "6px";
          }
          if (
            parentForOpponentCountElement &&
            parentForOpponentCountElement.parentNode
          ) {
            // If not already in DOM, insert it after the parent count span
            if (!document.getElementById("opponentSelectedCount")) {
              parentForOpponentCountElement.parentNode.insertBefore(
                opponentCountElement,
                parentForOpponentCountElement.nextSibling
              );
              console.info(
                "Dynamically created #opponentSelectedCount element."
              );
            }
          }
        }
        // Update the display element if present
        const updateElem = document.getElementById("opponentSelectedCount");
        if (updateElem) updateElem.textContent = count;

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

    // --- DOM Elements ---
    const playerSourceSelection = document.getElementById(
      "player-source-selection"
    );
    if (playerSourceSelection)
      playerSourceSelection.classList.add("fade-in-section");
    const predefinedPlayersBtn = document.getElementById(
      "predefined-players-btn"
    );
    const apiPlayersBtn = document.getElementById("api-players-btn");
    const apiPlayerSearchSection = document.getElementById(
      "api-player-search-section"
    );
    const playerSearchInput = document.getElementById("player-search-input");
    const playerSearchBtn = document.getElementById("player-search-btn");
    const apiPlayerResults = document.getElementById("api-player-results");

    const playerSelectionSection = document.getElementById(
      "player-selection-section"
    );
    if (playerSelectionSection)
      playerSelectionSection.classList.add("fade-in-section");
    const availablePlayersDiv = document.getElementById("available-players");
    if (availablePlayersDiv)
      availablePlayersDiv.classList.add("player-grid-container");
    const selectedPlayersDiv = document.getElementById("selected-players");
    if (selectedPlayersDiv)
      selectedPlayersDiv.classList.add("player-grid-container");
    const selectedPlayerCountSpan = document.getElementById(
      "selected-player-count"
    );
    const confirmTeamBtn = document.getElementById("confirm-team-btn");
    const lineupDisplay = document.getElementById("lineup-display"); // New element

    const formationSelectionSection = document.getElementById(
      "formation-selection-section"
    );
    if (formationSelectionSection)
      formationSelectionSection.classList.add("fade-in-section");
    const formationOptionsDiv = document.getElementById("formation-options");
    const simulateMatchBtn = document.getElementById("simulate-match-btn");

    const matchResultsSection = document.getElementById(
      "match-results-section"
    );
    if (matchResultsSection)
      matchResultsSection.classList.add("fade-in-section");
    const playByPlayContent = document.getElementById("play-by-play-content");
    const chemistryContent = document.getElementById("chemistry-content");
    const analysisContent = document.getElementById("analysis-content");
    const keepTeamBtn = document.getElementById("keep-team-btn");
    const changePlayersBtn = document.getElementById("change-players-btn");

    const tournamentSection = document.getElementById("tournament-section");
    if (tournamentSection) tournamentSection.classList.add("fade-in-section");
    const tournamentTypeSelect = document.getElementById(
      "tournament-type-select"
    );
    const userTournamentScoreSpan = document.getElementById(
      "user-tournament-score"
    );
    const aiTournamentScoreSpan = document.getElementById(
      "ai-tournament-score"
    );
    const startTournamentBtn = document.getElementById("start-tournament-btn");

    const opponentSelectionSection = document.getElementById(
      "opponent-selection-section"
    );
    if (opponentSelectionSection)
      opponentSelectionSection.classList.add("fade-in-section");
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
    if (gameResultsPage) gameResultsPage.classList.add("fade-in-section");
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
    if (tournamentCompleteSection)
      tournamentCompleteSection.classList.add("fade-in-section");
    const tournamentWinnerSpan = document.getElementById("tournament-winner");
    const finalTournamentScoreSpan = document.getElementById(
      "final-tournament-score"
    );
    const resetTournamentBtn = document.getElementById("reset-tournament-btn");

    // Live Simulation Elements
    const liveSimulationSection = document.getElementById(
      "live-simulation-section"
    );
    const liveCommentaryContainer = document.querySelector(
      ".live-commentary-container"
    );
    const liveCommentaryFeed = document.getElementById("live-commentary-feed");
    const liveUserScore = document.getElementById("live-user-score");
    const liveAiScore = document.getElementById("live-ai-score");
    const skipSimulationBtn = document.getElementById("skip-simulation-btn");

    // Custom Formation Elements
    const createCustomFormationBtn = document.getElementById(
      "create-custom-formation-btn"
    );
    const customFormationBuilder = document.getElementById(
      "custom-formation-builder"
    );
    const customFormationModal = new bootstrap.Modal(customFormationBuilder);
    const customPitch = document.getElementById("custom-pitch");
    const playerPlaceholdersContainer = document.getElementById(
      "player-placeholders-container"
    );
    const saveCustomFormationBtn = document.getElementById(
      "save-custom-formation-btn"
    );
    const customFormationNameInput = document.getElementById(
      "custom-formation-name"
    );
    const customFormationOptionsDiv = document.getElementById(
      "custom-formation-options"
    );

    // --- State Variables ---
    const MAX_PLAYERS = 11;
    // Playstyles and their effects
    const playstyles = {
      Balanced: {
        chemistryModifier: 0,
        strengthModifier: 0,
        teamBehavior: { attacking: 1, possession: 1, pressing: 1 },
      },
      Attacking: {
        chemistryModifier: -3,
        strengthModifier: +3,
        teamBehavior: { attacking: 1.3, possession: 0.9, pressing: 1 },
      },
      Defensive: {
        chemistryModifier: -2,
        strengthModifier: +1,
        teamBehavior: { attacking: 0.7, possession: 0.95, pressing: 0.9 },
      },
      Possession: {
        chemistryModifier: +2,
        strengthModifier: +1,
        teamBehavior: { attacking: 0.9, possession: 1.3, pressing: 0.95 },
      },
      "Counter-Attack": {
        chemistryModifier: -1,
        strengthModifier: +2,
        teamBehavior: { attacking: 1.2, possession: 0.8, pressing: 1.1 },
      },
      "High-Press": {
        chemistryModifier: -4,
        strengthModifier: +2,
        teamBehavior: { attacking: 1.05, possession: 0.9, pressing: 1.4 },
      },
    };
    // Choose an AI playstyle based on team composition heuristics
    function chooseAIPlaystyle(players) {
      if (!Array.isArray(players) || players.length === 0) return "Balanced";
      const counts = { GK: 0, DEF: 0, MID: 0, FWD: 0 };
      let totalPace = 0;
      let totalPassing = 0;
      let totalDefending = 0;
      let totalShooting = 0;
      players.forEach((p) => {
        const grp = getPositionGroup(
          normalizePosition(p.preferredPosition || "")
        );
        if (counts[grp] !== undefined) counts[grp]++;
        totalPace += p.pace || 0;
        totalPassing += p.passing || 0;
        totalDefending += p.defending || 0;
        totalShooting += p.shooting || 0;
      });
      const avgPace = totalPace / players.length;
      const avgPassing = totalPassing / players.length;
      const avgDefending = totalDefending / players.length;
      const avgShooting = totalShooting / players.length;

      // Heuristics
      // If many defenders -> Defensive
      if (counts.DEF >= 5 && avgDefending > avgShooting) return "Defensive";
      // If many midfielders and passing is strong -> Possession
      if (counts.MID >= 5 && avgPassing > 75) return "Possession";
      // If many forwards -> Attacking
      if (counts.FWD >= 3 && avgShooting > 70) return "Attacking";
      // If team is very quick -> Counter-Attack or High-Press
      if (avgPace >= 85 && counts.FWD >= 2) return "Counter-Attack";
      if (avgPace >= 82 && counts.MID >= 3) return "High-Press";
      // Fallback to Balanced
      return "Balanced";
    }
    let allPlayersData = []; // Will be populated from predefinedPlayers object
    let selectedPlayers = []; // Stores user's player objects
    let lineup = new Array(MAX_PLAYERS).fill(null);
    const playstyleSelect = document.getElementById("playstyle-select");
    const aiPlaystyleDisplay = document.getElementById("ai-playstyle-display");
    let selectedOpponentPlayers = []; // Stores opponent's player objects
    let currentFormation = null;
    let currentBuilder = "player1"; // 'player1' or 'player2' when PvP
    let player1State = null; // store player1's team/lineup when building PvP
    let player2State = null; // store player2's team/lineup when editing in PvP rematch
    let player1Confirmed = false; // track if player1 has confirmed their team
    let player2Confirmed = false; // track if player2 has confirmed their team
    let tournament = {};
    let draggedSlotId = null; // Changed from draggedPlayerIndex to draggedSlotId
    let isSimulationSkipped = false;
    let customFormations = [];
    let draggedElement = null;
    let playerSourceMode = "predefined";

    // --- Predefined Player Data ---
    const predefinedPlayers = {
      goalkeepers: [
        {
          name: "Neuer",
          preferredPosition: "GK",
          secondaryPositions: [],
          overallRating: 92,
          pace: 60,
          dribbling: 65,
          passing: 70,
          shooting: 50,
          defending: 55,
          physical: 80,
          goalkeeping: 92,
          imageUrl: "/images/neuer.jpg",
        },
        {
          name: "Buffon",
          preferredPosition: "GK",
          secondaryPositions: [],
          overallRating: 90,
          pace: 58,
          dribbling: 60,
          passing: 68,
          shooting: 48,
          defending: 53,
          physical: 78,
          goalkeeping: 90,
          imageUrl: "/images/buffon.jpg",
        },
        {
          name: "Casillas",
          preferredPosition: "GK",
          secondaryPositions: [],
          overallRating: 89,
          pace: 62,
          dribbling: 63,
          passing: 69,
          shooting: 49,
          defending: 54,
          physical: 79,
          goalkeeping: 89,
          imageUrl: "/images/casillas.jpg",
        },
        {
          name: "Ter Stegen",
          preferredPosition: "GK",
          secondaryPositions: [],
          overallRating: 91,
          pace: 61,
          dribbling: 66,
          passing: 72,
          shooting: 51,
          defending: 56,
          physical: 81,
          goalkeeping: 91,
          imageUrl: "/images/terstegen.jpg",
        },
      ],
      defenders: [
        {
          name: "Alba",
          preferredPosition: "LB",
          secondaryPositions: ["LWB"],
          overallRating: 86,
          pace: 88,
          dribbling: 80,
          passing: 82,
          shooting: 65,
          defending: 84,
          physical: 75,
          goalkeeping: 0,
          imageUrl: "/images/alba.jpg",
        },
        {
          name: "Maldini",
          preferredPosition: "LB",
          secondaryPositions: ["CB"],
          overallRating: 94,
          pace: 80,
          dribbling: 75,
          passing: 78,
          shooting: 60,
          defending: 95,
          physical: 90,
          goalkeeping: 0,
          imageUrl: "/images/maldini.jpg",
        },
        {
          name: "Marcelo",
          preferredPosition: "LB",
          secondaryPositions: ["LWB", "LM"],
          overallRating: 85,
          pace: 85,
          dribbling: 88,
          passing: 87,
          shooting: 70,
          defending: 78,
          physical: 70,
          goalkeeping: 0,
          imageUrl: "/images/marcelo.jpg",
        },
        {
          name: "Cancelo",
          preferredPosition: "LB",
          secondaryPositions: ["RB", "CM"],
          overallRating: 87,
          pace: 86,
          dribbling: 89,
          passing: 88,
          shooting: 72,
          defending: 80,
          physical: 78,
          goalkeeping: 0,
          imageUrl: "/images/cancelo.jpg",
        },
        {
          name: "Araujo",
          preferredPosition: "CB",
          secondaryPositions: ["RB"],
          overallRating: 87,
          pace: 82,
          dribbling: 70,
          passing: 70,
          shooting: 55,
          defending: 88,
          physical: 90,
          goalkeeping: 0,
          imageUrl: "/images/araujo.jpg",
        },
        {
          name: "Van Dijk",
          preferredPosition: "CB",
          secondaryPositions: [],
          overallRating: 91,
          pace: 78,
          dribbling: 70,
          passing: 75,
          shooting: 60,
          defending: 92,
          physical: 93,
          goalkeeping: 0,
          imageUrl: "/images/vandijk.jpg",
        },
        {
          name: "Ramos",
          preferredPosition: "CB",
          secondaryPositions: ["RB"],
          overallRating: 90,
          pace: 75,
          dribbling: 70,
          passing: 72,
          shooting: 68,
          defending: 91,
          physical: 92,
          goalkeeping: 0,
          imageUrl: "/images/ramos.jpg",
        },
        {
          name: "Pique",
          preferredPosition: "CB",
          secondaryPositions: [],
          overallRating: 88,
          pace: 70,
          dribbling: 68,
          passing: 70,
          shooting: 58,
          defending: 89,
          physical: 88,
          goalkeeping: 0,
          imageUrl: "/images/pique.jpg",
        },
        {
          name: "Kounde",
          preferredPosition: "RB",
          secondaryPositions: ["CB"],
          overallRating: 86,
          pace: 85,
          dribbling: 80,
          passing: 78,
          shooting: 60,
          defending: 85,
          physical: 82,
          goalkeeping: 0,
          imageUrl: "/images/kounde.jpg",
        },
        {
          name: "Alves",
          preferredPosition: "RB",
          secondaryPositions: [],
          overallRating: 84,
          pace: 83,
          dribbling: 85,
          passing: 86,
          shooting: 68,
          defending: 78,
          physical: 75,
          goalkeeping: 0,
          imageUrl: "/images/alves.jpg",
        },
        {
          name: "Carvajal",
          preferredPosition: "RB",
          secondaryPositions: [],
          overallRating: 83,
          pace: 80,
          dribbling: 78,
          passing: 79,
          shooting: 65,
          defending: 82,
          physical: 78,
          goalkeeping: 0,
          imageUrl: "/images/carvajal.jpg",
        },
        {
          name: "Trent",
          preferredPosition: "RB",
          secondaryPositions: ["CM", "RW"],
          overallRating: 87,
          pace: 80,
          dribbling: 85,
          passing: 90,
          shooting: 75,
          defending: 78,
          physical: 78,
          goalkeeping: 0,
          imageUrl: "/images/trent.jpg",
        },
      ],
      midfielders: [
        {
          name: "Zidane",
          preferredPosition: "CAM",
          secondaryPositions: ["CM"],
          overallRating: 94,
          pace: 75,
          dribbling: 95,
          passing: 92,
          shooting: 85,
          defending: 60,
          physical: 80,
          goalkeeping: 0,
          imageUrl: "/images/zidane.jpg",
        },
        {
          name: "Maradona",
          preferredPosition: "CAM",
          secondaryPositions: ["LW", "RW"],
          overallRating: 95,
          pace: 80,
          dribbling: 98,
          passing: 90,
          shooting: 88,
          defending: 55,
          physical: 70,
          goalkeeping: 0,
          imageUrl: "/images/maradona.jpg",
        },
        {
          name: "De Bruyne",
          preferredPosition: "CAM",
          secondaryPositions: ["CM"],
          overallRating: 93,
          pace: 78,
          dribbling: 88,
          passing: 94,
          shooting: 90,
          defending: 65,
          physical: 80,
          goalkeeping: 0,
          imageUrl: "/images/debruyne.jpg",
        },
        {
          name: "Bellingham",
          preferredPosition: "CAM",
          secondaryPositions: ["CM"],
          overallRating: 89,
          pace: 82,
          dribbling: 85,
          passing: 87,
          shooting: 80,
          defending: 75,
          physical: 88,
          goalkeeping: 0,
          imageUrl: "/images/bellingham.jpg",
        },
        {
          name: "Iniesta",
          preferredPosition: "CM",
          secondaryPositions: ["CAM"],
          overallRating: 92,
          pace: 70,
          dribbling: 92,
          passing: 95,
          shooting: 70,
          defending: 65,
          physical: 68,
          goalkeeping: 0,
          imageUrl: "/images/iniesta.jpg",
        },
        {
          name: "Xavi",
          preferredPosition: "CM",
          secondaryPositions: ["CDM"],
          overallRating: 91,
          pace: 65,
          dribbling: 88,
          passing: 96,
          shooting: 60,
          defending: 70,
          physical: 65,
          goalkeeping: 0,
          imageUrl: "/images/xavi.jpg",
        },
        {
          name: "Modric",
          preferredPosition: "CM",
          secondaryPositions: ["CAM"],
          overallRating: 90,
          pace: 70,
          dribbling: 90,
          passing: 93,
          shooting: 75,
          defending: 70,
          physical: 70,
          goalkeeping: 0,
          imageUrl: "/images/modric.jpg",
        },
        {
          name: "Kroos",
          preferredPosition: "CM",
          secondaryPositions: ["CDM"],
          overallRating: 89,
          pace: 60,
          dribbling: 85,
          passing: 94,
          shooting: 80,
          defending: 72,
          physical: 75,
          goalkeeping: 0,
          imageUrl: "/images/kroos.jpg",
        },
        {
          name: "Pedri",
          preferredPosition: "CM",
          secondaryPositions: ["CAM"],
          overallRating: 88,
          pace: 75,
          dribbling: 90,
          passing: 92,
          shooting: 70,
          defending: 70,
          physical: 70,
          goalkeeping: 0,
          imageUrl: "/images/pedri.jpg",
        },
        {
          name: "Valverde",
          preferredPosition: "CDM",
          secondaryPositions: ["CM"],
          overallRating: 87,
          pace: 85,
          dribbling: 80,
          passing: 82,
          shooting: 80,
          defending: 85,
          physical: 88,
          goalkeeping: 0,
          imageUrl: "/images/valverde.jpg",
        },
        {
          name: "Rodri",
          preferredPosition: "CDM",
          secondaryPositions: ["CB"],
          overallRating: 89,
          pace: 65,
          dribbling: 75,
          passing: 88,
          shooting: 70,
          defending: 90,
          physical: 90,
          goalkeeping: 0,
          imageUrl: "/images/rodri.jpg",
        },
        {
          name: "Busquets",
          preferredPosition: "CDM",
          secondaryPositions: ["CM"],
          overallRating: 88,
          pace: 55,
          dribbling: 80,
          passing: 90,
          shooting: 60,
          defending: 88,
          physical: 80,
          goalkeeping: 0,
          imageUrl: "/images/busquets.jpg",
        },
      ],
      forwards: [
        {
          name: "Messi",
          preferredPosition: "RW",
          secondaryPositions: ["CAM"],
          overallRating: 96,
          pace: 85,
          dribbling: 98,
          passing: 90,
          shooting: 95,
          defending: 35,
          physical: 65,
          goalkeeping: 0,
          imageUrl: "/images/messi.jpg",
        },
        {
          name: "Salah",
          preferredPosition: "RW",
          secondaryPositions: ["LW"],
          overallRating: 90,
          pace: 90,
          dribbling: 88,
          passing: 80,
          shooting: 90,
          defending: 40,
          physical: 75,
          goalkeeping: 0,
          imageUrl: "/images/salah.jpg",
        },
        {
          name: "Bale",
          preferredPosition: "RW",
          secondaryPositions: ["ST"],
          overallRating: 87,
          pace: 92,
          dribbling: 85,
          passing: 78,
          shooting: 88,
          defending: 30,
          physical: 80,
          goalkeeping: 0,
          imageUrl: "/images/bale.jpg",
        },
        {
          name: "Yamal",
          preferredPosition: "RW",
          secondaryPositions: [],
          overallRating: 84,
          pace: 88,
          dribbling: 90,
          passing: 80,
          shooting: 80,
          defending: 30,
          physical: 68,
          goalkeeping: 0,
          imageUrl: "/images/yamal.jpg",
        },
        {
          name: "Haaland",
          preferredPosition: "ST",
          secondaryPositions: ["LW"],
          overallRating: 91,
          pace: 90,
          dribbling: 75,
          passing: 70,
          shooting: 95,
          defending: 30,
          physical: 90,
          goalkeeping: 0,
          imageUrl: "/images/haaland.jpg",
        },
        {
          name: "Lewandowski",
          preferredPosition: "ST",
          secondaryPositions: [],
          overallRating: 90,
          pace: 80,
          dribbling: 80,
          passing: 75,
          shooting: 93,
          defending: 30,
          physical: 85,
          goalkeeping: 0,
          imageUrl: "/images/lewandowski.jpg",
        },
        {
          name: "Benzema",
          preferredPosition: "ST",
          secondaryPositions: ["CAM"],
          overallRating: 89,
          pace: 78,
          dribbling: 85,
          passing: 82,
          shooting: 90,
          defending: 35,
          physical: 80,
          goalkeeping: 0,
          imageUrl: "/images/benzema.jpg",
        },
        {
          name: "Suarez",
          preferredPosition: "ST",
          secondaryPositions: [],
          overallRating: 88,
          pace: 75,
          dribbling: 85,
          passing: 78,
          shooting: 90,
          defending: 40,
          physical: 82,
          goalkeeping: 0,
          imageUrl: "/images/suarez.jpg",
        },
        {
          name: "Ronaldo",
          preferredPosition: "LW",
          secondaryPositions: ["ST", "RW"],
          overallRating: 92,
          pace: 88,
          dribbling: 85,
          passing: 78,
          shooting: 95,
          defending: 30,
          physical: 88,
          goalkeeping: 0,
          imageUrl: "/images/ronaldo.jpg",
        },
        {
          name: "Neymar",
          preferredPosition: "LW",
          secondaryPositions: ["CAM"],
          overallRating: 91,
          pace: 88,
          dribbling: 95,
          passing: 88,
          shooting: 85,
          defending: 30,
          physical: 70,
          goalkeeping: 0,
          imageUrl: "/images/neymar.jpg",
        },
        {
          name: "Ronaldinho",
          preferredPosition: "LW",
          secondaryPositions: ["CAM"],
          overallRating: 93,
          pace: 80,
          dribbling: 96,
          passing: 90,
          shooting: 85,
          defending: 40,
          physical: 75,
          goalkeeping: 0,
          imageUrl: "/images/ronaldinho.jpg",
        },
        {
          name: "Mbappe",
          preferredPosition: "LW",
          secondaryPositions: ["ST", "RW"],
          overallRating: 94,
          pace: 96,
          dribbling: 90,
          passing: 82,
          shooting: 92,
          defending: 30,
          physical: 78,
          goalkeeping: 0,
          imageUrl: "/images/mbappe.jpg",
        },
      ],
    };

    // Formation requirements: [GK, DEF, MID, FWD]
    const formationRequirements = {
      "4-3-3": {
        GK: 1,
        LB: 1,
        CB: 2,
        RB: 1,
        CM: 2,
        CAM: 1,
        LW: 1,
        ST: 1,
        RW: 1,
      },
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

    const formationLineups = {
      "4-3-3": [
        "GK",
        "LB",
        "LCB",
        "RCB",
        "RB",
        "LCM",
        "RCM",
        "CAM",
        "LW",
        "ST",
        "RW",
      ],
      "4-4-2": [
        "GK",
        "LB",
        "LCB",
        "RCB",
        "RB",
        "LM",
        "LCM",
        "RCM",
        "RM",
        "ST1",
        "ST2",
      ],
      "3-5-2": [
        "GK",
        "LCB",
        "CCB",
        "RCB",
        "LWB",
        "RWB",
        "CDM1",
        "CDM2",
        "CAM",
        "ST1",
        "ST2",
      ],
      "4-2-3-1": [
        "GK",
        "LB",
        "LCB",
        "RCB",
        "RB",
        "CDM1",
        "CDM2",
        "CAM",
        "LW",
        "RW",
        "ST",
      ],
    };

    // Positional groups for rating calculation
    const positionGroups = {
      GK: ["GK"],
      DEF: ["LB", "CB", "RB", "LWB", "RWB", "LCB", "RCB", "CCB"],
      MID: ["CDM", "CM", "CAM", "LM", "RM", "LCM", "RCM", "CDM1", "CDM2"],
      FWD: ["LW", "ST", "RW", "ST1", "ST2", "CF"],
    };

    // Suitability factors for rating calculation based on position difference
    const positionSuitability = {
      preferred: 1.0, // No penalty
      secondary: 0.9, // 10% penalty for secondary positions
      sameGroup: 0.7, // 30% penalty for positions in the same group but not preferred/secondary (e.g., RW to LW)
      adjacentGroup: 0.5, // 50% penalty for positions in adjacent groups (e.g., Midfielder to Defender)
      farGroup: 0.2, // 80% penalty for positions in far groups (e.g., Goalkeeper to Forward)
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

    // Helper function to normalize specific positions to general ones
    function normalizePosition(position) {
      if (["LCB", "RCB", "CCB"].includes(position)) return "CB";
      if (["LCM", "RCM"].includes(position)) return "CM";
      if (["ST1", "ST2"].includes(position)) return "ST";
      if (["CDM1", "CDM2"].includes(position)) return "CDM";
      return position; // Return as is if no normalization needed
    }

    // Helper function to get general position type from specific position
    // This function is used for player suitability and chemistry, not for formation validation counts.
    function getGeneralPositionType(specificPosition) {
      for (const group in positionGroups) {
        if (positionGroups[group].includes(specificPosition)) {
          return group;
        }
      }
      return "UNKNOWN";
    }

    // Calculates a player's rating based on their assigned position
    // Uses dynamic matchRating when available (updated during the match),
    // falling back to overallRating otherwise.
    function calculatePlayerRating(player, assignedPosition) {
      let rating =
        typeof player.matchRating === "number"
          ? player.matchRating
          : player.overallRating || player.overallRating;

      const normalizedPreferred = normalizePosition(player.preferredPosition);
      const normalizedAssigned = normalizePosition(assignedPosition);

      let adjustedRating;

      // Check for preferred position (normalized)
      if (normalizedPreferred === normalizedAssigned) {
        adjustedRating = Math.round(rating * positionSuitability.preferred);
      }
      // Check for secondary positions (normalized)
      else if (
        player.secondaryPositions
          .map(normalizePosition)
          .includes(normalizedAssigned)
      ) {
        adjustedRating = Math.round(rating * positionSuitability.secondary);
      } else {
        const preferredGroup = getPositionGroup(normalizedPreferred);
        const assignedGroup = getPositionGroup(normalizedAssigned);

        // Check if in the same general group (e.g., FWD to FWD, but not preferred/secondary)
        if (preferredGroup === assignedGroup) {
          adjustedRating = Math.round(rating * positionSuitability.sameGroup);
        }
        // Check for adjacent groups
        else if (
          positionGroupAdjacency[preferredGroup] &&
          positionGroupAdjacency[preferredGroup].includes(assignedGroup)
        ) {
          adjustedRating = Math.round(
            rating * positionSuitability.adjacentGroup
          );
        }
        // If not in the same group, secondary, or adjacent, it's a far group
        else {
          adjustedRating = Math.round(rating * positionSuitability.farGroup);
        }
      }

      // Apply maximum OVR drop based on general position group
      const playerGeneralGroup = getPositionGroup(player.preferredPosition); // Get original general group
      const assignedGeneralGroup = getPositionGroup(assignedPosition); // Get assigned general group

      if (playerGeneralGroup === assignedGeneralGroup) {
        // If player is in their general area
        let maxDrop = 0;
        if (playerGeneralGroup === "FWD") {
          maxDrop = 4;
        } else if (playerGeneralGroup === "MID") {
          maxDrop = 5;
        } else if (playerGeneralGroup === "DEF") {
          maxDrop = 4;
        }

        if (maxDrop > 0) {
          const minAllowedRating = player.overallRating - maxDrop;
          adjustedRating = Math.max(adjustedRating, minAllowedRating);
        }
      }

      return adjustedRating;
    }

    // Adjust a player's match rating during the match.
    // delta: positive or negative float to add to matchRating
    // reason: optional string used for debugging/logging
    function adjustMatchRating(player, delta, reason) {
      if (!player) return;
      if (typeof player.matchRating !== "number") {
        // initialize if missing (use overallRating fallback)
        player.matchRating =
          typeof player.overallRating === "number" ? player.overallRating : 6.5;
      }
      player.matchRating = Math.max(
        1.0,
        Math.min(10.0, +(player.matchRating + delta).toFixed(2))
      );

      // Ensure stats object exists
      player.stats = player.stats || {
        goals: 0,
        assists: 0,
        tackles: 0,
        saves: 0,
        shots: 0,
        passes: 0,
        passesCompleted: 0,
        passAccuracy: 0,
        fouls: 0,
        cards: 0,
        dribbles: 0,
        interceptions: 0,
        clearances: 0,
        keyPasses: 0,
      };

      // Live UI refresh: update lineup and ratings panels if visible
      try {
        // Update small parts to avoid heavy re-renders where possible
        // Re-render lineup OVRs
        if (lineupDisplay && typeof renderLineup === "function") renderLineup();
        // Re-render player ratings panel if present
        const ratingsRoot = document.querySelector(".player-ratings-grid");
        if (ratingsRoot && typeof renderPlayerRatings === "function") {
          // try to locate current match players arrays from last match scope (if stored) else rebuild
          // For simplicity re-render from tournament.results last entry if available
          const lastResult =
            tournament.results && tournament.results.length
              ? tournament.results[tournament.results.length - 1]
              : null;
          if (lastResult) {
            renderPlayerRatings(lastResult);
          } else {
            // fallback: try to update ratings grid by forcing a repaint
            ratingsRoot
              .querySelectorAll(".player-rating-card")
              .forEach((card) => {
                const name = card.querySelector(".player-name")?.textContent;
                if (name === player.name) {
                  const ratingEl = card.querySelector(".match-rating");
                  if (ratingEl)
                    ratingEl.textContent = (player.matchRating || 0).toFixed(1);
                }
              });
          }
        }
      } catch (e) {
        // silently ignore UI update errors
        console.error("adjustMatchRating UI update error", e, reason);
      }
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
        // Ensure lineup is an array of objects with a 'player' property
        if (!Array.isArray(tournament.lineup)) {
          tournament.lineup = []; // Reset if not an array
        }
        // Map to ensure all elements are proper slot objects, even if old data was malformed
        tournament.lineup = tournament.lineup.map((slot) => {
          if (typeof slot === "object" && slot !== null && "player" in slot) {
            return slot;
          }
          return { slotId: null, positionType: null, player: null }; // Default empty slot
        });

        // Reconstruct lineup to ensure it has the slot structure (old format handling)
        if (
          tournament.lineup.length > 0 &&
          !tournament.lineup[0].slotId // Check for old format
        ) {
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
                tournament.lineup = tournament.lineup.filter(
                  (p) => p !== existingPlayer
                );
              }
            }
          }
          lineup = newLinearLineup;
        } else {
          lineup = tournament.lineup; // Use directly if new format or empty
        }

        selectedPlayers = lineup
          .filter((slot) => slot && slot.player !== null)
          .map((slot) => slot.player);
        currentFormation = tournament.formation;
        updateTournamentUI();
      } else {
        tournament = {
          round: 0,
          maxRounds: parseInt(tournamentTypeSelect.value),
          userTeam: [],
          opponents: [],
          results: [],
          userWins: 0,
          aiWins: 0,
          draws: 0,
          opponentSelectionMode: "aiGenerated",
          // Initialize lineup with proper slot objects from the start
          lineup: new Array(MAX_PLAYERS).fill(null).map((_, i) => ({
            slotId: `slot${i}`, // Generic slot ID for initial empty state
            positionType: null,
            player: null,
          })),
        };
        lineup = tournament.lineup; // Assign to global lineup
      }
    }

    function updateTournamentUI() {
      if (userTournamentScoreSpan)
        userTournamentScoreSpan.textContent = tournament.userWins;
      if (aiTournamentScoreSpan)
        aiTournamentScoreSpan.textContent = tournament.aiWins;
      if (tournamentTypeSelect)
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
      if (playerSourceSelection) playerSourceSelection.classList.add("hidden");
      if (formationSelectionSection)
        formationSelectionSection.classList.remove("hidden"); // Show formation selection first
      renderPlayers(allPlayersData, availablePlayersDiv, true); // CRITICAL: Render available players here
    }

    // Renders players into a given container
    function renderPlayers(
      players,
      container,
      isSelectable,
      isOpponent = false
    ) {
      if (!container) return;
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
                      <span class="player-ovr">${player.overallRating}</span>
                  </div>
                  <div class="player-card-buttons">
                      <button class="btn btn-sm btn-primary add-player-btn">Add</button>
                      <button class="btn btn-sm btn-secondary details-player-btn">Details</button>
                  </div>
              `;

        if (isSelectable) {
          const addButton = playerItem.querySelector(".add-player-btn");
          const detailsButton = playerItem.querySelector(".details-player-btn");

          if (addButton)
            addButton.addEventListener("click", (e) => {
              e.stopPropagation();
              if (isOpponent) {
                handleOpponentPlayerSelection(player);
              } else {
                handlePlayerSelection(player);
              }
            });

          if (detailsButton)
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
        : player.overallRating;

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
      if (modalInstance)
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

      const availablePositionsContainer = document.getElementById(
        "available-positions-container"
      );
      if (availablePositionsContainer)
        availablePositionsContainer.addEventListener("click", (event) => {
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
            selectedPlayers = lineup
              .filter((slot) => slot.player !== null)
              .map((slot) => slot.player); // Rebuild selectedPlayers from lineup after addition
            updateSelectedPlayerCount();
            renderLineup(); // Added renderLineup call here

            modal.hide();
          }
        });

      const positionModalInstance = document.getElementById(
        "position-selection-modal"
      );
      if (positionModalInstance)
        positionModalInstance.addEventListener("hidden.bs.modal", () => {
          modalElement.remove();
        });
    }

    // Updates the count of selected players and button state
    function updateSelectedPlayerCount() {
      const currentSelectedCount = lineup.filter(
        (slot) => slot.player !== null
      ).length;
      if (selectedPlayerCountSpan)
        selectedPlayerCountSpan.textContent = currentSelectedCount;
      const isValid = isValidTeam();
      if (confirmTeamBtn) confirmTeamBtn.disabled = !isValid;
      console.log(
        "updateSelectedPlayerCount: Current selected count:",
        currentSelectedCount,
        "isValidTeam:",
        isValid,
        "confirmTeamBtn.disabled:",
        !isValid
      );

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
      renderLineup(); // Added renderLineup call here
    }

    // Checks if the selected team is valid based on current formation requirements
    function isValidTeam() {
      console.log("--- Checking isValidTeam ---");
      const actualPlayersInLineup = lineup.filter(
        (slot) => slot && slot.player !== null
      ).length;
      console.log(
        "isValidTeam: Actual players in lineup:",
        actualPlayersInLineup
      );
      console.log("isValidTeam: MAX_PLAYERS:", MAX_PLAYERS);

      if (actualPlayersInLineup !== MAX_PLAYERS) {
        console.log("isValidTeam: Reason for invalid: Player count mismatch.");
        return false;
      }

      const isCustomFormation = customFormations.some(
        (f) => f.name === currentFormation
      );
      let requiredConfig;
      let countByFunction;

      if (isCustomFormation) {
        requiredConfig = formationRequirements[currentFormation]; // This will be like {GK: 1, DEF: 1, MID: 8, FWD: 1}
        countByFunction = getPositionGroup; // Use getPositionGroup for custom formations
      } else {
        requiredConfig = formationRequirements[currentFormation]; // This will be like {GK: 1, LB: 1, CB: 2, ...}
        countByFunction = normalizePosition; // Use normalizePosition for predefined formations
      }

      console.log("isValidTeam: Current Formation:", currentFormation);
      console.log("isValidTeam: Required Config:", requiredConfig);

      const currentCounts = {};

      // Initialize counts based on the keys in the requiredConfig
      for (const key in requiredConfig) {
        currentCounts[key] = 0;
      }

      // Count players in the lineup based on the appropriate function
      lineup.forEach((slot) => {
        if (slot.player) {
          // Check if slot has a player
          const countedPosition = countByFunction(slot.positionType);
          console.log(
            `isValidTeam: Slot ${slot.slotId} (${slot.positionType}) assigned to player ${slot.player.name}. Counted position: ${countedPosition}`
          );

          if (currentCounts.hasOwnProperty(countedPosition)) {
            currentCounts[countedPosition]++;
          } else {
            console.warn(
              `isValidTeam: Unexpected position type: ${countedPosition} for slot ${slot.slotId}. This position might not be defined in the required config for this formation.`
            );
          }
        }
      });
      console.log("isValidTeam: Current Counts by Position:", currentCounts);

      // Check if current counts match required counts for each position
      for (const key in requiredConfig) {
        if (currentCounts[key] !== requiredConfig[key]) {
          console.log(
            `isValidTeam: Reason for invalid: Position ${key} count mismatch. Expected: ${requiredConfig[key]}, Actual: ${currentCounts[key]}`
          );
          return false;
        }
      }
      console.log("isValidTeam: Team is valid.");
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
      console.log("handlePlayerSelection: Player data:", playerData);
      if (!currentFormation) {
        alert("Please select a formation first.");
        return;
      }

      // Check if player is already in the lineup
      const existingPlayerSlot = lineup.find(
        (slot) => slot.player && slot.player.name === playerData.name
      );
      console.log(
        "handlePlayerSelection: Existing player slot:",
        existingPlayerSlot
      );

      if (existingPlayerSlot) {
        // Player is already in lineup, so remove them
        existingPlayerSlot.player = null;
        // Rebuild selectedPlayers from lineup after removal
        selectedPlayers = lineup
          .filter((slot) => slot.player !== null)
          .map((slot) => slot.player);
        console.log(
          "handlePlayerSelection: Player removed. New lineup:",
          lineup,
          "New selectedPlayers:",
          selectedPlayers
        );
        updateSelectedPlayerCount();
        renderLineup();
      } else {
        // Player is not in lineup, show position selection
        if (
          lineup.filter((slot) => slot.player !== null).length >= MAX_PLAYERS
        ) {
          // Check lineup count instead of selectedPlayers
          alert(
            `Your team is already full (${MAX_PLAYERS} players). Please remove a player first.`
          );
          return;
        }
        console.log(
          "handlePlayerSelection: Showing position selection modal for:",
          playerData.name
        );
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

    function getPositionInfo(slotId) {
      const formation = currentFormation;
      if (!formation) return { x: 0, y: 0 };

      const customFormation = customFormations.find(
        (f) => f.name === formation
      );
      if (customFormation) {
        const slot = customFormation.lineup.find((s) => s.slotId === slotId);
        return slot ? slot.coords : { x: 50, y: 50 };
      }

      const positions = {
        "4-3-3": {
          GK: { x: 50, y: 90 },
          LB: { x: 20, y: 75 },
          LCB: { x: 40, y: 80 },
          RCB: { x: 60, y: 80 },
          RB: { x: 80, y: 75 },
          LCM: { x: 35, y: 55 },
          RCM: { x: 65, y: 55 },
          CAM: { x: 50, y: 40 },
          LW: { x: 25, y: 25 },
          ST: { x: 50, y: 15 },
          RW: { x: 75, y: 25 },
        },
        "4-4-2": {
          GK: { x: 50, y: 90 },
          LB: { x: 15, y: 70 },
          LCB: { x: 35, y: 75 },
          RCB: { x: 65, y: 75 },
          RB: { x: 85, y: 70 },
          LM: { x: 20, y: 45 },
          LCM: { x: 40, y: 50 },
          RCM: { x: 60, y: 50 },
          RM: { x: 80, y: 45 },
          ST1: { x: 40, y: 20 },
          ST2: { x: 60, y: 20 },
        },
        "3-5-2": {
          GK: { x: 50, y: 90 },
          LCB: { x: 30, y: 75 },
          CCB: { x: 50, y: 80 },
          RCB: { x: 70, y: 75 },
          LWB: { x: 15, y: 50 },
          RWB: { x: 85, y: 50 },
          CDM1: { x: 40, y: 60 },
          CDM2: { x: 60, y: 60 },
          CAM: { x: 50, y: 40 },
          ST1: { x: 40, y: 20 },
          ST2: { x: 60, y: 20 },
        },
        "4-2-3-1": {
          GK: { x: 50, y: 90 },
          LB: { x: 15, y: 70 },
          LCB: { x: 35, y: 75 },
          RCB: { x: 65, y: 75 },
          RB: { x: 85, y: 70 },
          CDM1: { x: 40, y: 60 },
          CDM2: { x: 60, y: 60 },
          CAM: { x: 50, y: 40 },
          LW: { x: 20, y: 25 },
          RW: { x: 80, y: 25 },
          ST: { x: 50, y: 15 },
        },
      };

      return positions[formation][slotId] || { x: 0, y: 0 };
    }

    // Renders the visual lineup on the soccer field
    function renderLineup() {
      if (!lineupDisplay) return;
      lineupDisplay.innerHTML = ""; // Clear the display first

      if (!currentFormation || !lineup) {
        console.log("No currentFormation or lineup. Exiting renderLineup.");
        return;
      }

      lineup.forEach((slot) => {
        const positionCircle = document.createElement("div");
        positionCircle.id = `pos-${slot.slotId.toLowerCase()}`;
        positionCircle.className = "position-circle active";
        positionCircle.dataset.slotId = slot.slotId;

        const positionCoords = getPositionInfo(slot.slotId);
        positionCircle.style.left = `${positionCoords.x}%`;
        positionCircle.style.top = `${positionCoords.y}%`;
        positionCircle.style.transform = `translate(-50%, -50%)`;

        positionCircle.innerHTML = `
                <span class="position-label">${slot.positionType}</span>
                <img src="" alt="Player" class="player-image">
            `;

        const playerImage = positionCircle.querySelector(".player-image");

        const playerInfo = document.createElement("div");
        playerInfo.className = "player-info";

        if (slot.player) {
          positionCircle.classList.add("has-player");
          positionCircle.setAttribute("draggable", "true");
          playerImage.src = slot.player.imageUrl;
          playerImage.alt = slot.player.name;

          playerInfo.innerHTML = `
            <span class="player-name">${slot.player.name}</span>
            <span class="player-ovr">${slot.player.overallRating}</span>
          `;
          playerInfo.style.left = `${positionCoords.x}%`;
          playerInfo.style.top = `${positionCoords.y + 6}%`;
          playerInfo.style.transform = `translateX(-50%)`;
        }

        positionCircle.addEventListener("dragstart", handleDragStart);
        positionCircle.addEventListener("dragover", handleDragOver);
        positionCircle.addEventListener("dragleave", handleDragLeave);
        positionCircle.addEventListener("drop", handleDrop);
        positionCircle.addEventListener("dragend", handleDragEnd);

        lineupDisplay.appendChild(positionCircle);
        lineupDisplay.appendChild(playerInfo);
      });
    }

    draggedSlotId = null; // Global variable to store the ID of the dragged slot

    function handleDragStart(event) {
      draggedSlotId = event.target.dataset.slotId;
      event.dataTransfer.setData("text/plain", draggedSlotId); // Set data for drag operation
      event.target.classList.add("dragging"); // Add a class for visual feedback
    }

    function handleDragOver(event) {
      event.preventDefault(); // Allow drop
      const element = event.target.closest(".position-circle");
      if (element) {
        element.classList.add("drag-over"); // Add visual feedback for drag-over
      }
    }

    function handleDragLeave(event) {
      const element = event.target.closest(".position-circle");
      if (element) {
        element.classList.remove("drag-over"); // Remove visual feedback
      }
    }

    function handleDrop(event) {
      event.preventDefault();
      const targetElement = event.target.closest(".position-circle");
      if (!targetElement) return;

      targetElement.classList.remove("drag-over");

      const targetSlotId = targetElement.dataset.slotId;

      if (draggedSlotId === targetSlotId) {
        return; // Dropped on the same slot
      }

      const draggedSlotIndex = lineup.findIndex(
        (slot) => slot.slotId === draggedSlotId
      );
      const targetSlotIndex = lineup.findIndex(
        (slot) => slot.slotId === targetSlotId
      );

      if (draggedSlotIndex === -1 || targetSlotIndex === -1) {
        console.error("Dragged or target slot not found in lineup.");
        return;
      }

      // Perform the swap in the lineup array
      const draggedPlayer = lineup[draggedSlotIndex].player;
      const targetPlayer = lineup[targetSlotIndex].player;

      lineup[draggedSlotIndex].player = targetPlayer;
      lineup[targetSlotIndex].player = draggedPlayer;

      // Update selectedPlayers array (important for isValidTeam and count)
      // Clear selectedPlayers and re-populate from the updated lineup
      selectedPlayers = lineup
        .filter((slot) => slot.player !== null)
        .map((slot) => slot.player);

      updateSelectedPlayerCount(); // Re-evaluate team validity and count
      renderLineup(); // Re-render the lineup to reflect the swap
    }

    function handleDragEnd(event) {
      event.target.classList.remove("dragging"); // Remove dragging class
      draggedSlotId = null; // Clear dragged ID
    }

    // Handles formation selection
    function handleFormationSelection(formation, isCustom = false) {
      currentFormation = formation;
      lineup = []; // Initialize as empty array

      if (isCustom) {
        const customFormation = customFormations.find(
          (f) => f.name === formation
        );
        if (customFormation) {
          lineup = customFormation.lineup.map((slot) => ({
            ...slot,
            player: null,
          }));
          formationRequirements[formation] = customFormation.requirements;
        }
      } else {
        const lineupPositions = formationLineups[currentFormation];
        lineupPositions.forEach((position) => {
          lineup.push({
            slotId: position,
            positionType: position,
            player: null,
          });
        });
      }

      selectedPlayers = [];
      // Visually indicate active formation
      document
        .querySelectorAll(".formation-btn, .custom-formation-btn")
        .forEach((btn) => {
          if (btn.dataset.formation === formation) {
            btn.classList.add("active");
          } else {
            btn.classList.remove("active");
          }
        });
      // After selecting formation, show player selection section
      if (formationSelectionSection)
        formationSelectionSection.classList.add("hidden");
      if (playerSourceMode === "api") {
        if (apiPlayerSearchSection)
          apiPlayerSearchSection.classList.remove("hidden");
        if (lineupDisplay) {
          const apiPlayerResults =
            document.getElementById("api-player-results");
          if (apiPlayerResults) {
            apiPlayerResults.after(lineupDisplay);
          }
        }
        // Show confirm team button for API mode
        if (confirmTeamBtn) {
          confirmTeamBtn.style.display = "block";
          // Append to apiPlayerSearchSection if not already there
          const apiSection = document.getElementById(
            "api-player-search-section"
          );
          if (apiSection && !apiSection.contains(confirmTeamBtn)) {
            const container =
              apiSection.querySelector(".container") || apiSection;
            const btnContainer = document.createElement("div");
            btnContainer.className = "text-center mt-3";
            btnContainer.appendChild(confirmTeamBtn);
            container.appendChild(btnContainer);
          }
        }
      } else {
        if (playerSelectionSection)
          playerSelectionSection.classList.remove("hidden");
        // Hide confirm team button for predefined mode (it's in playerSelectionSection)
        if (confirmTeamBtn) {
          confirmTeamBtn.style.display = "none";
        }
      }
      const randomizeTeamBtn = document.getElementById("randomize-team-btn");
      if (randomizeTeamBtn) {
        randomizeTeamBtn.disabled = false; // Enable randomize button once a formation is selected
      }

      // Clear selected players and re-render available players for new formation
      updateSelectedPlayerCount();
      renderPlayers(allPlayersData, availablePlayersDiv, true); // Render available players for user
      renderLineup(); // Render initial empty lineup based on formation
    }

    // Simulates the match (client-side logic)
    // simulateMatch can accept optional two-player states for PvP: simulateMatch(player1State, player2State)
    async function simulateMatch(p1State = null, p2State = null) {
      // New, more realistic match engine
      isSimulationSkipped = false;
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
      let humanVsHuman = false;
      // If p1State and p2State provided -> PvP immediate simulation
      if (p1State && p2State) {
        humanVsHuman = true;
        // Set up teams directly from states
        // We'll assign p1 as "user" and p2 as "ai" for internal flow but label later
        aiTeamPlayers = p2State.players;
        // override userTeam setup later using p1State
      } else {
        if (tournament.opponentSelectionMode === "aiGenerated") {
          aiTeamPlayers = generateAITeam(selectedPlayers).players;
        } else {
          if (!isValidOpponentTeam()) {
            alert(
              "Please select exactly 11 players for the opponent team and ensure all position requirements for the chosen formation are met."
            );
            return;
          }
          aiTeamPlayers = selectedOpponentPlayers;
        }
        tournament.opponents.push(aiTeamPlayers);
      }

      // UI setup
      if (playerSelectionSection)
        playerSelectionSection.classList.add("hidden");
      if (formationSelectionSection)
        formationSelectionSection.classList.add("hidden");
      if (liveSimulationSection)
        liveSimulationSection.classList.remove("hidden");
      if (liveCommentaryFeed) liveCommentaryFeed.innerHTML = "";
      if (liveUserScore) liveUserScore.textContent = "0";
      if (liveAiScore) liveAiScore.textContent = "0";

      const userPlaystyle = playstyleSelect
        ? playstyleSelect.value
        : "Balanced";

      // Build userTeam from either p1State (PvP) or current lineup
      const userTeam = (function () {
        if (p1State) {
          // Use lineup if available and valid, otherwise use players array
          const usePlayers =
            p1State.lineup &&
            p1State.lineup.length > 0 &&
            p1State.lineup[0].player
              ? p1State.lineup.map((slot) => ({
                  ...slot.player,
                  position: slot.positionType || slot.player.preferredPosition,
                  matchRating: 6.5,
                  stats: slot.player.stats || {
                    goals: 0,
                    assists: 0,
                    tackles: 0,
                    saves: 0,
                    shots: 0,
                    passes: 0,
                    passAccuracy: null,
                  },
                  team: slot.player.team || "Player 1",
                }))
              : p1State.players.map((p) => ({
                  ...p,
                  position: p.position || p.preferredPosition,
                  matchRating: 6.5,
                  stats: p.stats || {
                    goals: 0,
                    assists: 0,
                    tackles: 0,
                    saves: 0,
                    shots: 0,
                    passes: 0,
                    passAccuracy: null,
                  },
                  team: p.team || "Player 1",
                }));

          return {
            players: usePlayers,
            formation: p1State.formation || currentFormation,
            playstyle:
              p1State.playstyle ||
              (playstyleSelect ? playstyleSelect.value : "Balanced"),
            strength:
              p1State.strength || calculateTeamStrength(p1State.players),
          };
        }

        return {
          players: lineup.map((slot) => {
            const base = {
              ...slot.player,
              position: slot.positionType,
              matchRating: 6.5,
            };
            base.stats = base.stats || {
              goals: 0,
              assists: 0,
              tackles: 0,
              saves: 0,
              shots: 0,
              passes: 0,
              passAccuracy: null,
            };
            base.team = base.team || "Your Team";
            return base;
          }),
          formation: currentFormation,
          playstyle: userPlaystyle,
          strength: calculateTeamStrength(
            lineup.map((s) => s.player).filter(Boolean),
            userPlaystyle
          ),
        };
      })();

      const aiPlaystyle = chooseAIPlaystyle(aiTeamPlayers);
      if (aiPlaystyleDisplay) aiPlaystyleDisplay.textContent = aiPlaystyle;

      const aiTeam = (function () {
        if (p2State) {
          // Use lineup if available and valid, otherwise use players array
          const usePlayers =
            p2State.lineup &&
            p2State.lineup.length > 0 &&
            p2State.lineup[0].player
              ? p2State.lineup.map((slot) => ({
                  ...slot.player,
                  position: slot.positionType || slot.player.preferredPosition,
                  matchRating: 6.5,
                  stats: slot.player.stats || {
                    goals: 0,
                    assists: 0,
                    tackles: 0,
                    saves: 0,
                    shots: 0,
                    passes: 0,
                    passAccuracy: null,
                  },
                  team: slot.player.team || "Player 2",
                }))
              : p2State.players.map((p) => ({
                  ...p,
                  position: p.position || p.preferredPosition,
                  matchRating: 6.5,
                  stats: p.stats || {
                    goals: 0,
                    assists: 0,
                    tackles: 0,
                    saves: 0,
                    shots: 0,
                    passes: 0,
                    passAccuracy: null,
                  },
                  team: p.team || "Player 2",
                }));

          return {
            players: usePlayers,
            formation: p2State.formation || "4-4-2",
            playstyle: p2State.playstyle || aiPlaystyle,
            strength:
              p2State.strength ||
              calculateTeamStrength(
                p2State.players,
                p2State.playstyle || aiPlaystyle
              ),
          };
        }

        return {
          players: aiTeamPlayers.map((p) => ({
            ...p,
            matchRating: 6.5,
            stats: p.stats || {
              goals: 0,
              assists: 0,
              tackles: 0,
              saves: 0,
              shots: 0,
              passes: 0,
              passAccuracy: null,
            },
            team: p.team || "AI Team",
          })),
          formation: "4-4-2",
          playstyle: aiPlaystyle,
          strength: calculateTeamStrength(aiTeamPlayers, aiPlaystyle),
        };
      })();

      // Helpers
      const delay = (ms) => new Promise((res) => setTimeout(res, ms));
      const randInt = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
      const randFloat = (a, b) => Math.random() * (b - a) + a;
      const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
      const getPlayersByGroup = (team, group) =>
        team.players.filter(
          (p) => getPositionGroup(p.position || p.preferredPosition) === group
        );

      // Decide overall match flavour: goals distribution
      // Most matches 2-4 total goals, sometimes low or high scoring
      let totalGoals;
      const gRoll = Math.random();
      if (gRoll < 0.75) totalGoals = randInt(2, 4);
      else if (gRoll < 0.9) totalGoals = randInt(0, 1);
      else totalGoals = randInt(5, 8);

      // Slightly bias by combined team strength (stronger teams -> more goals sometimes)
      const strengthBias = Math.round(
        (userTeam.strength + aiTeam.strength) / 200 - 1
      );
      totalGoals = Math.max(0, totalGoals + strengthBias);

      // Possession: realistic split based on strength + randomness; avoid extreme 100-0
      let basePossUser =
        50 +
        Math.round((userTeam.strength - aiTeam.strength) * 0.4) +
        randInt(-8, 8);
      basePossUser = Math.max(30, Math.min(70, basePossUser));
      const userPossession = basePossUser;
      const aiPossession = 100 - userPossession;

      // Shots: teams average 8-20 shots
      const userShots = Math.max(
        6,
        Math.min(
          22,
          Math.round(randFloat(8, 15) * (1 + (userTeam.strength - 75) / 200))
        )
      );
      const aiShots = Math.max(
        6,
        Math.min(
          22,
          Math.round(randFloat(8, 15) * (1 + (aiTeam.strength - 75) / 200))
        )
      );
      const userShotsOnTarget = Math.max(
        1,
        Math.round(userShots * randFloat(0.3, 0.5))
      );
      const aiShotsOnTarget = Math.max(
        1,
        Math.round(aiShots * randFloat(0.3, 0.5))
      );

      // Passes: each team 300-700 passes
      const userPasses = Math.round(
        randFloat(320, 680) * (1 + (userPossession - 50) / 200)
      );
      const aiPasses = Math.round(
        randFloat(320, 680) * (1 + (aiPossession - 50) / 200)
      );

      // Estimate team pass accuracy early so we can attribute per-player pass completion
      let userPassAccuracy =
        userPasses > 0
          ? Math.max(
              50,
              Math.min(
                95,
                Math.round(
                  ((userPasses - Math.floor(randFloat(0, userPasses) / 6)) /
                    userPasses) *
                    100
                )
              )
            )
          : 0;
      let aiPassAccuracy =
        aiPasses > 0
          ? Math.max(
              50,
              Math.min(
                95,
                Math.round(
                  ((aiPasses - Math.floor(randFloat(0, aiPasses) / 6)) /
                    aiPasses) *
                    100
                )
              )
            )
          : 0;

      // Tackles: 10-30
      const userTackles = randInt(10, 30);
      const aiTackles = randInt(10, 30);

      // Dribbles, interceptions, clearances, key passes
      const userDribbles = randInt(6, 24);
      const aiDribbles = randInt(6, 24);
      const userInterceptions = randInt(4, 18);
      const aiInterceptions = randInt(4, 18);
      const userClearances = randInt(10, 40);
      const aiClearances = randInt(10, 40);
      const userKeyPasses = randInt(2, 12);
      const aiKeyPasses = randInt(2, 12);

      // Fouls 5-20, Corners 3-10, Offsides 0-6
      const userFouls = randInt(5, 18);
      const aiFouls = randInt(5, 18);
      const userCorners = randInt(3, 10);
      const aiCorners = randInt(3, 10);
      const userOffsides = randInt(0, 6);
      const aiOffsides = randInt(0, 6);

      // Goals distribution between teams by relative strength + randomness
      const userGoalShare = userTeam.strength + randInt(-5, 5);
      const aiGoalShare = aiTeam.strength + randInt(-5, 5);
      let userGoals = Math.round(
        (totalGoals * userGoalShare) / (userGoalShare + aiGoalShare || 1)
      );
      let aiGoals = Math.max(0, totalGoals - userGoals);

      // Ensure occasional 0-0 or 1-0 defensive battles even if totalGoals was higher
      if (Math.random() < 0.05) {
        // a rare defensive shutout
        if (Math.random() < 0.5) {
          // 0-0
          userGoals = 0;
          aiGoals = 0;
        } else {
          // 1-0 either way
          if (Math.random() < 0.5) {
            userGoals = 1;
            aiGoals = 0;
          } else {
            userGoals = 0;
            aiGoals = 1;
          }
        }
      }

      // Saves: roughly shotsOnTarget - goals (but bounded 2-10)
      let userSaves = Math.max(2, Math.min(10, aiShotsOnTarget - aiGoals));
      let aiSaves = Math.max(2, Math.min(10, userShotsOnTarget - userGoals));

      // Build major-event timeline: goals, big chances, saves, cards, penalties, decisive tackles
      const timelineEvents = [];
      const minutesUsed = new Set();

      const pushEventAt = (evt) => {
        // ensure unique minute placement when desired; if collision, nudge
        let m = evt.minute;
        while (minutesUsed.has(m) && m < 90) m++;
        minutesUsed.add(m);
        evt.minute = m;
        timelineEvents.push(evt);
      };

      // Add kickoff/start
      pushEventAt({
        minute: 0,
        team: "neutral",
        type: "start",
        text: humanVsHuman
          ? `Match Start: Player 1 (${userTeam.strength}) vs Player 2 (${aiTeam.strength})`
          : `Match Start: User Team (${userTeam.strength}) vs AI Team (${aiTeam.strength})`,
        icon: "⏱️",
      });

      // Create goal events for each team
      function assignGoals(team, goalsCount) {
        for (let g = 0; g < goalsCount; g++) {
          const minute = randInt(5, 88);
          // Scorer bias: forwards > mids > defenders
          const fwd = getPlayersByGroup(team, "FWD");
          const mid = getPlayersByGroup(team, "MID");
          const def = getPlayersByGroup(team, "DEF");
          const scorerPool = [];
          scorerPool.push(...fwd, ...mid, ...def);
          const scorer = pick(scorerPool) || pick(team.players);
          // assist from midfield or forward
          let assister = null;
          if (Math.random() < 0.7) {
            const assistPool = [...mid, ...fwd];
            assister = pick(assistPool) || null;
          }
          // record stats
          scorer.stats = scorer.stats || {};
          scorer.stats.goals = (scorer.stats.goals || 0) + 1;
          if (assister)
            (assister.stats = assister.stats || {}),
              (assister.stats.assists = (assister.stats.assists || 0) + 1);
          adjustMatchRating(scorer, +1.2, "Goal scored");
          if (assister) adjustMatchRating(assister, +0.6, "Assist provided");

          pushEventAt({
            minute,
            team: team === userTeam ? "user" : "ai",
            type: "goal",
            text: `GOAL! ${scorer.name} scores!`,
            icon: "⚽",
            player: scorer,
            assist: assister,
          });
        }
      }

      assignGoals(userTeam, userGoals);
      assignGoals(aiTeam, aiGoals);

      // Big chances (exciting moments that may or may not result in goal) - 0..4 per match
      const bigChances = randInt(1, 4);
      for (let i = 0; i < bigChances; i++) {
        const forUser =
          Math.random() <
          userTeam.strength / (userTeam.strength + aiTeam.strength);
        const minute = randInt(1, 89);
        const team = forUser ? userTeam : aiTeam;
        const attacker =
          pick(
            getPlayersByGroup(team, "FWD").concat(
              getPlayersByGroup(team, "MID")
            )
          ) || pick(team.players);
        // high quality chance -> often saved or narrowly missed
        if (Math.random() < 0.45) {
          // becomes a goal sometimes (but we already distributed goals) -> convert to a dramatic save if not matching existing goal minute
          pushEventAt({
            minute,
            team: team === userTeam ? "user" : "ai",
            type: "bigchance",
            text: `${attacker.name} has a HUGE chance!`,
            icon: "⚠️",
            player: attacker,
          });
          // sometimes followed by a save
          if (Math.random() < 0.6) {
            const gk =
              pick(getPlayersByGroup(forUser ? aiTeam : userTeam, "GK")) ||
              pick((forUser ? aiTeam : userTeam).players);
            pushEventAt({
              minute: Math.min(89, minute + 0),
              team: forUser ? "ai" : "user",
              type: "save",
              text: `Brilliant save by ${gk.name}!`,
              icon: "🛡️",
              player: gk,
            });
            adjustMatchRating(gk, +0.5, "Key save");
            gk.stats = gk.stats || {};
            gk.stats.saves = (gk.stats.saves || 0) + 1;
          }
        } else {
          // narrow miss - don't clutter timeline, only occasionally show
          if (Math.random() < 0.25) {
            pushEventAt({
              minute,
              team: team === userTeam ? "user" : "ai",
              type: "chance",
              text: `${attacker.name} almost scores — just off target!`,
              icon: "🥅",
              player: attacker,
            });
            adjustMatchRating(attacker, -0.2, "Big miss");
          }
        }
      }

      // Saves from remaining shots on target that didn't become goals
      function addSavesFor(teamShotsOnTarget, teamGoals, team, opposingTeam) {
        const savesToAdd = Math.max(0, teamShotsOnTarget - teamGoals);
        let added = 0;
        for (let s = 0; s < savesToAdd; s++) {
          if (Math.random() < 0.6) {
            const minute = randInt(1, 89);
            const gk =
              pick(getPlayersByGroup(opposingTeam, "GK")) ||
              pick(opposingTeam.players);
            pushEventAt({
              minute,
              team: opposingTeam === userTeam ? "user" : "ai",
              type: "save",
              text: `Fantastic stop from ${gk.name}!`,
              icon: "🛡️",
              player: gk,
            });
            gk.stats = gk.stats || {};
            gk.stats.saves = (gk.stats.saves || 0) + 1;
            adjustMatchRating(gk, +0.35, "Save made");
            added++;
          }
        }
        return added;
      }

      addSavesFor(userShotsOnTarget, userGoals, userTeam, aiTeam);
      addSavesFor(aiShotsOnTarget, aiGoals, aiTeam, userTeam);

      // Cards: a few per match
      const totalCards = randInt(0, 4);
      for (let c = 0; c < totalCards; c++) {
        const minute = randInt(1, 89);
        const team = Math.random() < 0.5 ? userTeam : aiTeam;
        const pickPlayer =
          pick(
            team.players.filter(
              (p) =>
                getPositionGroup(p.position || p.preferredPosition) !== "GK"
            )
          ) || pick(team.players);
        // track a booking but do not apply heavy match-wide effects
        pickPlayer.stats = pickPlayer.stats || {};
        pickPlayer.stats.cards = (pickPlayer.stats.cards || 0) + 1;
        // Small, non-game-changing rating tweak for a booking
        adjustMatchRating(pickPlayer, -0.15, "Booking");
        const isRed = false; // no sending-off
        pushEventAt({
          minute,
          team: team === userTeam ? "user" : "ai",
          type: "card",
          text: `${pickPlayer.name} is shown a yellow card.`,
          icon: "🟨",
          player: pickPlayer,
        });
      }

      // Decisive tackles: highlight a few
      const decisiveTackles = randInt(2, 6);
      for (let t = 0; t < decisiveTackles; t++) {
        const minute = randInt(1, 89);
        const team = Math.random() < 0.5 ? userTeam : aiTeam;
        const tackler =
          pick(
            team.players.filter(
              (p) =>
                getPositionGroup(p.position || p.preferredPosition) !== "FWD"
            )
          ) || pick(team.players);
        tackler.stats = tackler.stats || {};
        tackler.stats.tackles = (tackler.stats.tackles || 0) + 1;
        adjustMatchRating(tackler, +0.15, "Decisive tackle");
        if (Math.random() < 0.25) {
          pushEventAt({
            minute,
            team: team === userTeam ? "user" : "ai",
            type: "tackle",
            text: `${tackler.name} makes a decisive tackle to stop the attack.`,
            icon: "🛡️",
            player: tackler,
          });
        }
      }

      // Full time
      pushEventAt({
        minute: 90,
        team: "neutral",
        type: "end",
        text: humanVsHuman
          ? `Full Time! Final Score: Player 1 ${userGoals} - ${aiGoals} Player 2`
          : `Full Time! Final Score: User Team ${userGoals} - ${aiGoals} AI Team`,
        icon: "⏱️",
      });

      // Sort timeline by minute and display (major events only)
      timelineEvents.sort((a, b) => a.minute - b.minute);

      // Renderer for live commentary events (major events only)
      const addTimelineEvent = (event) => {
        if (isSimulationSkipped) return;
        const { minute, team, type, text, icon } = event;
        const eventElement = document.createElement("div");
        eventElement.classList.add("commentary-event", team, type);
        eventElement.innerHTML = `
          <span class="icon">${icon || ""}</span>
          <div class="text">
            <span class="minute">${minute}'</span> - ${text}
          </div>
        `;
        if (liveCommentaryFeed) {
          liveCommentaryFeed.appendChild(eventElement);
          setTimeout(() => {
            try {
              liveCommentaryContainer.scrollTop =
                liveCommentaryContainer.scrollHeight;
            } catch (e) {}
          }, 10);
        }
      };

      // Apply scores to live UI while emitting events in order
      for (const ev of timelineEvents) {
        if (isSimulationSkipped) break;
        // When a goal occurs update live score
        if (ev.type === "goal") {
          if (ev.team === "user") {
            liveUserScore.textContent = (
              parseInt(liveUserScore.textContent || "0") + 1
            ).toString();
          } else if (ev.team === "ai") {
            liveAiScore.textContent = (
              parseInt(liveAiScore.textContent || "0") + 1
            ).toString();
          }
        }
        addTimelineEvent(ev);
        // small pacing between events
        await delay(400 + randInt(0, 400));
      }

      // Finalize aggregate stats for display - use pass accuracy computed earlier if present
      // (computed earlier to avoid duplicate declarations)
      // ensure these variables exist
      // userPassAccuracy and aiPassAccuracy were estimated earlier in the match flow
      // If for any reason they're undefined, provide a safe fallback
      if (typeof userPassAccuracy === "undefined") {
        userPassAccuracy =
          userPasses > 0
            ? Math.round(
                ((userPasses - Math.floor(randFloat(0, userPasses) / 6)) /
                  userPasses) *
                  100
              )
            : 0;
      }
      if (typeof aiPassAccuracy === "undefined") {
        aiPassAccuracy =
          aiPasses > 0
            ? Math.round(
                ((aiPasses - Math.floor(randFloat(0, aiPasses) / 6)) /
                  aiPasses) *
                  100
              )
            : 0;
      }

      // Distribute passes across players with position-aware weighting
      function distributePassesToPlayers(team, totalPasses) {
        const players = team.players.slice();
        if (players.length === 0) return;
        // group weight heuristics
        const groupWeight = { MID: 0.55, DEF: 0.25, FWD: 0.17, GK: 0.03 };
        const groups = {
          MID: getPlayersByGroup(team, "MID"),
          DEF: getPlayersByGroup(team, "DEF"),
          FWD: getPlayersByGroup(team, "FWD"),
          GK: getPlayersByGroup(team, "GK"),
        };
        // calculate group targets
        const groupTargets = {};
        Object.keys(groups).forEach((g) => {
          const cnt = groups[g].length || 1;
          groupTargets[g] = Math.round(totalPasses * groupWeight[g]);
        });
        // distribute within group
        Object.keys(groups).forEach((g) => {
          const list = groups[g];
          if (!list.length) return;
          // per-player min/max by position
          const perMinMax = {
            MID: [50, 120],
            DEF: [30, 80],
            FWD: [15, 40],
            GK: [5, 40],
          };
          const [minP, maxP] = perMinMax[g];
          // start with random allocation
          let allocated = 0;
          const temp = list.map((p) => {
            const v = randInt(minP, maxP);
            allocated += v;
            return { p, v };
          });
          // scale to groupTarget
          const target = groupTargets[g];
          const scale = target / (allocated || target || 1);
          temp.forEach((t) => {
            const passes = Math.max(0, Math.round(t.v * scale));
            t.p.stats = t.p.stats || {};
            t.p.stats.passes = (t.p.stats.passes || 0) + passes;
            // Estimate completed passes per player using team pass accuracy
            const teamAcc =
              team === userTeam ? userPassAccuracy : aiPassAccuracy;
            t.p.stats.passesCompleted =
              (t.p.stats.passesCompleted || 0) +
              Math.round(passes * (teamAcc / 100));
            t.p.stats.passAccuracy = Math.round(
              (t.p.stats.passesCompleted / (t.p.stats.passes || 1)) * 100
            );
          });
        });
      }

      distributePassesToPlayers(userTeam, userPasses);
      distributePassesToPlayers(aiTeam, aiPasses);

      // Distribute dribbles, key passes, interceptions, clearances
      function distributeMiscStats(
        team,
        dribbles,
        keyPasses,
        interceptions,
        clearances
      ) {
        const mids = getPlayersByGroup(team, "MID");
        const fwds = getPlayersByGroup(team, "FWD");
        const defs = getPlayersByGroup(team, "DEF");
        const poolDribble = [...mids, ...fwds];
        for (let i = 0; i < dribbles; i++) {
          const p = pick(poolDribble.length ? poolDribble : team.players);
          p.stats = p.stats || {};
          p.stats.dribbles = (p.stats.dribbles || 0) + 1;
          adjustMatchRating(p, +0.03, "Successful dribble");
        }
        for (let i = 0; i < keyPasses; i++) {
          const p = pick(mids.length ? mids : team.players);
          p.stats = p.stats || {};
          p.stats.keyPasses = (p.stats.keyPasses || 0) + 1;
          adjustMatchRating(p, +0.08, "Key pass");
        }
        for (let i = 0; i < interceptions; i++) {
          const p = pick(defs.length ? defs : team.players);
          p.stats = p.stats || {};
          p.stats.interceptions = (p.stats.interceptions || 0) + 1;
          adjustMatchRating(p, +0.04, "Interception");
        }
        for (let i = 0; i < clearances; i++) {
          const p = pick(defs.length ? defs : team.players);
          p.stats = p.stats || {};
          p.stats.clearances = (p.stats.clearances || 0) + 1;
        }
      }

      distributeMiscStats(
        userTeam,
        userDribbles,
        userKeyPasses,
        userInterceptions,
        userClearances
      );
      distributeMiscStats(
        aiTeam,
        aiDribbles,
        aiKeyPasses,
        aiInterceptions,
        aiClearances
      );

      // Distribute tackles among defenders & midfielders
      function distributeTackles(team, total) {
        const candidates = team.players.filter(
          (p) => getPositionGroup(p.position || p.preferredPosition) !== "FWD"
        );
        for (let i = 0; i < total; i++) {
          const t = pick(candidates.length ? candidates : team.players);
          t.stats = t.stats || {};
          t.stats.tackles = (t.stats.tackles || 0) + 1;
        }
      }

      distributeTackles(userTeam, userTackles);
      distributeTackles(aiTeam, aiTackles);

      // Distribute fouls
      function distributeFouls(team, total) {
        for (let i = 0; i < total; i++) {
          const p = pick(team.players);
          p.stats = p.stats || {};
          p.stats.fouls = (p.stats.fouls || 0) + 1;
          // small rating penalty
          adjustMatchRating(p, -0.2, "Foul committed");
        }
      }

      distributeFouls(userTeam, userFouls);
      distributeFouls(aiTeam, aiFouls);

      // Assign shots to attackers and midfielders
      function distributeShots(team, totalShots, shotsOnTarget, goals) {
        const fwd = getPlayersByGroup(team, "FWD");
        const mid = getPlayersByGroup(team, "MID");
        const pool = [
          ...fwd,
          ...mid,
          ...team.players.filter(
            (p) => getPositionGroup(p.position || p.preferredPosition) === "DEF"
          ),
        ];
        // allocate shots
        let remaining = totalShots;
        for (const p of pool) {
          const maxShots =
            getPositionGroup(p.position || p.preferredPosition) === "FWD"
              ? 8
              : getPositionGroup(p.position || p.preferredPosition) === "MID"
              ? 5
              : 2;
          const s = Math.min(remaining, randInt(0, maxShots));
          p.stats = p.stats || {};
          p.stats.shots = (p.stats.shots || 0) + s;
          remaining -= s;
          if (remaining <= 0) break;
        }
        // if still shots remaining, give to random attackers
        while (remaining > 0) {
          const p = pick(pool);
          p.stats = p.stats || {};
          p.stats.shots = (p.stats.shots || 0) + 1;
          remaining--;
        }
        // Shots on target and goals already accounted separately (goals incremented earlier)
      }

      distributeShots(userTeam, userShots, userShotsOnTarget, userGoals);
      distributeShots(aiTeam, aiShots, aiShotsOnTarget, aiGoals);

      // Final stats object
      const matchData = {
        userScore: userGoals,
        aiScore: aiGoals,
        matchWinnerText:
          userGoals > aiGoals
            ? humanVsHuman
              ? "Player 1 wins!"
              : "User Team wins!"
            : aiGoals > userGoals
            ? humanVsHuman
              ? "Player 2 wins!"
              : "AI Team wins!"
            : "It's a draw!",
        userTeam,
        aiTeam,
        timelineEvents,
        stats: {
          user: {
            shots: userShots,
            shotsOnTarget: userShotsOnTarget,
            possession: userPossession,
            passAccuracy: userPassAccuracy,
            tackles: userTackles,
            fouls: userFouls,
            corners: userCorners,
            offsides: userOffsides,
            saves: userSaves,
            passes: userPasses,
            passesCompleted: Math.round((userPassAccuracy / 100) * userPasses),
            dribbles: userDribbles,
            keyPasses: userKeyPasses,
            interceptions: userInterceptions,
            clearances: userClearances,
          },
          ai: {
            shots: aiShots,
            shotsOnTarget: aiShotsOnTarget,
            possession: aiPossession,
            passAccuracy: aiPassAccuracy,
            tackles: aiTackles,
            fouls: aiFouls,
            corners: aiCorners,
            offsides: aiOffsides,
            saves: aiSaves,
            passes: aiPasses,
            passesCompleted: Math.round((aiPassAccuracy / 100) * aiPasses),
            dribbles: aiDribbles,
            keyPasses: aiKeyPasses,
            interceptions: aiInterceptions,
            clearances: aiClearances,
          },
        },
      };

      // Update tournament results
      if (matchData.userScore > matchData.aiScore) tournament.userWins++;
      else if (matchData.aiScore > matchData.userScore) tournament.aiWins++;
      else tournament.draws++;
      tournament.results.push(matchData);
      saveTournament();

      // When PvP, label teams as Player 1 and Player 2 in header
      if (humanVsHuman || (p1State && p2State)) {
        // adjust names in matchData for rendering
        matchData.userTeam.players.forEach(
          (p) => (p.team = p.team || "Player 1")
        );
        matchData.aiTeam.players.forEach(
          (p) => (p.team = p.team || "Player 2")
        );
        matchData.matchWinnerText =
          userGoals > aiGoals
            ? "Player 1 wins!"
            : aiGoals > userGoals
            ? "Player 2 wins!"
            : "It's a draw!";
      }

      renderPostMatch(matchData);

      if (liveSimulationSection) liveSimulationSection.classList.add("hidden");
      const postMatchSection = document.getElementById("post-match-section");
      if (postMatchSection) postMatchSection.classList.remove("hidden");
      updateTournamentUI();

      // Tournament completion handling
      if (
        tournament.userWins >= Math.ceil(tournament.maxRounds / 2) ||
        tournament.aiWins >= Math.ceil(tournament.maxRounds / 2)
      ) {
        const isPvP = tournament.opponentSelectionMode === "pvp";
        let tournamentWinner = "";
        if (tournament.userWins > tournament.aiWins)
          tournamentWinner = isPvP ? "Player 1" : "User Team";
        else if (tournament.aiWins > tournament.userWins)
          tournamentWinner = isPvP ? "Player 2" : "AI Team";
        else tournamentWinner = "It's a draw!";
        if (tournamentWinnerSpan)
          tournamentWinnerSpan.textContent = tournamentWinner;
        if (finalTournamentScoreSpan) {
          const label1 = isPvP ? "Player 1" : "User";
          const label2 = isPvP ? "Player 2" : "AI";
          finalTournamentScoreSpan.textContent = `${label1} ${tournament.userWins} - ${tournament.aiWins} ${label2} (${tournament.draws} draws)`;
        }
        if (postMatchSection) postMatchSection.classList.add("hidden");
        if (tournamentCompleteSection)
          tournamentCompleteSection.classList.remove("hidden");
      }
    }

    function renderPostMatch(matchData) {
      renderMatchHeader(matchData);
      renderTimeline(matchData.timelineEvents);
      renderGoalScorers(matchData.timelineEvents);
      renderTeamStats(matchData.stats);
      renderPlayerRatings(matchData);
    }

    function renderMatchHeader(matchData) {
      const userTeamInfo = document.querySelector(".match-header .user-team");
      const aiTeamInfo = document.querySelector(".match-header .ai-team");
      const scoreContainer = document.querySelector(".score-container");

      if (userTeamInfo) {
        const userName =
          (matchData.userTeam &&
            matchData.userTeam.players &&
            matchData.userTeam.players[0] &&
            matchData.userTeam.players[0].team) ||
          "Your Team";
        userTeamInfo.querySelector(".team-name").textContent = userName;
        const userChem = calculateTeamChemistry(
          matchData.userTeam.players,
          matchData.userTeam.playstyle
        );
        userTeamInfo.querySelector(
          ".chemistry-value"
        ).textContent = `${userChem}%`;
        userTeamInfo.querySelector(
          ".chemistry-fill"
        ).style.width = `${userChem}%`;
      }
      if (aiTeamInfo) {
        const aiName =
          (matchData.aiTeam &&
            matchData.aiTeam.players &&
            matchData.aiTeam.players[0] &&
            matchData.aiTeam.players[0].team) ||
          "Opponent";
        aiTeamInfo.querySelector(".team-name").textContent = aiName;
        const aiChem = calculateTeamChemistry(
          matchData.aiTeam.players,
          matchData.aiTeam.playstyle
        );
        aiTeamInfo.querySelector(".chemistry-value").textContent = `${aiChem}%`;
        aiTeamInfo.querySelector(".chemistry-fill").style.width = `${aiChem}%`;
      }
      if (scoreContainer) {
        scoreContainer.querySelector(
          ".final-score"
        ).textContent = `${matchData.userScore} - ${matchData.aiScore}`;
        scoreContainer.querySelector(".match-winner").textContent =
          matchData.matchWinnerText;
      }
    }

    function renderTimeline(events) {
      const timelineContainer = document.querySelector(".timeline");
      if (!timelineContainer) return;
      timelineContainer.innerHTML = "";
      events.forEach((event) => {
        const eventElement = document.createElement("div");
        // include team and type (goal/assist/start/end) for styling
        const typeClass = event.type ? ` ${event.type}` : "";
        eventElement.className = `timeline-event ${event.team}${typeClass}`;
        eventElement.innerHTML = `
                <div class="event-icon">${event.icon || ""}</div>
                <div class="event-details"><strong>${
                  event.minute
                }'</strong> - ${event.text}</div>
            `;
        timelineContainer.appendChild(eventElement);
      });
    }

    function renderGoalScorers(events) {
      const goalScorersContainer = document.getElementById("goal-scorers-list");
      if (!goalScorersContainer) return;
      goalScorersContainer.innerHTML = "";
      const goalEvents = events.filter((e) => e.type === "goal");
      goalEvents.forEach((event) => {
        const scorerCard = document.createElement("div");
        scorerCard.className = "goal-scorer-card";
        scorerCard.innerHTML = `
                <img src="${event.player.imageUrl}" alt="${event.player.name}">
                <div class="scorer-info">
                    <div class="scorer-name">${event.player.name} (${
          event.minute
        }')</div>
                    ${
                      event.assist
                        ? `<div class="assist-info">Assist by ${event.assist.name}</div>`
                        : ""
                    }
                </div>
            `;
        goalScorersContainer.appendChild(scorerCard);
      });
    }

    function renderTeamStats(stats) {
      const statsContainer = document.getElementById("team-stats-content");
      if (!statsContainer) return;
      statsContainer.innerHTML = `
            <div class="stat-bar-container">
                <div class="stat-values">
                    <span class="user-stat">${stats.user.shots} (${
        stats.user.shotsOnTarget
      })</span>
                    <span>Shots (On Target)</span>
                    <span class="ai-stat">${stats.ai.shots} (${
        stats.ai.shotsOnTarget
      })</span>
                </div>
                <div class="stat-bar">
                    <div class="stat-bar-user" style="width: ${
                      (stats.user.shots /
                        (stats.user.shots + stats.ai.shots || 1)) *
                      100
                    }%"></div>
                    <div class="stat-bar-ai" style="width: ${
                      (stats.ai.shots /
                        (stats.user.shots + stats.ai.shots || 1)) *
                      100
                    }%"></div>
                </div>
            </div>
            <div class="stat-bar-container">
                <div class="stat-values">
                    <span class="user-stat">${stats.user.possession}%</span>
                    <span>Possession</span>
                    <span class="ai-stat">${stats.ai.possession}%</span>
                </div>
                <div class="stat-bar">
                    <div class="stat-bar-user" style="width: ${
                      stats.user.possession
                    }%"></div>
                    <div class="stat-bar-ai" style="width: ${
                      stats.ai.possession
                    }%"></div>
                </div>
            </div>
            <div class="stat-bar-container">
                <div class="stat-values">
                    <span class="user-stat">${stats.user.passAccuracy}%</span>
                    <span>Pass Accuracy</span>
                    <span class="ai-stat">${stats.ai.passAccuracy}%</span>
                </div>
                <div class="stat-bar">
                    <div class="stat-bar-user" style="width: ${
                      stats.user.passAccuracy
                    }%"></div>
                    <div class="stat-bar-ai" style="width: ${
                      stats.ai.passAccuracy
                    }%"></div>
                </div>
            </div>
      <div class="stat-bar-container">
        <div class="stat-values">
          <span class="user-stat">${stats.user.passes} (${
        stats.user.passesCompleted
      })</span>
          <span>Passes (Completed)</span>
          <span class="ai-stat">${stats.ai.passes} (${
        stats.ai.passesCompleted
      })</span>
        </div>
      </div>
      <div class="stat-bar-container">
        <div class="stat-values">
          <span class="user-stat">${stats.user.dribbles}</span>
          <span>Dribbles</span>
          <span class="ai-stat">${stats.ai.dribbles}</span>
        </div>
      </div>
      <div class="stat-bar-container">
        <div class="stat-values">
          <span class="user-stat">${stats.user.keyPasses}</span>
          <span>Key Passes</span>
          <span class="ai-stat">${stats.ai.keyPasses}</span>
        </div>
      </div>
      <div class="stat-bar-container">
        <div class="stat-values">
          <span class="user-stat">${stats.user.interceptions}</span>
          <span>Interceptions</span>
          <span class="ai-stat">${stats.ai.interceptions}</span>
        </div>
      </div>
      <div class="stat-bar-container">
        <div class="stat-values">
          <span class="user-stat">${stats.user.clearances}</span>
          <span>Clearances</span>
          <span class="ai-stat">${stats.ai.clearances}</span>
        </div>
      </div>
            <div class="stat-bar-container">
                <div class="stat-values">
                    <span class="user-stat">${stats.user.tackles}</span>
                    <span>Tackles</span>
                    <span class="ai-stat">${stats.ai.tackles}</span>
                </div>
            </div>
            <div class="stat-bar-container">
                <div class="stat-values">
                    <span class="user-stat">${stats.user.fouls}</span>
                    <span>Fouls</span>
                    <span class="ai-stat">${stats.ai.fouls}</span>
                </div>
            </div>
            <div class="stat-bar-container">
                <div class="stat-values">
                    <span class="user-stat">${stats.user.corners}</span>
                    <span>Corners</span>
                    <span class="ai-stat">${stats.ai.corners}</span>
                </div>
            </div>
            <div class="stat-bar-container">
                <div class="stat-values">
                    <span class="user-stat">${stats.user.offsides}</span>
                    <span>Offsides</span>
                    <span class="ai-stat">${stats.ai.offsides}</span>
                </div>
            </div>
        `;
    }

    function renderPlayerRatings(matchDataOrUserPlayers, aiPlayersOptional) {
      const ratingsRoot = document.querySelector(".player-ratings-grid");
      if (!ratingsRoot) return;

      // Support both signatures: (userPlayers, aiPlayers) OR (matchData)
      let userPlayers = [];
      let aiPlayers = [];
      let userTitle = "Your Team";
      let aiTitle = "Opponent Team";
      if (
        matchDataOrUserPlayers &&
        matchDataOrUserPlayers.userTeam &&
        matchDataOrUserPlayers.aiTeam
      ) {
        const md = matchDataOrUserPlayers;
        userPlayers = md.userTeam.players || [];
        aiPlayers = md.aiTeam.players || [];
        userTitle = (userPlayers[0] && userPlayers[0].team) || userTitle;
        aiTitle = (aiPlayers[0] && aiPlayers[0].team) || aiTitle;
      } else {
        userPlayers = Array.isArray(matchDataOrUserPlayers)
          ? matchDataOrUserPlayers
          : [];
        aiPlayers = Array.isArray(aiPlayersOptional) ? aiPlayersOptional : [];
      }

      // Helper: compute team rating as average of available matchRating or fallback to overallRating
      function computeTeamRating(players) {
        if (!players || players.length === 0) return 0;
        let sum = 0;
        let count = 0;
        players.forEach((p) => {
          const r =
            typeof p.matchRating === "number"
              ? p.matchRating
              : p.overallRating || 0;
          sum += r;
          count++;
        });
        return count ? sum / count : 0;
      }

      // Clear container
      ratingsRoot.innerHTML = "";

      // Build a team section block to keep each team's ratings visually separated
      function buildTeamSection(teamName, players, extraClass) {
        const teamBlock = document.createElement("div");
        teamBlock.className = `team-ratings ${extraClass || ""}`.trim();

        const teamHeader = document.createElement("div");
        teamHeader.className =
          "team-rating-header d-flex align-items-center justify-content-between";

        const title = document.createElement("div");
        title.className = "team-title h5 mb-0";
        title.textContent = teamName;

        const ratingValue = document.createElement("div");
        ratingValue.className = "team-rating-value text-end";
        const avg = computeTeamRating(players);
        ratingValue.innerHTML = `<div class="fw-bold">Team Rating</div><div class="display-6 team-rating-num">${avg.toFixed(
          1
        )}</div>`;

        teamHeader.appendChild(title);
        teamHeader.appendChild(ratingValue);

        teamBlock.appendChild(teamHeader);

        // Player grid inside team block
        const grid = document.createElement("div");
        grid.className = "player-ratings-grid team-player-grid mt-3";

        players.forEach((player) => {
          // compute a more varied match rating if not provided
          if (typeof player.matchRating !== "number") {
            const base = player.overallRating || 6.5;
            const s = player.stats || {};
            // Weighted stat contributions
            const statBonus =
              (s.goals || 0) * 0.9 +
              (s.assists || 0) * 0.6 +
              (s.saves || 0) * 0.5 +
              (s.tackles || 0) * 0.25 +
              ((s.passes || 0) / 50) * 0.1;
            // small randomness for visual variety (kept deterministic-ish using name hash fallback)
            let noise = (Math.random() - 0.5) * 0.6; // ±0.3
            // Clamp
            const computed = Math.max(
              1,
              Math.min(10, base + statBonus + noise)
            );
            player.matchRating = Number(computed.toFixed(1));
          }
          const ratingCard = document.createElement("div");
          ratingCard.className = "player-rating-card";
          // choose a color class for rating
          let ratingClass = "rating-mid";
          if ((player.matchRating || 0) >= 8.0) ratingClass = "rating-high";
          else if ((player.matchRating || 0) <= 6.2) ratingClass = "rating-low";

          ratingCard.innerHTML = `
                  <img src="${player.imageUrl || "images/default.jpg"}" alt="${
            player.name
          }" class="player-img">
                  <div class="player-name">${player.name}</div>
                  <div class="player-position">${
                    player.position || player.preferredPosition || ""
                  }</div>
                  <div class="match-rating ${ratingClass}">${(
            player.matchRating || 0
          ).toFixed(1)}</div>
                  <div class="player-card-buttons">
                    <button class="btn btn-sm btn-info rating-details-btn" data-player="${
                      player.name
                    }">Details</button>
                  </div>
              `;
          // Provide team reference for detail modal
          ratingCard.dataset.team = teamName;
          grid.appendChild(ratingCard);
        });

        teamBlock.appendChild(grid);
        return { teamBlock, avg };
      }

      // Prepare player lists
      const userList = Array.isArray(userPlayers) ? userPlayers : [];
      const aiList = Array.isArray(aiPlayers) ? aiPlayers : [];

      // Build sections
      const userSection = buildTeamSection(userTitle, userList, "team-user");
      const aiSection = buildTeamSection(aiTitle, aiList, "team-opponent");

      // Insert user section then opponent section
      ratingsRoot.appendChild(userSection.teamBlock);

      // Insert MOTM if present (computed below) between sections

      ratingsRoot.appendChild(aiSection.teamBlock);

      // Compute Man of the Match across both teams
      const allPlayers = [...userList, ...aiList];
      allPlayers.forEach((p) => {
        if (!p.stats)
          p.stats = {
            goals: 0,
            assists: 0,
            tackles: 0,
            saves: 0,
            shots: 0,
            passes: 0,
          };
      });
      const motm = allPlayers
        .slice()
        .sort((a, b) => (b.matchRating || 0) - (a.matchRating || 0))[0];
      if (motm) {
        const motmCard = document.createElement("div");
        motmCard.className = "motm-card mt-4";
        motmCard.innerHTML = `
            <img class="motm-img" src="${motm.imageUrl}" alt="${motm.name}" />
            <div class="motm-details">
              <div class="motm-name">${
                motm.name
              } <span class="small text-muted">• ${
          motm.position || motm.preferredPosition || ""
        } • ${motm.team || ""}</span></div>
              <div class="mt-1"><strong>Rating:</strong> <span class="match-rating">${(
                motm.matchRating || 0
              ).toFixed(1)}</span></div>
              <div class="motm-stats">
                <div class="motm-stat">Goals: ${motm.stats.goals || 0}</div>
                <div class="motm-stat">Assists: ${motm.stats.assists || 0}</div>
                <div class="motm-stat">Tackles: ${motm.stats.tackles || 0}</div>
                <div class="motm-stat">Saves: ${motm.stats.saves || 0}</div>
                <div class="motm-stat">Shots: ${motm.stats.shots || 0}</div>
              </div>
            </div>
            <div style="min-width:120px;text-align:center;">
              <button class="btn btn-warning btn-lg" id="motm-details-btn" data-player="${
                motm.name
              }">View Details</button>
            </div>
          `;
        // Insert motm card at top of ratingsRoot
        ratingsRoot.insertBefore(motmCard, ratingsRoot.firstChild);
      }

      // Wire up details buttons (delegation)
      ratingsRoot.querySelectorAll(".rating-details-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const playerName = btn.getAttribute("data-player");
          const found = allPlayers.find((p) => p.name === playerName);
          if (found) showPlayerDetailModal(found);
        });
      });
      const motmBtn = ratingsRoot.querySelector("#motm-details-btn");
      if (motmBtn)
        motmBtn.addEventListener("click", () => {
          const name = motmBtn.getAttribute("data-player");
          const found = allPlayers.find((p) => p.name === name);
          if (found) showPlayerDetailModal(found);
        });
    }

    // Populate and show the player detail modal
    function showPlayerDetailModal(player) {
      const modalEl = document.getElementById("player-detail-modal");
      if (!modalEl) return;
      const img = document.getElementById("detail-player-img");
      const name = document.getElementById("detail-player-name");
      const sub = document.getElementById("detail-player-sub");
      const rating = document.getElementById("detail-player-rating");
      const grid = document.getElementById("detail-stats-grid");

      img.src = player.imageUrl || "images/default.jpg";
      name.textContent = player.name || "";
      sub.textContent = `${player.position || player.preferredPosition || ""} ${
        player.team ? "• " + player.team : ""
      }`;
      rating.textContent = (player.matchRating || 0).toFixed(1);

      // Ensure stats object
      const s = player.stats || {
        goals: 0,
        assists: 0,
        tackles: 0,
        saves: 0,
        shots: 0,
        passes: 0,
        passesCompleted: 0,
        passAccuracy: null,
        dribbles: 0,
        interceptions: 0,
        clearances: 0,
        keyPasses: 0,
      };
      grid.innerHTML = "";
      const statsList = [
        ["Goals", s.goals || 0],
        ["Assists", s.assists || 0],
        ["Shots", s.shots || 0],
        ["Tackles", s.tackles || 0],
        ["Saves", s.saves || 0],
        ["Passes", s.passes || 0],
        ["Passes Completed", s.passesCompleted || 0],
        [
          "Pass Accuracy",
          s.passAccuracy !== null && s.passAccuracy !== undefined
            ? s.passAccuracy + "%"
            : "N/A",
        ],
        ["Key Passes", s.keyPasses || 0],
        ["Dribbles", s.dribbles || 0],
        ["Interceptions", s.interceptions || 0],
        ["Clearances", s.clearances || 0],
      ];
      statsList.forEach(([label, val]) => {
        const col = document.createElement("div");
        col.className = "col-6 col-md-4 mb-2";
        col.innerHTML = `<div class="fw-bold">${label}</div><div>${val}</div>`;
        grid.appendChild(col);
      });

      const bsModal = new bootstrap.Modal(modalEl);
      bsModal.show();
    }

    // Calculates team strength based on adjusted player ratings
    function calculateTeamStrength(teamPlayers) {
      let totalAdjustedRating = 0;
      teamPlayers.forEach((player) => {
        const assignedPosition = player.position; // The position the player is currently assigned in the lineup
        const adjustedRating = calculatePlayerRating(player, assignedPosition);
        totalAdjustedRating += adjustedRating;
      });
      // If an optional playstyle is passed via last argument, apply its strength modifier
      const lastArg = arguments[1];
      let avg = Math.round(totalAdjustedRating / teamPlayers.length);
      if (typeof lastArg === "string" && playstyles[lastArg]) {
        avg = Math.round(avg + playstyles[lastArg].strengthModifier);
      }
      return avg; // Average adjusted rating (possibly modified by playstyle)
    }

    // Helper to get general position type from specific position
    function getGeneralPositionType(specificPosition) {
      if (["ST", "LW", "RW", "CF"].includes(specificPosition)) return "Forward";
      if (
        ["CM", "CAM", "CDM", "LM", "RM", "LWB", "RWB"].includes(
          specificPosition
        )
      )
        return "Midfielder";
      if (["CB", "LB", "RB", "LWB", "RWB"].includes(specificPosition))
        return "Defender";
      if (specificPosition === "GK") return "Goalkeeper";
      return "Unknown";
    }

    // Generates a random AI team, excluding players from the user's team
    function generateAITeam(excludedPlayers = []) {
      const excludedPlayerNames = excludedPlayers.map((p) => p.name);

      const availableForwards = predefinedPlayers.forwards.filter(
        (p) => !excludedPlayerNames.includes(p.name)
      );
      const availableMidfielders = predefinedPlayers.midfielders.filter(
        (p) => !excludedPlayerNames.includes(p.name)
      );
      const availableDefenders = predefinedPlayers.defenders.filter(
        (p) => !excludedPlayerNames.includes(p.name)
      );
      const availableGoalkeepers = predefinedPlayers.goalkeepers.filter(
        (p) => !excludedPlayerNames.includes(p.name)
      );

      const aiPlayers = [];

      // Shuffle and pick players for AI team (simplified 4-4-2 for AI)
      function getRandomPlayers(arr, count) {
        const shuffled = arr.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
      }

      aiPlayers.push(...getRandomPlayers(availableGoalkeepers, 1));
      aiPlayers.push(...getRandomPlayers(availableDefenders, 4));
      aiPlayers.push(...getRandomPlayers(availableMidfielders, 4));
      aiPlayers.push(...getRandomPlayers(availableForwards, 2));

      return { players: aiPlayers, formation: "4-4-2" };
    }

    // Calculates a team chemistry score based on three components:
    // 1) Per-player position fit (how well each player's assigned position matches their preferred/secondary)
    // 2) Formation fit (how well the team's assigned position counts match a reasonable formation)
    // 3) Preferred-position overlap (how well players' preferred positions align with the assigned roles)
    // Returns an integer 0-100.
    function calculateTeamChemistry(teamPlayers, playstyle) {
      if (!Array.isArray(teamPlayers) || teamPlayers.length === 0) return 0;

      // --- Helper: per-player fit score (0-100) ---
      function playerFitScore(player) {
        try {
          const assigned = normalizePosition(
            player.position || player.assignedPosition || ""
          );
          const preferred = normalizePosition(player.preferredPosition || "");
          const secondary = (player.secondaryPositions || []).map(
            normalizePosition
          );

          if (!assigned || !preferred) return 50; // neutral if missing data

          if (assigned === preferred) return 100;
          if (secondary.includes(assigned)) return 85;

          const assignedGroup = getPositionGroup(assigned);
          const preferredGroup = getPositionGroup(preferred);

          if (assignedGroup === preferredGroup) return 70; // same general group

          // adjacent group (e.g., MID <-> DEF, MID <-> FWD)
          if (
            positionGroupAdjacency[preferredGroup] &&
            positionGroupAdjacency[preferredGroup].includes(assignedGroup)
          ) {
            return 45;
          }

          // far group (big mismatch)
          return 20;
        } catch (e) {
          return 50;
        }
      }

      // --- Component A: average player fit ---
      const fitScores = teamPlayers.map((p) => playerFitScore(p));
      const avgPlayerFit =
        fitScores.reduce((s, v) => s + v, 0) / fitScores.length; // 0-100

      // --- Component B: formation fit ---
      // Count assigned players by group
      const assignedCounts = { GK: 0, DEF: 0, MID: 0, FWD: 0 };
      teamPlayers.forEach((p) => {
        const grp = getPositionGroup(
          normalizePosition(
            p.position || p.assignedPosition || p.preferredPosition || ""
          )
        );
        if (assignedCounts[grp] !== undefined) assignedCounts[grp]++;
      });

      // Define a few common formation targets (GK, DEF, MID, FWD)
      const formationTargets = [
        { name: "4-4-2", target: { GK: 1, DEF: 4, MID: 4, FWD: 2 } },
        { name: "4-3-3", target: { GK: 1, DEF: 4, MID: 3, FWD: 3 } },
        { name: "3-5-2", target: { GK: 1, DEF: 3, MID: 5, FWD: 2 } },
        { name: "3-4-3", target: { GK: 1, DEF: 3, MID: 4, FWD: 3 } },
        { name: "4-2-3-1", target: { GK: 1, DEF: 4, MID: 5, FWD: 1 } },
      ];

      // Choose the formation target that minimizes total absolute difference
      let bestFormation = formationTargets[0];
      let bestError = Infinity;
      formationTargets.forEach((f) => {
        const err =
          Math.abs((assignedCounts.DEF || 0) - f.target.DEF) +
          Math.abs((assignedCounts.MID || 0) - f.target.MID) +
          Math.abs((assignedCounts.FWD || 0) - f.target.FWD) +
          Math.abs((assignedCounts.GK || 0) - f.target.GK);
        if (err < bestError) {
          bestError = err;
          bestFormation = f;
        }
      });

      // Convert bestError into a 0-100 score: perfect match => 100, each unit of error costs ~8 points
      // Tuned so reasonable small deviations produce realistic drops
      const formationFit = Math.max(
        0,
        Math.min(100, Math.round(100 - bestError * 8))
      );

      // --- Component C: preferred-position overlap ---
      const preferredCounts = { GK: 0, DEF: 0, MID: 0, FWD: 0 };
      teamPlayers.forEach((p) => {
        const grp = getPositionGroup(
          normalizePosition(p.preferredPosition || "")
        );
        if (preferredCounts[grp] !== undefined) preferredCounts[grp]++;
      });

      const totalPlayers = teamPlayers.length;
      const overlap =
        (Math.min(preferredCounts.GK, assignedCounts.GK) +
          Math.min(preferredCounts.DEF, assignedCounts.DEF) +
          Math.min(preferredCounts.MID, assignedCounts.MID) +
          Math.min(preferredCounts.FWD, assignedCounts.FWD)) /
        Math.max(1, totalPlayers);

      const preferredOverlapScore = Math.round(overlap * 100); // 0-100

      // --- Combine components with weights ---
      // Player fit should influence the majority, formation fit and preference overlap smaller
      let finalScore = Math.round(
        avgPlayerFit * 0.55 + formationFit * 0.25 + preferredOverlapScore * 0.2
      );
      // Apply playstyle chemistry modifier if provided
      if (typeof playstyle === "string" && playstyles[playstyle]) {
        finalScore = finalScore + playstyles[playstyle].chemistryModifier;
      }
      return Math.max(0, Math.min(100, finalScore));
    }

    // Clears the user's selected team and lineup
    function clearTeam() {
      selectedPlayers = [];
      lineup = lineup.map((slot) => ({ ...slot, player: null })); // Clear players from existing slots
      updateSelectedPlayerCount();
      renderPlayers(allPlayersData, availablePlayersDiv, true); // Re-render available players to update 'selected' state
      renderLineup(); // Clear visual lineup on the field
    }

    // Function to randomize the team
    function randomizeTeam() {
      console.log("randomizeTeam: Starting randomization.");
      if (!currentFormation) {
        alert("Please select a formation first.");
        console.log("randomizeTeam: No formation selected. Aborting.");
        return;
      }

      clearTeam(); // Clear any existing players
      console.log("randomizeTeam: Team cleared.");

      const availablePlayersCopy = [...allPlayersData]; // Work with a copy
      const shuffledPlayers = availablePlayersCopy.sort(
        () => 0.5 - Math.random()
      );
      console.log("randomizeTeam: Shuffled players:", shuffledPlayers);

      const formationConfig = formationRequirements[currentFormation];
      const newSelectedPlayers = [];
      const newLineup = lineup.map((slot) => ({ ...slot, player: null })); // Create a fresh lineup based on current formation slots
      console.log("randomizeTeam: Initial new lineup:", newLineup);

      // Helper to find and assign a player
      const assignPlayer = (slot, playerPool, positionCheckFn) => {
        const playerIndex = playerPool.findIndex((player) =>
          positionCheckFn(player, slot.positionType)
        );
        if (playerIndex !== -1) {
          const player = playerPool.splice(playerIndex, 1)[0];
          slot.player = player;
          newSelectedPlayers.push(player);
          console.log(
            `randomizeTeam: Assigned ${player.name} to ${slot.slotId}`
          );
          return true;
        }
        return false;
      };

      // 1. Assign Goalkeeper
      const gkSlot = newLineup.find(
        (slot) => getPositionGroup(slot.positionType) === "GK"
      );
      if (gkSlot) {
        assignPlayer(
          gkSlot,
          shuffledPlayers,
          (player, posType) =>
            getPositionGroup(player.preferredPosition) === "GK"
        );
      }

      // 2. Assign Defenders
      const defSlots = newLineup.filter(
        (slot) => getPositionGroup(slot.positionType) === "DEF" && !slot.player
      );
      defSlots.forEach((slot) => {
        assignPlayer(
          slot,
          shuffledPlayers,
          (player, posType) =>
            getPositionGroup(player.preferredPosition) === "DEF" &&
            (player.preferredPosition === posType ||
              player.secondaryPositions.includes(posType))
        );
      });
      // Fill remaining defender slots with any available defender
      defSlots
        .filter((slot) => !slot.player)
        .forEach((slot) => {
          assignPlayer(
            slot,
            shuffledPlayers,
            (player, posType) =>
              getPositionGroup(player.preferredPosition) === "DEF"
          );
        });

      // 3. Assign Midfielders
      const midSlots = newLineup.filter(
        (slot) => getPositionGroup(slot.positionType) === "MID" && !slot.player
      );
      midSlots.forEach((slot) => {
        assignPlayer(
          slot,
          shuffledPlayers,
          (player, posType) =>
            getPositionGroup(player.preferredPosition) === "MID" &&
            (player.preferredPosition === posType ||
              player.secondaryPositions.includes(posType))
        );
      });
      // Fill remaining midfielder slots with any available midfielder
      midSlots
        .filter((slot) => !slot.player)
        .forEach((slot) => {
          assignPlayer(
            slot,
            shuffledPlayers,
            (player, posType) =>
              getPositionGroup(player.preferredPosition) === "MID"
          );
        });

      // 4. Assign Forwards
      const fwdSlots = newLineup.filter(
        (slot) => getPositionGroup(slot.positionType) === "FWD" && !slot.player
      );
      fwdSlots.forEach((slot) => {
        assignPlayer(
          slot,
          shuffledPlayers,
          (player, posType) =>
            getPositionGroup(player.preferredPosition) === "FWD" &&
            (player.preferredPosition === posType ||
              player.secondaryPositions.includes(posType))
        );
      });
      // Fill remaining forward slots with any available forward
      fwdSlots
        .filter((slot) => !slot.player)
        .forEach((slot) => {
          assignPlayer(
            slot,
            shuffledPlayers,
            (player, posType) =>
              getPositionGroup(player.preferredPosition) === "FWD"
          );
        });

      // 5. Fill any remaining empty slots with any available player (less ideal, but ensures 11 players)
      newLineup
        .filter((slot) => !slot.player)
        .forEach((slot) => {
          assignPlayer(slot, shuffledPlayers, (player, posType) => true); // Any player will do
        });

      lineup = newLineup;
      selectedPlayers = newSelectedPlayers;
      console.log(
        "randomizeTeam: Final lineup:",
        lineup,
        "Final selectedPlayers:",
        selectedPlayers
      );

      updateSelectedPlayerCount();
      renderLineup();
    }

    // Resets the game to initial state
    function resetGame() {
      localStorage.removeItem("tournament");
      localStorage.removeItem("customFormations");
      selectedPlayers = [];
      lineup = new Array(MAX_PLAYERS).fill(null);
      selectedOpponentPlayers = [];
      currentFormation = null;
      tournament = {};
      customFormations = [];
      loadTournament();

      updateSelectedPlayerCount();
      renderPlayers([], selectedPlayersDiv, true); // Clear user selected players display
      renderPlayers([], opponentSelectedPlayersDiv, true, true); // Clear opponent selected players display
      if (availablePlayersDiv) availablePlayersDiv.innerHTML = ""; // Clear available players
      if (opponentAvailablePlayersDiv)
        opponentAvailablePlayersDiv.innerHTML = ""; // Clear opponent available players
      document
        .querySelectorAll(".formation-btn, .custom-formation-btn")
        .forEach((btn) => btn.classList.remove("active"));
      if (simulateMatchBtn) simulateMatchBtn.disabled = true;
      if (confirmOpponentTeamBtn) confirmOpponentTeamBtn.disabled = true;

      if (document.getElementById("post-match-section"))
        document.getElementById("post-match-section").classList.add("hidden");
      if (formationSelectionSection)
        formationSelectionSection.classList.add("hidden");
      if (playerSelectionSection)
        playerSelectionSection.classList.add("hidden");
      if (opponentSelectionSection)
        opponentSelectionSection.classList.add("hidden");
      if (playerSourceSelection) playerSourceSelection.classList.add("hidden"); // Hide player source selection initially
      if (tournamentCompleteSection)
        tournamentCompleteSection.classList.add("hidden");
      if (liveSimulationSection) liveSimulationSection.classList.add("hidden");
      if (tournamentSection) tournamentSection.classList.remove("hidden"); // Show tournament section

      if (lineupDisplay) {
        lineupDisplay.innerHTML = ""; // Clear lineup display
        lineupDisplay.classList.add("hidden"); // Hide lineup display
      }

      renderCustomFormationButtons();
    }

    // Advances to the next game of the tournament
    function updatePvpCheckmarks() {
      const p1Check = document.getElementById("player1-checkmark");
      const p2Check = document.getElementById("player2-checkmark");
      if (p1Check) p1Check.style.display = player1Confirmed ? "inline" : "none";
      if (p2Check) p2Check.style.display = player2Confirmed ? "inline" : "none";
    }

    function nextGameOfTournament() {
      const postMatchSection = document.getElementById("post-match-section");
      if (postMatchSection) postMatchSection.classList.add("hidden");

      // Check if max rounds reached
      if (tournament.round >= tournament.maxRounds) {
        // Show tournament complete screen
        const isPvP = tournament.opponentSelectionMode === "pvp";
        let tournamentWinner = "";
        if (tournament.userWins > tournament.aiWins)
          tournamentWinner = isPvP ? "Player 1" : "User Team";
        else if (tournament.aiWins > tournament.userWins)
          tournamentWinner = isPvP ? "Player 2" : "AI Team";
        else tournamentWinner = "It's a draw!";

        if (tournamentWinnerSpan)
          tournamentWinnerSpan.textContent = tournamentWinner;
        if (finalTournamentScoreSpan) {
          const label1 = isPvP ? "Player 1" : "User";
          const label2 = isPvP ? "Player 2" : "AI";
          finalTournamentScoreSpan.textContent = `${label1} ${tournament.userWins} - ${tournament.aiWins} ${label2} (${tournament.draws} draws)`;
        }
        if (postMatchSection) postMatchSection.classList.add("hidden");
        if (tournamentCompleteSection)
          tournamentCompleteSection.classList.remove("hidden");
        return;
      }

      // Check if tournament is complete by wins
      if (
        tournament.userWins >= Math.ceil(tournament.maxRounds / 2) ||
        tournament.aiWins >= Math.ceil(tournament.maxRounds / 2)
      ) {
        return;
      }

      // For PvP: show a dedicated next-game screen (Edit Player 1 / Edit Player 2 / Continue)
      if (tournament.opponentSelectionMode === "pvp") {
        const pvpNextScreen = document.getElementById("pvp-nextgame-section");
        const cancelNextGameBtn = document.getElementById(
          "cancel-nextgame-btn"
        );
        const lastResult =
          tournament.results && tournament.results.length
            ? tournament.results[tournament.results.length - 1]
            : null;

        // Initialize confirmation states - both players start as confirmed since they just played
        player1Confirmed = true;
        player2Confirmed = true;
        if (lastResult && lastResult.userTeam) {
          player1State = {
            players: lastResult.userTeam.players || [],
            lineup: lastResult.userTeam.lineup || [],
            formation: lastResult.userTeam.formation || "4-3-3",
            playstyle: lastResult.userTeam.playstyle || "Balanced",
            strength: calculateTeamStrength(lastResult.userTeam.players || []),
          };
        }
        if (lastResult && lastResult.aiTeam) {
          player2State = {
            players: lastResult.aiTeam.players || [],
            lineup: lastResult.aiTeam.lineup || [],
            formation: lastResult.aiTeam.formation || "4-3-3",
            playstyle: lastResult.aiTeam.playstyle || "Balanced",
            strength: calculateTeamStrength(lastResult.aiTeam.players || []),
          };
        }

        // Show the dedicated PvP page, hide the post-match results
        if (postMatchSection) postMatchSection.classList.add("hidden");
        if (pvpNextScreen) pvpNextScreen.classList.remove("hidden");
        updatePvpCheckmarks();

        // Helper: load a team's players into builder for editing
        function loadTeamIntoBuilder(teamPlayers, teamLineup) {
          selectedPlayers = teamPlayers ? teamPlayers.slice() : [];
          // reset lineup then naive-map players into slots
          lineup =
            teamLineup && teamLineup.length
              ? JSON.parse(JSON.stringify(teamLineup))
              : lineup.map((s) => ({ ...s, player: null }));
          if (!teamLineup || !teamLineup.length) {
            let i = 0;
            lineup = lineup.map((slot) => {
              if (i < selectedPlayers.length)
                slot.player = selectedPlayers[i++];
              return slot;
            });
          }
          if (formationSelectionSection)
            formationSelectionSection.classList.remove("hidden");
          if (playerSelectionSection)
            playerSelectionSection.classList.remove("hidden");
          renderPlayers(allPlayersData, availablePlayersDiv, true);
          renderLineup();
          updateSelectedPlayerCount();
        }

        // Wire buttons (idempotent)
        const editP1Btn = document.getElementById("edit-player1-btn");
        const editP2Btn = document.getElementById("edit-player2-btn");
        const continueBtn = document.getElementById("continue-next-game-btn");

        if (editP1Btn) {
          editP1Btn.onclick = () => {
            // hide the PvP page
            if (pvpNextScreen) pvpNextScreen.classList.add("hidden");
            currentBuilder = "player1";
            player1Confirmed = false; // Mark as unconfirmed when editing
            if (lastResult && lastResult.userTeam) {
              loadTeamIntoBuilder(
                lastResult.userTeam.players || [],
                lastResult.userTeam.lineup || []
              );
            } else {
              // nothing saved - allow fresh build
              selectedPlayers = [];
              lineup = lineup.map((s) => ({ ...s, player: null }));
              loadTeamIntoBuilder([], []);
            }
          };
        }

        if (editP2Btn) {
          editP2Btn.onclick = () => {
            if (pvpNextScreen) pvpNextScreen.classList.add("hidden");
            currentBuilder = "player2";
            player2Confirmed = false; // Mark as unconfirmed when editing
            if (lastResult && lastResult.aiTeam) {
              loadTeamIntoBuilder(
                lastResult.aiTeam.players || [],
                lastResult.aiTeam.lineup || []
              );
            } else if (tournament.opponents && tournament.opponents.length) {
              loadTeamIntoBuilder(
                tournament.opponents[tournament.opponents.length - 1] || [],
                []
              );
            } else {
              selectedPlayers = [];
              lineup = lineup.map((s) => ({ ...s, player: null }));
              loadTeamIntoBuilder([], []);
            }
          };
        }

        // Cancel/back to results wiring
        if (cancelNextGameBtn) {
          cancelNextGameBtn.onclick = () => {
            if (pvpNextScreen) pvpNextScreen.classList.add("hidden");
            if (postMatchSection) postMatchSection.classList.remove("hidden");
          };
        }

        if (continueBtn) {
          continueBtn.onclick = () => {
            // Check if tournament has reached maximum rounds
            if (tournament.round >= tournament.maxRounds) {
              // Show tournament complete screen
              const isPvP = tournament.opponentSelectionMode === "pvp";
              let tournamentWinner = "";
              if (tournament.userWins > tournament.aiWins)
                tournamentWinner = isPvP ? "Player 1" : "User Team";
              else if (tournament.aiWins > tournament.userWins)
                tournamentWinner = isPvP ? "Player 2" : "AI Team";
              else tournamentWinner = "It's a draw!";

              if (tournamentWinnerSpan)
                tournamentWinnerSpan.textContent = tournamentWinner;
              if (finalTournamentScoreSpan) {
                const label1 = isPvP ? "Player 1" : "User";
                const label2 = isPvP ? "Player 2" : "AI";
                finalTournamentScoreSpan.textContent = `${label1} ${tournament.userWins} - ${tournament.aiWins} ${label2} (${tournament.draws} draws)`;
              }
              if (pvpNextScreen) pvpNextScreen.classList.add("hidden");
              if (tournamentCompleteSection)
                tournamentCompleteSection.classList.remove("hidden");
              return;
            }

            // hide PvP page
            if (pvpNextScreen) pvpNextScreen.classList.add("hidden");
            // Use the stored player states (which may have been edited)
            if (player1State && player2State) {
              tournament.opponents.push(player1State.players);
              tournament.opponents.push(player2State.players);
              simulateMatch(player1State, player2State);
              // Reset for next round
              player1Confirmed = false;
              player2Confirmed = false;
              return;
            }
            // fallback: go to Player1 build
            currentBuilder = "player1";
            selectedPlayers = [];
            lineup = lineup.map((s) => ({ ...s, player: null }));
            if (formationSelectionSection)
              formationSelectionSection.classList.remove("hidden");
            if (playerSelectionSection)
              playerSelectionSection.classList.remove("hidden");
            renderPlayers(allPlayersData, availablePlayersDiv, true);
            renderLineup();
            updateSelectedPlayerCount();
          };
        }

        return;
      }

      // For user-picked opponents, go back to opponent selection
      if (tournament.opponentSelectionMode === "userPicked") {
        selectedOpponentPlayers = [];
        if (opponentSelectedPlayerCountSpan)
          opponentSelectedPlayerCountSpan.textContent = "0";
        if (confirmOpponentTeamBtn) confirmOpponentTeamBtn.disabled = true;
        renderPlayers(allPlayersData, opponentAvailablePlayersDiv, true, true);
        if (opponentSelectionSection)
          opponentSelectionSection.style.display = "block";
        return;
      }

      const newAiTeam = generateAITeam(selectedPlayers).players;
      tournament.opponents.push(newAiTeam.players);
      saveTournament();
      simulateMatch();
    }

    // --- Custom Formation Functions ---
    function loadCustomFormations() {
      const savedFormations = localStorage.getItem("customFormations");
      if (savedFormations) {
        customFormations = JSON.parse(savedFormations);
        renderCustomFormationButtons();
      }
    }

    function renderCustomFormationButtons() {
      customFormationOptionsDiv.innerHTML = "";
      customFormations.forEach((formation) => {
        const container = document.createElement("div");
        container.className = "custom-formation-btn-container";

        const btn = document.createElement("button");
        btn.className = "btn btn-outline-primary custom-formation-btn";
        btn.dataset.formation = formation.name;
        btn.textContent = formation.name;
        btn.addEventListener("click", () =>
          handleFormationSelection(formation.name, true)
        );

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-formation-btn";
        deleteBtn.innerHTML = "&times;";
        deleteBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          deleteCustomFormation(formation.name);
        });

        container.appendChild(btn);
        container.appendChild(deleteBtn);
        customFormationOptionsDiv.appendChild(container);
      });
    }

    function initializeFormationBuilder() {
      playerPlaceholdersContainer.innerHTML = "";
      for (let i = 1; i <= 11; i++) {
        const placeholder = document.createElement("div");
        placeholder.className = "player-placeholder";
        placeholder.textContent = i;
        placeholder.draggable = true;
        placeholder.id = `placeholder-${i}`;
        placeholder.style.left = `${10 + (i - 1) * 8}%`;
        placeholder.style.top = "45%";
        playerPlaceholdersContainer.appendChild(placeholder);

        placeholder.addEventListener("dragstart", (e) => {
          draggedElement = e.target;
          setTimeout(() => {
            e.target.classList.add("dragging");
          }, 0);
        });

        placeholder.addEventListener("dragend", (e) => {
          draggedElement.classList.remove("dragging");
          draggedElement = null;
        });
      }
    }

    function saveCustomFormation() {
      const name = customFormationNameInput.value.trim();
      if (!name) {
        alert("Please enter a name for the formation.");
        return;
      }
      if (
        customFormations.some((f) => f.name === name) ||
        formationLineups[name]
      ) {
        alert("A formation with this name already exists.");
        return;
      }

      const formation = {
        name: name,
        isCustom: true,
        lineup: [],
        requirements: { GK: 0, DEF: 0, MID: 0, FWD: 0 },
      };

      const placeholders = playerPlaceholdersContainer.querySelectorAll(
        ".player-placeholder"
      );
      let allPositionsSet = true;
      placeholders.forEach((p, index) => {
        const position = p.dataset.position;
        if (!position) {
          allPositionsSet = false;
        }

        const rect = customPitch.getBoundingClientRect();
        const placeholderRect = p.getBoundingClientRect();
        const x =
          ((placeholderRect.left - rect.left + placeholderRect.width / 2) /
            rect.width) *
          100;
        const y =
          ((placeholderRect.top - rect.top + placeholderRect.height / 2) /
            rect.height) *
          100;

        formation.lineup.push({
          slotId: `custom${index}`,
          positionType: position,
          coords: { x, y },
        });
        const group = getPositionGroup(position);
        if (formation.requirements[group] !== undefined) {
          formation.requirements[group]++;
        }
      });

      if (!allPositionsSet) {
        alert("Please set a position for all players on the pitch.");
        return;
      }

      if (formation.requirements.GK !== 1) {
        alert("You must have exactly one Goalkeeper.");
        return;
      }

      customFormations.push(formation);
      localStorage.setItem(
        "customFormations",
        JSON.stringify(customFormations)
      );
      renderCustomFormationButtons();
      customFormationModal.hide();
    }

    function deleteCustomFormation(name) {
      if (confirm(`Are you sure you want to delete the formation "${name}"?`)) {
        customFormations = customFormations.filter((f) => f.name !== name);
        localStorage.setItem(
          "customFormations",
          JSON.stringify(customFormations)
        );
        renderCustomFormationButtons();
      }
    }

    function showCustomPositionMenu(element, yPercent, xPercent) {
      let zone = "FWD";
      if (yPercent > 85) zone = "GK";
      else if (yPercent > 60) zone = "DEF";
      else if (yPercent > 25) zone = "MID";

      let possiblePositions = [];
      if (zone === "GK") {
        possiblePositions = ["GK"];
      } else if (zone === "DEF") {
        if (xPercent < 33) possiblePositions = ["LB", "LWB", "CB"];
        else if (xPercent > 66) possiblePositions = ["RB", "RWB", "CB"];
        else possiblePositions = ["CB"];
      } else if (zone === "MID") {
        if (xPercent < 33) possiblePositions = ["LM", "CM", "CAM", "CDM"];
        else if (xPercent > 66) possiblePositions = ["RM", "CM", "CAM", "CDM"];
        else possiblePositions = ["CM", "CAM", "CDM"];
      } else {
        // FWD
        if (xPercent < 33) possiblePositions = ["LW", "ST", "CF"];
        else if (xPercent > 66) possiblePositions = ["RW", "ST", "CF"];
        else possiblePositions = ["ST", "CF"];
      }

      const modalBody = document.getElementById("custom-position-modal-body");
      modalBody.innerHTML = "";
      possiblePositions.forEach((pos) => {
        const btn = document.createElement("button");
        btn.className = "btn btn-outline-primary m-1";
        btn.textContent = pos;
        btn.onclick = () => {
          element.dataset.position = pos;
          element.textContent = pos;
          bootstrap.Modal.getInstance(
            document.getElementById("custom-position-modal")
          ).hide();
        };
        modalBody.appendChild(btn);
      });

      const posModal = new bootstrap.Modal(
        document.getElementById("custom-position-modal")
      );
      posModal.show();
    }

    customPitch.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    customPitch.addEventListener("drop", (e) => {
      e.preventDefault();
      if (draggedElement) {
        const rect = customPitch.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;

        draggedElement.style.left = `${x - draggedElement.offsetWidth / 2}px`;
        draggedElement.style.top = `${y - draggedElement.offsetHeight / 2}px`;

        showCustomPositionMenu(draggedElement, yPercent, xPercent);
      }
    });

    // --- Event Listeners ---
    if (predefinedPlayersBtn)
      predefinedPlayersBtn.addEventListener("click", () => {
        playerSourceMode = "predefined";
        if (playerSourceSelection)
          playerSourceSelection.classList.add("hidden");
        if (formationSelectionSection)
          formationSelectionSection.classList.remove("hidden");
        renderPlayers(allPlayersData, availablePlayersDiv, true); // Render for user selection
      });

    if (apiPlayersBtn) {
      apiPlayersBtn.addEventListener("click", () => {
        playerSourceMode = "api";
        if (playerSourceSelection)
          playerSourceSelection.classList.add("hidden");
        if (formationSelectionSection)
          formationSelectionSection.classList.remove("hidden");
      });
    }

    if (playerSearchBtn) {
      playerSearchBtn.addEventListener("click", () => {
        const playerName = playerSearchInput.value.trim();
        if (playerName) {
          searchPlayer(playerName);
        }
      });
    }

    async function searchPlayer(playerName) {
      if (!apiPlayerResults) return;
      apiPlayerResults.innerHTML = `<p class="text-center">Searching...</p>`;
      try {
        const response = await fetch(
          `http://localhost:3001/api/players?name=${encodeURIComponent(
            playerName
          )}`
        );
        if (!response.ok) {
          if (response.status === 404) {
            apiPlayerResults.innerHTML = `<p class="text-center">Player not found.</p>`;
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return;
        }
        const players = await response.json();
        renderPlayers(players, apiPlayerResults, true);
      } catch (error) {
        console.error("Error searching for player:", error);
        apiPlayerResults.innerHTML = `<p class="text-center text-danger">Error searching for player. Please try again.</p>`;
      }
    }

    if (confirmTeamBtn)
      confirmTeamBtn.addEventListener("click", () => {
        if (!isValidTeam()) {
          alert(
            `Please select exactly ${MAX_PLAYERS} players and ensure all position requirements for the chosen formation are met.`
          );
          return;
        }

        // If PvP mode, handle two builders sequentially
        if (tournament.opponentSelectionMode === "pvp") {
          if (currentBuilder === "player1") {
            // Save player1 state
            player1State = {
              players: lineup.map((s) => s.player).filter(Boolean),
              lineup: JSON.parse(JSON.stringify(lineup)),
              formation: currentFormation,
              playstyle: playstyleSelect ? playstyleSelect.value : "Balanced",
              strength: calculateTeamStrength(
                lineup.map((s) => s.player).filter(Boolean)
              ),
            };
            player1Confirmed = true;

            // Check if this is editing after a match
            const lastResult =
              tournament.results && tournament.results.length
                ? tournament.results[tournament.results.length - 1]
                : null;
            if (lastResult && lastResult.aiTeam && lastResult.aiTeam.players) {
              // We're editing Player 1 after a match - return to post-match options
              if (playerSelectionSection)
                playerSelectionSection.classList.add("hidden");
              if (formationSelectionSection)
                formationSelectionSection.classList.add("hidden");
              const pvpNextScreen = document.getElementById(
                "pvp-nextgame-section"
              );
              if (pvpNextScreen) pvpNextScreen.classList.remove("hidden");
              updatePvpCheckmarks();
              return;
            }

            // Initial tournament setup: Reset builder for player2
            selectedPlayers = [];
            lineup = lineup.map((slot) => ({ ...slot, player: null }));
            currentFormation = null;
            selectedOpponentPlayers = [];
            updateSelectedPlayerCount();
            renderPlayers(allPlayersData, availablePlayersDiv, true);
            renderLineup();
            // Show formation selection again for player2
            if (playerSelectionSection)
              playerSelectionSection.classList.add("hidden");
            if (formationSelectionSection)
              formationSelectionSection.classList.remove("hidden");
            currentBuilder = "player2";
            alert(
              "Player 1 team saved. Now Player 2, select your formation and build your team."
            );
            return;
          }
        }

        // Normal flow for AI or userPicked (opponent selection) or PvP player2 confirm
        if (
          tournament.opponentSelectionMode === "pvp" &&
          currentBuilder === "player2"
        ) {
          // Player 2 has finished building
          player2State = {
            players: lineup.map((s) => s.player).filter(Boolean),
            lineup: JSON.parse(JSON.stringify(lineup)),
            formation: currentFormation,
            playstyle: playstyleSelect ? playstyleSelect.value : "Balanced",
            strength: calculateTeamStrength(
              lineup.map((s) => s.player).filter(Boolean)
            ),
          };
          player2Confirmed = true;

          // Check if this is editing after a match
          const lastResult =
            tournament.results && tournament.results.length
              ? tournament.results[tournament.results.length - 1]
              : null;
          if (
            lastResult &&
            lastResult.userTeam &&
            lastResult.userTeam.players
          ) {
            // We're editing Player 2 after a match - return to post-match options
            if (playerSelectionSection)
              playerSelectionSection.classList.add("hidden");
            if (formationSelectionSection)
              formationSelectionSection.classList.add("hidden");
            const pvpNextScreen = document.getElementById(
              "pvp-nextgame-section"
            );
            if (pvpNextScreen) pvpNextScreen.classList.remove("hidden");
            updatePvpCheckmarks();
            return;
          }

          // Initial tournament setup - both players confirmed, simulate now
          if (player1State && player2State) {
            tournament.opponents.push(player1State.players);
            tournament.opponents.push(player2State.players);
            simulateMatch(player1State, player2State);
            currentBuilder = "player1";
          }
          return;
        }

        if (playerSelectionSection)
          playerSelectionSection.classList.add("hidden");
        if (apiPlayerSearchSection)
          apiPlayerSearchSection.classList.add("hidden");
        if (tournament.opponentSelectionMode === "aiGenerated") {
          const aiTeam = generateAITeam(selectedPlayers);
          tournament.opponents.push(aiTeam.players);
          simulateMatch();
        } else {
          if (opponentSelectionSection)
            opponentSelectionSection.classList.remove("hidden");
          renderPlayers(
            allPlayersData,
            opponentAvailablePlayersDiv,
            true,
            true
          );
        }
      });

    const clearTeamBtn = document.getElementById("clear-team-btn");
    if (clearTeamBtn) {
      clearTeamBtn.addEventListener("click", clearTeam);
    }

    const randomizeTeamBtn = document.getElementById("randomize-team-btn");
    if (randomizeTeamBtn) {
      randomizeTeamBtn.addEventListener("click", randomizeTeam);
    }

    if (confirmOpponentTeamBtn) {
      confirmOpponentTeamBtn.addEventListener("click", () => {
        if (tournament.opponentSelectionMode === "pvp") {
          // In PvP opponent selection, this button confirms Player 2's team
          if (!isValidTeam()) {
            alert(
              `Please ensure Player 2 has a valid team of ${MAX_PLAYERS} players.`
            );
            return;
          }
          // Build player2 state
          const player2State = {
            players: lineup.map((s) => s.player).filter(Boolean),
            lineup: JSON.parse(JSON.stringify(lineup)),
            formation: currentFormation,
            playstyle: playstyleSelect ? playstyleSelect.value : "Balanced",
            strength: calculateTeamStrength(
              lineup.map((s) => s.player).filter(Boolean)
            ),
          };
          // Push both players into tournament opponents array for recordkeeping
          tournament.opponents.push(player1State.players);
          tournament.opponents.push(player2State.players);
          // Set a temporary flag to indicate PvP match-up and pass both states to simulateMatch
          simulateMatch(player1State, player2State);
          // Reset builder state
          currentBuilder = "player1";
          player1State = null;
          return;
        }

        if (isValidOpponentTeam()) {
          if (opponentSelectionSection)
            opponentSelectionSection.classList.add("hidden");
          simulateMatch();
        }
      });
    }

    if (formationOptionsDiv)
      formationOptionsDiv.addEventListener("click", (event) => {
        if (event.target.classList.contains("formation-btn")) {
          handleFormationSelection(event.target.dataset.formation);
        }
      });

    if (skipSimulationBtn)
      skipSimulationBtn.addEventListener("click", () => {
        isSimulationSkipped = true;
      });

    const postMatchReSimBtn = document.getElementById("re-sim-match-btn");
    if (postMatchReSimBtn)
      postMatchReSimBtn.addEventListener("click", simulateMatch);

    const postMatchNextGameBtn = document.getElementById(
      "next-game-tournament-btn"
    );
    if (postMatchNextGameBtn)
      postMatchNextGameBtn.addEventListener("click", nextGameOfTournament);

    const mainMenuBtn = document.getElementById("main-menu-btn");
    if (mainMenuBtn) mainMenuBtn.addEventListener("click", resetGame);

    if (resetTournamentBtn) {
      resetTournamentBtn.addEventListener("click", resetGame);
    }

    // Tournament type selection
    if (tournamentTypeSelect)
      tournamentTypeSelect.addEventListener("change", (event) => {
        tournament.maxRounds = parseInt(event.target.value);
        saveTournament();
      });

    // Opponent type selection
    if (aiGeneratedOpponentRadio)
      aiGeneratedOpponentRadio.addEventListener("change", () => {
        tournament.opponentSelectionMode = "aiGenerated";
        saveTournament();
      });

    if (pickOpponentTeamRadio)
      pickOpponentTeamRadio.addEventListener("change", () => {
        tournament.opponentSelectionMode = "userPicked";
        saveTournament();
      });

    // Start Tournament button functionality
    if (startTournamentBtn)
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
        ).value;

        saveTournament();
        updateTournamentUI();

        // Update labels for PvP mode
        const userLabel = document.getElementById("user-label");
        const aiLabel = document.getElementById("ai-label");
        if (tournament.opponentSelectionMode === "pvp") {
          if (userLabel) userLabel.textContent = "Player 1";
          if (aiLabel) aiLabel.textContent = "Player 2";
        } else {
          if (userLabel) userLabel.textContent = "User";
          if (aiLabel) aiLabel.textContent = "AI";
        }

        if (tournamentSection) tournamentSection.classList.add("hidden");
        if (playerSourceSelection)
          playerSourceSelection.classList.remove("hidden");
      });

    // Navbar Home and Brand link functionality
    if (homeLink)
      homeLink.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default link behavior
        resetGame();
      });

    if (navbarBrand)
      navbarBrand.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default link behavior
        resetGame();
      });

    // Go Back button functionality
    if (goBackButtons)
      goBackButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
          const currentSection = event.target.closest(".card");
          const targetSectionId = event.target.dataset.targetSection;
          const targetSection = document.getElementById(targetSectionId);

          // If we are going back from API search, move lineupDisplay back
          if (
            currentSection &&
            currentSection.id === "api-player-search-section"
          ) {
            const playerSelectionSection = document.getElementById(
              "player-selection-section"
            );
            if (playerSelectionSection && lineupDisplay) {
              const lineupContainer =
                playerSelectionSection.querySelector(".row.mt-4 .col-12");
              if (lineupContainer) {
                lineupContainer.appendChild(lineupDisplay);
              }
            }
          }

          // Hide current section
          if (currentSection) currentSection.classList.add("hidden");

          // Show target section
          if (targetSection) targetSection.classList.remove("hidden");
        });
      });

    // Custom Formation Listeners
    if (createCustomFormationBtn)
      createCustomFormationBtn.addEventListener("click", () => {
        initializeFormationBuilder();
        customFormationModal.show();
      });

    if (saveCustomFormationBtn)
      saveCustomFormationBtn.addEventListener("click", saveCustomFormation);

    // Initial setup
    // Ensure all sections are hidden except tournament section on initial load
    if (playerSourceSelection) playerSourceSelection.classList.add("hidden");
    if (playerSelectionSection) playerSelectionSection.classList.add("hidden");
    if (formationSelectionSection)
      formationSelectionSection.classList.add("hidden");
    if (document.getElementById("post-match-section"))
      document.getElementById("post-match-section").classList.add("hidden");
    if (opponentSelectionSection)
      opponentSelectionSection.classList.add("hidden");
    if (apiPlayerSearchSection) apiPlayerSearchSection.classList.add("hidden");
    if (tournamentCompleteSection)
      tournamentCompleteSection.classList.add("hidden");
    if (liveSimulationSection) liveSimulationSection.classList.add("hidden");
    if (tournamentSection) tournamentSection.classList.remove("hidden"); // Show tournament section

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
    loadCustomFormations();
    updateSelectedPlayerCount(); // Call once to set initial state of confirmTeamBtn
    if (typeof window.updateOpponentSelectedPlayerCount === "function") {
      window.updateOpponentSelectedPlayerCount(); // Call once to set initial state of confirmOpponentTeamBtn
    }
    if (simulateMatchBtn) simulateMatchBtn.disabled = true;
  } catch (error) {
    console.error("An error occurred: ", error);
  }
});
