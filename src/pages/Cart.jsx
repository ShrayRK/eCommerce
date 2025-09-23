import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export const Cart = () => {
    const { cart, updateQty, removeFromCart, emptyCart } = useCart();

    return (
        <div className="App container py-5">
            <h2 className="mb-4"> Your Cart </h2>

            {cart.length === 0 ? ( 
                <p>Your cart is empty</p>
            ) : (
                <>
                <div className="row">
                {cart.map((pData) => {
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
                    <p className="card-text"><strong>Price: </strong>{pData.price} $</p>
                    <p className="card-text"><strong>Quantity: </strong>{pData.qty}</p>
                  <div className="space">
                      <button type="button" className="btn btn-secondary" onClick={() => pData.qty === 1 ? removeFromCart(pData.brand) : updateQty(pData.brand, pData.qty - 1)}>{pData.qty > 1 ? "Decrease" : "Remove" }</button>
                      <button type="button" className="btn btn-secondary" onClick={() => updateQty(pData.brand, pData.qty + 1)}>Increase</button>  
                  </div>
                </div>
              </div>
                  </div> 
                  </div>
                  </div>
                )
              })}
              </div>
              <h4>Total: {cart.reduce((acc, pData) => acc + pData.price * pData.qty, 0)} $</h4>
              <p><button type="button" className="btn btn-secondary" onClick={() => emptyCart()}>Empty Cart</button></p>
              <p><Link to="/checkout" className="btn btn-success">Go to Checkout</Link></p>
                </>
            )}
        </div>
    )
}