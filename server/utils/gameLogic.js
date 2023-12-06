const upgrades = {
  moneyMultiplier: {
    baseCost: 120,
    maxLevel: 100,
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
  return 0;
};
