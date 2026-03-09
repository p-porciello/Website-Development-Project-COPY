import { CreateAccount } from '../components/create-account';
import { Link } from 'react-router-dom';
import { LandingNav } from '@/components/LandingNav';

export function Landing() {
  return (
    <div id="landing">
          <LandingNav/>

      <div id="landing-text-container">
        <h2 id="landing-subtext">Welcome to</h2>
        <h1 id="landing-header">UCVTS Lost and Found</h1>
      </div>
    </div>
  );
}
