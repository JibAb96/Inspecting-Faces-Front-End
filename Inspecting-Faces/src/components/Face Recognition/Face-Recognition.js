import React from "react";
import "./Face-Recognition.css"
const FaceRecognition = ({imageURL, box}) => {
    return(
        <div className="center ma">
            <div className="absolute mt2">
                <img id="inputimage" src={imageURL} alt="" width={"500px"} height={"auto"}/>
                <div className="boundary-box" style={{
                    top: box.top_row,
                    bottom: box.bottom_row,
                    right: box.right_col,
                    left: box.left_col
                }}></div>
            </div>
        </div>
    )
}

export default FaceRecognition