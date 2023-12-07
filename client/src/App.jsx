import "./App.css";
import { Link, Outlet } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import NavLink from "./components/NavLink.jsx";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

import Image from "react-bootstrap/Image";

import moonSvg from "/Moon.svg?url";
import sunSvg from "/Sun.svg?url";
import Logo from "/moneyTypeLogo.svg?url";

import { useThemeContext } from "./components/ThemeContext.jsx";
import { useUserContext } from "./components/UserContext.jsx";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("auth_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const { theme, setTheme } = useThemeContext();
  const { user } = useUserContext();

  return (
    <ApolloProvider client={client}>
      <Navbar expand="lg" id="header">
        <Container>
          <Link
            to={"/"}
            className="d-flex align-items-center text-decoration-none"
          >
            <Image src={Logo} className="Logo"></Image>
            <h1>Money Type</h1>
          </Link>
          <nav>
            <NavLink to={"/leaderboard"}>Leaderboard</NavLink>
            {user?._id ? "" : <NavLink to={`/signUp`}>Sign Up</NavLink>}
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
