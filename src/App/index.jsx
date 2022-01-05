import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import SignUp from "../views/SignUp";
import Footer from "../components/Footer";
import Home from "../views/Home";
import SignIn from "../views/SignIn";
import Navbar from "../components/Navbar";
import NotFound from "../views/NotFound";
import ProductGrid from "../views/ProductGrid";
import SingleProduct from "../views/SingleProduct";
import Cart from "../views/Cart";
import { CartProvider } from "react-use-cart";
import UsersList from "../views/UsersList";
import Profile from "../views/Profile";
import { checkLogin } from "../store/user";
import Admin from "../views/Admin";
import CreateProducts from "../views/CreateProducts";
import { useSelector } from "react-redux";
import PutProducts from "../views/PutProducts";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  React.useEffect(() => {
    dispatch(checkLogin());
  }, []);

  return (
    <>
      <CartProvider>
        <Navbar />
        <Switch>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/admin">
            {user.role === "admin" || user.role === "superAdmin" ? (
              <Admin />
            ) : (
              <NotFound />
            )}
          </Route>
          <Route exact path="/admin/users">
            {user.role === "superAdmin" ? <UsersList /> : <NotFound />}
          </Route>
          <Route exact path="/admin/creacion">
            {user.role === "admin" || user.role === "superAdmin" ? (
              <CreateProducts />
            ) : (
              <NotFound />
            )}
          </Route>
          <Route exact path="/register">
            {user.name ? <Redirect to="/home" /> : <SignUp />}
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/login">
            {user.name ? <Redirect to="/home" /> : <SignIn />}
          </Route>
          <Route exact path="/producto/:id">
            <SingleProduct />
          </Route>
          <Route exact path="/edicion/:id">
            <PutProducts />
          </Route>
          <Route exact path="/productos/:tag">
            <ProductGrid />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route path="/404" component={NotFound} />
          <Route path="*">
            <Redirect to="/404" />
          </Route>
        </Switch>
        <Footer />
      </CartProvider>
    </>
  );
}

export default App;
