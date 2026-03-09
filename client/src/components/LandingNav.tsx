import { useState } from 'react';
import { Link } from 'react-router-dom';

export function LandingNav() {
  const [clicked, setClicked] = useState<boolean>(false);

    return (
    <>
    <nav className="navbar">

      <div id="nav-buttons" className={clicked ? "#nav-buttons active": "#nav-buttons"}>
        <Link to={'/create-account'} id="createAccountButton">
          <button className="landing-button">Create An Account</button>
        </Link>

        <Link to={'/login'} id="loginButton">
          <button className="landing-button">Sign in</button>
        </Link>      
      </div>
    
      
      <div id="mobile" onClick={() => setClicked(!clicked)}>
        {clicked ? 
        <i className="fas fa-times"></i>
        :
        <i className='fas fa-bars'></i>
        }
      </div>
      
    
    </nav>
    </>
  );
}
