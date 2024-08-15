import {React, Component} from "react";
import Navigation from "./components/Navigation/Navigation";
import tachyons from "tachyons";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkform";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/Face Recognition/Face-Recognition";
import SignIn from "./components/SignIn/SignIn"
import Register from "./components/Register/Register";
import Particles from "particles-bg"
import "./App.css"

const returnClarifaiRequestOption = (imageURL) => {
  const PAT = '32b5a7739849494480ba1a6bc8f25fd8';
  const USER_ID = 'jibab96';
  const APP_ID = 'Inspecting-Faces';
  const IMAGE_URL = imageURL;

  const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL

                  }
              }
          }
      ]
  });
  const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
};
  return requestOptions
}

class App extends Component{
  
  constructor(){
    super()
    this.state = {
      input: "",
      imageURL: "",
      box: {},
      route: "signin",
      isSignedIn: false
    }
  }

  calculateFaceLocation = (bottom_row, top_row, right_col, left_col) => {
    const image = document.getElementById("inputimage");
    const width = image.width;
    const height = image.height;
    return {
      left_col: left_col * width,
      top_row: top_row * height,
      right_col: width - (right_col * width),
      bottom_row: height - (bottom_row * height)
    }
  }

  displayBox = (box) => {
    this.setState({box: box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onSubmit = () => {
    this.setState({imageURL: this.state.input})
    fetch("https://api.clarifai.com/v2/models/face-detection/outputs", returnClarifaiRequestOption(this.state.input))
    .then(response => response.json())
    .then(result => {

        const regions = result.outputs[0].data.regions;

        regions.forEach(region => {
            // Accessing and rounding the bounding box values
            const boundingBox = region.region_info.bounding_box;
            const topRow = boundingBox.top_row.toFixed(3);
            const leftCol = boundingBox.left_col.toFixed(3);
            const bottomRow = boundingBox.bottom_row.toFixed(3);
            const rightCol = boundingBox.right_col.toFixed(3);

            region.data.concepts.forEach(concept => {
                // Accessing and rounding the concept value
                const name = concept.name;
                const value = concept.value.toFixed(4);
                console.log(`${name}: ${value} BBox: ${topRow}, ${leftCol}, ${bottomRow}, ${rightCol}`);
                this.displayBox(this.calculateFaceLocation(bottomRow, topRow, rightCol, leftCol))
            });
        });

    })
    .catch(error => console.log('error', error));
  }

  onRouteChange = (route) => {
    if(route === "signin"){
      this.setState({isSignedIn: false})
    } else if (route === "home"){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }
  render() {
    const { box, route, isSignedIn, imageURL } = this.state;
    return (
      <div className="App">
        <Particles  type="cobweb" bg={true} color="#ccffff" num={30}/>
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/>
        { route === "home"
        ? <div> 
            <Logo/>
            <Rank/>
            <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
            <FaceRecognition box={box} imageURL={imageURL}/>
          </div>
        :(route ==="signin" 
          ? <SignIn onRouteChange={this.onRouteChange}/>
          : <Register onRouteChange={this.onRouteChange}/>) 
                }
      </div>
    );}
}

export default App;
