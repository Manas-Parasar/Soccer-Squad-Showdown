// ===============================
// Improved generatePlayerStats.js
// ===============================

// Realistic and balanced special player ratings
const SPECIAL_PLAYERS = {
  Messi: 96,
  "E. Haaland": 91,
  Mbappe: 91,
  Neymar: 91,
  Pedri: 90,
  "F. de Jong": 88,
  Gavi: 85,
  Salah: 89,
  Saka: 87,
  "R. Araujo": 85,
  "C. Araujo": 83,
  Bellingham: 90,
  "K. De Bruyne": 91,
  Vinicius: 88,
  Rodri: 89,
  Modric: 89,
  Valverde: 88,
  Lewandowski: 90,
  "O. Dembele": 86,
  Olmo: 85,
};

const POSITION_BASE_STATS = {
  Midfielder: {
    pace: 80,
    dribbling: 83,
    passing: 85,
    shooting: 75,
    defending: 70,
    physical: 78,
    goalkeeping: 0,
  },
  Forward: {
    pace: 85,
    dribbling: 85,
    passing: 80,
    shooting: 85,
    defending: 55,
    physical: 80,
    goalkeeping: 0,
  },
  Defender: {
    pace: 80,
    dribbling: 70,
    passing: 78,
    shooting: 65,
    defending: 85,
    physical: 81,
    goalkeeping: 0,
  },
  Goalkeeper: {
    pace: 65,
    dribbling: 55,
    passing: 75,
    shooting: 45,
    defending: 75,
    physical: 78,
    goalkeeping: 85,
  },
};

function clamp(value, min = 50, max = 99) {
  return Math.max(min, Math.min(Math.round(value), max));
}

function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 🎯 More refined scaling function
function scaleStat(base, overall) {
  const minOverall = 70;
  const maxOverall = 96;
  const minStat = base * 0.9;
  const maxStat = Math.min(base * 1.3 + 5, 99);
  const scaled =
    minStat +
    ((overall - minOverall) / (maxOverall - minOverall)) * (maxStat - minStat);
  return clamp(scaled);
}

export function generatePlayerStats(playerInfo) {
  const { name, preferredPosition } = playerInfo;

  // Normalize name for lookup
  const normalizedName = name?.trim();

  // 🎖️ Step 1: Known special player override
  let overallRating = SPECIAL_PLAYERS[normalizedName];

  // 🎲 Step 2: If not special, generate realistic overall
  if (!overallRating) {
    // Position-based weighting for realism
    const positionBias = {
      Forward: randomRange(82, 90),
      Midfielder: randomRange(80, 89),
      Defender: randomRange(78, 87),
      Goalkeeper: randomRange(79, 90),
    };
    overallRating = positionBias[preferredPosition] || randomRange(78, 88);
  }

  // Step 3: Base attributes for position
  const base =
    POSITION_BASE_STATS[preferredPosition] || POSITION_BASE_STATS.Midfielder;

  // Step 4: Scale individual stats dynamically
  const pace = clamp(scaleStat(base.pace, overallRating) + randomRange(-2, 3));
  const dribbling = clamp(
    scaleStat(base.dribbling, overallRating) + randomRange(-2, 3)
  );
  const passing = clamp(
    scaleStat(base.passing, overallRating) + randomRange(-2, 3)
  );
  const shooting = clamp(
    scaleStat(base.shooting, overallRating) + randomRange(-2, 3)
  );
  const defending = clamp(
    scaleStat(base.defending, overallRating) + randomRange(-2, 3)
  );
  const physical = clamp(
    scaleStat(base.physical, overallRating) + randomRange(-2, 3)
  );
  const goalkeeping = clamp(
    scaleStat(base.goalkeeping, overallRating) + randomRange(-2, 3)
  );

  // Step 5: Weighted recalculation of overall (more accurate to real FIFA logic)
  const weightings = {
    Forward: {
      pace: 0.2,
      dribbling: 0.2,
      shooting: 0.25,
      passing: 0.15,
      defending: 0.05,
      physical: 0.15,
    },
    Midfielder: {
      pace: 0.15,
      dribbling: 0.2,
      shooting: 0.15,
      passing: 0.25,
      defending: 0.1,
      physical: 0.15,
    },
    Defender: {
      pace: 0.1,
      dribbling: 0.1,
      shooting: 0.05,
      passing: 0.15,
      defending: 0.35,
      physical: 0.25,
    },
    Goalkeeper: {
      pace: 0.05,
      dribbling: 0.05,
      passing: 0.1,
      shooting: 0.05,
      defending: 0.15,
      physical: 0.2,
      goalkeeping: 0.4,
    },
  };

  const w = weightings[preferredPosition] || weightings.Midfielder;
  const calculatedOverall = clamp(
    pace * w.pace +
      dribbling * w.dribbling +
      passing * w.passing +
      shooting * w.shooting +
      defending * w.defending +
      physical * w.physical +
      (w.goalkeeping || 0) * goalkeeping
  );

  // Step 6: Final rating smoothing
  const finalOverall = Math.round((overallRating + calculatedOverall) / 2);

  return {
    overallRating: clamp(finalOverall),
    pace,
    dribbling,
    passing,
    shooting,
    defending,
    physical,
    goalkeeping,
  };
}
