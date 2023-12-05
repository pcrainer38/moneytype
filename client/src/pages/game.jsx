// import { bootstrap } from 'bootstrap';
// import { useQuery } from '@apollo/client';
import Container from 'react-bootstrap/Container';
const Game = () => {

  
    
  
    return (
    <>
        <Container>
            <div className='gameWindow d-flex'>
                <div className='wordCard'>
                    <p>word</p>
                </div>
                <div className='UpgradesCard'>
                    <h3>upgrades</h3>
                    <div className='icons'>
                        <ul>
                            <li><img></img></li>
                            <li><img></img></li>
                            <li><img></img></li>
                            <li><img></img></li>
                        </ul>
                    </div>
                    <div className='upgrades'>
                        <ul>
                            {/* {upgradeschema.map((upgrade) => {
                                <li key={upgrade._id} value={upgrade.name}>
                                    {upgrade._id}
                                </li>  
                            })} */}
                        </ul>              
                    </div>
                </div>
            </div>
        </Container>
        <div className='toggle'>
            <button>toggle theme</button>
        </div>
    </>
    );
  };

  export default Game;