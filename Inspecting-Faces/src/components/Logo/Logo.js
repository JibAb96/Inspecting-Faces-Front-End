import React from "react";
import Inspector from "./InspectingFaces-Logo.png"
import Tilt from 'react-parallax-tilt';
const Logo = () => {
    return(
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-2" options={{max: "55"}} style={{ height: '150px', width: "150px"}}>
                    <div className="Tilt-inner">
                        <img src={Inspector} alt="logo" style={{paddingTop: "5px"}}/>
                    </div>
            </Tilt>
        </div>
    );
}

export default Logo