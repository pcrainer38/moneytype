// import { bootstrap } from 'bootstrap';
// import { useQuery } from '@apollo/client';
import Container from 'react-bootstrap/Container';
const Game = () => {

  
    
  
    return (
    <>
        <Container>
            <div className='gameWindow d-flex justify-content-between'>
                <div className='wordCard d-flex align-items-center justify-content-center w-75'>
                    <p id='Word'>word</p>
                </div>
                <div className='UpgradesCard'>
                    <h3>upgrades</h3>
                    
                    <div className='upgrades d-flex'>
                        <div className='icons'>
                            <ul>
                                <li><img></img></li>
                                <li><img></img></li>
                                <li><img></img></li>
                                <li><img></img></li>
                            </ul>
                        </div>
                        <ul id="upgradelist">
                            {/* {upgradeschema.map((upgrade) => {
                                <li key={upgrade._id} value={upgrade.name}>
                                    {upgrade._id}
                                </li>  
                            })} */}
                            <li>upgrade1</li>
                            <li>upgrade2</li>
                            <li>upgrade3</li>
                            <li>upgrade4</li>
                        </ul>              
                    </div>
                </div>
            </div>
        </Container>
        <Container>
            <div className='toggle d-flex justify-content-end'>
                <button>toggle theme</button>
            </div>
        </Container>
    </>
    );
  };

  export default Game;