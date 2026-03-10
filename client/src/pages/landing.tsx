import { LandingNav } from '@/components/LandingNav';
import { Footer } from '@/components/Footer';

export function Landing() {
  return (
    <div id="landing" style={{width:"100%", marginLeft: "-2.5em"}}>
          <LandingNav/>

      <div id="landing-text-container">
        <h2 id="landing-subtext">Welcome to</h2>
        <h1 id="landing-header">UCVTS Lost and Found</h1>
      </div>

      <div style={{bottom:'0px', position:'fixed', width:'100%'}}>
      <Footer/>
      </div>

    </div>
    
  );
}
