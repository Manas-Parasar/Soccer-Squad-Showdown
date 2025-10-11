const SPECIAL_PLAYERS = {
  Pedri: 90,
  Messi: 96,
  "E. Haaland": 91,
  Mbappe: 91,
  Gavi: 85,
  "F. de Jong": 86,
};

const POSITION_BASE_STATS = {
  Midfielder: {
    pace: 80,
    dribbling: 85,
    passing: 85,
    shooting: 75,
    defending: 70,
    physical: 75,
    goalkeeping: 0,
  },
  Forward: {
    pace: 90,
    dribbling: 90,
    passing: 78,
    shooting: 88,
    defending: 55,
    physical: 82,
    goalkeeping: 0,
  },
  Defender: {
    pace: 75,
    dribbling: 70,
    passing: 75,
    shooting: 65,
    defending: 85,
    physical: 85,
    goalkeeping: 0,
  },
  Goalkeeper: {
    pace: 60,
    dribbling: 55,
    passing: 70,
    shooting: 50,
    defending: 88,
    physical: 88,
    goalkeeping: 92,
  },
};

function clamp(value, min = 50, max = 99) {
  return Math.max(min, Math.min(Math.round(value), max));
}

function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Map overall rating to a larger scale
function scaleStat(base, overall) {
  // Linear mapping: 79–96 overall → ~80–99 stats
  const minOverall = 79;
  const maxOverall = 96;
  const minStat = base * 0.95; // minimum stat
  const maxStat = Math.min(base * 1.25 + 5, 99); // max stat capped at 99
  const scaled =
    minStat +
    ((overall - minOverall) / (maxOverall - minOverall)) * (maxStat - minStat);
  return clamp(scaled);
}

export function generatePlayerStats(playerInfo) {
  const { name, preferredPosition } = playerInfo;

  // 1️⃣ Special player rating
  let overallRating = SPECIAL_PLAYERS[name];

  // 2️⃣ Normal players: generate dynamic overall rating in 79-95 range
  if (!overallRating) {
    overallRating = randomRange(79, 95);
  }

  // 3️⃣ Base stats for position
  const base =
    POSITION_BASE_STATS[preferredPosition] || POSITION_BASE_STATS.Midfielder;

  // 4️⃣ Scale each stat dynamically based on overall
  const pace = scaleStat(base.pace, overallRating) + randomRange(0, 3);
  const dribbling =
    scaleStat(base.dribbling, overallRating) + randomRange(0, 3);
  const passing = scaleStat(base.passing, overallRating) + randomRange(0, 3);
  const shooting = scaleStat(base.shooting, overallRating) + randomRange(0, 3);
  const defending =
    scaleStat(base.defending, overallRating) + randomRange(0, 3);
  const physical = scaleStat(base.physical, overallRating) + randomRange(0, 3);
  const goalkeeping =
    scaleStat(base.goalkeeping, overallRating) + randomRange(0, 3);

  // 5️⃣ Recalculate overall based on final attributes
  const calculatedOverall = Math.round(
    (pace + dribbling + passing + shooting + defending + physical) / 6
  );

  return {
    overallRating: calculatedOverall,
    pace,
    dribbling,
    passing,
    shooting,
    defending,
    physical,
    goalkeeping,
  };
}
