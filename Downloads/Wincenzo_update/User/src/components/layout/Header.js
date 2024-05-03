import React, { useEffect, useState } from "react";
import { Button, Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "./image/logo.png";

import { PiHandbagBold } from "react-icons/pi";
import OffCanvasCart from "../../pages/Cart/OffCanvasCart";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "../../features/auth/authSlice";
import { getCart } from "../../features/cart/cartSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [showCart, setShowCart] = useState(false);
  const [isMobileNavbarOpen, setIsMobileNavbarOpen] = useState(false);
  const { cart } = useSelector((state) => state.cart)

  useEffect(() => {
    if (user?._id) dispatch(getCart(user?._id));
  }, [dispatch,user?._id]);

  const navigate = useNavigate()

  const handelTakeATest = () => {
    navigate('/commingsoon')
  }

  const handleShowCart = () => {
   // Check if the user is logged in before opening the cart
   if (user && user !== null) {
    handleNavItemClick();
    setShowCart(true);
  } else {
    // Redirect the user to the login page or take appropriate action
    navigate('/login');
  }
  };
  const handleCloseCart = () => setShowCart(false);

  const handleNavItemClick = () => {
    // Close the navbar when a Nav link is clicked
    if (isMobileNavbarOpen) {
      const navbarToggler = document.querySelector(".navbar-toggler");
      if (navbarToggler) {
        navbarToggler.click();
      }
    }
  };

  const handleNavbarToggle = (isOpen) => {
    setIsMobileNavbarOpen(isOpen);
  };
  return (
    <>
      <Navbar
        expand="md"
        className="bg-body-white header"
        onToggle={handleNavbarToggle}
      >
        <Container>
          <Navbar.Brand as={Link} to={"/"}>
            <img className="brand-logo" src={logo} alt="wincenzo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto">
              <Nav.Link
                className="nav-link"
                as={Link}
                onClick={handleNavItemClick}
                to={"/"}
              >
                Home
              </Nav.Link>
              <Nav.Link
                className="nav-link"
                as={Link}
                onClick={handleNavItemClick}
                to={"/about"}
              >
                About Us
              </Nav.Link>
              <Nav.Link
                className="nav-link"
                as={Link}
                onClick={handleNavItemClick}
                to={"/product"}
              >
                Product
              </Nav.Link>
              <Nav.Link
                className="nav-link"
                as={Link}
                onClick={handleNavItemClick}
                to={"/blog"}
              >
                Blog
              </Nav.Link>
              <Nav.Link
                className="nav-link"
                as={Link}
                onClick={handleNavItemClick}
                to={"/contact"}
              >
                Contact Us
              </Nav.Link>
            </Nav>
            <div className="icons">
              <div className="d-flex icon-thumb align-items-center">
                <span className="cart-btn" onClick={handleShowCart}>
                  <PiHandbagBold />
                  <p className="cart-notification">{cart?.length}</p>
                </span>

                <Dropdown className="ms-2">
                  <Dropdown.Toggle id={`dropdown-basic`}>
                    <Link to={`${user && user !== null ? "" : "/login"}`}>
                    <i className="bi bi-person-circle"></i>
                    </Link>
                  </Dropdown.Toggle>

                  {user && user !== null ? (
                    <>
                      {" "}
                      <Dropdown.Menu>
                        <Dropdown.Item
                          as={Link}
                          onClick={handleNavItemClick}
                          to={"/accountsettings"}
                        >
                          My Account
                        </Dropdown.Item>
                        <Dropdown.Item
                          as={Link}
                          onClick={handleNavItemClick}
                          to={"/wishlist"}
                        >
                          Wishlist
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item
                          as={Link}
                          //   onClick={handleNavItemClick}
                          onClick={() => dispatch(handleLogout())}
                          to={"/login"}
                        >
                          Log Out
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </>
                  ) : (
                    ""
                  )}
                </Dropdown>
              </div>
              <Button className="order-btn btn-sm" onClick={handelTakeATest}>TAKE A TEST</Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <OffCanvasCart show={showCart} handleClose={handleCloseCart} />
    </>
  );
};

export default Header;
