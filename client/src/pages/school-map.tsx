export function Map() {
  return (
     <>

      <div className="mapContent"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        paddingRight:'10vh',
        paddingLeft:'10vh',
        paddingTop:'15vh'
      }}>
        <img src={'src/assets/schoolMap.png'} style={{width: '100vh', height: '100%'}} alt="Map of all UCVTS Schools" />
        <div>
        <img src={'src/assets/AITMain.jpg'} style={{width:'50vh', float:'left', }} alt="AIT lost and found table outside of main office by the bathroom"/>
        <img src={'src/assets/MHSMain.jpg'} style={{width:'50vh', float:'left', }} alt="MHS lost and found table outside of main office by the bulletin board"/>
        <img src={'src/assets/APAMain.jpg'} style={{width:'50vh', float:'left', }} alt="APA main office by the glass case"/>
        </div>
        <h2>AIT, MHS, and APA Directions</h2>
        <p>The AIT, MHS, and APA main offices are directly to the right of the main entrance when you walk in to swipe your ID. 
          Both AIT and MHS have tables outside with lost and found items. 
          However APA keeps the items in the main office.
          However, AAHS and UCTech both have theirs in separate locations</p>
        <div>
        <img src={'src/assets/UCTechMain.jpg'} style={{width:'50vh', float:'left', }} alt="UCTech lost and found under a table in the main office "/>
        <img src={'src/assets/AAHSMain.jpg'} style={{width:'50vh', float:'left', }} alt="Allied lost and found on a counter in the allied main office "/>
        </div>
        <div style={{paddingLeft:'25%'}}>
          <div style={{width:'30%', float:'left'}}>
          <h2>UCTech Directions</h2>
          <p>To get to the UCTech Main office go through the doors by the cafeteria and walk down the hall until you reach the other end of the school, the main office should be to your left.
          Another way is to walk to the bus drop off enterance by the older part of UCTech and the main office is to the right.</p>
          </div>
          <div style={{width:'30%', float:'left', paddingLeft:'5%'}}>
          <h2>AAHS Directions</h2>
          <p>To get to the allied main office you can walk through the main entrance and go straight back until you can see the exit at the back of the school. 
           Turn right and down the hall the main office will be to your left.</p>
          </div>
        </div>
      </div>
      
    </>
  );
}
