import { Link, NavLink } from "react-router-dom";
import freshCartLogo from "../../assets/images/freshcart-logo.svg";
import { useContext, useEffect } from "react";
import { UserContext } from "../../context/User.context.jsx";
import { CartContext } from "../../context/Cart.context.jsx";
export default function Navbar() {
  const { token, logOut } = useContext(UserContext);
  const { cartProducts, getCartProducts } = useContext(CartContext);

  useEffect(() => {
    getCartProducts();
  }, []);

  return (
    <>
      <nav className="fixed z-50 left-0 top-0 right-0 py-3 bg-slate-100 shadow-sm">
        <div className="container flex items-center gap-12">
          <a href="">
            <img src={freshCartLogo} alt="FreshCart" />
          </a>

          {token && (
            <>
              <ul className="flex items-center gap-5">
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return isActive ? "text-primary-900" : "";
                      // return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-900 before:left-0 before:-bottom-1  hover:before:w-full before:transition-[width] before:duration-300 ${
                      //   isActive ? "before:!w-full" : ""
                      // }`;
                    }}
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return isActive ? "text-primary-900" : "";
                      // return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-900 before:left-0 before:-bottom-1  hover:before:w-full before:transition-[width] before:duration-300 ${
                      //   isActive ? "before:!w-full" : ""
                      // }`;
                    }}
                    to="/products"
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return isActive ? "text-primary-900" : "";
                      // return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-900 before:left-0 before:-bottom-1  hover:before:w-full before:transition-[width] before:duration-300 ${
                      //   isActive ? "before:!w-full" : ""
                      // }`;
                    }}
                    to="/categories"
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return isActive ? "text-primary-900" : "";
                      // return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-900 before:left-0 before:-bottom-1  hover:before:w-full before:transition-[width] before:duration-300 ${
                      //   isActive ? "before:!w-full" : ""
                      // }`;
                    }}
                    to="/brands"
                  >
                    Brands
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return isActive ? "text-primary-900" : "";
                      // return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-900 before:left-0 before:-bottom-1  hover:before:w-full before:transition-[width] before:duration-300 ${
                      //   isActive ? "before:!w-full" : ""
                      // }`;
                    }}
                    to="/allorders"
                  >
                    Orders
                  </NavLink>
                </li>
              </ul>

              <ul className="flex items-center justify-center gap-6 ml-auto">
                <li>
                  {cartProducts && (
                    <Link
                      to="/wishlist"
                      className="cart relative cursor-pointer ml-auto"
                    >
                      <i className=" fa-solid fa-heart text-primary-900 fa-xl"></i>
                    </Link>
                  )}
                </li>
                <li>
                  <Link to="/cart" className="cart relative cursor-pointer">
                    <i className="fa-solid fa-cart-shopping text-lg"></i>
                    <div className="cart-counter absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-primary-900 text-white flex justify-center items-center">
                      {cartProducts === null ? (
                        <i className="fa-solid fa-spinner fa-spin text-sm"></i>
                      ) : (
                        <span className="text-sm font-semibold">
                          {cartProducts.numOfCartItems}
                        </span>
                      )}
                    </div>
                  </Link>
                </li>
              </ul>
            </>
          )}

          <ul className={`flex items-center gap-5 ${!token && "ms-auto"}`}>
            <li>
              <Link to="https://instagram.com" target="_blank">
                <i className="fa-brands fa-instagram"></i>
              </Link>
            </li>
            <li>
              <Link to="https://facebook.com" target="_blank">
                <i className="fa-brands fa-facebook"></i>
              </Link>
            </li>
            <li>
              <Link to="https://tiktok.com" target="_blank">
                <i className="fa-brands fa-tiktok"></i>
              </Link>
            </li>
            <li>
              <Link to="https://twitter.com" target="_blank">
                <i className="fa-brands fa-twitter"></i>
              </Link>
            </li>
            <li>
              <Link to="https://linkedin.com" target="_blank">
                <i className="fa-brands fa-linkedin"></i>
              </Link>
            </li>
            <li>
              <Link to="https://youtube.com" target="_blank">
                <i className="fa-brands fa-youtube"></i>
              </Link>
            </li>
          </ul>

          <ul className="flex items-center gap-5">
            {!token && (
              <>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return isActive ? "text-primary-900" : "";
                      // return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-900 before:left-0 before:-bottom-1  hover:before:w-full before:transition-[width] before:duration-300 ${
                      //   isActive ? "before:!w-full" : ""
                      // }`;
                    }}
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => {
                      return isActive ? "text-primary-900" : "";
                      // return `relative before:absolute before:w-0 before:h-0.5 before:bg-primary-900 before:left-0 before:-bottom-1  hover:before:w-full before:transition-[width] before:duration-300 ${
                      //   isActive ? "before:!w-full" : ""
                      // }`;
                    }}
                    to="/signup"
                  >
                    SignUp
                  </NavLink>
                </li>
              </>
            )}

            {token && (
              <li onClick={logOut}>
                <a href="">
                  <i className="fa-solid fa-right-from-bracket cursor-pointer text-xl"></i>
                </a>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
