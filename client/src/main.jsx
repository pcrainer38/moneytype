import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import App from "./App.jsx";
import Game from "./pages/game.jsx";
import SignUp from "./pages/signUp.jsx";
import NotFound from "./pages/NotFound.jsx";
import Scoreboard from "./pages/Scoreboard.jsx";

import ThemeProvider from "./components/ThemeContext.jsx";
import UserProvider from "./components/UserContext.jsx";
import SoundProvider from "./components/SoundEnabledContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Game />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "/leaderboard",
        element: <Scoreboard />,
      },
    ],
  },
]);

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

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <SoundProvider>
      <ThemeProvider>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </ThemeProvider>
    </SoundProvider>
  </ApolloProvider>
);
