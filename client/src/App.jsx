import "./App.css";
import { Link, Outlet } from "react-router-dom";

import NavLink from "./components/NavLink.jsx";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

import Image from "react-bootstrap/Image";

import moonSvg from "/Moon.svg?url";
import sunSvg from "/Sun.svg?url";
import soundOptionSvg from "/moneyTypeSFXOption.svg?url";
import soundOptionOffSvg from "/moneyTypeSFXOptionOff.svg?url";
import Logo from "/moneyTypeLogo.svg?url";
import darkLogo from "/moneyTypeLogoDark.svg?url";

import User from "./utils/user.js";

import { useThemeContext } from "./components/ThemeContext.jsx";
import { useSoundContext } from "./components/SoundEnabledContext.jsx";
import { useUserContext } from "./components/UserContext.jsx";

function App() {
  const { theme, setTheme } = useThemeContext();
  const { sound, setSound } = useSoundContext();
  const { user, setUser } = useUserContext();

  return (
    <div className={theme}>
      <Navbar expand="lg" id="header">
        <Container>
          <Link
            to={"/"}
            className=" navs d-flex align-items-center text-decoration-none"
          >
            <Image src={theme === "dark" ? darkLogo : Logo} fluid></Image>
            <h1>Money Type</h1>
          </Link>
          <nav>
            <NavLink to={"/leaderboard"}>Leaderboard</NavLink>
            {user._id && User.isLoggedIn() ? (
              <button
                as="input"
                type="button"
                className="navbtn"
                onClick={() => {
                  User.logout();
                  setUser({});
                }}
              >
                Logout
              </button>
            ) : (
              <NavLink to={`/signUp`}>Sign Up</NavLink>
            )}
          </nav>
        </Container>
      </Navbar>
      <div className="gameCard">
        <Outlet />
      </div>
      <Container>
        <div className="toggle d-flex justify-content-end">
        <button
            onClick={() => {
              setSound(!sound);
            }}
            className="theme-switcher"
          >
            <Image src={sound ? soundOptionSvg : soundOptionOffSvg} fluid></Image>
          </button>
          <button
            onClick={() => {
              setTheme(theme === "dark" ? "light" : "dark");
            }}
            className="theme-switcher"
          >
            <Image src={theme === "dark" ? moonSvg : sunSvg} fluid></Image>
          </button>
        </div>
      </Container>
    </div>
  );
}

export default App;
