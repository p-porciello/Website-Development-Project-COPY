export function Map() {
  return (
     <>
      <div className="mapContent"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
      }}>
        <img src={'src/assets/schoolMap.png'} style={{width: '50%', height: '100%'}} />
        <p id="map-caption">Each school has a lost and found section by the main office.</p>
      </div>
      
    </>
  );
}
