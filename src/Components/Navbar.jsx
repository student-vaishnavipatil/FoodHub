import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";
// Import Modal and Cart if they are external components
 import Modal from "../Modal";
import Cart from "../Screens/Cart";

const Navbar = () => {
  const [cartView, setCartView] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("autToken");
    window.location.reload();
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "#549799" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand fs-1 fw-bold" to="/">
          GoFood
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item">
              <Link className="nav-link active fs-5" aria-current="page" to="/">
                Home
              </Link>
            </li>
            {localStorage.getItem("autToken") ? (
              <li className="nav-item">
                <Link className="nav-link active fs-5" to="/my-orders">
                  My Orders
                </Link>
              </li>
            ) : null}
          </ul>
          {!localStorage.getItem("autToken") ? (
            <div className="d-flex">
              <Link className="btn bg-white text-success mx-1 fs-5" to="/login">
                Login
              </Link>
              <Link className="btn bg-white text-success mx-1 fs-5" to="/signup">
                Sign Up
              </Link>
            </div>
          ) : (
            <div>
              <div
                className="btn bg-white text-success mx-1 fs-5"
                onClick={() => setCartView(true)}
              >
                MyCart{" "}
                <Badge pill bg="danger">
                  *
                </Badge>
              </div>
              {cartView ? (
                <Modal onClose={() => setCartView(false)}>
                  <Cart />
                </Modal>
              ) : null}
              <div
                className="btn bg-white text-success mx-1 fs-5"
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
