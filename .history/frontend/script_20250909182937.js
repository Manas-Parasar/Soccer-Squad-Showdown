document.addEventListener("DOMContentLoaded", () => {
  // --- DOM Elements ---
  const playerSelectionSection = document.getElementById(
    "player-selection-section"
  );
  const availablePlayersDiv = document.getElementById("available-players");
  const selectedPlayerCountSpan = document.getElementById(
    "selected-player-count"
  );
  const confirmTeamBtn = document.getElementById("confirm-team-btn");
  const lineupDisplay = document.getElementById("lineup-display");
  const formationOptionsDiv = document.getElementById("formation-options");
  const homeLink = document.getElementById("home-link");
  const navbarBrand = document.getElementById("navbar-brand");

  // --- State Variables ---
  const MAX_PLAYERS = 11;
  let allPlayersData = [];
  let lineup = []; // This will be our main state for the lineup
  let currentFormation = "4-3-3"; // Default formation
  let draggedPlayer = { element: null, player: null, fromSlotId: null };

  // --- Predefined Player Data (omitted for brevity, but assumed to be here) ---
  const predefinedPlayers = {
    goalkeepers: [
      {
        name: "Neuer",
        preferredPosition: "GK",
        secondaryPositions: [],
        pace: 60,
        shooting: 50,
        passing: 70,
        dribbling: 65,
        defending: 55,
        physical: 80,
        goalkeeping: 92,
        agility: 60,
        balance: 65,
        vision: 70,
        interceptions: 55,
        tackling: 50,
        stamina: 75,
        xG: 0.01,
        xA: 0.05,
        keyPasses: 0.1,
        pressures: 5,
        reflexes: 90,
        imageUrl: "images/neuer.jpg",
      },
      {
        name: "Buffon",
        preferredPosition: "GK",
        secondaryPositions: [],
        pace: 58,
        shooting: 48,
        passing: 68,
        dribbling: 60,
        defending: 53,
        physical: 78,
        goalkeeping: 90,
        agility: 58,
        balance: 60,
        vision: 68,
        interceptions: 53,
        tackling: 48,
        stamina: 73,
        xG: 0.01,
        xA: 0.04,
        keyPasses: 0.1,
        pressures: 4,
        reflexes: 88,
        imageUrl: "images/buffon.jpg",
      },
      {
        name: "Casillas",
        preferredPosition: "GK",
        secondaryPositions: [],
        pace: 62,
        shooting: 49,
        passing: 69,
        dribbling: 63,
        defending: 54,
        physical: 79,
        goalkeeping: 89,
        agility: 62,
        balance: 63,
        vision: 69,
        interceptions: 54,
        tackling: 49,
        stamina: 74,
        xG: 0.01,
        xA: 0.05,
        keyPasses: 0.1,
        pressures: 5,
        reflexes: 87,
        imageUrl: "images/casillas.jpg",
      },
      {
        name: "Ter Stegen",
        preferredPosition: "GK",
        secondaryPositions: [],
        pace: 61,
        shooting: 51,
        passing: 72,
        dribbling: 66,
        defending: 56,
        physical: 81,
        goalkeeping: 91,
        agility: 61,
        balance: 66,
        vision: 72,
        interceptions: 56,
        tackling: 51,
        stamina: 76,
        xG: 0.01,
        xA: 0.06,
        keyPasses: 0.1,
        pressures: 5,
        reflexes: 89,
        imageUrl: "images/terstegen.jpg",
      },
    ],
    defenders: [
      {
        name: "Alba",
        preferredPosition: "LB",
        secondaryPositions: ["LWB"],
        pace: 88,
        dribbling: 80,
        passing: 82,
        shooting: 65,
        defending: 84,
        physical: 75,
        goalkeeping: 0,
        agility: 85,
        balance: 80,
        vision: 75,
        interceptions: 80,
        tackling: 85,
        stamina: 88,
        xG: 0.05,
        xA: 0.2,
        keyPasses: 0.8,
        pressures: 15,
        reflexes: 0,
        imageUrl: "images/alba.jpg",
      },
      {
        name: "Maldini",
        preferredPosition: "LB",
        secondaryPositions: ["CB"],
        pace: 80,
        dribbling: 75,
        passing: 78,
        shooting: 60,
        defending: 95,
        physical: 90,
        goalkeeping: 0,
        agility: 78,
        balance: 75,
        vision: 70,
        interceptions: 92,
        tackling: 95,
        stamina: 85,
        xG: 0.02,
        xA: 0.08,
        keyPasses: 0.3,
        pressures: 18,
        reflexes: 0,
        imageUrl: "images/maldini.jpg",
      },
      {
        name: "Marcelo",
        preferredPosition: "LB",
        secondaryPositions: ["LWB", "LM"],
        pace: 85,
        dribbling: 88,
        passing: 87,
        shooting: 70,
        defending: 78,
        physical: 70,
        goalkeeping: 0,
        agility: 88,
        balance: 85,
        vision: 80,
        interceptions: 75,
        tackling: 78,
        stamina: 80,
        xG: 0.08,
        xA: 0.25,
        keyPasses: 1.0,
        pressures: 12,
        reflexes: 0,
        imageUrl: "images/marcelo.jpg",
      },
      {
        name: "Cancelo",
        preferredPosition: "LB",
        secondaryPositions: ["RB", "CM"],
        pace: 86,
        dribbling: 89,
        passing: 88,
        shooting: 72,
        defending: 80,
        physical: 78,
        goalkeeping: 0,
        agility: 87,
        balance: 86,
        vision: 85,
        interceptions: 78,
        tackling: 80,
        stamina: 85,
        xG: 0.07,
        xA: 0.28,
        keyPasses: 1.2,
        pressures: 14,
        reflexes: 0,
        imageUrl: "images/cancelo.jpg",
      },
      {
        name: "Araujo",
        preferredPosition: "CB",
        secondaryPositions: ["RB"],
        pace: 82,
        dribbling: 70,
        passing: 70,
        shooting: 55,
        defending: 88,
        physical: 90,
        goalkeeping: 0,
        agility: 75,
        balance: 70,
        vision: 65,
        interceptions: 85,
        tackling: 90,
        stamina: 88,
        xG: 0.03,
        xA: 0.05,
        keyPasses: 0.2,
        pressures: 16,
        reflexes: 0,
        imageUrl: "images/araujo.jpg",
      },
      {
        name: "Van Dijk",
        preferredPosition: "CB",
        secondaryPositions: [],
        pace: 78,
        dribbling: 70,
        passing: 75,
        shooting: 60,
        defending: 92,
        physical: 93,
        goalkeeping: 0,
        agility: 70,
        balance: 72,
        vision: 70,
        interceptions: 90,
        tackling: 92,
        stamina: 90,
        xG: 0.04,
        xA: 0.07,
        keyPasses: 0.3,
        pressures: 17,
        reflexes: 0,
        imageUrl: "images/vandijk.jpg",
      },
      {
        name: "Ramos",
        preferredPosition: "CB",
        secondaryPositions: ["RB"],
        pace: 75,
        dribbling: 70,
        passing: 72,
        shooting: 68,
        defending: 91,
        physical: 92,
        goalkeeping: 0,
        agility: 70,
        balance: 70,
        vision: 68,
        interceptions: 88,
        tackling: 91,
        stamina: 88,
        xG: 0.06,
        xA: 0.06,
        keyPasses: 0.4,
        pressures: 19,
        reflexes: 0,
        imageUrl: "images/ramos.jpg",
      },
      {
        name: "Pique",
        preferredPosition: "CB",
        secondaryPositions: [],
        pace: 70,
        dribbling: 68,
        passing: 70,
        shooting: 58,
        defending: 89,
        physical: 88,
        goalkeeping: 0,
        agility: 68,
        balance: 68,
        vision: 65,
        interceptions: 87,
        tackling: 89,
        stamina: 85,
        xG: 0.03,
        xA: 0.05,
        keyPasses: 0.2,
        pressures: 15,
        reflexes: 0,
        imageUrl: "images/pique.jpg",
      },
      {
        name: "Kounde",
        preferredPosition: "RB",
        secondaryPositions: ["CB"],
        pace: 85,
        dribbling: 80,
        passing: 78,
        shooting: 60,
        defending: 85,
        physical: 82,
        goalkeeping: 0,
        agility: 82,
        balance: 80,
        vision: 72,
        interceptions: 80,
        tackling: 85,
        stamina: 85,
        xG: 0.04,
        xA: 0.15,
        keyPasses: 0.7,
        pressures: 16,
        reflexes: 0,
        imageUrl: "images/kounde.jpg",
      },
      {
        name: "Alves",
        preferredPosition: "RB",
        secondaryPositions: [],
        pace: 83,
        dribbling: 85,
        passing: 86,
        shooting: 68,
        defending: 78,
        physical: 75,
        goalkeeping: 0,
        agility: 85,
        balance: 82,
        vision: 80,
        interceptions: 75,
        tackling: 78,
        stamina: 82,
        xG: 0.06,
        xA: 0.22,
        keyPasses: 0.9,
        pressures: 13,
        reflexes: 0,
        imageUrl: "images/alves.jpg",
      },
      {
        name: "Carvajal",
        preferredPosition: "RB",
        secondaryPositions: [],
        pace: 80,
        dribbling: 78,
        passing: 79,
        shooting: 65,
        defending: 82,
        physical: 78,
        goalkeeping: 0,
        agility: 78,
        balance: 78,
        vision: 70,
        interceptions: 80,
        tackling: 82,
        stamina: 85,
        xG: 0.04,
        xA: 0.18,
        keyPasses: 0.7,
        pressures: 15,
        reflexes: 0,
        imageUrl: "images/carvajal.jpg",
      },
      {
        name: "Trent",
        preferredPosition: "RB",
        secondaryPositions: ["CM", "RW"],
        pace: 80,
        dribbling: 85,
        passing: 90,
        shooting: 75,
        defending: 78,
        physical: 78,
        goalkeeping: 0,
        agility: 80,
        balance: 80,
        vision: 90,
        interceptions: 75,
        tackling: 78,
        stamina: 88,
        xG: 0.08,
        xA: 0.35,
        keyPasses: 1.5,
        pressures: 10,
        reflexes: 0,
        imageUrl: "images/trent.jpg",
      },
    ],
    midfielders: [
      {
        name: "Zidane",
        preferredPosition: "CAM",
        secondaryPositions: ["CM"],
        pace: 75,
        dribbling: 95,
        passing: 92,
        shooting: 85,
        defending: 60,
        physical: 80,
        goalkeeping: 0,
        agility: 90,
        balance: 92,
        vision: 95,
        interceptions: 60,
        tackling: 55,
        stamina: 80,
        xG: 0.15,
        xA: 0.4,
        keyPasses: 2.0,
        pressures: 8,
        reflexes: 0,
        imageUrl: "images/zidane.jpg",
      },
      {
        name: "Maradona",
        preferredPosition: "CAM",
        secondaryPositions: ["LW", "RW"],
        pace: 80,
        dribbling: 98,
        passing: 90,
        shooting: 88,
        defending: 55,
        physical: 70,
        goalkeeping: 0,
        agility: 95,
        balance: 98,
        vision: 92,
        interceptions: 50,
        tackling: 50,
        stamina: 75,
        xG: 0.2,
        xA: 0.35,
        keyPasses: 1.8,
        pressures: 7,
        reflexes: 0,
        imageUrl: "images/maradona.jpg",
      },
      {
        name: "De Bruyne",
        preferredPosition: "CAM",
        secondaryPositions: ["CM"],
        pace: 78,
        dribbling: 88,
        passing: 94,
        shooting: 90,
        defending: 65,
        physical: 80,
        goalkeeping: 0,
        agility: 85,
        balance: 88,
        vision: 98,
        interceptions: 65,
        tackling: 60,
        stamina: 90,
        xG: 0.25,
        xA: 0.5,
        keyPasses: 2.5,
        pressures: 10,
        reflexes: 0,
        imageUrl: "images/debruyne.jpg",
      },
      {
        name: "Bellingham",
        preferredPosition: "CAM",
        secondaryPositions: ["CM"],
        pace: 82,
        dribbling: 85,
        passing: 87,
        shooting: 80,
        defending: 75,
        physical: 88,
        goalkeeping: 0,
        agility: 80,
        balance: 82,
        vision: 85,
        interceptions: 75,
        tackling: 78,
        stamina: 90,
        xG: 0.18,
        xA: 0.25,
        keyPasses: 1.2,
        pressures: 15,
        reflexes: 0,
        imageUrl: "images/bellingham.jpg",
      },
      {
        name: "Iniesta",
        preferredPosition: "CM",
        secondaryPositions: ["CAM"],
        pace: 70,
        dribbling: 92,
        passing: 95,
        shooting: 70,
        defending: 65,
        physical: 68,
        goalkeeping: 0,
        agility: 90,
        balance: 92,
        vision: 98,
        interceptions: 65,
        tackling: 60,
        stamina: 85,
        xG: 0.1,
        xA: 0.45,
        keyPasses: 2.2,
        pressures: 9,
        reflexes: 0,
        imageUrl: "images/iniesta.jpg",
      },
      {
        name: "Xavi",
        preferredPosition: "CM",
        secondaryPositions: ["CDM"],
        pace: 65,
        dribbling: 88,
        passing: 96,
        shooting: 60,
        defending: 70,
        physical: 65,
        goalkeeping: 0,
        agility: 85,
        balance: 88,
        vision: 99,
        interceptions: 70,
        tackling: 65,
        stamina: 80,
        xG: 0.08,
        xA: 0.48,
        keyPasses: 2.5,
        pressures: 10,
        reflexes: 0,
        imageUrl: "images/xavi.jpg",
      },
      {
        name: "Modric",
        preferredPosition: "CM",
        secondaryPositions: ["CAM"],
        pace: 70,
        dribbling: 90,
        passing: 93,
        shooting: 75,
        defending: 70,
        physical: 70,
        goalkeeping: 0,
        agility: 88,
        balance: 90,
        vision: 95,
        interceptions: 70,
        tackling: 68,
        stamina: 88,
        xG: 0.12,
        xA: 0.4,
        keyPasses: 2.0,
        pressures: 12,
        reflexes: 0,
        imageUrl: "images/modric.jpg",
      },
      {
        name: "Kroos",
        preferredPosition: "CM",
        secondaryPositions: ["CDM"],
        pace: 60,
        dribbling: 85,
        passing: 94,
        shooting: 80,
        defending: 72,
        physical: 75,
        goalkeeping: 0,
        agility: 80,
        balance: 85,
        vision: 96,
        interceptions: 72,
        tackling: 70,
        stamina: 85,
        xG: 0.15,
        xA: 0.42,
        keyPasses: 2.1,
        pressures: 10,
        reflexes: 0,
        imageUrl: "images/kroos.jpg",
      },
      {
        name: "Pedri",
        preferredPosition: "CM",
        secondaryPositions: ["CAM"],
        pace: 75,
        dribbling: 90,
        passing: 92,
        shooting: 70,
        defending: 70,
        physical: 70,
        goalkeeping: 0,
        agility: 88,
        balance: 90,
        vision: 90,
        interceptions: 70,
        tackling: 68,
        stamina: 85,
        xG: 0.1,
        xA: 0.35,
        keyPasses: 1.8,
        pressures: 11,
        reflexes: 0,
        imageUrl: "images/pedri.jpg",
      },
      {
        name: "Valverde",
        preferredPosition: "CDM",
        secondaryPositions: ["CM"],
        pace: 85,
        dribbling: 80,
        passing: 82,
        shooting: 80,
        defending: 85,
        physical: 88,
        goalkeeping: 0,
        agility: 80,
        balance: 80,
        vision: 80,
        interceptions: 85,
        tackling: 88,
        stamina: 92,
        xG: 0.1,
        xA: 0.15,
        keyPasses: 0.8,
        pressures: 20,
        reflexes: 0,
        imageUrl: "images/valverde.jpg",
      },
      {
        name: "Rodri",
        preferredPosition: "CDM",
        secondaryPositions: ["CB"],
        pace: 65,
        dribbling: 75,
        passing: 88,
        shooting: 70,
        defending: 90,
        physical: 90,
        goalkeeping: 0,
        agility: 70,
        balance: 75,
        vision: 85,
        interceptions: 90,
        tackling: 92,
        stamina: 90,
        xG: 0.05,
        xA: 0.1,
        keyPasses: 0.7,
        pressures: 22,
        reflexes: 0,
        imageUrl: "images/rodri.jpg",
      },
      {
        name: "Busquets",
        preferredPosition: "CDM",
        secondaryPositions: ["CM"],
        pace: 55,
        dribbling: 80,
        passing: 90,
        shooting: 60,
        defending: 88,
        physical: 80,
        goalkeeping: 0,
        agility: 75,
        balance: 80,
        vision: 92,
        interceptions: 88,
        tackling: 85,
        stamina: 80,
        xG: 0.04,
        xA: 0.12,
        keyPasses: 0.9,
        pressures: 18,
        reflexes: 0,
        imageUrl: "images/busquets.jpg",
      },
    ],
    forwards: [
      {
        name: "Messi",
        preferredPosition: "RW",
        secondaryPositions: ["CAM"],
        pace: 85,
        dribbling: 98,
        passing: 90,
        shooting: 95,
        defending: 35,
        physical: 65,
        goalkeeping: 0,
        agility: 95,
        balance: 98,
        vision: 95,
        interceptions: 30,
        tackling: 25,
        stamina: 80,
        xG: 0.8,
        xA: 0.6,
        keyPasses: 3.0,
        pressures: 5,
        reflexes: 0,
        imageUrl: "images/messi.jpg",
      },
      {
        name: "Salah",
        preferredPosition: "RW",
        secondaryPositions: ["LW"],
        pace: 90,
        dribbling: 88,
        passing: 80,
        shooting: 90,
        defending: 40,
        physical: 75,
        goalkeeping: 0,
        agility: 90,
        balance: 88,
        vision: 80,
        interceptions: 35,
        tackling: 30,
        stamina: 88,
        xG: 0.7,
        xA: 0.3,
        keyPasses: 1.5,
        pressures: 10,
        reflexes: 0,
        imageUrl: "images/salah.jpg",
      },
      {
        name: "Bale",
        preferredPosition: "RW",
        secondaryPositions: ["ST"],
        pace: 92,
        dribbling: 85,
        passing: 78,
        shooting: 88,
        defending: 30,
        physical: 80,
        goalkeeping: 0,
        agility: 85,
        balance: 82,
        vision: 75,
        interceptions: 25,
        tackling: 20,
        stamina: 85,
        xG: 0.6,
        xA: 0.2,
        keyPasses: 1.0,
        pressures: 8,
        reflexes: 0,
        imageUrl: "images/bale.jpg",
      },
      {
        name: "Yamal",
        preferredPosition: "RW",
        secondaryPositions: [],
        pace: 88,
        dribbling: 90,
        passing: 80,
        shooting: 80,
        defending: 30,
        physical: 68,
        goalkeeping: 0,
        agility: 90,
        balance: 88,
        vision: 78,
        interceptions: 28,
        tackling: 25,
        stamina: 80,
        xG: 0.5,
        xA: 0.25,
        keyPasses: 1.2,
        pressures: 7,
        reflexes: 0,
        imageUrl: "images/yamal.jpg",
      },
      {
        name: "Haaland",
        preferredPosition: "ST",
        secondaryPositions: ["LW"],
        pace: 90,
        dribbling: 75,
        passing: 70,
        shooting: 95,
        defending: 30,
        physical: 90,
        goalkeeping: 0,
        agility: 75,
        balance: 70,
        vision: 68,
        interceptions: 25,
        tackling: 20,
        stamina: 88,
        xG: 0.9,
        xA: 0.1,
        keyPasses: 0.5,
        pressures: 12,
        reflexes: 0,
        imageUrl: "images/haaland.jpg",
      },
      {
        name: "Lewandowski",
        preferredPosition: "ST",
        secondaryPositions: [],
        pace: 80,
        dribbling: 80,
        passing: 75,
        shooting: 93,
        defending: 30,
        physical: 85,
        goalkeeping: 0,
        agility: 80,
        balance: 80,
        vision: 72,
        interceptions: 28,
        tackling: 25,
        stamina: 85,
        xG: 0.85,
        xA: 0.15,
        keyPasses: 0.7,
        pressures: 10,
        reflexes: 0,
        imageUrl: "images/lewandowski.jpg",
      },
      {
        name: "Benzema",
        preferredPosition: "ST",
        secondaryPositions: ["CAM"],
        pace: 78,
        dribbling: 85,
        passing: 82,
        shooting: 90,
        defending: 35,
        physical: 80,
        goalkeeping: 0,
        agility: 85,
        balance: 82,
        vision: 80,
        interceptions: 30,
        tackling: 28,
        stamina: 82,
        xG: 0.75,
        xA: 0.25,
        keyPasses: 1.0,
        pressures: 9,
        reflexes: 0,
        imageUrl: "images/benzema.jpg",
      },
      {
        name: "Suarez",
        preferredPosition: "ST",
        secondaryPositions: [],
        pace: 75,
        dribbling: 85,
        passing: 78,
        shooting: 90,
        defending: 40,
        physical: 82,
        goalkeeping: 0,
        agility: 85,
        balance: 85,
        vision: 75,
        interceptions: 35,
        tackling: 30,
        stamina: 80,
        xG: 0.7,
        xA: 0.2,
        keyPasses: 0.8,
        pressures: 11,
        reflexes: 0,
        imageUrl: "images/suarez.jpg",
      },
      {
        name: "Ronaldo",
        preferredPosition: "LW",
        secondaryPositions: ["ST", "RW"],
        pace: 88,
        dribbling: 85,
        passing: 78,
        shooting: 95,
        defending: 30,
        physical: 88,
        goalkeeping: 0,
        agility: 85,
        balance: 82,
        vision: 75,
        interceptions: 25,
        tackling: 20,
        stamina: 88,
        xG: 0.85,
        xA: 0.2,
        keyPasses: 1.0,
        pressures: 9,
        reflexes: 0,
        imageUrl: "images/ronaldo.jpg",
      },
      {
        name: "Neymar",
        preferredPosition: "LW",
        secondaryPositions: ["CAM"],
        pace: 88,
        dribbling: 95,
        passing: 88,
        shooting: 85,
        defending: 30,
        physical: 70,
        goalkeeping: 0,
        agility: 95,
        balance: 92,
        vision: 90,
        interceptions: 28,
        tackling: 25,
        stamina: 80,
        xG: 0.7,
        xA: 0.5,
        keyPasses: 2.5,
        pressures: 6,
        reflexes: 0,
        imageUrl: "images/neymar.jpg",
      },
      {
        name: "Ronaldinho",
        preferredPosition: "LW",
        secondaryPositions: ["CAM"],
        pace: 80,
        dribbling: 96,
        passing: 90,
        shooting: 85,
        defending: 40,
        physical: 75,
        goalkeeping: 0,
        agility: 92,
        balance: 95,
        vision: 92,
        interceptions: 35,
        tackling: 30,
        stamina: 80,
        xG: 0.6,
        xA: 0.4,
        keyPasses: 2.0,
        pressures: 7,
        reflexes: 0,
        imageUrl: "images/ronaldinho.jpg",
      },
      {
        name: "Mbappe",
        preferredPosition: "LW",
        secondaryPositions: ["ST", "RW"],
        pace: 96,
        dribbling: 90,
        passing: 82,
        shooting: 92,
        defending: 30,
        physical: 78,
        goalkeeping: 0,
        agility: 92,
        balance: 90,
        vision: 80,
        interceptions: 25,
        tackling: 20,
        stamina: 90,
        xG: 0.8,
        xA: 0.25,
        keyPasses: 1.2,
        pressures: 10,
        reflexes: 0,
        imageUrl: "images/mbappe.jpg",
      },
    ],
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

  const formationPositions = {
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

  // Positional adjustments for rating calculation
  // Attribute weights for OVR calculation based on general position type
  const attributeWeights = {
    GK: {
      goalkeeping: 0.5,
      reflexes: 0.2,
      physical: 0.1,
      agility: 0.1,
      passing: 0.05,
      vision: 0.05,
      // Other attributes have minimal weight for GK
    },
    DEF: {
      defending: 0.3,
      tackling: 0.2,
      interceptions: 0.2,
      physical: 0.1,
      pace: 0.05,
      stamina: 0.05,
      passing: 0.05,
      // Other attributes have minimal weight for DEF
    },
    MID: {
      passing: 0.25,
      vision: 0.2,
      dribbling: 0.15,
      stamina: 0.1,
      physical: 0.1,
      defending: 0.1,
      agility: 0.05,
      // Other attributes have minimal weight for MID
    },
    FWD: {
      shooting: 0.3,
      dribbling: 0.2,
      pace: 0.2,
      xG: 0.1,
      xA: 0.05,
      keyPasses: 0.05,
      agility: 0.05,
      // Other attributes have minimal weight for FWD
    },
  };

  // Helper to get general position type from specific position
  function getGeneralPositionType(specificPosition) {
    if (specificPosition === "GK") return "GK";
    if (
      ["LB", "CB", "RB", "LWB", "RWB", "LCB", "RCB", "CCB"].includes(
        specificPosition
      )
    )
      return "DEF";
    if (
      ["CDM", "CM", "CAM", "LM", "RM", "LCM", "RCM", "CDM1", "CDM2"].includes(
        specificPosition
      )
    )
      return "MID";
    if (["LW", "ST", "RW", "ST1", "ST2"].includes(specificPosition))
      return "FWD";
    return "UNKNOWN"; // Should not happen with valid positions
  }

  const positionalAdjustments = {
    // Goalkeepers
    GK: {
      GK: 1.0,
      CB: 0.3,
      LB: 0.2,
      RB: 0.2,
      LWB: 0.2,
      RWB: 0.2,
      CDM: 0.1,
      CM: 0.1,
      CAM: 0.1,
      LM: 0.1,
      RM: 0.1,
      LW: 0.1,
      RW: 0.1,
      ST: 0.1,
      ST1: 0.1,
      ST2: 0.1,
      LCB: 0.3,
      RCB: 0.3,
      CCB: 0.3,
      LCM: 0.1,
      RCM: 0.1,
      CDM1: 0.1,
      CDM2: 0.1,
    },

    // Fullbacks (Left)
    LB: {
      LB: 1.0,
      LWB: 0.98,
      LM: 0.9,
      CB: 0.85,
      LCB: 0.85,
      RB: 0.7,
      RWB: 0.65,
      RM: 0.6,
      CM: 0.5,
      CDM: 0.4,
      CAM: 0.3,
      LW: 0.8,
      RW: 0.5,
      ST: 0.3,
      ST1: 0.3,
      ST2: 0.3,
      LCM: 0.5,
      RCM: 0.5,
      CDM1: 0.4,
      CDM2: 0.4,
      GK: 0.1,
      CCB: 0.85,
    },
    LWB: {
      LWB: 1.0,
      LB: 0.98,
      LM: 0.95,
      CB: 0.8,
      LCB: 0.8,
      RB: 0.6,
      RWB: 0.7,
      RM: 0.5,
      CM: 0.6,
      CDM: 0.5,
      CAM: 0.4,
      LW: 0.9,
      RW: 0.6,
      ST: 0.4,
      ST1: 0.4,
      ST2: 0.4,
      LCM: 0.6,
      RCM: 0.6,
      CDM1: 0.5,
      CDM2: 0.5,
      GK: 0.1,
      CCB: 0.8,
    },

    // Fullbacks (Right)
    RB: {
      RB: 1.0,
      RWB: 0.98,
      RM: 0.9,
      CB: 0.85,
      RCB: 0.85,
      LB: 0.7,
      LWB: 0.65,
      LM: 0.6,
      CM: 0.5,
      CDM: 0.4,
      CAM: 0.3,
      RW: 0.8,
      LW: 0.5,
      ST: 0.3,
      ST1: 0.3,
      ST2: 0.3,
      LCM: 0.5,
      RCM: 0.5,
      CDM1: 0.4,
      CDM2: 0.4,
      GK: 0.1,
      CCB: 0.85,
    },
    RWB: {
      RWB: 1.0,
      RB: 0.98,
      RM: 0.95,
      CB: 0.8,
      RCB: 0.8,
      LB: 0.6,
      LWB: 0.7,
      LM: 0.5,
      CM: 0.6,
      CDM: 0.5,
      CAM: 0.4,
      RW: 0.9,
      LW: 0.6,
      ST: 0.4,
      ST1: 0.4,
      ST2: 0.4,
      LCM: 0.6,
      RCM: 0.6,
      CDM1: 0.5,
      CDM2: 0.5,
      GK: 0.1,
      CCB: 0.8,
    },

    // Center Backs
    CB: {
      CB: 1.0,
      LCB: 1.0,
      RCB: 1.0,
      CCB: 1.0,
      CDM: 0.8,
      LB: 0.85,
      RB: 0.85,
      LWB: 0.8,
      RWB: 0.8,
      CM: 0.6,
      GK: 0.3,
      LM: 0.4,
      RM: 0.4,
      CAM: 0.3,
      LW: 0.2,
      RW: 0.2,
      ST: 0.1,
      ST1: 0.1,
      ST2: 0.1,
      LCM: 0.6,
      RCM: 0.6,
      CDM1: 0.8,
      CDM2: 0.8,
    },
    LCB: {
      LCB: 1.0,
      CB: 1.0,
      CCB: 0.98,
      RCB: 0.9,
      LB: 0.9,
      LWB: 0.85,
      CDM: 0.8,
      CDM1: 0.8,
      CM: 0.6,
      GK: 0.3,
      LM: 0.4,
      RM: 0.4,
      CAM: 0.3,
      LW: 0.2,
      RW: 0.2,
      ST: 0.1,
      ST1: 0.1,
      ST2: 0.1,
      LCM: 0.6,
      RCM: 0.6,
      RB: 0.7,
      RWB: 0.65,
      CDM2: 0.8,
    },
    RCB: {
      RCB: 1.0,
      CB: 1.0,
      CCB: 0.98,
      LCB: 0.9,
      RB: 0.9,
      RWB: 0.85,
      CDM: 0.8,
      CDM2: 0.8,
      CM: 0.6,
      GK: 0.3,
      LM: 0.4,
      RM: 0.4,
      CAM: 0.3,
      LW: 0.2,
      RW: 0.2,
      ST: 0.1,
      ST1: 0.1,
      ST2: 0.1,
      LCM: 0.6,
      RCM: 0.6,
      LB: 0.7,
      LWB: 0.65,
      CDM1: 0.8,
    },
    CCB: {
      CCB: 1.0,
      CB: 1.0,
      LCB: 0.98,
      RCB: 0.98,
      CDM: 0.85,
      CDM1: 0.85,
      CDM2: 0.85,
      CM: 0.7,
      GK: 0.3,
      LB: 0.8,
      RB: 0.8,
      LWB: 0.75,
      RWB: 0.75,
      LM: 0.5,
      RM: 0.5,
      CAM: 0.4,
      LW: 0.3,
      RW: 0.3,
      ST: 0.2,
      ST1: 0.2,
      ST2: 0.2,
      LCM: 0.7,
      RCM: 0.7,
    },

    // Defensive Midfielders
    CDM: {
      CDM: 1.0,
      CDM1: 1.0,
      CDM2: 1.0,
      CM: 0.95,
      CB: 0.8,
      LCB: 0.8,
      RCB: 0.8,
      CCB: 0.85,
      LB: 0.7,
      RB: 0.7,
      LWB: 0.65,
      RWB: 0.65,
      CAM: 0.8,
      LM: 0.7,
      RM: 0.7,
      LW: 0.5,
      RW: 0.5,
      ST: 0.4,
      ST1: 0.4,
      ST2: 0.4,
      GK: 0.1,
      LCM: 0.95,
      RCM: 0.95,
    },
    CDM1: {
      CDM1: 1.0,
      CDM: 1.0,
      CM: 0.95,
      CDM2: 0.9,
      CB: 0.8,
      LCB: 0.8,
      CCB: 0.85,
      LB: 0.7,
      LWB: 0.65,
      CAM: 0.8,
      LM: 0.7,
      LW: 0.5,
      ST: 0.4,
      ST1: 0.4,
      ST2: 0.4,
      GK: 0.1,
      LCM: 0.95,
      RCM: 0.9,
      RB: 0.6,
      RWB: 0.55,
      RM: 0.6,
      RW: 0.4,
    },
    CDM2: {
      CDM2: 1.0,
      CDM: 1.0,
      CM: 0.95,
      CDM1: 0.9,
      CB: 0.8,
      RCB: 0.8,
      CCB: 0.85,
      RB: 0.7,
      RWB: 0.65,
      CAM: 0.8,
      RM: 0.7,
      RW: 0.5,
      ST: 0.4,
      ST1: 0.4,
      ST2: 0.4,
      GK: 0.1,
      RCM: 0.95,
      LCM: 0.9,
      LB: 0.6,
      LWB: 0.55,
      LM: 0.6,
      LW: 0.4,
    },

    // Central Midfielders
    CM: {
      CM: 1.0,
      LCM: 1.0,
      RCM: 1.0,
      CDM: 0.95,
      CAM: 0.95,
      LM: 0.9,
      RM: 0.9,
      CB: 0.6,
      LCB: 0.6,
      RCB: 0.6,
      CCB: 0.7,
      LB: 0.5,
      RB: 0.5,
      LWB: 0.6,
      RWB: 0.6,
      LW: 0.7,
      RW: 0.7,
      ST: 0.6,
      ST1: 0.6,
      ST2: 0.6,
      GK: 0.1,
      CDM1: 0.95,
      CDM2: 0.95,
    },
    LCM: {
      LCM: 1.0,
      CM: 1.0,
      LM: 0.95,
      CDM: 0.95,
      CAM: 0.9,
      RCM: 0.9,
      CB: 0.6,
      LCB: 0.6,
      CCB: 0.7,
      LB: 0.5,
      LWB: 0.6,
      LW: 0.8,
      ST: 0.6,
      ST1: 0.6,
      ST2: 0.6,
      GK: 0.1,
      CDM1: 0.95,
      CDM2: 0.9,
      RB: 0.4,
      RWB: 0.5,
      RM: 0.8,
      RW: 0.6,
    },
    RCM: {
      RCM: 1.0,
      CM: 1.0,
      RM: 0.95,
      CDM: 0.95,
      CAM: 0.9,
      LCM: 0.9,
      CB: 0.6,
      RCB: 0.6,
      CCB: 0.7,
      RB: 0.5,
      RWB: 0.6,
      RW: 0.8,
      ST: 0.6,
      ST1: 0.6,
      ST2: 0.6,
      GK: 0.1,
      CDM1: 0.9,
      CDM2: 0.95,
      LB: 0.4,
      LWB: 0.5,
      LM: 0.8,
      LW: 0.6,
    },

    // Attacking Midfielders
    CAM: {
      CAM: 1.0,
      CM: 0.95,
      CDM: 0.8,
      LM: 0.85,
      RM: 0.85,
      LW: 0.9,
      RW: 0.9,
      ST: 0.9,
      ST1: 0.9,
      ST2: 0.9,
      CB: 0.3,
      LCB: 0.3,
      RCB: 0.3,
      CCB: 0.4,
      LB: 0.3,
      RB: 0.3,
      LWB: 0.4,
      RWB: 0.4,
      GK: 0.1,
      LCM: 0.95,
      RCM: 0.95,
      CDM1: 0.8,
      CDM2: 0.8,
    },

    // Wide Midfielders
    LM: {
      LM: 1.0,
      LW: 0.95,
      CM: 0.9,
      LCM: 0.95,
      CAM: 0.85,
      LB: 0.9,
      LWB: 0.95,
      RM: 0.7,
      RW: 0.6,
      CDM: 0.7,
      ST: 0.7,
      ST1: 0.7,
      ST2: 0.7,
      CB: 0.4,
      LCB: 0.4,
      CCB: 0.5,
      RB: 0.6,
      RWB: 0.5,
      GK: 0.1,
      RCM: 0.8,
      CDM1: 0.7,
      CDM2: 0.6,
    },
    RM: {
      RM: 1.0,
      RW: 0.95,
      CM: 0.9,
      RCM: 0.95,
      CAM: 0.85,
      RB: 0.9,
      RWB: 0.95,
      LM: 0.7,
      LW: 0.6,
      CDM: 0.7,
      ST: 0.7,
      ST1: 0.7,
      ST2: 0.7,
      CB: 0.4,
      RCB: 0.4,
      CCB: 0.5,
      LB: 0.6,
      LWB: 0.5,
      GK: 0.1,
      LCM: 0.8,
      CDM1: 0.6,
      CDM2: 0.7,
    },

    // Wingers
    LW: {
      LW: 1.0,
      LM: 0.95,
      ST: 0.9,
      ST1: 0.9,
      ST2: 0.9,
      CAM: 0.9,
      RW: 0.8,
      CM: 0.7,
      LCM: 0.8,
      CDM: 0.5,
      LB: 0.8,
      LWB: 0.9,
      RB: 0.5,
      RWB: 0.6,
      CB: 0.2,
      LCB: 0.2,
      CCB: 0.3,
      GK: 0.1,
      RCM: 0.6,
      CDM1: 0.5,
      CDM2: 0.4,
    },
    RW: {
      RW: 1.0,
      RM: 0.95,
      ST: 0.9,
      ST1: 0.9,
      ST2: 0.9,
      CAM: 0.9,
      LW: 0.8,
      CM: 0.7,
      RCM: 0.8,
      CDM: 0.5,
      RB: 0.8,
      RWB: 0.9,
      LB: 0.5,
      LWB: 0.6,
      CB: 0.2,
      RCB: 0.2,
      CCB: 0.3,
      GK: 0.1,
      LCM: 0.6,
      CDM1: 0.4,
      CDM2: 0.5,
    },

    // Strikers
    ST: {
      ST: 1.0,
      ST1: 1.0,
      ST2: 1.0,
      LW: 0.9,
      RW: 0.9,
      CAM: 0.9,
      CM: 0.6,
      LCM: 0.6,
      RCM: 0.6,
      LM: 0.7,
      RM: 0.7,
      CDM: 0.4,
      CB: 0.1,
      LCB: 0.1,
      RCB: 0.1,
      CCB: 0.2,
      LB: 0.3,
      RB: 0.3,
      LWB: 0.4,
      RWB: 0.4,
      GK: 0.1,
      CDM1: 0.4,
      CDM2: 0.4,
    },
    ST1: {
      ST1: 1.0,
      ST: 1.0,
      LW: 0.9,
      CAM: 0.9,
      ST2: 0.95,
      CM: 0.6,
      LCM: 0.6,
      LM: 0.7,
      CDM: 0.4,
      CB: 0.1,
      LCB: 0.1,
      CCB: 0.2,
      LB: 0.3,
      LWB: 0.4,
      GK: 0.1,
      RCM: 0.5,
      RM: 0.6,
      RW: 0.8,
      RCB: 0.1,
      RB: 0.2,
      RWB: 0.3,
      CDM1: 0.4,
      CDM2: 0.3,
    },
    ST2: {
      ST2: 1.0,
      ST: 1.0,
      RW: 0.9,
      CAM: 0.9,
      ST1: 0.95,
      CM: 0.6,
      RCM: 0.6,
      RM: 0.7,
      CDM: 0.4,
      CB: 0.1,
      RCB: 0.1,
      CCB: 0.2,
      RB: 0.3,
      RWB: 0.4,
      GK: 0.1,
      LCM: 0.5,
      LM: 0.6,
      LW: 0.8,
      LCB: 0.1,
      LB: 0.2,
      LWB: 0.3,
      CDM1: 0.3,
      CDM2: 0.4,
    },
  };

  // Calculates a player's rating based on their assigned position
  function calculatePlayerRating(player, assignedPosition) {
    const generalPositionType = getGeneralPositionType(assignedPosition);
    let calculatedRating = 0;

    // Calculate base rating based on detailed stats and position-specific weights
    if (attributeWeights[generalPositionType]) {
      const weights = attributeWeights[generalPositionType];
      for (const attribute in weights) {
        if (player.hasOwnProperty(attribute)) {
          calculatedRating += player[attribute] * weights[attribute];
        }
      }
    } else {
      // Fallback if general position type is not defined in weights
      calculatedRating = 75; // Use a default baseRating if not found
    }

    // Apply positional adjustment factor
    let adjustmentFactor = 0.3; // Default very low for completely out of position
    if (
      positionalAdjustments[player.preferredPosition] &&
      positionalAdjustments[player.preferredPosition][assignedPosition]
    ) {
      adjustmentFactor =
        positionalAdjustments[player.preferredPosition][assignedPosition];
    }

    return Math.round(calculatedRating * adjustmentFactor);
  }

  function showPlayerDetails(player) {
    const isPlayerInLineup = lineup.some(
      (slot) => slot && slot.player && slot.player.name === player.name
    );
    const currentAssignedSlot = isPlayerInLineup
      ? lineup.find(
          (slot) => slot && slot.player && slot.player.name === player.name
        )
      : null;
    const displayedRating = isPlayerInLineup
      ? calculatePlayerRating(player, currentAssignedSlot.slotId)
      : calculatePlayerRating(player, player.preferredPosition); // Calculate OVR even if not in lineup, using preferred position

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
                                ${
                                  player.agility
                                    ? `<li class="list-group-item d-flex justify-content-between align-items-center">Agility<span class="badge bg-secondary rounded-pill">${player.agility}</span></li>`
                                    : ""
                                }
                                ${
                                  player.balance
                                    ? `<li class="list-group-item d-flex justify-content-between align-items-center">Balance<span class="badge bg-secondary rounded-pill">${player.balance}</span></li>`
                                    : ""
                                }
                                ${
                                  player.vision
                                    ? `<li class="list-group-item d-flex justify-content-between align-items-center">Vision<span class="badge bg-secondary rounded-pill">${player.vision}</span></li>`
                                    : ""
                                }
                                ${
                                  player.interceptions
                                    ? `<li class="list-group-item d-flex justify-content-between align-items-center">Interceptions<span class="badge bg-secondary rounded-pill">${player.interceptions}</span></li>`
                                    : ""
                                }
                                ${
                                  player.tackling
                                    ? `<li class="list-group-item d-flex justify-content-between align-items-center">Tackling<span class="badge bg-secondary rounded-pill">${player.tackling}</span></li>`
                                    : ""
                                }
                                ${
                                  player.stamina
                                    ? `<li class="list-group-item d-flex justify-content-between align-items-center">Stamina<span class="badge bg-secondary rounded-pill">${player.stamina}</span></li>`
                                    : ""
                                }
                                ${
                                  player.xG
                                    ? `<li class="list-group-item d-flex justify-content-between align-items-center">Expected Goals (xG)<span class="badge bg-secondary rounded-pill">${player.xG}</span></li>`
                                    : ""
                                }
                                ${
                                  player.xA
                                    ? `<li class="list-group-item d-flex justify-content-between align-items-center">Expected Assists (xA)<span class="badge bg-secondary rounded-pill">${player.xA}</span></li>`
                                    : ""
                                }
                                ${
                                  player.keyPasses
                                    ? `<li class="list-group-item d-flex justify-content-between align-items-center">Key Passes<span class="badge bg-secondary rounded-pill">${player.keyPasses}</span></li>`
                                    : ""
                                }
                                ${
                                  player.pressures
                                    ? `<li class="list-group-item d-flex justify-content-between align-items-center">Pressures<span class="badge bg-secondary rounded-pill">${player.pressures}</span></li>`
                                    : ""
                                }
                                ${
                                  player.reflexes
                                    ? `<li class="list-group-item d-flex justify-content-between align-items-center">Reflexes<span class="badge bg-secondary rounded-pill">${player.reflexes}</span></li>`
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

  // --- Functions ---

  function initialize() {
    allPlayersData = [
      ...predefinedPlayers.forwards,
      ...predefinedPlayers.midfielders,
      ...predefinedPlayers.defenders,
      ...predefinedPlayers.goalkeepers,
    ];
    loadLineup(); // Load saved lineup or create a new one
    renderAvailablePlayers();
    renderPitch();
    renderLineupOnPitch();
    updatePlayerCount();
    addEventListeners();

    // Show the main player selection screen
    playerSelectionSection.classList.remove("d-none");
  }

  function renderAvailablePlayers() {
    availablePlayersDiv.innerHTML = "";
    const playersOnPitch = lineup
      .map((slot) => slot.player?.name)
      .filter(Boolean);

    allPlayersData.forEach((player) => {
      if (!playersOnPitch.includes(player.name)) {
        const playerCard = createPlayerCard(player);
        availablePlayersDiv.appendChild(playerCard);

        const addButton = playerCard.querySelector(".add-player-btn");
        const detailsButton = playerCard.querySelector(".details-player-btn");

        addButton.addEventListener("click", () =>
          handleAddPlayerToLineup(player)
        );
        detailsButton.addEventListener("click", () =>
          showPlayerDetails(player)
        );
      }
    });
  }

  function createPlayerCard(player, currentRating) {
    const playerCard = document.createElement("div");
    playerCard.className = "player-card";
    playerCard.dataset.playerName = player.name;
    playerCard.setAttribute("draggable", "true"); // Make player cards draggable
    playerCard.innerHTML =
      "" +
      '<img src="' +
      player.imageUrl +
      '" alt="' +
      player.name +
      '" class="player-img">' +
      '<div class="player-details">' +
      "<strong>" +
      player.name +
      "</strong>" +
      "<small>" +
      player.preferredPosition +
      "</small>" +
      "</div>" +
      '<div class="player-ovr">OVR: ' +
      currentRating +
      "</div>" +
      '<div class="player-card-buttons">' +
      '<button class="btn btn-sm btn-primary add-player-btn">Add</button>' +
      '<button class="btn btn-sm btn-secondary details-player-btn">Details</button>' +
      "</div>";
    return playerCard;
  }

  function handleAddPlayerToLineup(playerData) {
    // Find the first empty slot in the current lineup
    const emptySlot = lineup.find((slot) => slot.player === null);

    if (emptySlot) {
      emptySlot.player = playerData;
      saveAndRerender();
    } else {
      alert(
        "Your lineup is full! Please remove a player from the pitch first."
      );
    }
  }

  function renderPitch() {
    lineupDisplay.innerHTML = "";
    const positions = formationLineups[currentFormation];
    const positionCoords = formationPositions[currentFormation];

    positions.forEach((posId) => {
      const circle = document.createElement("div");
      circle.className = "position-circle active";
      circle.dataset.slotId = posId;

      const coords = positionCoords[posId];
      if (coords) {
        circle.style.left = coords.x + "%";
        circle.style.top = coords.y + "%";
        circle.style.transform = "translate(-50%, -50%)";
      }

      circle.innerHTML = '<span class="position-label">' + posId + "</span>";
      lineupDisplay.appendChild(circle);
    });

    addDragDropListenersToCircles();
  }

  function renderLineupOnPitch() {
    // Clear existing player cards from pitch
    lineupDisplay
      .querySelectorAll(".player-card")
      .forEach((card) => card.remove());

    lineup.forEach((slot) => {
      if (slot.player) {
        const circle = lineupDisplay.querySelector(
          '[data-slot-id="' + slot.slotId + '"]'
        );
        if (circle) {
          const currentRating = calculatePlayerRating(slot.player, slot.slotId); // Calculate adjusted OVR
          const playerCard = createPlayerCard(slot.player, currentRating); // Pass adjusted OVR
          playerCard.dataset.fromSlotId = slot.slotId; // Mark that it's from the pitch
          circle.appendChild(playerCard);
          circle.classList.add("has-player");
        }
      }
    });
  }

  function handleFormationChange(newFormation) {
    const playersOnPitch = lineup
      .filter((slot) => slot.player)
      .map((slot) => slot.player);
    currentFormation = newFormation;

    // Create new empty lineup structure
    const newPositions = formationLineups[currentFormation];
    lineup = newPositions.map((posId) => ({ slotId: posId, player: null }));

    // Intelligent re-mapping
    playersOnPitch.forEach((player) => {
      let placed = false;
      // 1. Try preferred position
      const preferredSlot = lineup.find(
        (slot) => slot.slotId.includes(player.preferredPosition) && !slot.player
      );
      if (preferredSlot) {
        preferredSlot.player = player;
        placed = true;
      }
      // 2. Find any empty slot if not placed
      if (!placed) {
        const emptySlot = lineup.find((slot) => !slot.player);
        if (emptySlot) {
          emptySlot.player = player;
        }
      }
    });

    document.querySelectorAll(".formation-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.formation === newFormation);
    });

    saveLineup();
    renderPitch();
    renderLineupOnPitch();
    renderAvailablePlayers();
    updatePlayerCount();
  }

  function updatePlayerCount() {
    const count = lineup.filter((slot) => slot.player).length;
    selectedPlayerCountSpan.textContent = count;
  }

  function saveLineup() {
    const data = {
      formation: currentFormation,
      lineup: lineup,
    };
    localStorage.setItem("soccerSquadLineup", JSON.stringify(data));
  }

  function loadLineup() {
    const savedData = localStorage.getItem("soccerSquadLineup");
    if (savedData) {
      const data = JSON.parse(savedData);
      currentFormation = data.formation || "4-3-3";
      lineup = data.lineup || [];
    }

    // Ensure lineup structure is valid for the current formation
    const expectedSlots = formationLineups[currentFormation];
    if (lineup.length !== expectedSlots.length) {
      // If not, create a fresh lineup structure
      lineup = expectedSlots.map((posId) => ({ slotId: posId, player: null }));
    }

    document.querySelectorAll(".formation-btn").forEach((btn) => {
      btn.classList.toggle(
        "active",
        btn.dataset.formation === currentFormation
      );
    });
  }

  // --- Drag and Drop Handlers ---

  function addDragDropListeners() {
    document.addEventListener("dragstart", (e) => {
      if (e.target.classList.contains("player-card")) {
        draggedPlayer.element = e.target;
        const playerName = e.target.dataset.playerName;
        draggedPlayer.player = allPlayersData.find(
          (p) => p.name === playerName
        );
        draggedPlayer.fromSlotId =
          e.target.closest(".position-circle")?.dataset.slotId || null;

        setTimeout(() => {
          e.target.classList.add("dragging");
        }, 0);
      }
    });

    document.addEventListener("dragend", (e) => {
      if (draggedPlayer.element) {
        draggedPlayer.element.classList.remove("dragging");
        draggedPlayer = { element: null, player: null, fromSlotId: null };
      }
    });

    availablePlayersDiv.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    availablePlayersDiv.addEventListener("drop", (e) => {
      e.preventDefault();
      if (draggedPlayer.fromSlotId) {
        // Only allow dropping from pitch to bench
        const fromSlot = lineup.find(
          (s) => s.slotId === draggedPlayer.fromSlotId
        );
        if (fromSlot) fromSlot.player = null;

        saveAndRerender();
        renderLineupOnPitch();
        renderAvailablePlayers();
        updatePlayerCount();
      }
    });
  }

  function addDragDropListenersToCircles() {
    const circles = lineupDisplay.querySelectorAll(".position-circle");
    circles.forEach((circle) => {
      circle.addEventListener("dragover", (e) => {
        e.preventDefault();
        circle.classList.add("drag-over");
      });

      circle.addEventListener("dragleave", () => {
        circle.classList.remove("drag-over");
      });

      circle.addEventListener("drop", (e) => {
        e.preventDefault();
        circle.classList.remove("drag-over");
        const targetSlotId = circle.dataset.slotId;
        const targetSlot = lineup.find((s) => s.slotId === targetSlotId);

        if (!draggedPlayer.player || !targetSlot) return;

        const sourcePlayer = draggedPlayer.player;
        const destinationPlayer = targetSlot.player;

        // Prevent dropping a player onto their own slot
        if (draggedPlayer.fromSlotId === targetSlotId) return;

        // Store old rating for animation comparison
        let oldRating = null;
        if (targetSlot.player) {
          oldRating = calculatePlayerRating(
            targetSlot.player,
            targetSlot.slotId
          );
        }

        // Case 1: Dragging from the BENCH
        if (!draggedPlayer.fromSlotId) {
          targetSlot.player = sourcePlayer;
          if (destinationPlayer) {
            // Move destination player to bench
            // No explicit action needed here, renderAvailablePlayers will handle it
          }
        }
        // Case 2: Dragging from the PITCH (swapping)
        else {
          const sourceSlot = lineup.find(
            (s) => s.slotId === draggedPlayer.fromSlotId
          );
          if (sourceSlot) {
            targetSlot.player = sourcePlayer;
            sourceSlot.player = destinationPlayer; // Can be null if dest was empty
          }
        }

        saveAndRerender();

        // Animate OVR change if the player was moved to a new slot
        const newRating = calculatePlayerRating(
          sourcePlayer,
          targetSlot.slotId
        );
        if (oldRating !== newRating) {
          const playerCardElement = circle.querySelector(".player-card");
          if (playerCardElement) {
            const ovrElement = playerCardElement.querySelector(".player-ovr");
            if (ovrElement) {
              ovrElement.classList.add("changed");
              ovrElement.addEventListener(
                "animationend",
                () => {
                  ovrElement.classList.remove("changed");
                },
                { once: true }
              );
            }
          }
        }
      });
    });
  }

  function saveAndRerender() {
    saveLineup();
    renderLineupOnPitch();
    renderAvailablePlayers();
    updatePlayerCount();
  }

  function addEventListeners() {
    formationOptionsDiv.addEventListener("click", (event) => {
      if (event.target.classList.contains("formation-btn")) {
        handleFormationChange(event.target.dataset.formation);
      }
    });

    homeLink.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("soccerSquadLineup");
      location.reload();
    });
    navbarBrand.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("soccerSquadLineup");
      location.reload();
    });

    addDragDropListeners();
  }

  // --- Initial Call ---
  initialize();
});
