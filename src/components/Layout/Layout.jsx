import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer.jsx";
import Navbar from "../Navbar/Navbar.jsx";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="container min-h-[60vh] pb-10 pt-20">
        <Outlet></Outlet>
      </div>
      <Footer />
    </>
  );
}
