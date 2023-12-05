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
                    <li>Andrew | $19,000,000,000,000</li>
                    <li>Brendan | $0.01</li>
                    <li>Pam |</li>
                    <li>Kevin | </li>
                    <li>Emmanuel | </li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>    
        </Container>
    </>
    );
  };

  export default Scoreboard;