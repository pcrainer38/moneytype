import Container from 'react-bootstrap/Container';
const Scoreboard = () => {

  
    
  
    return (
    <>
        <Container>
            <div id='leaderboard'>
                <h1 id="leadTitle">TYPE JOCKEYS</h1>
                <ul id="rankings">
                    {/* {leaderboard.map((user) => {
                        <li key={user._id} value={user.username}>
                            {user.username} | {user.virualMoney}
                        </li>  
                    })} */}
                </ul>
            </div>    
        </Container>
    </>
    );
  };

  export default Scoreboard;