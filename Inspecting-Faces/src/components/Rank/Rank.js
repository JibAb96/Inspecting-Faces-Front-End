import React from "react";

const Rank = ({name, entries}) => {
    function capitalizeFirstLetter(string) {
        if (!string) return string;
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    return(
        <div>
            <div className="white f3">
                {`${capitalizeFirstLetter(name)}, your current entry count is ...`}
                           </div>
            <div className="white f1">
                {entries}
            </div>
        </div>
    )
}

export default Rank