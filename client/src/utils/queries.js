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
