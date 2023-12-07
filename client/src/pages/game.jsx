// import { bootstrap } from 'bootstrap';
// import { useQuery } from '@apollo/client';

import Image from "react-bootstrap/Image";

import dollarSign from "/moneyTypeDollarSign.svg?url";
import darkDollarSign from "/moneyTypeDollarSignDark.svg?url";

import { useThemeContext } from "../components/ThemeContext.jsx";

import Container from "react-bootstrap/Container";
const Game = () => {
  const { theme, setTheme } = useThemeContext();
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
        <div className="gameWindow d-flex justify-content-between">
          <div className="wordCard d-flex align-items-center justify-content-center w-75">
            <div className="text-center">
              <p id="bounty">Bounty:
              <Image
                src={theme === "dark" ? darkDollarSign : dollarSign} 
                fluid
                className="bounty-image"
              ></Image>
               wordTargetBounty</p>
              <p id="Word">word</p>
            </div>
          </div>
          <div className="UpgradesCard">
            <h3>upgrades</h3>

            <div className="upgrades d-flex">
              <div className="icons">
                <ul>
                  <li>
                    <img></img>
                  </li>
                  <li>
                    <img></img>
                  </li>
                  <li>
                    <img></img>
                  </li>
                  <li>
                    <img></img>
                  </li>
                </ul>
              </div>
              <ul id="upgradelist">
                {/* {upgradeschema.map((upgrade) => {
                                <li key={upgrade._id} value={upgrade.name}>
                                    {upgrade._id}
                                </li>  
                            })} */}
                <li>upgrade1</li>
                <li>upgrade2</li>
                <li>upgrade3</li>
                <li>upgrade4</li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Game;
