import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Layout = () => {
    return (
        <>
            <header className="font-chivo">
                <Navbar />
            </header>
            <Outlet />
            <footer className="font-chivo">
                <Footer />
            </footer>
        </>
    );
};
export default Layout;
