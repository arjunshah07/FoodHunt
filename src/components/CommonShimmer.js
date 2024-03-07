export const MenuShimmer = () => {
    let shimmer = false;
    if(props.type == "shimmer") {
      shimmer = true;
    }
    return (
      <div className="restaurant-menu">
        <div className={shimmer? "restaurant-summary stroke-color animate" : "restaurant-summary"}>
          {shimmer ?         <img className="shimmer-img stroke animate" />
           : <img className="restaurant-img" src={ RES_IMG_CDN  + restaurant?.cloudinaryImageId } alt={restaurant?.name}/> }
          <div className="restaurant-summary-details">
            <h2 className={shimmer ?"shimmer-w40  stroke animate": "restaurant-title"}>{restaurant?.name}</h2>
            <p className={shimmer ? "shimmer-w20 stroke animate" : "restaurant-tags"}>{restaurant?.cuisines.join(", ")}</p>
            <div className= { shimmer ? "shimmer-w60  stroke animate" : "restaurant-details" }>
            <div className={shimmer? "none" :"" }>
              <div className="restaurant-rating">
                <AiFillStar /><span>{restaurant?.avgRating}</span>
              </div>
              <div>|</div>
              <div>{restaurant?.sla.slaString}</div>
              <div>|</div>
              <div>{restaurant?.costForTwoMsg}</div>
            </div>
            </div>
          </div>
        </div>
  
        <div className="restaurant-menu-content">
          <div className="menu-items-container">
            <div className="menu-title-wrap">
              <h3 className={shimmer ? "shimmer-w40 stroke animate" : "menu-title"}>Recommended</h3>
              <p className={ shimmer ? "shimmer-w20 stroke animate" : "menu-count" }>{Object.keys(restaurant?.menu?.items).length} ITEMS</p>
            </div>
            <div className="menu-items-list">
              { shimmer ? Array.from({length:SHIMMER_RES_CARDS_COUNT}).map( (element, index)  =>
              <ShimmerMenuItem></ShimmerMenuItem>) : 
               Object.values(restaurant?.menu?.items).map( item => 
                <MenuItem></MenuItem>
              )
             }          
            </div>
          </div>
          <div className="cart-widget"></div>
  
        </div>
      </div>
    )
  }
  