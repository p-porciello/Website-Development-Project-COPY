export function FAQ() {
  return (
    <>
      
      <h1>Frequently Asked Questions</h1>
      <div className="faq-container">
      <div className="faq-item">
        <h2>What is the UCVTS Lost & Found?</h2>
        <p>
          The UCVTS Lost and Found is a website where you can post items you have found and search for items you have lost.
          This website is intended for use by UCVTS students and teachers to help locate lost items. 
        </p>
      </div>
      <div className="faq-item">
        <h2>Is the UCVTS Lost & Found affiliated with UCVTS schools?</h2>
        <p>
          Currently, the UCVTS Lost and Found is not affiliated with the UCVTS school district.
        </p>
      </div>
      <div className="faq-item">
        <h2>How do I post an item?</h2>
        <p>
          To post an item click the submit item button on the navigation bar. 
          Then fill out the form with all the information asked, 
          make sure to not miss any of the fields or else the item will not post. 
          Your item wont immediately go up as an admin will approve it first.
          Once the item post is admin approved it will appear in the lost items catalouge for everyone to see.
        </p>
      </div>
      <div className="faq-item">
      <h2>How do I claim an item?</h2>
      <p>
        To claim an item search for the item you wish to claim. Then scroll to
        the item that you own and click on the item to get to that specific items page.
        Once on the page click the claim item button and the item will now be
        marked as claimed. If you accidentally claim an item please contact an
        admin to unclaim the item for you.
      </p>
      </div>
      <div className="faq-item">
      <h2>When should I claim an item?</h2>
      <p>
        You should claim an item when you are certain it is yours and collect it as soon as possible. 
        If you claim an item and it isnt yours, contact an admin imediately to unclaim it for you.
      </p>
      </div>
      <br></br>
      <div style={{width:'100%', float:'right', paddingTop:'10vh'}}>
      <h2>Video walkthroughs</h2>
      <p>
        If you need a video walkthrough for further clarification, you can find them on our youtube channel.
      </p>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/QOeb0_GFRLE?si=Ns3d3vbX2zkNNdL2" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
    </div>
    </>
  );
}
