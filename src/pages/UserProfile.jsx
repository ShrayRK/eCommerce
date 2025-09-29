import React, { useState } from "react";
import { useLogin } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";

export const UserProfile = () => {
  const { user, isLoggedIn, logoutUser, addAddress, removeAddress, updateAddress } = useLogin();
  const navigate = useNavigate();

  const [newAddressInput, setNewAddressInput] = useState("");
  const [editAddressIndex, setEditAddressIndex] = useState(null);
  const [editedAddressText, setEditedAddressText] = useState("");

  if (!isLoggedIn) {
    navigate("/login");
    return null;
  }

  const handleAddressSubmit = (event) => {
    event.preventDefault();
    if (newAddressInput.trim() !== "") {
      addAddress(newAddressInput);
      setNewAddressInput("");
    }
  };

  const handleEditAddressSave = (event, oldAddress) => {
    event.preventDefault();
    if (editedAddressText.trim() !== "") {
      updateAddress(oldAddress, editedAddressText);
      setEditAddressIndex(null);
      setEditedAddressText("");
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  const addresses = user?.addresses || [];

  return (
    <div className="UserProfile container py-5">
      <h2 className="mb-4">User Profile</h2>
      {user && (
        <div className="cardUser p-4 mb-4">
          <div className="cardUser-body">
            <p className="lead">
              <strong>Username:</strong> {user.name}
            </p>

            <h4 className="mt-4">Your Saved Shipping Address:</h4>
            {addresses.length === 0 ? (
              <p>No addresses saved yet. Add address.</p>
            ) : (
              <ul className="list-group mb-4">
                {addresses.map((addr, index) => (
                  <li
                    key={index}
                    className={`list-group-item ${
                      editAddressIndex === index ? "edit-mode" : "d-flex justify-content-between align-items-start"
                    }`}
                  >
                    {editAddressIndex === index ? (
                      <form
                        onSubmit={(e) => handleEditAddressSave(e, addr)}
                        className="edit-address-form"
                      >
                        <label htmlFor="editAddress" className="form-label">
                          Edit address
                        </label>
                        <textarea
                          id="editAddress"
                          className="form-control"
                          rows="3"
                          value={editedAddressText}
                          onChange={(e) => setEditedAddressText(e.target.value)}
                          required
                        ></textarea>

                        <div className="mt-2">
                          <button type="submit" className="btn btn-success btn-sm me-2">
                            Save
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={() => setEditAddressIndex(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <span className="address-text me-auto">{addr}</span>
                        <div>
                          <button
                            className="btn btn-info btn-sm me-2"
                            onClick={() => {
                              setEditAddressIndex(index);
                              setEditedAddressText(addr);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => removeAddress(addr)}
                          >
                            Remove
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}

            <h4>Add New Address:</h4>
            <form onSubmit={handleAddressSubmit} className="mt-3">
              <div className="mb-3">
                <label htmlFor="newAddress" className="form-label visually-hidden">
                  New Full Address:
                </label>
                <textarea
                  id="newAddress"
                  className="form-control"
                  rows="3"
                  value={newAddressInput}
                  onChange={(e) => setNewAddressInput(e.target.value)}
                  placeholder="Enter a new full shipping address"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Add Address
              </button>
            </form>

            <button className="btn btn-danger mt-3" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
