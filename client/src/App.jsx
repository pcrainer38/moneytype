import "./App.css";
import { Link, Outlet } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import NavLink from "./components/NavLink.jsx";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

import Image from "react-bootstrap/Image";

import moonSvg from "/Moon.svg?url";
import sunSvg from "/Sun.svg?url";
import Logo from "/moneyTypeLogo.svg?url";
import darkLogo from "/moneyTypeLogoDark.svg?url";

import { useThemeContext } from "./components/ThemeContext.jsx";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  const { theme, setTheme } = useThemeContext();

  return (
    <ApolloProvider client={client}>
      <Navbar expand="lg" id="header">
        <Container>
          <Link to={"/"} className="d-flex align-items-center text-decoration-none">
          <Image src={theme === "dark" ? darkLogo : Logo} fluid></Image>
            <h1>Money Type</h1>
          </Link>
          <nav>
            <NavLink to={"/leaderboard"}>Leaderboard</NavLink>
            <NavLink to={`/signUp`}>Sign Up</NavLink>
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
              setTheme(theme === "dark" ? "light" : "dark");
            }}
            className="theme-switcher"
          >
            <Image src={theme === "dark" ? moonSvg : sunSvg} fluid></Image>
          </button>
        </div>
      </Container>
    </ApolloProvider>
  );
}

export default App;
