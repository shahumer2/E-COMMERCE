import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader/index.js';
import PageTitle from './components/PageTitle.js';
import SignIn from './pages/Authentication/SignIn.jsx';
import SignUp from './pages/Authentication/SignUp.jsx';
import Chart from './pages/Chart.js';
import Settings from './pages/Settings.js';
import Tables from './pages/Tables.js';
import Alerts from './pages/UiElements/Alerts.js';
import Buttons from './pages/UiElements/Buttons.js';
import PrivateRoute from './PrivateRoute/PrivateRoute.jsx';
import AddProduct from './components/Admin/Product/AddProduct.jsx';
import HomePage from './components/HomePage/HomePage.jsx';
import ShopCart from './components/HomePage/Cart.jsx';
import Checkout from './components/HomePage/Checkout.jsx';
import Category from "./components/Admin/Configurator/Category.jsx";
import Color from "./components/Admin/Configurator/Color.jsx";
import Size from "./components/Admin/Configurator/Size.jsx";
import Brand from "./components/Admin/Configurator/Brand.jsx";
import Weight from "./components/Admin/Configurator/Weight.jsx";
import AllProduct from './components/HomePage/AllProducts.jsx';
import Header from './components/HomePage/Header';  // Import your Header component
import Footer from './components/HomePage/Footer';  // Import your Footer component

import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const renderHeaderFooter = () => {
    return !['/auth/signin', '/auth/signup'].includes(pathname) && !pathname.startsWith('/private');
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      {renderHeaderFooter() && <Header />}
      <Routes>
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin " />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup " />
              <SignUp />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart" />
              <Chart />
            </>
          }
        />
        <Route
          path="/AllProducts"
          element={
            <>
              <PageTitle title="All Products" />
              <AllProduct />
            </>
          }
        />
        <Route
          path="/homepage"
          element={
            <>
              <PageTitle title="Home" />
              <HomePage />
            </>
          }
        />
        <Route
          index
          element={
            <>
              <PageTitle title="Dashboard" />
              <HomePage />
            </>
          }
        />
        <Route
          path="/Product/CheckoutbyId"
          element={
            <>
              <PageTitle title="Checkout" />
              <Checkout />
            </>
          }
        />
        <Route element={<PrivateRoute />}>
          <Route
            path="/tables"
            element={
              <>
                <PageTitle title="Tables" />
                <Tables />
              </>
            }
          />
          <Route
            path="/settings"
            element={
              <>
                <PageTitle title="Settings" />
                <Settings />
              </>
            }
          />
          <Route
            path="/ui/alerts"
            element={
              <>
                <PageTitle title="Alerts" />
                <Alerts />
              </>
            }
          />
          <Route
            path="/ui/buttons"
            element={
              <>
                <PageTitle title="Buttons" />
                <Buttons />
              </>
            }
          />
        </Route>
        <Route
          path="/Product/cart"
          element={
            <>
              <PageTitle title="Cart" />
              <ShopCart />
            </>
          }
        />
        <Route
          path="/Product/add"
          element={
            <>
              <PageTitle title="Add Product" />
              <AddProduct />
            </>
          }
        />
        <Route
          path="/Product/category"
          element={
            <>
              <PageTitle title="Add Category" />
              <Category />
            </>
          }
        />
        <Route
          path="/brand"
          element={
            <>
              <PageTitle title="Add Brand" />
              <Brand />
            </>
          }
        />
        <Route
          path="/color"
          element={
            <>
              <PageTitle title="Add Color" />
              <Color />
            </>
          }
        />
        <Route
          path="/size"
          element={
            <>
              <PageTitle title="Add Size" />
              <Size />
            </>
          }
        />
        <Route
          path="/weight"
          element={
            <>
              <PageTitle title="Add Weight" />
              <Weight />
            </>
          }
        />
      </Routes>
      {renderHeaderFooter() && <Footer />}
    </>
  );
}

export default App;
