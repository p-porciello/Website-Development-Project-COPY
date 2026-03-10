export function AboutUs() {
  return (
    <>
      <h1>About the Developers</h1>

      <div style={{ float: 'left', textAlign: "right", width: '65%',  paddingLeft: '10vh' }}>
        <h2>Caitlin Sayah</h2>
        <p>
          Caitlin is an AIT junior who is in the IT track. She is also on the
          programming sub-team for the robotics team 1257. As a part of the
          programming subteam she learned how to code in Java and got the
          opprortunity to work on a project with a large team. Caitlin also is a
          camp counselor where she takes care of kids from ages 5-12 during the
          summer and is certified to teach archery. Along with all of this,
          Caitlin enjoys solving rubiks cubes and learning about sharks in her
          free time, and is planning on getting her scuba certification.
        </p>
         </div>
         <div style={{width:'30%', float:'left', padding:'1vh',display:'fixed', maxHeight:'400px' }}>
          <img src={'src/assets/CaitlinBanquetPic.jpg'} alt="An image of Caitlin standing in a meadow.  Caitlin is wearing a dress and has short, curly black hair.  She has brown eyes."/>
         </div>
        <div style={{float:'right', textAlign: "left", width: '65%', paddingRight: '10vh', marginTop: "1em"}}>
        <h2>Paige Porciello</h2>
        <p>Paige is an AIT junior in the school's IT track.  Her programming experience
          comes from multiple years of formal schoolwork (AP CSP & AP CSA) along with
          more informal activities such as coding a graphing calculator and solving Project
          Euler problems.  Right now, she's familiar with Python, Java, R, HTML, CSS, 
          and JavaScript.  She's currently learning how to use MongoDB, Node, and React JS
          to build websites such as the one you're on right now!
          In her free time, she does color guard with her town's marching band and Winterguard,
          draws, plays Minecraft, and helps her friends with math and physics problems.  In her
          future, Paige hopes to pursue a career in astrophysics.
        </p>
      </div>
        <div style={{marginTop: "1em", width:'30%', float:'left', padding:'1vh',display:'fixed',  paddingLeft: '10vh' }}>
        <img src={'src/assets/PaigeReal.jpeg'} alt="An image of Paige sitting in a park taken in selfie view.  Paige is wearing a white t-shirt and has long, wavy red hair.  She has blue eyes"/>
        </div>
    </>
  );
}
