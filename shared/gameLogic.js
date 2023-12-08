const upgrades = {
  moneyMultiplier: {
    baseCost: 120,
    maxLevel: 99,
    calculateCost(level) {
      return this.baseCost * (1 + level ** 2);
    },
  },
  wordDifficulty: {
    baseCost: 250,
    maxLevel: 9,
    calculateCost(level) {
      return this.baseCost + level * 750;
    },
  },
  timeExtender: {
    baseCost: 175,
    maxLevel: 29,
    calculateCost(level) {
      return this.baseCost * (1 + level ** 2);
    },
  },
};

export const getUpgradeCost = (upgrade, level) => {
  if (upgrade in upgrades) {
    if (level > upgrades[upgrade].maxLevel) return Infinity;
    return upgrades[upgrade].calculateCost(level);
  }
  return Infinity;
};
