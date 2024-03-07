import {IMG_CDN_URL} from "../constants";
const Restrauntcard = ({name,cuisines,cloudinaryImageId,LastMileTravelString})=> {
    
    return (
    <div className="card">
    <img src= {IMG_CDN_URL +
     cloudinaryImageId}/>
    <h2>{name}</h2>
    <h3>{cuisines.join(",")}</h3>
    <h4>{LastMileTravelString} minutes</h4>
    </div>
);
};
export default Restrauntcard;