import { LandingNav } from '@/components/LandingNav';
import { Footer } from '@/components/Footer';

export function Landing() {
  return (
    <div id="landing" style={{width:"100%", marginLeft: "-2.5em"}}>
      <LandingNav/>

      <div id="landing-text-container">
        <h2 className="landing-subtext" id="welcome-text"><i>Welcome to</i></h2>
        <h1 id="landing-header">UCVTS<br></br>Lost & Found</h1>
        <p className="landing-subtext" id="small-text">A website designed & built by UCVTS students<br></br>for UCVTS students.</p>
      </div>

      <div id="landing-buttons-container">
        <button className="welcome-button"><b>Login</b><i className="fa-solid fa-arrow-right"></i></button>
        <button className="welcome-button"><b>Sign Up</b><i className="fa-solid fa-arrow-right"></i></button>
      </div>

      <div style={{bottom:'0px', position:'fixed', width:'100%'}}>
        <Footer bgcolor='var(--landing-primary)'/>
      </div>

    </div>
    
  );
}
