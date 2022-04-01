import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";

const SkeletonBlock = () => {
    return (
        <div className="SkeletonContainer">
            <div style={{ maxWidth: "960px", margin: "0 auto"}}>
                <Skeleton variant="text" height={240} />
                <Skeleton variant="rect" height={649} />
            </div>
        </div>
    )
}

export default SkeletonBlock;