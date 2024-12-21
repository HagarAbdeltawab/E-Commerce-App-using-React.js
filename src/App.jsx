import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout.jsx";
import Home from "./pages/Home/Home.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import Login from "./pages/Login/Login.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import GuestRoute from "./components/GuestRoute/GuestRoute.jsx";
import UserProvider from "./context/User.context.jsx";
import CartProvider from "./context/Cart.context.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import ProductDetails from "./pages/ProductDetails/ProductDetails.jsx";
import Checkout from "./pages/Checkout/Checkout.jsx";
import Orders from "./pages/Orders/Orders.jsx";
import Offline from "./components/Offline/Offline.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Products from "./pages/Products/Products.jsx";
import Categories from "./pages/Categories/Categories.jsx";
import Brands from "./pages/Brands/Brands.jsx";
import Wishlist from "./pages/Wishlist/Wishlist.jsx";
import WishlistProvider from "./context/wishlist.context.jsx";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "products", element: <Products /> },
        { path: "product/:id", element: <ProductDetails /> },
        { path: "categories", element: <Categories /> },
        { path: "category/:id", element: <h2>Category</h2> },
        { path: "brands", element: <Brands /> },
        { path: "wishlist", element: <Wishlist /> },
        { path: "cart", element: <Cart /> },
        { path: "checkout", element: <Checkout /> },
        { path: "allorders", element: <Orders /> },
        { path: "*", element: <NotFound /> },
      ],
    },
    {
      path: "/",
      element: (
        <GuestRoute>
          <Layout />
        </GuestRoute>
      ),
      children: [
        { path: "signup", element: <Signup /> },
        { path: "login", element: <Login /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  const client = new QueryClient();

  return (
    <>
      <QueryClientProvider client={client}>
        <UserProvider>
          <CartProvider>
            <WishlistProvider>
              <RouterProvider router={routes} />
            </WishlistProvider>
          </CartProvider>
        </UserProvider>

        <Toaster position="top-right" />

        <ReactQueryDevtools initialIsOpen={false} />

        <Offline>
          <div className="p-4 rounded-lg shadow bg-gray-200 text-gray-600 font-semibold fixed right-8 bottom-8 z-50">
            <i className="fa-solid fa-wifi mr-2"></i>
            <span>Check Your Internet Connection</span>
          </div>
        </Offline>
      </QueryClientProvider>
    </>
  );
}

export default App;
