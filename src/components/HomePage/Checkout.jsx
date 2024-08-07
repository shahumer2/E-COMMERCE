import React, { useState } from 'react';
// import './Checkout.css';
import Breadcum from "../../Breadcum/Breadcum.jsx"
import Header from './Header.jsx';
import Instagram from "./Instagram.jsx"
import Footer from "./Footer.jsx"
const Checkout = () => {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    country: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    postcode: '',
    phone: '',
    email: '',
    accountPassword: '',
    orderNotes: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formState);
  };

  return (
    <>
    <Header/>
    <Breadcum label="Checkout"/>
    <section className="checkout spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h6 className="coupon__link"><span className="icon_tag_alt"></span> <a href="#">Have a coupon?</a> Click here to enter your code.</h6>
          </div>
        </div>
        <form className="checkout__form" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-8">
              <h5>Billing detail</h5>
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="checkout__form__input">
                    <p>First Name <span>*</span></p>
                    <input type="text" name="firstName" value={formState.firstName} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="checkout__form__input">
                    <p>Last Name <span>*</span></p>
                    <input type="text" name="lastName" value={formState.lastName} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="checkout__form__input">
                    <p>Country <span>*</span></p>
                    <input type="text" name="country" value={formState.country} onChange={handleInputChange} />
                  </div>
                  <div className="checkout__form__input">
                    <p>Address <span>*</span></p>
                    <input type="text" name="address" placeholder="Street Address" value={formState.address} onChange={handleInputChange} />
                    <input type="text" name="apartment" placeholder="Apartment, suite, unit etc. (optional)" value={formState.apartment} onChange={handleInputChange} />
                  </div>
                  <div className="checkout__form__input">
                    <p>Town/City <span>*</span></p>
                    <input type="text" name="city" value={formState.city} onChange={handleInputChange} />
                  </div>
                  <div className="checkout__form__input">
                    <p>Country/State <span>*</span></p>
                    <input type="text" name="state" value={formState.state} onChange={handleInputChange} />
                  </div>
                  <div className="checkout__form__input">
                    <p>Postcode/Zip <span>*</span></p>
                    <input type="text" name="postcode" value={formState.postcode} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="checkout__form__input">
                    <p>Phone <span>*</span></p>
                    <input type="text" name="phone" value={formState.phone} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="checkout__form__input">
                    <p>Email <span>*</span></p>
                    <input type="text" name="email" value={formState.email} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="checkout__form__checkbox">
                    <label htmlFor="acc">
                      Create an account?
                      <input type="checkbox" id="acc" />
                      <span className="checkmark"></span>
                    </label>
                    <p>Create an account by entering the information below. If you are a returning customer, login at the top of the page</p>
                  </div>
                  <div className="checkout__form__input">
                    <p>Account Password <span>*</span></p>
                    <input type="text" name="accountPassword" value={formState.accountPassword} onChange={handleInputChange} />
                  </div>
                  <div className="checkout__form__checkbox">
                    <label htmlFor="note">
                      Note about your order, e.g, special note for delivery
                      <input type="checkbox" id="note" />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="checkout__form__input">
                    <p>Order notes <span>*</span></p>
                    <input type="text" name="orderNotes" value={formState.orderNotes} onChange={handleInputChange} placeholder="Notes about your order, e.g. special notes for delivery." />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="checkout__order">
                <h5>Your order</h5>
                <div className="checkout__order__product">
                  <ul>
                    <li>
                      <span className="top__text">Product</span>
                      <span className="top__text__right">Total</span>
                    </li>
                    <li>01. Vanilla salted caramel <span>$ 300.0</span></li>
                    <li>02. German chocolate <span>$ 170.0</span></li>
                    <li>03. Sweet autumn <span>$ 170.0</span></li>
                    <li>04. Cluten free mini dozen <span>$ 110.0</span></li>
                  </ul>
                </div>
                <div className="checkout__order__total">
                  <ul>
                    <li>Subtotal <span>$750.99</span></li>
                    <li>Total <span>$750.99</span></li>
                  </ul>
                </div>
                <button type="submit" className="site-btn btn btn-danger">Place order</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
    <Instagram/>
    <Footer/>
    </>
  );
};

export default Checkout;
