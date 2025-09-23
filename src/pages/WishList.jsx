import React from "react";
import { useWishList } from "../context/WishListContext"

export const WishList = () => {
    const { wish, removeFromList } = useWishList();

    return(
        <div className="App container">
            <h2 className="mb-4"> Your WishList </h2>

            {wish.length === 0 ? ( 
                <p>Your wishlist is empty</p>
            ) : (
                <>
                <div className="row">
                {wish.map((pData) => {
                return (
                  <div className="col-md-6 mb-4" key={pData.brand}>
                   <div className="card">
              <div className="row g-0">
                  <div className="col-md-4">
                    <img src={pData.src} alt={pData.brand} className="img-fluid rounded-start"/>
                  </div>
              <div className="col-md-8">
                <div className="card-body">
                    <h5 className="card-title pb-2">{pData.brand}</h5>
                    <p className="card-text"><strong>Rating: </strong>{pData.rating}</p>
                    <p className="card-text"><strong>Price: </strong>{pData.price} $</p>
                  <div className="space">
                      <button type="button" className="btn btn-secondary" onClick={() => removeFromList(pData.brand)}>Remove</button>
                  </div>
                </div>
              </div>
                  </div> 
                  </div>
                  </div>
                )
              })}
              </div>
                </>
            )}
        </div>
    );
};