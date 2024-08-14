import React from "react";
import Navigation from "./components/Navigation/Navigation";
import tachyons from "tachyons";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkform";
import Rank from "./components/Rank/Rank";
import Particles from "particles-bg"
import "./App.css"
function App() {
  return (
    <div className="App">
      <Particles  type="cobweb" bg={true} color="#ccffff" num={30}/>
      <Navigation/>
      <Logo/>
      <Rank/>
      <ImageLinkForm/>
      {/* 
      <FaceRecognition/>*/}
    </div>
  );
}

export default App;
