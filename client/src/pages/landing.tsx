import { CreateAccount } from '../components/create-account';
import { Link } from 'react-router-dom';

export function Landing() {
  return (
    <>
      <div>
        <h2>Welcome to</h2>
        <h1>UCVTS Lost and Found</h1>
        <h2>New?</h2>
        <Link to={'/create-account'} id="createAccountButton">
          <button>Create An Account</button>
        </Link>
        <h2>Returning user?</h2>
        <Link to={'/login'} id="loginButton">
          <button>Sign in</button>
        </Link>
      </div>
    </>
  );
}
