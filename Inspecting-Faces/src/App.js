import React from "react";
import Navigation from "./components/Navigation/Navigation";
import tachyons from "tachyons";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkform";
function App() {
  return (
    <div>
      <Navigation/>
      <Logo/>
      <ImageLinkForm/>
      {/* 
      <FaceRecognition/>*/}
    </div>
  );
}

export default App;
