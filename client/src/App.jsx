import "./App.css";
import { Outlet } from "react-router-dom";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import NavLink from "./components/NavLink.jsx";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar expand="lg" id="header">
        <Container>
          <h1>Money Type</h1>
          <nav>
            <NavLink to={"/leaderboard"}>Leaderboard</NavLink>
            <NavLink to={`/signUp`}>Sign Up</NavLink>
          </nav>
        </Container>
      </Navbar>
      <div className="gameCard">
        <Outlet />
      </div>
    </ApolloProvider>
  );
}

export default App;
