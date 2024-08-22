import { React, Component } from "react";
import Navigation from "./components/Navigation/Navigation";
// eslint-disable-next-line
import tachyons from "tachyons";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkform";
import Rank from "./components/Rank/Rank";
import FaceRecognition from "./components/Face Recognition/Face-Recognition";
import SignIn from "./components/SignIn/SignIn"
import Register from "./components/Register/Register";
import Particles from "particles-bg"
import "./App.css"

const initialState = {
  input: "",
  imageURL: "",
  box: {},
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  }
}
class App extends Component {

  constructor() {
    super()
    this.state = initialState;
  }
  loadUser = (data) => {
    this.setState({
      user:{
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
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
    this.setState({ box: box })
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onPictureSubmit = () => {
    this.setState({ imageURL: this.state.input })
    fetch("https://inspecting-faces-back-end.onrender.com/imageurl", {
      method: "post",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
          input: this.state.input
        })
      }
    ).then(response => response.json())
      .then(result => {
        if(result){
          fetch("https://inspecting-faces-back-end.onrender.com/image", {
            method: "put",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                id: this.state.user.id
              })
            }
          ).then(response => response.json())
          .then(count => {
            this.setState(
              Object.assign(this.state.user, {entries: count})

            )}
            
          )

        }
        const regions = result.outputs[0].data.regions;

        regions.forEach(region => {
          // Accessing and rounding the bounding box values
          const boundingBox = region.region_info.bounding_box;
          const topRow = boundingBox.top_row.toFixed(3);
          const leftCol = boundingBox.left_col.toFixed(3);
          const bottomRow = boundingBox.bottom_row.toFixed(3);
          const rightCol = boundingBox.right_col.toFixed(3);
          
          this.displayBox(this.calculateFaceLocation(bottomRow, topRow, rightCol, leftCol))
    
        });

      })
      .catch(error => console.log('error', error));
  }

  onRouteChange = (route) => {
    if (route === "signin") {
      this.setState(initialState)
    } else if (route === "home") {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route })
  }
  render() {
    const { box, route, isSignedIn, imageURL, user } = this.state;
    return (
      <div className="App">
        <Particles type="cobweb" bg={true} color="#ccffff" num={30} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        {route === "home"
          ? <div>
            <Logo />
            <Rank name={user.name} entries={user.entries} />
            <ImageLinkForm onInputChange={this.onInputChange} onPictureSubmit={this.onPictureSubmit} />
            <FaceRecognition box={box} imageURL={imageURL} />
          </div>
          : (route === "signin"
            ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />)
        }
      </div>
    );
  }
}

export default App;
