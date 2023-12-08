import { gql } from "@apollo/client";

export const GET_LEADERBOARD = gql`
  query GetLeaderboard {
    leaderboard {
      _id
      virtualMoney
      username
    }
  }
`;

export const GET_WORDS = gql`
  query Words($difficulty: Int!) {
    words(difficulty: $difficulty) {
      difficulty
      word
    }
  }
`;

export const GET_UPGRADES = gql`
  query UserUpgrades {
    userUpgrades {
      moneyMultiplier
      timeExtender
      wordDifficulty
    }
  }
`;

export const GET_MONEY = gql`
  query VirtualMoney {
    virtualMoney
  }
`;

export const GET_SETTINGS = gql`
  query UserSettings {
    userSettings {
      theme
    }
  }
`;
