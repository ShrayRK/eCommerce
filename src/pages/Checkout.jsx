import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useLogin } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";


export const Checkout = () => {
    const { cart, emptyCart } = useCart();
    const { user, isLoggedIn, addAddress } = useLogin();
    const navigate = useNavigate();

    const [selectedAddress, setSelectedAddress] = useState("");
    const [tempNewAddressInput, setTempNewAddressInput] = useState(""); 
    const [orderPlaced, setOrderPlaced] = useState(false);

    const addresses = user?.addresses || [];

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }
        if (cart.length === 0 && !orderPlaced) {
            navigate("/cart"); 
        }
        
        if (addresses.length > 0 && !selectedAddress) {
            setSelectedAddress(addresses[0]);
        }
    }, [isLoggedIn, cart, navigate, orderPlaced, addresses, selectedAddress]);

    if (!isLoggedIn || cart.length === 0) {
        return null; 
    }

    const totalAmount = cart.reduce((acc, pData) => acc + pData.price * pData.qty, 0);

    const handlePlaceOrder = (event) => {
        event.preventDefault();

        let finalShippingAddress = selectedAddress;
        if (selectedAddress === "new" || addresses.length === 0 && tempNewAddressInput.trim() !== "") {
            finalShippingAddress = tempNewAddressInput.trim();

            addAddress(finalShippingAddress)
        }

        if (!finalShippingAddress || finalShippingAddress.trim() === "") {
            alert("Please select or enter a shipping address.");
            return;
        }

        console.log("Placing order with address:", finalShippingAddress);
        console.log("Order details:", cart);


        emptyCart();
        setOrderPlaced(true);
        alert("Order placed successfully!");
        navigate("/order-confirmation"); 
    };

    return (
        <div className="container py-5">
            <h2 className="mb-4">Checkout</h2>
            {orderPlaced ? (
                <div className="alert alert-success">
                    Your order has been placed successfully!
                    <p className="mt-3">You will be redirected to the order confirmation page.</p>
                </div>
            ) : (
                <form onSubmit={handlePlaceOrder}>
                    <div className="card p-4 mb-4">
                        <h4>Order Summary</h4>
                        <ul className="list-group list-group-flush">
                            {cart.map((item) => (
                                <li key={item.brand} className="list-group-item d-flex justify-content-between align-items-center">
                                    {item.brand} (x{item.qty})
                                    <span>${(item.price * item.qty).toFixed(2)}</span>
                                </li>
                            ))}
                            <li className="list-group-item d-flex justify-content-between align-items-center fw-bold">
                                Total
                                <span>${totalAmount.toFixed(2)}</span>
                            </li>
                        </ul>
                    </div>

                    <div className="card p-4 mb-4 h-100">
                        <h4>Shipping Address</h4>
                        {addresses.length > 0 ? (
                            <>
                                <p className="mb-2">Select a saved address:</p>
                                {addresses.map((addr, index) => (
                                    <div className="form-check mb-2" key={index}>
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="shippingAddress"
                                            id={`address-${index}`}
                                            value={addr}
                                            checked={selectedAddress === addr}
                                            onChange={() => {
                                                setSelectedAddress(addr);
                                                setTempNewAddressInput(""); 
                                            }}
                                        />
                                        <label className="form-check-label" htmlFor={`address-${index}`}>
                                            {addr}
                                        </label>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <p>No saved addresses. Please add one below.</p>
                        )}
                        <div className="form-check mt-3 mb-3">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="shippingAddress"
                                id="newTempAddress"
                                value="new"
                                checked={selectedAddress === "new" || addresses.length === 0}
                                onChange={() => setSelectedAddress("new")}
                            />
                            <label className="form-check-label" htmlFor="newTempAddress">
                                Enter a new address
                            </label>
                        </div>
                        {(selectedAddress === "new" || addresses.length === 0) && (
                            <div className="mb-3">
                                <label htmlFor="tempNewShippingAddress" className="form-label visually-hidden">New Shipping Address:</label>
                                <textarea
                                    id="tempNewShippingAddress"
                                    className="form-control"
                                    rows="3"
                                    value={tempNewAddressInput}
                                    onChange={(e) => setTempNewAddressInput(e.target.value)}
                                    required={selectedAddress === "new" || addresses.length === 0}
                                    placeholder="Enter full shipping address for this order"
                                ></textarea>
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="btn btn-success btn-lg w-100"
                        disabled={
                            !(selectedAddress && selectedAddress !== "new") && 
                            !(selectedAddress === "new" || addresses.length === 0 && tempNewAddressInput.trim() !== "") 
                        }
                    >
                        Place Order
                    </button>
                </form>
            )}
        </div>
    );
};