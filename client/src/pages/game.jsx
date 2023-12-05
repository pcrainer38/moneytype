const Game = () => {

  
    
  
    return (
    <>
        <div>
            <div>
                <div>
                    <p>{word}</p>
                </div>
                <div>
                    <h3>upgrades</h3>
                    <div>
                        <img></img>
                        <img></img>
                        <img></img>
                        <img></img>
                    </div>
                    <div>
                        <li key={upgradeschema}>
                            {upgradeschema}
                        </li>                        
                    </div>
                </div>
            </div>
        </div>
        <div>
            <button>toggle theme</button>
        </div>
    </>
    );
  };