import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App.jsx";
import Game from "./pages/game.jsx";
import SignUp from "./pages/signUp.jsx";
import NotFound from "./pages/NotFound.jsx";
import Scoreboard from "./pages/Scoreboard.jsx";

import ThemeProvider from "./components/ThemeContext.jsx";
import UserProvider from "./components/UserContext.jsx";

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

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </ThemeProvider>
);
