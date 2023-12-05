import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.jsx';
import Game from './pages/Game.jsx';
import SignUp from './pages/SignUp.jsx';
import NotFound from './pages/NotFound.jsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Game />
      },
      {
        path: '/signUp',
        element: <SignUp />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);