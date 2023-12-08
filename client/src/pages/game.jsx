// import { bootstrap } from 'bootstrap';
// import { useQuery } from '@apollo/client';
import { useState, useEffect, useRef } from "react";

import Image from "react-bootstrap/Image";

import dollarSign from "/moneyTypeDollarSign.svg?url";
import darkDollarSign from "/moneyTypeDollarSignDark.svg?url";
import difficulty from "/upgradeDifficulty.svg?url";
import timeExtender from "/upgradeTimeExtender.svg?url";
import multiplier from "/upgradeMoneyMultiplier.svg?url";

import { useThemeContext } from "../components/ThemeContext.jsx";

import { GET_WORDS } from "../utils/queries.js";

import Container from "react-bootstrap/Container";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_UPGRADES } from "../utils/mutations.js";

import { getUpgradeCost } from "../../../shared/gameLogic.js";

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
  const [wordTimer, setWordTimer] = useState("");
  const [upgradeTimeExtender, setUpgradeTimeExtender] = useState(0);
  const [upgradeMoneyMultiplier, setUpgradeMoneyMultiplier] = useState(0);
  const [upgradeWordDifficulty, setUpgradeWordDifficulty] = useState(0);
  let word = useRef("");
  let mistakes = useRef(0); //useRef will NOT refresh the page upon being updated
  let wordTargetTimeRemaining = useRef(0);
  let wordDifficulty = useRef(0);

  const [setUpgrades] = useMutation(UPDATE_UPGRADES);
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

  function applyUpgrade(upgrade) {
    const cost = getUpgradeCost(upgrade, upgradeLevelMappings[upgrade]);
    if (userMoney >= cost) {
      setUpgrades({
        variables: {
          [upgrade]: 1,
        },
      });
      setUserMoney(userMoney - cost);
      setUpgradeMappings[upgrade](upgradeLevelMappings[upgrade] + 1);
    }
  }

  function setUserWord(str1) {
    setWordDisplay(str1);
    word.current = str1;
  }

  function nextWordAppear() {
    // lets calculate the money gained before resetting mistakes to 0
    if (word.current.length !== 0 && mistakes.current < 3) {
      setUserMoney(
        userMoney +
          Math.floor(
            /*wordTargetBounty*/ (wordTarget.length *
              (1 + wordDifficulty.current * 0.5) +
              wordTargetTimeRemaining.current *
                2 *
                (1 - mistakes.current * 0.33)) *
              (upgradeMoneyMultiplier + wordDifficulty.current * 0.25)
          )
      );
    }
    setUserWord("");
    mistakes.current = 0;
    console.log(`Money: ${userMoney}`);
    // if less than 5 words left, fetch new words
    if (wordsBank.length < 5 && !loadingWords) {
      fetchWords();
      return;
    }
    if (!wordsBank.length) return;
    setWordTarget(wordsBank[wordsBank.length - 1].word);
    setWordsBank(wordsBank.slice(0, -1));
  }

  useEffect(() => {
    function listener(e) {
      if (e.key == "Backspace") {
        setUserWord(wordDisplay.slice(0, -1));
      } else if (/[0-9a-zA-Z-]/.test(e.key) && e.key.length == 1) {
        const correct = e.key === wordTarget[wordDisplay.length];
        if (!correct) {
          // increment num mistakes
          mistakes.current++;
          // console.log(mistakes.current);
          if (mistakes.current > 2) {
            nextWordAppear();
            return;
          }
        }
        // if num mistakes > 3, move to next word
        setUserWord(wordDisplay + e.key.toUpperCase());
      }
    }
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [wordDisplay]);

  useEffect(() => {
    if (serverWords?.words.length) {
      //console.log("Updated words", serverWords.words);
      setWordsBank([...wordsBank, ...serverWords.words]);
    }
    // console.log("got new words");
    // console.log(serverWords);
  }, [serverWords]);

  useEffect(() => {
    if (!wordsBank.length) return;
    wordDifficulty.current = wordsBank[wordsBank.length - 1].difficulty;
    wordTargetTimeRemaining.current =
      (1.25 + upgradeTimeExtender * 0.1 + wordDifficulty.current * 0.25) * 1000;
    //This is setting a timer
    let timer = setTimeout(() => {
      nextWordAppear();
    }, wordTargetTimeRemaining.current);
    return () => clearTimeout(timer);
  }, [wordsBank]);

  // useEffect((num) => {

  // }, [userMoney])

  //Runs only on first load because the array is empty
  useEffect(() => {
    nextWordAppear();
  }, []);

  // These are just variables being declared.
  // let tempWordBank = []; //Gets populated by the back-end (50 words) ... Gets populated with a word Object
  // Word object, when called to appear, will set the wordTargetAllotedTime to the formula
  // let userInput = "";
  // let wordTarget = tempWordBank[0].word;
  // let wordDifficulty = tempWordBank[0].difficulty;
  // let wordTargetAllotedTime = /*(in seconds)*/ ( 1.5 + ( upgradeTimeExtender * 0.1 ) + ( ( wordDifficulty ) * 0.25 ) );
  // let wordTargetTimeRemaining = 0.0; // = wordTargetAllotedTime - wordTargetTimeRemaining
  // let numOfMistakes = 0; //Reset to 0 when new word appears
  // let numOfMistakesAllowed = 3; //This can be changed and dependent on getNumMistakes()
  // let money = 0; //This is the money that the player has (money += moneyTotalGained)
  // let wordTargetBounty = wordTarget.length * ( ( 1 + ( wordDifficulty ) * 0.5 ) ); //The money gained from typing the word correctly
  // let moneyMultiplier = 1 += upgradeMoneyMultiplier * 0.1;
  // let moneyTotalGained = ( ( ( wordTargetBounty ) + ( wordTargetTimeRemaining * 2 * ( 1 - ( numOfMistakes * .33 ) ) ) ) * ( moneyMultiplier + ( ( wordDifficulty ) * .25 ) ) );
  // let upgradeMoneyMultiplier = 0; //Starts at Level 0
  // let upgradeWordDifficulty = 0; //Level 1 is at 0 --- Level 2 is at 1 --- Level 3 is at 2 --- etc...
  // let upgradeTimeExtender = 0; //Start at Level 0
  // let upgradeCostMoneyMultiplier = 120 * ( 1 + ( upgradeMoneyMultiplier ** 2 ) ); //Cost to upgrade
  // let upgradeCostWordDifficulty = 250 + ( ( upgradeWordDifficulty ) * 750 ); //Cost to upgrade
  // let upgradeCostTimeExtender = 175 * ( 1 + ( upgradeCostMoneyMultiplier ** 2 ) ) ; //Cost to upgrade

  // function getNumMistakes(word, targetWord) {
  //     let mistakes = 0;
  //     for (let i = 0; i < targetWord.length; i++) {
  //       if (word[i] !== targetWord[i]) mistakes++;
  //     }
  //     return mistakes;
  //   }

  //Each time we type
  // if ( getNumMistakes (userInput, wordTarget) > 2 ) {
  //delete the word out of existence and go to the next one.
  // };

  // if ( tempWordBank.length < 5 ) {
  //call the server to repopulate tempWordBank[] with 50 new word objects.
  //will need an await/promise
  // }

  return (
    <>
      <Container>
        <div className="gameWindow d-inline-flex justify-content-between flex-d w-100">
          <div className="wordCard d-flex align-items-center justify-content-center w-75">
            <div className="text-center d-flex flex-column align-items-center">
              <p id="bounty">
                Bounty:
                <Image
                  src={theme === "dark" ? darkDollarSign : dollarSign}
                  fluid
                  className="bounty-image"
                ></Image>
                {wordTarget}
              </p>
              <p id="Word" className="text-break">
                {wordDisplay}
              </p>
            </div>
          </div>
          <div className="UpgradesCard d-flex w-25">
            <h3>Upgrades</h3>
            <div className="upgrades d-flex w-100 justify-content-center">
              <ul id="upgradelist">
                {/* {upgradeschema.map((upgrade) => {
                                <li key={upgrade._id} value={upgrade.name}>
                                    {upgrade._id}
                                </li>  
                            })} */}
                <li
                  className="upgradebtn"
                  onClick={() => applyUpgrade("moneyMultiplier")}
                >
                  <button as="input" type="button" className="clear">
                    <Image src={multiplier} fluid className="icon"></Image>
                    Multiplier
                    <p>Level "1" | Cost: "1000"</p>
                  </button>
                </li>
                <li
                  className="upgradebtn"
                  onClick={() => applyUpgrade("timeExtender")}
                >
                  <button as="input" type="button" className="clear">
                    <Image src={timeExtender} fluid className="icon"></Image>
                    Time Extender
                    <p>Level "1" | Cost: "1000"</p>
                  </button>
                </li>
                <li
                  className="upgradebtn"
                  onClick={() => applyUpgrade("wordDifficulty")}
                >
                  <button as="input" type="button" className="clear">
                    <Image src={difficulty} fluid className="icon"></Image>
                    Word difficulty
                    <p>Level "1" | Cost: "1000"</p>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Game;
