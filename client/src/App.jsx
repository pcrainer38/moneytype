import './App.css'
import { Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar expand="lg" id="header">
        <Container>
              <h1>Money Type</h1>
              <nav>
                <Link to={"/leaderboard"}>
                  <button as="input" type='button' className='navbtn'>leaderboard</button>
                </Link>
                <Link to={`/signUp`} >
                  <button as="input" type='button' className='navbtn'>Sign Up</button>
                </Link>
              </nav>
        </Container>
      </Navbar>
        <div className='gameCard'>
          <Outlet />
        </div>
    </ApolloProvider>
  )
}

export default App
