import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation Mutation($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password)
  }
`;

export const LOGIN_USER = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const ADD_MONEY = gql`
  mutation Mutation($money: Int!) {
    addMoney(money: $money)
  }
`;

export const UPDATE_THEME = gql`
  mutation Mutation($theme: String) {
    updateUserSettings(theme: $theme) {
      theme
    }
  }
`;

export const UPDATE_SOUND_OPTION = gql`
  mutation Mutation($sound_option: Boolean) {
    updateUserSettings(sound_option: $sound_option) {
      sound_option
    }
  }
`;

export const UPDATE_UPGRADES = gql`
  mutation UpdateUserUpgrades(
    $moneyMultiplier: Int
    $wordDifficulty: Int
    $timeExtender: Int
  ) {
    updateUserUpgrades(
      moneyMultiplier: $moneyMultiplier
      wordDifficulty: $wordDifficulty
      timeExtender: $timeExtender
    ) {
      moneyMultiplier
      timeExtender
      wordDifficulty
    }
  }
`;
