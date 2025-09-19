
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

    // --- DOM Elements ---
    const playerSourceSelection = document.getElementById(
      "player-source-selection"
    );
    if(playerSourceSelection) playerSourceSelection.classList.add('fade-in-section');
    const predefinedPlayersBtn = document.getElementById(
      "predefined-players-btn"
    );
    const apiPlayersBtn = document.getElementById("api-players-btn");

    const playerSelectionSection = document.getElementById(
      "player-selection-section"
    );
    if(playerSelectionSection) playerSelectionSection.classList.add('fade-in-section');
    const availablePlayersDiv = document.getElementById("available-players");
    if(availablePlayersDiv) availablePlayersDiv.classList.add("player-grid-container");
    const selectedPlayersDiv = document.getElementById("selected-players");
    if(selectedPlayersDiv) selectedPlayersDiv.classList.add("player-grid-container");
    const selectedPlayerCountSpan = document.getElementById(
      "selected-player-count"
    );
    const confirmTeamBtn = document.getElementById("confirm-team-btn");
    const lineupDisplay = document.getElementById("lineup-display"); // New element

    const formationSelectionSection = document.getElementById(
      "formation-selection-section"
    );
    if(formationSelectionSection) formationSelectionSection.classList.add('fade-in-section');
    const formationOptionsDiv = document.getElementById("formation-options");
    const simulateMatchBtn = document.getElementById("simulate-match-btn");

    const matchResultsSection = document.getElementById("match-results-section");
    if(matchResultsSection) matchResultsSection.classList.add('fade-in-section');
    const playByPlayContent = document.getElementById("play-by-play-content");
    const chemistryContent = document.getElementById("chemistry-content");
    const analysisContent = document.getElementById("analysis-content");
    const keepTeamBtn = document.getElementById("keep-team-btn");
    const changePlayersBtn = document.getElementById("change-players-btn");

    const tournamentSection = document.getElementById(
      "tournament-section"
    );
    if(tournamentSection) tournamentSection.classList.add('fade-in-section');
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
    if(opponentSelectionSection) opponentSelectionSection.classList.add('fade-in-section');
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
    if(gameResultsPage) gameResultsPage.classList.add('fade-in-section');
    const finalScoreSpan = document.getElementById("final-score");
    const matchWinnerParagraph = document.getElementById("match-winner");
    const viewDetailedResultsBtn = document.getElementById(
      "view-detailed-results-btn"
    );
    const reSimMatchBtn = document.getElementById(
      "re-sim-match-btn"
    );
    const nextGameTournamentBtn = document.getElementById(
      "next-game-tournament-btn"
    );

    const goBackButtons = document.querySelectorAll(".go-back-btn"); // All go back buttons

    const tournamentCompleteSection = document.getElementById(
      "tournament-complete-section"
    );
    if(tournamentCompleteSection) tournamentCompleteSection.classList.add('fade-in-section');
    const tournamentWinnerSpan = document.getElementById(
      "tournament-winner"
    );
    const finalTournamentScoreSpan = document.getElementById(
      "final-tournament-score"
    );
    const resetTournamentBtn = document.getElementById("reset-tournament-btn");
    
    // Live Simulation Elements
    const liveSimulationSection = document.getElementById("live-simulation-section");
    const liveCommentaryContainer = document.querySelector(".live-commentary-container");
    const liveCommentaryFeed = document.getElementById("live-commentary-feed");
    const liveUserScore = document.getElementById("live-user-score");
    const liveAiScore = document.getElementById("live-ai-score");
    const skipSimulationBtn = document.getElementById("skip-simulation-btn");

    // Custom Formation Elements
    const createCustomFormationBtn = document.getElementById("create-custom-formation-btn");
    const customFormationBuilder = document.getElementById("custom-formation-builder");
    const customFormationModal = new bootstrap.Modal(customFormationBuilder);
    const customPitch = document.getElementById("custom-pitch");
    const playerPlaceholdersContainer = document.getElementById("player-placeholders-container");
    const saveCustomFormationBtn = document.getElementById("save-custom-formation-btn");
    const customFormationNameInput = document.getElementById("custom-formation-name");
    const customFormationOptionsDiv = document.getElementById("custom-formation-options");


    // --- State Variables ---
    const MAX_PLAYERS = 11;
    let allPlayersData = []; // Will be populated from predefinedPlayers object
    let selectedPlayers = []; // Stores user's player objects
    let lineup = new Array(MAX_PLAYERS).fill(null);
    let selectedOpponentPlayers = []; // Stores opponent's player objects
    let currentFormation = null;
    let tournament = {};
    let draggedSlotId = null; // Changed from draggedPlayerIndex to draggedSlotId
    let isSimulationSkipped = false;
    let customFormations = [];
    let draggedElement = null;


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
      "4-2-3-1": { GK: 1, LB: 1, CB: 2, RB: 1, CDM: 2, CAM: 1, LW: 1, RW: 1, ST: 1 },
    };

    const formationLineups = {
      "4-3-3": ["GK", "LB", "LCB", "RCB", "RB", "LCM", "RCM", "CAM", "LW", "ST", "RW"],
      "4-4-2": ["GK", "LB", "LCB", "RCB", "RB", "LM", "LCM", "RCM", "RM", "ST1", "ST2"],
      "3-5-2": ["GK", "LCB", "CCB", "RCB", "LWB", "RWB", "CDM1", "CDM2", "CAM", "ST1", "ST2"],
      "4-2-3-1": ["GK", "LB", "LCB", "RCB", "RB", "CDM1", "CDM2", "CAM", "LW", "RW", "ST"],
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
    function calculatePlayerRating(player, assignedPosition) {
      let rating = player.baseRating;

      const normalizedPreferred = normalizePosition(player.preferredPosition);
      const normalizedAssigned = normalizePosition(assignedPosition);

      let adjustedRating;

      // Check for preferred position (normalized)
      if (normalizedPreferred === normalizedAssigned) {
        adjustedRating = Math.round(rating * positionSuitability.preferred);
      }
      // Check for secondary positions (normalized)
      else if (player.secondaryPositions.map(normalizePosition).includes(normalizedAssigned)) {
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
          adjustedRating = Math.round(rating * positionSuitability.adjacentGroup);
        }
        // If not in the same group, secondary, or adjacent, it's a far group
        else {
          adjustedRating = Math.round(rating * positionSuitability.farGroup);
        }
      }

      // Apply maximum OVR drop based on general position group
      const playerGeneralGroup = getPositionGroup(player.preferredPosition); // Get original general group
      const assignedGeneralGroup = getPositionGroup(assignedPosition); // Get assigned general group

      if (playerGeneralGroup === assignedGeneralGroup) { // If player is in their general area
        let maxDrop = 0;
        if (playerGeneralGroup === "FWD") {
          maxDrop = 4;
        } else if (playerGeneralGroup === "MID") {
          maxDrop = 5;
        } else if (playerGeneralGroup === "DEF") {
          maxDrop = 4;
        }

        if (maxDrop > 0) {
          const minAllowedRating = player.baseRating - maxDrop;
          adjustedRating = Math.max(adjustedRating, minAllowedRating);
        }
      }

      return adjustedRating;
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
        tournament.lineup = tournament.lineup.map(slot => {
            if (typeof slot === 'object' && slot !== null && 'player' in slot) {
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
      if(userTournamentScoreSpan) userTournamentScoreSpan.textContent = tournament.userWins;
      if(aiTournamentScoreSpan) aiTournamentScoreSpan.textContent = tournament.aiWins;
      if(tournamentTypeSelect) tournamentTypeSelect.value = tournament.maxRounds;
    }

    // Loads predefined players from the hardcoded data
    function loadPredefinedPlayers() {
      allPlayersData = [
        ...predefinedPlayers.forwards,
        ...predefinedPlayers.midfielders,
        ...predefinedPlayers.defenders,
        ...predefinedPlayers.goalkeepers,
      ];
      if(playerSourceSelection) playerSourceSelection.classList.add("hidden");
      if(formationSelectionSection) formationSelectionSection.classList.remove("hidden"); // Show formation selection first
      renderPlayers(allPlayersData, availablePlayersDiv, true); // CRITICAL: Render available players here
    }

    // Renders players into a given container
    function renderPlayers(players, container, isSelectable, isOpponent = false) {
      if(!container) return;
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
                      <span class="player-ovr">${player.baseRating}</span>
                  </div>
                  <div class="player-card-buttons">
                      <button class="btn btn-sm btn-primary add-player-btn">Add</button>
                      <button class="btn btn-sm btn-secondary details-player-btn">Details</button>
                  </div>
              `;

        if (isSelectable) {
          const addButton = playerItem.querySelector(".add-player-btn");
          const detailsButton = playerItem.querySelector(".details-player-btn");

          if(addButton) addButton.addEventListener("click", (e) => {
            e.stopPropagation();
            if (isOpponent) {
              handleOpponentPlayerSelection(player);
            } else {
              handlePlayerSelection(player);
            }
          });

          if(detailsButton) detailsButton.addEventListener("click", (e) => {
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
      if(modalInstance) modalInstance.addEventListener("hidden.bs.modal", () => {
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

      const availablePositionsContainer = document.getElementById("available-positions-container");
      if(availablePositionsContainer) availablePositionsContainer.addEventListener("click", (event) => {
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
          selectedPlayers = lineup.filter(slot => slot.player !== null).map(slot => slot.player); // Rebuild selectedPlayers from lineup after addition
          updateSelectedPlayerCount();
          renderLineup(); // Added renderLineup call here

          modal.hide();
        }
      });

      const positionModalInstance = document.getElementById(
        "position-selection-modal"
      );
      if(positionModalInstance) positionModalInstance.addEventListener("hidden.bs.modal", () => {
        modalElement.remove();
      });
    }

    // Updates the count of selected players and button state
    function updateSelectedPlayerCount() {
      const currentSelectedCount = lineup.filter(slot => slot.player !== null).length;
      if(selectedPlayerCountSpan) selectedPlayerCountSpan.textContent = currentSelectedCount;
      const isValid = isValidTeam();
      if(confirmTeamBtn) confirmTeamBtn.disabled = !isValid;
      console.log("updateSelectedPlayerCount: Current selected count:", currentSelectedCount, "isValidTeam:", isValid, "confirmTeamBtn.disabled:", !isValid);

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
      console.log("isValidTeam: Actual players in lineup:", actualPlayersInLineup);
      console.log("isValidTeam: MAX_PLAYERS:", MAX_PLAYERS);

      if (actualPlayersInLineup !== MAX_PLAYERS) {
        console.log("isValidTeam: Reason for invalid: Player count mismatch.");
        return false;
      }

      const isCustomFormation = customFormations.some(f => f.name === currentFormation);
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
        if (slot.player) { // Check if slot has a player
          const countedPosition = countByFunction(slot.positionType);
          console.log(`isValidTeam: Slot ${slot.slotId} (${slot.positionType}) assigned to player ${slot.player.name}. Counted position: ${countedPosition}`);
          
          if (currentCounts.hasOwnProperty(countedPosition)) {
            currentCounts[countedPosition]++;
          } else {
            console.warn(`isValidTeam: Unexpected position type: ${countedPosition} for slot ${slot.slotId}. This position might not be defined in the required config for this formation.`);
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
      console.log("handlePlayerSelection: Existing player slot:", existingPlayerSlot);

      if (existingPlayerSlot) {
        // Player is already in lineup, so remove them
        existingPlayerSlot.player = null;
        // Rebuild selectedPlayers from lineup after removal
        selectedPlayers = lineup.filter(slot => slot.player !== null).map(slot => slot.player);
        console.log("handlePlayerSelection: Player removed. New lineup:", lineup, "New selectedPlayers:", selectedPlayers);
        updateSelectedPlayerCount();
        renderLineup();
      } else {
        // Player is not in lineup, show position selection
        if (lineup.filter(slot => slot.player !== null).length >= MAX_PLAYERS) { // Check lineup count instead of selectedPlayers
          alert(
            `Your team is already full (${MAX_PLAYERS} players). Please remove a player first.`
          );
          return;
        }
        console.log("handlePlayerSelection: Showing position selection modal for:", playerData.name);
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

        const customFormation = customFormations.find(f => f.name === formation);
        if (customFormation) {
            const slot = customFormation.lineup.find(s => s.slotId === slotId);
            return slot ? slot.coords : { x: 50, y: 50 };
        }

        const positions = {
            "4-3-3": { GK: { x: 50, y: 90 }, LB: { x: 20, y: 75 }, LCB: { x: 40, y: 80 }, RCB: { x: 60, y: 80 }, RB: { x: 80, y: 75 }, LCM: { x: 35, y: 55 }, RCM: { x: 65, y: 55 }, CAM: { x: 50, y: 40 }, LW: { x: 25, y: 25 }, ST: { x: 50, y: 15 }, RW: { x: 75, y: 25 } },
            "4-4-2": { GK: { x: 50, y: 90 }, LB: { x: 15, y: 70 }, LCB: { x: 35, y: 75 }, RCB: { x: 65, y: 75 }, RB: { x: 85, y: 70 }, LM: { x: 20, y: 45 }, LCM: { x: 40, y: 50 }, RCM: { x: 60, y: 50 }, RM: { x: 80, y: 45 }, ST1: { x: 40, y: 20 }, ST2: { x: 60, y: 20 } },
            "3-5-2": { GK: { x: 50, y: 90 }, LCB: { x: 30, y: 75 }, CCB: { x: 50, y: 80 }, RCB: { x: 70, y: 75 }, LWB: { x: 15, y: 50 }, RWB: { x: 85, y: 50 }, CDM1: { x: 40, y: 60 }, CDM2: { x: 60, y: 60 }, CAM: { x: 50, y: 40 }, ST1: { x: 40, y: 20 }, ST2: { x: 60, y: 20 } },
            "4-2-3-1": { GK: { x: 50, y: 90 }, LB: { x: 15, y: 70 }, LCB: { x: 35, y: 75 }, RCB: { x: 65, y: 75 }, RB: { x: 85, y: 70 }, CDM1: { x: 40, y: 60 }, CDM2: { x: 60, y: 60 }, CAM: { x: 50, y: 40 }, LW: { x: 20, y: 25 }, RW: { x: 80, y: 25 }, ST: { x: 50, y: 15 } },
        };

        return positions[formation][slotId] || { x: 0, y: 0 };
    }

    // Renders the visual lineup on the soccer field
    function renderLineup() {
        if (!lineupDisplay) return;
        lineupDisplay.innerHTML = ''; // Clear the display first

        if (!currentFormation || !lineup) {
            console.log("No currentFormation or lineup. Exiting renderLineup.");
            return;
        }

        lineup.forEach(slot => {
            const positionCircle = document.createElement('div');
            positionCircle.id = `pos-${slot.slotId.toLowerCase()}`;
            positionCircle.className = 'position-circle active';
            positionCircle.dataset.slotId = slot.slotId;

            const positionCoords = getPositionInfo(slot.slotId);
            positionCircle.style.left = `${positionCoords.x}%`;
            positionCircle.style.top = `${positionCoords.y}%`;
            positionCircle.style.transform = `translate(-50%, -50%)`;

            positionCircle.innerHTML = `
                <span class="position-label">${slot.positionType}</span>
                <img src="" alt="Player" class="player-image">
                <span class="player-ovr"></span>
                <span class="player-name"></span>
            `;

            const playerImage = positionCircle.querySelector('.player-image');
            const playerOvr = positionCircle.querySelector('.player-ovr');
            const playerNameEl = positionCircle.querySelector('.player-name');

            if (slot.player) {
                positionCircle.classList.add('has-player');
                positionCircle.setAttribute('draggable', 'true');
                playerImage.src = slot.player.imageUrl;
                playerImage.alt = slot.player.name;
                playerNameEl.textContent = slot.player.name;
                
                const calculatedRating = calculatePlayerRating(slot.player, slot.positionType);
                playerOvr.textContent = calculatedRating;
                playerOvr.style.opacity = '1';
                playerNameEl.style.opacity = '1';
            } else {
                playerOvr.style.opacity = '0';
                playerNameEl.style.opacity = '0';
            }

            positionCircle.addEventListener('dragstart', handleDragStart);
            positionCircle.addEventListener('dragover', handleDragOver);
            positionCircle.addEventListener('dragleave', handleDragLeave);
            positionCircle.addEventListener('drop', handleDrop);
            positionCircle.addEventListener('dragend', handleDragEnd);

            lineupDisplay.appendChild(positionCircle);
        });
    }

    draggedSlotId = null; // Global variable to store the ID of the dragged slot

    function handleDragStart(event) {
        draggedSlotId = event.target.dataset.slotId;
        event.dataTransfer.setData('text/plain', draggedSlotId); // Set data for drag operation
        event.target.classList.add('dragging'); // Add a class for visual feedback
    }

    function handleDragOver(event) {
        event.preventDefault(); // Allow drop
        const element = event.target.closest('.position-circle');
        if (element) {
            element.classList.add('drag-over'); // Add visual feedback for drag-over
        }
    }

    function handleDragLeave(event) {
        const element = event.target.closest('.position-circle');
        if (element) {
            element.classList.remove('drag-over'); // Remove visual feedback
        }
    }

    function handleDrop(event) {
        event.preventDefault();
        const targetElement = event.target.closest('.position-circle');
        if (!targetElement) return;

        targetElement.classList.remove('drag-over');

        const targetSlotId = targetElement.dataset.slotId;

        if (draggedSlotId === targetSlotId) {
            return; // Dropped on the same slot
        }

        const draggedSlotIndex = lineup.findIndex(slot => slot.slotId === draggedSlotId);
        const targetSlotIndex = lineup.findIndex(slot => slot.slotId === targetSlotId);

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
        selectedPlayers = lineup.filter(slot => slot.player !== null).map(slot => slot.player);

        updateSelectedPlayerCount(); // Re-evaluate team validity and count
        renderLineup(); // Re-render the lineup to reflect the swap
    }

    function handleDragEnd(event) {
        event.target.classList.remove('dragging'); // Remove dragging class
        draggedSlotId = null; // Clear dragged ID
    }

    // Handles formation selection
    function handleFormationSelection(formation, isCustom = false) {
        currentFormation = formation;
        lineup = []; // Initialize as empty array

        if (isCustom) {
            const customFormation = customFormations.find(f => f.name === formation);
            if (customFormation) {
                lineup = customFormation.lineup.map(slot => ({ ...slot, player: null }));
                formationRequirements[formation] = customFormation.requirements;
            }
        } else {
            const lineupPositions = formationLineups[currentFormation];
            lineupPositions.forEach(position => {
                lineup.push({
                    slotId: position,
                    positionType: position,
                    player: null,
                });
            });
        }

        selectedPlayers = [];
        // Visually indicate active formation
        document.querySelectorAll(".formation-btn, .custom-formation-btn").forEach((btn) => {
            if (btn.dataset.formation === formation) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });
        // After selecting formation, show player selection section
        if(formationSelectionSection) formationSelectionSection.classList.add("hidden");
        if(playerSelectionSection) playerSelectionSection.classList.remove("hidden");
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
    async function simulateMatch() {
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
      if (tournament.opponentSelectionMode === "aiGenerated") {
        aiTeamPlayers = generateAITeam(selectedPlayers).players;
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

      // --- UI Updates for Live Sim ---
      if(playerSelectionSection) playerSelectionSection.classList.add("hidden");
      if(formationSelectionSection) formationSelectionSection.classList.add("hidden");
      if(liveSimulationSection) liveSimulationSection.classList.remove("hidden");
      if(liveCommentaryFeed) liveCommentaryFeed.innerHTML = '';
      if(liveUserScore) liveUserScore.textContent = '0';
      if(liveAiScore) liveAiScore.textContent = '0';


      // --- Game Simulation Logic ---
      const userTeam = {
        players: lineup.map(slot => {
            return { ...slot.player, position: slot.positionType, matchRating: 6.5 }; // Add position and initial rating
        }),
        formation: currentFormation,
        strength: calculateTeamStrength(lineup.map(slot => slot.player).filter(p => p)),
      };

      const aiTeam = {
        players: aiTeamPlayers.map(player => {
            return { ...player, matchRating: 6.5 }; // Add initial rating
        }),
        formation: "4-4-2", // AI always plays 4-4-2 for simplicity
        strength: calculateTeamStrength(aiTeamPlayers),
      };

      let timelineEvents = [];
      let userScore = 0;
      let aiScore = 0;

      // New detailed stats
      let userShots = 0, aiShots = 0;
      let userShotsOnTarget = 0, aiShotsOnTarget = 0;
      let userPossession = 0, aiPossession = 0;
      let userPasses = 0, aiPasses = 0;
      let userPassAccuracy = 0, aiPassAccuracy = 0;
      let userTackles = 0, aiTackles = 0;
      let userFouls = 0, aiFouls = 0;
      let userCorners = 0, aiCorners = 0;
      let userOffsides = 0, aiOffsides = 0;


      const addTimelineEvent = (event) => {
          timelineEvents.push(event);
          const { minute, team, type, text, icon } = event;
          const eventElement = document.createElement('div');
          eventElement.classList.add('commentary-event', team, type);
          eventElement.innerHTML = `
              <span class="icon">${icon}</span>
              <div class="text">
                  <span class="minute">${minute}'</span> - ${text}
              </div>
          `;
          if(liveCommentaryFeed) {
            liveCommentaryFeed.appendChild(eventElement);
            // Use a timeout to ensure the DOM is updated before scrolling
            setTimeout(() => {
                liveCommentaryContainer.scrollTop = liveCommentaryContainer.scrollHeight;
            }, 10);
          }
      };

      const delay = ms => new Promise(res => setTimeout(res, ms));

      const getRandomPlayer = (team, positionGroup = null) => {
          let eligiblePlayers = team.players;
          if (positionGroup) {
              eligiblePlayers = team.players.filter(p => getPositionGroup(p.preferredPosition) === positionGroup);
          }
          if (eligiblePlayers.length === 0) {
            eligiblePlayers = team.players; // fallback to any player
          }
          return eligiblePlayers[Math.floor(Math.random() * eligiblePlayers.length)];
      };

      addTimelineEvent({ minute: 0, team: 'neutral', type: 'start', text: `Match Start: User Team (${userTeam.strength}) vs AI Team (${aiTeam.strength})`, icon: '⏱️' });
      if (!isSimulationSkipped) await delay(800);

      // Main simulation loop
      for (let i = 0; i < 10; i++) {
        if (isSimulationSkipped) break;
        const minute = i * 9 + Math.floor(Math.random() * 5) + 1;
        const userAttackChance = userTeam.strength / (userTeam.strength + aiTeam.strength);

        if (Math.random() < userAttackChance) {
            userPossession += 10;
            userPasses += Math.floor(Math.random() * 10) + 5;
            const attackingPlayer = getRandomPlayer(userTeam, 'FWD');
            const assistingPlayer = getRandomPlayer(userTeam, 'MID');
            addTimelineEvent({ minute, team: 'user', type: 'attack', text: `${assistingPlayer.name} passes to ${attackingPlayer.name}!`, icon: '⚔️' });
            if (!isSimulationSkipped) await delay(800);

            userShots++;
            if (Math.random() < 0.5) { // Shot on target
                userShotsOnTarget++;
                addTimelineEvent({ minute, team: 'user', type: 'shot', text: `${attackingPlayer.name} takes a shot!`, icon: '🥅' });
                if (!isSimulationSkipped) await delay(800);

                if (Math.random() < 0.4) { // GOAL
                    userScore++;
                    if(liveUserScore) liveUserScore.textContent = userScore;
                    const goalEvent = { minute, team: 'user', type: 'goal', text: `GOAL! A brilliant finish from ${attackingPlayer.name}! (${userScore}-${aiScore})`, icon: '⚽', player: attackingPlayer, assist: assistingPlayer };
                    addTimelineEvent(goalEvent);
                    attackingPlayer.matchRating += 1.5;
                    assistingPlayer.matchRating += 0.8;
                    if (!isSimulationSkipped) await delay(800);
                } else { // SAVE
                    const defendingPlayer = getRandomPlayer(aiTeam, 'GK');
                    addTimelineEvent({ minute, team: 'ai', type: 'defense', text: `What a save by ${defendingPlayer.name}!`, icon: '🛡️' });
                    defendingPlayer.matchRating += 0.5;
                    if (!isSimulationSkipped) await delay(800);
                }
            } else { // Shot off target
                addTimelineEvent({ minute, team: 'user', type: 'shot', text: `${attackingPlayer.name}'s shot goes wide.`, icon: '🥅' });
                if (!isSimulationSkipped) await delay(800);
            }
        } else {
            aiPossession += 10;
            aiPasses += Math.floor(Math.random() * 10) + 5;
            const attackingPlayer = getRandomPlayer(aiTeam, 'FWD');
            const assistingPlayer = getRandomPlayer(aiTeam, 'MID');
            addTimelineEvent({ minute, team: 'ai', type: 'attack', text: `${assistingPlayer.name} finds ${attackingPlayer.name} in space.`, icon: '⚔️' });
            if (!isSimulationSkipped) await delay(800);

            aiShots++;
            if (Math.random() < 0.5) { // Shot on target
                aiShotsOnTarget++;
                addTimelineEvent({ minute, team: 'ai', type: 'shot', text: `${attackingPlayer.name} shoots!`, icon: '🥅' });
                if (!isSimulationSkipped) await delay(800);

                if (Math.random() < 0.4) { // GOAL
                    aiScore++;
                    if(liveAiScore) liveAiScore.textContent = aiScore;
                    const goalEvent = { minute, team: 'ai', type: 'goal', text: `GOAL! ${attackingPlayer.name} puts it in the back of the net! (${userScore}-${aiScore})`, icon: '⚽', player: attackingPlayer, assist: assistingPlayer };
                    addTimelineEvent(goalEvent);
                    attackingPlayer.matchRating += 1.5;
                    assistingPlayer.matchRating += 0.8;
                    if (!isSimulationSkipped) await delay(800);
                } else { // SAVE
                    const defendingPlayer = getRandomPlayer(userTeam, 'GK');
                    addTimelineEvent({ minute, team: 'user', type: 'defense', text: `Incredible save from ${defendingPlayer.name}!`, icon: '🛡️' });
                    defendingPlayer.matchRating += 0.5;
                    if (!isSimulationSkipped) await delay(800);
                }
            } else { // Shot off target
                addTimelineEvent({ minute, team: 'ai', type: 'shot', text: `Close! ${attackingPlayer.name}'s effort is just off target.`, icon: '🥅' });
                if (!isSimulationSkipped) await delay(800);
            }
        }
      }

      addTimelineEvent({ minute: 90, team: 'neutral', type: 'end', text: `Full Time! Final Score: User Team ${userScore} - ${aiScore} AI Team`, icon: '⏱️' });
      if (!isSimulationSkipped) await delay(2000);

      // Finalize stats
      const totalPossession = userPossession + aiPossession;
      userPossession = totalPossession > 0 ? Math.round((userPossession / totalPossession) * 100) : 50;
      aiPossession = 100 - userPossession;
      userPassAccuracy = userPasses > 0 ? Math.round(((userPasses - Math.floor(Math.random() * userPasses / 5)) / userPasses) * 100) : 0;
      aiPassAccuracy = aiPasses > 0 ? Math.round(((aiPasses - Math.floor(Math.random() * aiPasses / 5)) / aiPasses) * 100) : 0;
      userTackles = Math.floor(Math.random() * 10) + 5;
      aiTackles = Math.floor(Math.random() * 10) + 5;
      userFouls = Math.floor(Math.random() * 5);
      aiFouls = Math.floor(Math.random() * 5);
      userCorners = Math.floor(Math.random() * 8);
      aiCorners = Math.floor(Math.random() * 8);
      userOffsides = Math.floor(Math.random() * 4);
      aiOffsides = Math.floor(Math.random() * 4);

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

      const matchData = {
          userScore,
          aiScore,
          matchWinnerText,
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
              }
          }
      };

      tournament.results.push(matchData);
      saveTournament();
      
      renderPostMatch(matchData);

      if(liveSimulationSection) liveSimulationSection.classList.add("hidden");
      const postMatchSection = document.getElementById('post-match-section');
      if(postMatchSection) postMatchSection.classList.remove("hidden");

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
        if(tournamentWinnerSpan) tournamentWinnerSpan.textContent = tournamentWinner;
        if(finalTournamentScoreSpan) finalTournamentScoreSpan.textContent = `User ${tournament.userWins} - ${tournament.aiWins} AI (${tournament.draws} draws)`;
        if(postMatchSection) postMatchSection.classList.add("hidden"); // Hide post match section
        if(tournamentCompleteSection) tournamentCompleteSection.classList.remove("hidden"); // Show tournament complete section
      }
    }

    function renderPostMatch(matchData) {
        renderMatchHeader(matchData);
        renderTimeline(matchData.timelineEvents);
        renderGoalScorers(matchData.timelineEvents);
        renderTeamStats(matchData.stats);
        renderPlayerRatings(matchData.userTeam.players, matchData.aiTeam.players);
    }

    function renderMatchHeader(matchData) {
        const userTeamInfo = document.querySelector('.match-header .user-team');
        const aiTeamInfo = document.querySelector('.match-header .ai-team');
        const scoreContainer = document.querySelector('.score-container');

        if (userTeamInfo) {
            userTeamInfo.querySelector('.team-name').textContent = 'Your Team';
            const userChem = calculateTeamChemistry(matchData.userTeam.players);
            userTeamInfo.querySelector('.chemistry-value').textContent = `${userChem}%`;
            userTeamInfo.querySelector('.chemistry-fill').style.width = `${userChem}%`;
        }
        if (aiTeamInfo) {
            aiTeamInfo.querySelector('.team-name').textContent = 'Opponent';
            const aiChem = calculateTeamChemistry(matchData.aiTeam.players);
            aiTeamInfo.querySelector('.chemistry-value').textContent = `${aiChem}%`;
            aiTeamInfo.querySelector('.chemistry-fill').style.width = `${aiChem}%`;
        }
        if (scoreContainer) {
            scoreContainer.querySelector('.final-score').textContent = `${matchData.userScore} - ${matchData.aiScore}`;
            scoreContainer.querySelector('.match-winner').textContent = matchData.matchWinnerText;
        }
    }

    function renderTimeline(events) {
        const timelineContainer = document.querySelector('.timeline');
        if (!timelineContainer) return;
        timelineContainer.innerHTML = '';
        events.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.className = `timeline-event ${event.team}`;
            eventElement.innerHTML = `
                <div class="event-icon">${event.icon}</div>
                <div class="event-details"><strong>${event.minute}'</strong> - ${event.text}</div>
            `;
            timelineContainer.appendChild(eventElement);
        });
    }

    function renderGoalScorers(events) {
        const goalScorersContainer = document.getElementById('goal-scorers-list');
        if (!goalScorersContainer) return;
        goalScorersContainer.innerHTML = '';
        const goalEvents = events.filter(e => e.type === 'goal');
        goalEvents.forEach(event => {
            const scorerCard = document.createElement('div');
            scorerCard.className = 'goal-scorer-card';
            scorerCard.innerHTML = `
                <img src="${event.player.imageUrl}" alt="${event.player.name}">
                <div class="scorer-info">
                    <div class="scorer-name">${event.player.name} (${event.minute}')</div>
                    ${event.assist ? `<div class="assist-info">Assist by ${event.assist.name}</div>` : ''}
                </div>
            `;
            goalScorersContainer.appendChild(scorerCard);
        });
    }

    function renderTeamStats(stats) {
        const statsContainer = document.getElementById('team-stats-content');
        if (!statsContainer) return;
        statsContainer.innerHTML = `
            <div class="stat-bar-container">
                <div class="stat-values">
                    <span class="user-stat">${stats.user.shots} (${stats.user.shotsOnTarget})</span>
                    <span>Shots (On Target)</span>
                    <span class="ai-stat">${stats.ai.shots} (${stats.ai.shotsOnTarget})</span>
                </div>
                <div class="stat-bar">
                    <div class="stat-bar-user" style="width: ${stats.user.shots / (stats.user.shots + stats.ai.shots || 1) * 100}%"></div>
                    <div class="stat-bar-ai" style="width: ${stats.ai.shots / (stats.user.shots + stats.ai.shots || 1) * 100}%"></div>
                </div>
            </div>
            <div class="stat-bar-container">
                <div class="stat-values">
                    <span class="user-stat">${stats.user.possession}%</span>
                    <span>Possession</span>
                    <span class="ai-stat">${stats.ai.possession}%</span>
                </div>
                <div class="stat-bar">
                    <div class="stat-bar-user" style="width: ${stats.user.possession}%"></div>
                    <div class="stat-bar-ai" style="width: ${stats.ai.possession}%"></div>
                </div>
            </div>
            <div class="stat-bar-container">
                <div class="stat-values">
                    <span class="user-stat">${stats.user.passAccuracy}%</span>
                    <span>Pass Accuracy</span>
                    <span class="ai-stat">${stats.ai.passAccuracy}%</span>
                </div>
                <div class="stat-bar">
                    <div class="stat-bar-user" style="width: ${stats.user.passAccuracy}%"></div>
                    <div class="stat-bar-ai" style="width: ${stats.ai.passAccuracy}%"></div>
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

    function renderPlayerRatings(userPlayers, aiPlayers) {
        const ratingsContainer = document.querySelector('.player-ratings-grid');
        if (!ratingsContainer) return;
        ratingsContainer.innerHTML = '<h3>Your Team</h3>';
        userPlayers.forEach(player => {
            const ratingCard = document.createElement('div');
            ratingCard.className = 'player-rating-card';
            ratingCard.innerHTML = `
                <img src="${player.imageUrl}" alt="${player.name}" class="player-img">
                <div class="player-name">${player.name}</div>
                <div class="player-position">${player.position}</div>
                <div class="match-rating">${player.matchRating.toFixed(1)}</div>
            `;
            ratingsContainer.appendChild(ratingCard);
        });
        ratingsContainer.innerHTML += '<h3 class="mt-4">Opponent Team</h3>';
        aiPlayers.forEach(player => {
            const ratingCard = document.createElement('div');
            ratingCard.className = 'player-rating-card';
            ratingCard.innerHTML = `
                <img src="${player.imageUrl}" alt="${player.name}" class="player-img">
                <div class="player-name">${player.name}</div>
                <div class="player-position">${player.preferredPosition}</div>
                <div class="match-rating">${player.matchRating.toFixed(1)}</div>
            `;
            ratingsContainer.appendChild(ratingCard);
        });
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
      if (["ST", "LW", "RW", "CF"].includes(specificPosition)) return "Forward";
      if (
        ["CM", "CAM", "CDM", "LM", "RM", "LWB", "RWB"].includes(specificPosition)
      )
        return "Midfielder";
      if (["CB", "LB", "RB", "LWB", "RWB"].includes(specificPosition))
        return "Defender";
      if (specificPosition === "GK") return "Goalkeeper";
      return "Unknown";
    }

    // Generates a random AI team, excluding players from the user's team
    function generateAITeam(excludedPlayers = []) {
      const excludedPlayerNames = excludedPlayers.map(p => p.name);

      const availableForwards = predefinedPlayers.forwards.filter(p => !excludedPlayerNames.includes(p.name));
      const availableMidfielders = predefinedPlayers.midfielders.filter(p => !excludedPlayerNames.includes(p.name));
      const availableDefenders = predefinedPlayers.defenders.filter(p => !excludedPlayerNames.includes(p.name));
      const availableGoalkeepers = predefinedPlayers.goalkeepers.filter(p => !excludedPlayerNames.includes(p.name));

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

    // Calculates a simple team chemistry score
    function calculateTeamChemistry(teamPlayers) {
        let chemistry = 50; // Base chemistry
        const positionCounts = { GK: 0, DEF: 0, MID: 0, FWD: 0 };
        teamPlayers.forEach(p => {
            const group = getPositionGroup(p.position);
            if(positionCounts[group] !== undefined) positionCounts[group]++;
        });

        // Bonus for balanced formation
        if (positionCounts.GK === 1 && positionCounts.DEF >= 3 && positionCounts.MID >= 3 && positionCounts.FWD >= 1) {
            chemistry += 20;
        }

        // Bonus for players in preferred positions
        const preferredPositionBonus = teamPlayers.reduce((bonus, p) => {
            return bonus + (p.position === p.preferredPosition ? 2 : (p.secondaryPositions.includes(p.position) ? 1 : 0));
        }, 0);
        chemistry += preferredPositionBonus;

        return Math.max(0, Math.min(100, chemistry)); // Keep between 0 and 100
    }

    // Clears the user's selected team and lineup
    function clearTeam() {
      selectedPlayers = [];
      lineup = lineup.map(slot => ({ ...slot, player: null })); // Clear players from existing slots
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
        const shuffledPlayers = availablePlayersCopy.sort(() => 0.5 - Math.random());
        console.log("randomizeTeam: Shuffled players:", shuffledPlayers);

        const formationConfig = formationRequirements[currentFormation];
        const newSelectedPlayers = [];
        const newLineup = lineup.map(slot => ({ ...slot, player: null })); // Create a fresh lineup based on current formation slots
        console.log("randomizeTeam: Initial new lineup:", newLineup);

        // Helper to find and assign a player
        const assignPlayer = (slot, playerPool, positionCheckFn) => {
            const playerIndex = playerPool.findIndex(player => positionCheckFn(player, slot.positionType));
            if (playerIndex !== -1) {
                const player = playerPool.splice(playerIndex, 1)[0];
                slot.player = player;
                newSelectedPlayers.push(player);
                console.log(`randomizeTeam: Assigned ${player.name} to ${slot.slotId}`);
                return true;
            }
            return false;
        };

        // 1. Assign Goalkeeper
        const gkSlot = newLineup.find(slot => getPositionGroup(slot.positionType) === 'GK');
        if (gkSlot) {
            assignPlayer(gkSlot, shuffledPlayers, (player, posType) => getPositionGroup(player.preferredPosition) === 'GK');
        }

        // 2. Assign Defenders
        const defSlots = newLineup.filter(slot => getPositionGroup(slot.positionType) === 'DEF' && !slot.player);
        defSlots.forEach(slot => {
            assignPlayer(slot, shuffledPlayers, (player, posType) => getPositionGroup(player.preferredPosition) === 'DEF' && (player.preferredPosition === posType || player.secondaryPositions.includes(posType)));
        });
        // Fill remaining defender slots with any available defender
        defSlots.filter(slot => !slot.player).forEach(slot => {
            assignPlayer(slot, shuffledPlayers, (player, posType) => getPositionGroup(player.preferredPosition) === 'DEF');
        });

        // 3. Assign Midfielders
        const midSlots = newLineup.filter(slot => getPositionGroup(slot.positionType) === 'MID' && !slot.player);
        midSlots.forEach(slot => {
            assignPlayer(slot, shuffledPlayers, (player, posType) => getPositionGroup(player.preferredPosition) === 'MID' && (player.preferredPosition === posType || player.secondaryPositions.includes(posType)));
        });
        // Fill remaining midfielder slots with any available midfielder
        midSlots.filter(slot => !slot.player).forEach(slot => {
            assignPlayer(slot, shuffledPlayers, (player, posType) => getPositionGroup(player.preferredPosition) === 'MID');
        });

        // 4. Assign Forwards
        const fwdSlots = newLineup.filter(slot => getPositionGroup(slot.positionType) === 'FWD' && !slot.player);
        fwdSlots.forEach(slot => {
            assignPlayer(slot, shuffledPlayers, (player, posType) => getPositionGroup(player.preferredPosition) === 'FWD' && (player.preferredPosition === posType || player.secondaryPositions.includes(posType)));
        });
        // Fill remaining forward slots with any available forward
        fwdSlots.filter(slot => !slot.player).forEach(slot => {
            assignPlayer(slot, shuffledPlayers, (player, posType) => getPositionGroup(player.preferredPosition) === 'FWD');
        });

        // 5. Fill any remaining empty slots with any available player (less ideal, but ensures 11 players)
        newLineup.filter(slot => !slot.player).forEach(slot => {
            assignPlayer(slot, shuffledPlayers, (player, posType) => true); // Any player will do
        });

        lineup = newLineup;
        selectedPlayers = newSelectedPlayers;
        console.log("randomizeTeam: Final lineup:", lineup, "Final selectedPlayers:", selectedPlayers);

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
      if(availablePlayersDiv) availablePlayersDiv.innerHTML = ""; // Clear available players
      if(opponentAvailablePlayersDiv) opponentAvailablePlayersDiv.innerHTML = ""; // Clear opponent available players
      document
        .querySelectorAll(".formation-btn, .custom-formation-btn")
        .forEach((btn) => btn.classList.remove("active"));
      if(simulateMatchBtn) simulateMatchBtn.disabled = true;
      if(confirmOpponentTeamBtn) confirmOpponentTeamBtn.disabled = true;

      if(document.getElementById('post-match-section')) document.getElementById('post-match-section').classList.add("hidden");
      if(formationSelectionSection) formationSelectionSection.classList.add("hidden");
      if(playerSelectionSection) playerSelectionSection.classList.add("hidden");
      if(opponentSelectionSection) opponentSelectionSection.classList.add("hidden");
      if(playerSourceSelection) playerSourceSelection.classList.add("hidden"); // Hide player source selection initially
      if(tournamentCompleteSection) tournamentCompleteSection.classList.add("hidden");
      if(liveSimulationSection) liveSimulationSection.classList.add("hidden");
      if(tournamentSection) tournamentSection.classList.remove("hidden"); // Show tournament section

      if(lineupDisplay) lineupDisplay.innerHTML = ""; // Clear lineup display
      
      renderCustomFormationButtons();
    }

    // Advances to the next game of the tournament
    function nextGameOfTournament() {
      const postMatchSection = document.getElementById('post-match-section');
      if(postMatchSection) postMatchSection.classList.add("hidden");

      // Check if tournament is complete
      if (
        tournament.userWins >= Math.ceil(tournament.maxRounds / 2) ||
        tournament.aiWins >= Math.ceil(tournament.maxRounds / 2)
      ) {
        return;
      }

      // For user-picked opponents, go back to opponent selection
      if (tournament.opponentSelectionMode === 'userPicked') {
          selectedOpponentPlayers = [];
          if(opponentSelectedPlayerCountSpan) opponentSelectedPlayerCountSpan.textContent = '0';
          if(confirmOpponentTeamBtn) confirmOpponentTeamBtn.disabled = true;
          renderPlayers(allPlayersData, opponentAvailablePlayersDiv, true, true);
          if(opponentSelectionSection) opponentSelectionSection.style.display = 'block';
          return;
      }

      const newAiTeam = generateAITeam(selectedPlayers).players;
      tournament.opponents.push(newAiTeam.players);
      saveTournament();
      simulateMatch();
    }

    // --- Custom Formation Functions ---
    function loadCustomFormations() {
        const savedFormations = localStorage.getItem('customFormations');
        if (savedFormations) {
            customFormations = JSON.parse(savedFormations);
            renderCustomFormationButtons();
        }
    }

    function renderCustomFormationButtons() {
        customFormationOptionsDiv.innerHTML = '';
        customFormations.forEach(formation => {
            const container = document.createElement('div');
            container.className = 'custom-formation-btn-container';

            const btn = document.createElement('button');
            btn.className = 'btn btn-outline-primary custom-formation-btn';
            btn.dataset.formation = formation.name;
            btn.textContent = formation.name;
            btn.addEventListener('click', () => handleFormationSelection(formation.name, true));

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-formation-btn';
            deleteBtn.innerHTML = '&times;';
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                deleteCustomFormation(formation.name);
            });

            container.appendChild(btn);
            container.appendChild(deleteBtn);
            customFormationOptionsDiv.appendChild(container);
        });
    }

    function initializeFormationBuilder() {
        playerPlaceholdersContainer.innerHTML = '';
        for (let i = 1; i <= 11; i++) {
            const placeholder = document.createElement('div');
            placeholder.className = 'player-placeholder';
            placeholder.textContent = i;
            placeholder.draggable = true;
            placeholder.id = `placeholder-${i}`;
            placeholder.style.left = `${10 + (i-1)*8}%`;
            placeholder.style.top = '45%';
            playerPlaceholdersContainer.appendChild(placeholder);

            placeholder.addEventListener('dragstart', (e) => {
                draggedElement = e.target;
                setTimeout(() => {
                    e.target.classList.add('dragging');
                }, 0);
            });

            placeholder.addEventListener('dragend', (e) => {
                draggedElement.classList.remove('dragging');
                draggedElement = null;
            });
        }
    }

    function saveCustomFormation() {
        const name = customFormationNameInput.value.trim();
        if (!name) {
            alert('Please enter a name for the formation.');
            return;
        }
        if (customFormations.some(f => f.name === name) || formationLineups[name]) {
            alert('A formation with this name already exists.');
            return;
        }

        const formation = {
            name: name,
            isCustom: true,
            lineup: [],
            requirements: { GK: 0, DEF: 0, MID: 0, FWD: 0 }
        };

        const placeholders = playerPlaceholdersContainer.querySelectorAll('.player-placeholder');
        let allPositionsSet = true;
        placeholders.forEach((p, index) => {
            const position = p.dataset.position;
            if (!position) {
                allPositionsSet = false;
            }

            const rect = customPitch.getBoundingClientRect();
            const placeholderRect = p.getBoundingClientRect();
            const x = ((placeholderRect.left - rect.left + placeholderRect.width / 2) / rect.width) * 100;
            const y = ((placeholderRect.top - rect.top + placeholderRect.height / 2) / rect.height) * 100;

            formation.lineup.push({
                slotId: `custom${index}`,
                positionType: position,
                coords: { x, y }
            });
            const group = getPositionGroup(position);
            if(formation.requirements[group] !== undefined) {
                formation.requirements[group]++;
            }
        });

        if (!allPositionsSet) {
            alert('Please set a position for all players on the pitch.');
            return;
        }

        if (formation.requirements.GK !== 1) {
            alert('You must have exactly one Goalkeeper.');
            return;
        }

        customFormations.push(formation);
        localStorage.setItem('customFormations', JSON.stringify(customFormations));
        renderCustomFormationButtons();
        customFormationModal.hide();
    }

    function deleteCustomFormation(name) {
        if (confirm(`Are you sure you want to delete the formation "${name}"?`)) {
            customFormations = customFormations.filter(f => f.name !== name);
            localStorage.setItem('customFormations', JSON.stringify(customFormations));
            renderCustomFormationButtons();
        }
    }

    function showCustomPositionMenu(element, yPercent, xPercent) {
        let zone = 'FWD';
        if (yPercent > 85) zone = 'GK';
        else if (yPercent > 60) zone = 'DEF';
        else if (yPercent > 25) zone = 'MID';

        let possiblePositions = [];
        if (zone === 'GK') {
            possiblePositions = ['GK'];
        } else if (zone === 'DEF') {
            if (xPercent < 33) possiblePositions = ['LB', 'LWB', 'CB'];
            else if (xPercent > 66) possiblePositions = ['RB', 'RWB', 'CB'];
            else possiblePositions = ['CB'];
        } else if (zone === 'MID') {
            if (xPercent < 33) possiblePositions = ['LM', 'CM', 'CAM', 'CDM'];
            else if (xPercent > 66) possiblePositions = ['RM', 'CM', 'CAM', 'CDM'];
            else possiblePositions = ['CM', 'CAM', 'CDM'];
        } else { // FWD
            if (xPercent < 33) possiblePositions = ['LW', 'ST', 'CF'];
            else if (xPercent > 66) possiblePositions = ['RW', 'ST', 'CF'];
            else possiblePositions = ['ST', 'CF'];
        }

        const modalBody = document.getElementById('custom-position-modal-body');
        modalBody.innerHTML = '';
        possiblePositions.forEach(pos => {
            const btn = document.createElement('button');
            btn.className = 'btn btn-outline-primary m-1';
            btn.textContent = pos;
            btn.onclick = () => {
                element.dataset.position = pos;
                element.textContent = pos;
                bootstrap.Modal.getInstance(document.getElementById('custom-position-modal')).hide();
            };
            modalBody.appendChild(btn);
        });

        const posModal = new bootstrap.Modal(document.getElementById('custom-position-modal'));
        posModal.show();
    }

    customPitch.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    customPitch.addEventListener('drop', (e) => {
        e.preventDefault();
        if (draggedElement) {
            const rect = customPitch.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const xPercent = (x / rect.width) * 100;
            const yPercent = (y / rect.height) * 100;
            
            draggedElement.style.left = `${x - (draggedElement.offsetWidth / 2)}px`;
            draggedElement.style.top = `${y - (draggedElement.offsetHeight / 2)}px`;

            showCustomPositionMenu(draggedElement, yPercent, xPercent);
        }
    });


    // --- Event Listeners ---
    if(predefinedPlayersBtn) predefinedPlayersBtn.addEventListener("click", () => {
        if(playerSourceSelection) playerSourceSelection.classList.add("hidden");
        if(formationSelectionSection) formationSelectionSection.classList.remove("hidden");
        renderPlayers(allPlayersData, availablePlayersDiv, true); // Render for user selection
    });

    if(apiPlayersBtn) apiPlayersBtn.addEventListener("click", () =>
      alert(
        "API integration is coming soon! Please use pre-defined players for now."
      )
    );

    if(confirmTeamBtn) confirmTeamBtn.addEventListener("click", () => {
      if (isValidTeam()) {
        if(playerSelectionSection) playerSelectionSection.classList.add("hidden");
        if (tournament.opponentSelectionMode === "aiGenerated") {
            const aiTeam = generateAITeam(selectedPlayers);
            tournament.opponents.push(aiTeam.players);
            simulateMatch();
        } else {
            if(opponentSelectionSection) opponentSelectionSection.classList.remove("hidden");
            renderPlayers(allPlayersData, opponentAvailablePlayersDiv, true, true);
        }
      } else {
        alert(
          `Please select exactly ${MAX_PLAYERS} players and ensure all position requirements for the chosen formation are met.`
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
        if (isValidOpponentTeam()) {
          if(opponentSelectionSection) opponentSelectionSection.classList.add("hidden");
          simulateMatch();
        }
      });
    }

    if(formationOptionsDiv) formationOptionsDiv.addEventListener("click", (event) => {
      if (event.target.classList.contains("formation-btn")) {
        handleFormationSelection(event.target.dataset.formation);
      }
    });

    if(skipSimulationBtn) skipSimulationBtn.addEventListener("click", () => {
        isSimulationSkipped = true;
    });

    const postMatchReSimBtn = document.getElementById('re-sim-match-btn');
    if(postMatchReSimBtn) postMatchReSimBtn.addEventListener('click', simulateMatch);

    const postMatchNextGameBtn = document.getElementById('next-game-tournament-btn');
    if(postMatchNextGameBtn) postMatchNextGameBtn.addEventListener('click', nextGameOfTournament);
    
    const mainMenuBtn = document.getElementById('main-menu-btn');
    if(mainMenuBtn) mainMenuBtn.addEventListener('click', resetGame);

    if (resetTournamentBtn) {
      resetTournamentBtn.addEventListener("click", resetGame);
    }
    
    // Tournament type selection
    if(tournamentTypeSelect) tournamentTypeSelect.addEventListener("change", (event) => {
      tournament.maxRounds = parseInt(event.target.value);
      saveTournament();
    });

    // Opponent type selection
    if(aiGeneratedOpponentRadio) aiGeneratedOpponentRadio.addEventListener("change", () => {
      tournament.opponentSelectionMode = "aiGenerated";
      saveTournament();
    });

    if(pickOpponentTeamRadio) pickOpponentTeamRadio.addEventListener("change", () => {
      tournament.opponentSelectionMode = "userPicked";
      saveTournament();
    });

    // Start Tournament button functionality
    if(startTournamentBtn) startTournamentBtn.addEventListener("click", () => {
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

      if(tournamentSection) tournamentSection.classList.add("hidden");
      if(playerSourceSelection) playerSourceSelection.classList.remove("hidden");
      
    });

    // Navbar Home and Brand link functionality
    if(homeLink) homeLink.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default link behavior
      resetGame();
    });

    if(navbarBrand) navbarBrand.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default link behavior
      resetGame();
    });

    // Go Back button functionality
    if(goBackButtons) goBackButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const currentSection = event.target.closest(".card");
        const targetSectionId = event.target.dataset.targetSection;
        const targetSection = document.getElementById(targetSectionId);

        // Hide current section
        if(currentSection) currentSection.classList.add("hidden");

        // Show target section
        if(targetSection) targetSection.classList.remove("hidden");
      });
    });

    // Custom Formation Listeners
    if(createCustomFormationBtn) createCustomFormationBtn.addEventListener('click', () => {
        initializeFormationBuilder();
        customFormationModal.show();
    });

    if(saveCustomFormationBtn) saveCustomFormationBtn.addEventListener('click', saveCustomFormation);


    // Initial setup
    // Ensure all sections are hidden except tournament section on initial load
    if(playerSourceSelection) playerSourceSelection.classList.add("hidden");
    if(playerSelectionSection) playerSelectionSection.classList.add("hidden");
    if(formationSelectionSection) formationSelectionSection.classList.add("hidden");
    if(document.getElementById('post-match-section')) document.getElementById('post-match-section').classList.add("hidden");
    if(opponentSelectionSection) opponentSelectionSection.classList.add("hidden");
    if(tournamentCompleteSection) tournamentCompleteSection.classList.add("hidden");
    if(liveSimulationSection) liveSimulationSection.classList.add("hidden");
    if(tournamentSection) tournamentSection.classList.remove("hidden"); // Show tournament section

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
    if(simulateMatchBtn) simulateMatchBtn.disabled = true;
  } catch (error) {
    console.error("An error occurred: ", error);
  }
});
