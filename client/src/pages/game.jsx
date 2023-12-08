// import { bootstrap } from 'bootstrap';
// import { useQuery } from '@apollo/client';
import { useState, useEffect, useRef } from "react";

import Image from "react-bootstrap/Image";

import dollarSign from "/moneyTypeDollarSign.svg?url";
import darkDollarSign from "/moneyTypeDollarSignDark.svg?url";
import difficulty from "/upgradeDifficulty.svg?url";
import timeExtender from "/upgradeTimeExtender.svg?url";
import multiplier from "/upgradeMoneyMultiplier.svg?url";

import darkDifficulty from "/upgradeDifficultyDark.svg?url";
import darkTimeExtender from "/upgradeTimeExtenderDark.svg?url";
import darkMultiplier from "/upgradeMoneyMultiplierDark.svg?url";

import { useThemeContext } from "../components/ThemeContext.jsx";

import { GET_UPGRADES, GET_WORDS, GET_MONEY } from "../utils/queries.js";

import Container from "react-bootstrap/Container";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_MONEY, UPDATE_UPGRADES } from "../utils/mutations.js";

import { getUpgradeCost } from "../../../shared/gameLogic.js";
import User from "../utils/user.js";

const Game = () => {
  const [wordsBank, setWordsBank] = useState([]);
  const {
    data: serverWords,
    loading: loadingWords,
    refetch: fetchWords,
  } = useQuery(GET_WORDS, {
    variables: {
      difficulty: 2,
    },
  });
  const { theme, setTheme } = useThemeContext();
  const [wordDisplay, setWordDisplay] = useState("");
  const [userMoney, setUserMoney] = useState(0);
  const [wordTarget, setWordTarget] = useState(""); //useSate will refresh the page upon being updated
  const [wordTargetTimeRemainingDisplay, setWordTargetTimeRemainingDisplay] =
    useState(0);
  const [upgradeTimeExtender, setUpgradeTimeExtender] = useState(0);
  const [upgradeMoneyMultiplier, setUpgradeMoneyMultiplier] = useState(0);
  const [upgradeWordDifficulty, setUpgradeWordDifficulty] = useState(0);
  let word = useRef("");
  let mistakes = useRef(0); //useRef will NOT refresh the page upon being updated
  let wordDifficulty = useRef(0);
  let wordTimeAlloted = useRef(0.0);
  let wordTargetTimeRemaining = useRef(0.0);
  let wordTimeStarted = useRef(0.0);
  let hasLoadedUpgrades = useRef(false);
  let hasLoadedMoney = useRef(false);
  let firstLoad = useRef(true);

  const [setUpgrades] = useMutation(UPDATE_UPGRADES);
  const [addMoney] = useMutation(ADD_MONEY);
  // Get upgrades
  const { data: dbUpgrades, loading: upgradesLoading } = useQuery(GET_UPGRADES);
  // Get money
  const {
    data: dbMoney,
    previousData: prevDbMoney,
    loading: moneyLoading,
    refetch: refreshMoney,
  } = useQuery(GET_MONEY, { fetchPolicy: "no-cache" });

  const upgradeLevelMappings = {
    moneyMultiplier: upgradeMoneyMultiplier,
    timeExtender: upgradeTimeExtender,
    wordDifficulty: upgradeWordDifficulty,
  };
  const setUpgradeMappings = {
    moneyMultiplier: setUpgradeMoneyMultiplier,
    timeExtender: setUpgradeTimeExtender,
    wordDifficulty: setUpgradeWordDifficulty,
  };

  if (!hasLoadedUpgrades.current && User.isLoggedIn() && !upgradesLoading) {
    for (let upgrade in dbUpgrades.userUpgrades) {
      if (upgrade.startsWith("_")) continue;
      setUpgradeMappings[upgrade](dbUpgrades.userUpgrades[upgrade]);
    }
    hasLoadedUpgrades.current = true;
  }

  if (!hasLoadedMoney.current && User.isLoggedIn() && !moneyLoading) {
    console.log("Refreshed user money to %s", dbMoney.virtualMoney);
    setUserMoney(dbMoney.virtualMoney);
    hasLoadedMoney.current = true;
  }

  async function applyUpgrade(upgrade) {
    const cost = getUpgradeCost(upgrade, upgradeLevelMappings[upgrade]);
    if (userMoney >= cost) {
      let didUpgrade = true;
      if (User.isLoggedIn()) {
        try {
          await setUpgrades({
            variables: {
              [upgrade]: 1,
            },
          });
          didUpgrade = true;
        } catch (e) {
          const newMoney = await refreshMoney();
          setUserMoney(newMoney.data.virtualMoney);
          didUpgrade = false;
        }
      }
      if (didUpgrade) {
        setUserMoney(userMoney - cost);
        setUpgradeMappings[upgrade](upgradeLevelMappings[upgrade] + 1);
      }
    }
  }

  function setUserWord(str1) {
    setWordDisplay(str1);
    word.current = str1;
  }

  function calculateMoneyGained() {
    if (word.current.length !== 0 && mistakes.current < 3) {
      const remainingChars = wordTarget.length - word.current.length;
      const percentageTyped = 1 - remainingChars / wordTarget.length;

      const timeTaken = (Date.now() - wordTimeStarted.current) / 1000;
      wordTargetTimeRemaining.current = wordTimeAlloted.current - timeTaken;

      return Math.floor(
        /*wordTargetBounty*/ (wordTarget.length *
          (1 + wordDifficulty.current * 0.5) +
          wordTargetTimeRemaining.current * 2 * (1 - mistakes.current * 0.33)) *
          (upgradeMoneyMultiplier + wordDifficulty.current * 0.25) *
          percentageTyped
      );
    }
    return 0;
  }

  function nextWordAppear() {
    // lets calculate the money gained before resetting mistakes to 0
    if (word.current.length !== 0 && mistakes.current < 3) {
      const moneyToAdd = calculateMoneyGained();
      setUserMoney(userMoney + moneyToAdd);
      if (User.isLoggedIn())
        addMoney({
          variables: {
            money: moneyToAdd,
          },
        });
    }
    setUserWord("");
    wordTimeStarted.current = Date.now();
    mistakes.current = 0;
    // if less than 5 words left, fetch new words
    if (wordsBank.length < 5 && !loadingWords) {
      fetchWords();
    }
    if (!wordsBank.length) return;
    setWordTarget(wordsBank[wordsBank.length - 1].word);
    setWordsBank(wordsBank.slice(0, -1));
  }

  // useEffect(() => {
  //   let timer = setTimeout(() => {
  //     console.log((Date.now() - wordTimeStarted.current) / 1000);
  //   }, 100);
  //   return () => clearTimeout(timer);
  // });

  function generateDisplayWord() {
    let display = [];
    for (let char in word.current) {
      if (word.current[char] === wordTarget[char]?.toUpperCase())
        display.push(<span key={char}>{word.current[char]}</span>);
      else
        display.push(
          <span className="bad-word" key={char}>
            {word.current[char]}
          </span>
        );
    }
    display.push(
      <span className="word-to-type" key="lastPart">
        {wordTarget.slice(wordDisplay.length).toUpperCase()}
      </span>
    );
    return display;
  }

  useEffect(() => {
    function listener(e) {
      if (e.key == "Backspace") {
        setUserWord(wordDisplay.slice(0, -1));
      } else if (/[0-9a-zA-Z-]/.test(e.key) && e.key.length == 1) {
        const correct = e.key === wordTarget[wordDisplay.length];
        if (!correct && word.current.length === 0) return;
        if (!correct) {
          // increment num mistakes
          mistakes.current++;
          //if number of mistakes is greater than 3, then move to next word
          if (mistakes.current > 2) {
            nextWordAppear();
            return;
          }
        } else if (
          wordTarget.toUpperCase() ==
          wordDisplay.toUpperCase() + e.key.toUpperCase()
        ) {
          word.current += e.key.toUpperCase();
          nextWordAppear();
          return;
        }
        //Above code will run when the word is successfully typed
        setUserWord(wordDisplay + e.key.toUpperCase());
      }
    }
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [wordDisplay, wordTarget]);

  useEffect(() => {
    if (serverWords?.words.length) {
      setWordsBank([...serverWords.words, ...wordsBank]);
    }
    // console.log("got new words");
    // console.log(serverWords);
  }, [serverWords]);

  useEffect(() => {
    if (!wordsBank.length) return;
    if (firstLoad.current) {
      firstLoad.current = false;
      return nextWordAppear();
    }
    wordDifficulty.current = wordsBank[wordsBank.length - 1].difficulty;
    wordTimeAlloted.current =
      1.25 + upgradeTimeExtender * 0.1 + wordDifficulty.current * 0.25;
    setWordTargetTimeRemainingDisplay(wordTimeAlloted.current);
    //This is setting a timer
    let timer = setTimeout(() => {
      nextWordAppear();
    }, wordTimeAlloted.current * 1000);
    return () => clearTimeout(timer);
  }, [wordsBank]);

  return (
    <>
      <Container>
        <div className="gameWindow d-inline-flex justify-content-between flex-d w-100">
          <div className="wordCard d-flex align-items-center justify-content-center w-75">
            <div className="text-center d-flex flex-column align-items-center">
              <p id="bounty">
                Prize:
                <Image
                  src={theme === "dark" ? darkDollarSign : dollarSign}
                  fluid
                  className="bounty-image"
                ></Image>
                {calculateMoneyGained().toLocaleString()}
              </p>
              <p id="Word" className="text-break">
                {generateDisplayWord()}
              </p>
            </div>
          </div>
          <div className="trackers d-flex flex-column align-items-center">
            <p id="money" className="w-100">
              Money: {userMoney.toLocaleString()}
            </p>
            <div className="UpgradesCard d-flex w-100">
              <h3>Upgrades</h3>
              <div className="upgrades d-flex w-100 justify-content-center">
                <ul id="upgradelist">
                  <li
                    className="upgradebtn"
                    onClick={() => applyUpgrade("moneyMultiplier")}
                  >
                    <button as="input" type="button" className="clear">
                      <Image
                        src={theme === "dark" ? darkMultiplier : multiplier}
                        fluid
                        className="icon"
                      ></Image>
                      Multiplier
                      <p>
                        Level {upgradeMoneyMultiplier} | Cost:{" "}
                        {getUpgradeCost(
                          "moneyMultiplier",
                          upgradeMoneyMultiplier
                        ).toLocaleString()}
                      </p>
                    </button>
                  </li>
                  <li
                    className="upgradebtn"
                    onClick={() => applyUpgrade("timeExtender")}
                  >
                    <button as="input" type="button" className="clear">
                      <Image
                        src={theme === "dark" ? darkTimeExtender : timeExtender}
                        fluid
                        className="icon"
                      ></Image>
                      Time Extender
                      <p>
                        Level {upgradeTimeExtender} | Cost:{" "}
                        {getUpgradeCost(
                          "timeExtender",
                          upgradeTimeExtender
                        ).toLocaleString()}
                      </p>
                    </button>
                  </li>
                  <li
                    className="upgradebtn"
                    onClick={() => applyUpgrade("wordDifficulty")}
                  >
                    <button as="input" type="button" className="clear">
                      <Image
                        src={theme === "dark" ? darkDifficulty : difficulty}
                        fluid
                        className="icon"
                      ></Image>
                      Word Difficulty
                      <p>
                        Level {upgradeWordDifficulty} | Cost:{" "}
                        {getUpgradeCost(
                          "wordDifficulty",
                          upgradeWordDifficulty
                        ).toLocaleString()}
                      </p>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Game;
