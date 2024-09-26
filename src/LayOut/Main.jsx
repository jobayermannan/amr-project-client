import { Outlet, useLocation } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";
import NavBar from "../pages/Shared/NavBar/NavBar";

const Main = () => {
const locattion = useLocation();
const noHeaderFooter = locattion.pathname.includes('login') || 
locattion.pathname.includes('signup')
console.log(locattion)
    return (
        <div>
        { noHeaderFooter ||  <NavBar></NavBar>}
            <Outlet></Outlet>
        {  noHeaderFooter ||  <Footer></Footer>}
        </div>
    );
};

export default Main;