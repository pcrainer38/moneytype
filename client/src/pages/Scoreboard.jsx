import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

import dollarSign from "/moneyTypeDollarSign.svg?url";
import darkDollarSign from "/moneyTypeDollarSignDark.svg?url";

import { useThemeContext } from "../components/ThemeContext.jsx";
import { useQuery } from "@apollo/client";
import { GET_LEADERBOARD } from "../utils/queries.js";

let testUsers = [
  {
    _id: "a",
    username: "Andrew",
    virtualMoney: 19_000_000_000_000,
  },
  {
    _id: "b",
    username: "Brendan",
    virtualMoney: 0.01,
  },
  {
    _id: "c",
    username: "Pam",
    virtualMoney: 0,
  },
  {
    _id: "d",
    username: "Kevin",
    virtualMoney: 0,
  },
  {
    _id: "e",
    username: "Michael",
    virtualMoney: -500,
  },
];

const Scoreboard = () => {
  const { theme, setTheme } = useThemeContext();

  const { loading, error, data } = useQuery(GET_LEADERBOARD);
  return (
    <>
      <Container>
        <div id="leaderboard">
          <h1 id="leadTitle">TYPE JOCKEYS</h1>
          <ul id="rankings">
            {loading
              ? "Loading..."
              : data.leaderboard.map((user) => (
                  <li key={user._id} value={user.username}>
                    <div className="d-flex justify-content-between">
                      <span>{user.username}</span>
                      <span>
                        <Image
                          src={theme === "dark" ? darkDollarSign : dollarSign}
                          className="leaderboard-image"
                        ></Image>
                        {user.virtualMoney.toLocaleString()}
                      </span>
                    </div>
                  </li>
                ))}
          </ul>
        </div>
      </Container>
    </>
  );
};

export default Scoreboard;
