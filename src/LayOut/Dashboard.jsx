import { FaAd, FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
    // const [cart] = useCart();
    // TODO: get isAdmin value from database
    const isAdmin = true;
    return (
        <div className="flex ">
            {/* dashboard side bar */}
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu p-4">
                  {
                    isAdmin ? <>
                      <li>
                        <NavLink to="/dashboard/adminHome">
                        <FaHome></FaHome>
                         Admin Home</NavLink>
                     </li>
                    <li>
                        <NavLink to="/dashboard/addItems">
                      <FaUtensils></FaUtensils>
                         Add Items</NavLink>
                     </li>

                    <li>
                        <NavLink to="/dashboard/manageItems">
                        <FaList></FaList>
                         Manage Items</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/booking">
                        <FaBook></FaBook>
                         My Booking</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/users">
                        <FaUsers></FaUsers>
                         All Users</NavLink>
                    </li>

                    </> :
                    <>
                      <li>
                        <NavLink to="/dashboard/userHome">
                        <FaHome></FaHome>
                         User Home</NavLink>
                     </li>
                    <li>
                        <NavLink to="/dashboard/reservation">
                        <FaCalendar></FaCalendar>
                         Reservation</NavLink>
                     </li>

                    <li>
                        <NavLink to="/dashboard/cart">
                        <FaShoppingCart></FaShoppingCart>
                         My Cart ({cart.length}) </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/review">
                        <FaAd></FaAd>
                         Add a Review</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/booking">
                        <FaList></FaList>
                         My Booking</NavLink>
                    </li>
                    
                    </>
                  }

                    {/* shared nav links */}
                    <div className="divider"></div>

                    <li>
                        <NavLink to="/">
                       <FaHome></FaHome>
                         Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/salad">
                       <FaSearch></FaSearch>
                         Menu</NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/contact">
                       <FaEnvelope></FaEnvelope>
                         Contact</NavLink>
                    </li>

                    </ul>

            </div>
            {/* dashboard content */}
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;

















// import { FaAd, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUser, FaUsers } from "react-icons/fa";
// import { NavLink, Outlet } from "react-router-dom";
// import useCart from "../hook/useCart";

// const Dashboard = () => {
//     const [cart] = useCart();
//     // TODO: get isAdmin value from the database
//     const isAdmin = true;
//     return (
//         <div className="flex">
//             {/* dashboard side bar */}
//             <div className="w-64 min-h-full bg-orange-400">
              
//                 <ul className="menu">
               
//                 {
//                     isAdmin ? <>
//                  <li>
//                         <NavLink to="/dashboard/adminHome">
//                         <FaHome></FaHome>
//                          Admin Home</NavLink>                     </li>
//                     <li>
//                          <NavLink to="/dashboard/addItems">
//                        <FaUtensils></FaUtensils>
//                          Add Items</NavLink>
//                       </li>
//                       </li
//                      <li>
//                          <NavLink to="/dashboard/manageItems">                  <FaList></FaList>
//                           Manage Items</NavLink>
//                   </li>
//                      <li>
//                          <NavLink to="/dashboard/booking">
//                          <FaBook></FaBook>
//                           My Booking</NavLink>
//                      </li>
//                      <li>
//                          <NavLink to="/dashboard/users">
//                          <FaUsers></FaUsers>
//                           All Users</NavLink>
//                      </li>

                  
//                     </>
//                 }
            
//                     <div className="divider"></div>
//                     <li>
//                         <NavLink to="/">
//                         <FaHome></FaHome>
//                         User Home</NavLink>
//                     </li>
//                     <li>
//                        <NavLink to="order/salad">
//                      <FaSearch></FaSearch>
//                          Menu</NavLink>
//                    </li>
                   
//                    <li>
//                      <NavLink to="/order/contact">
//                        <FaEnvelope></FaEnvelope>
//                         Contact</NavLink>  
//                         </li>
//                 </ul>
//             </div>
//         {/* dashboard content */}
//             <div className="flex-1">
//                 <Outlet></Outlet>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;













// import { FaBook, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUsers, FaUtensils, } from "react-icons/fa";
// import { NavLink, Outlet } from "react-router-dom";
// import useCart from "../hook/useCart";

// const Dashboard = () => {
//     // const [cart] = useCart();
//     // TODO: get isAdmin value from database
//     const isAdmin = true;
//     return (
//         <div className="flex ">
//             {/* dashboard side bar */}
//             <div className="w-64 min-h-screen bg-orange-400">
//                 <ul className="menu p-4">
//                   {
//                     isAdmin ? <>
//                       <li>
//                         <NavLink to="/dashboard/adminHome">
//                         <FaHome></FaHome>
//                          Admin Home</NavLink>
//                      </li>
//                     <li>
//                         <NavLink to="/dashboard/addItems">
//                       <FaUtensils></FaUtensils>
//                          Add Items</NavLink>
//                      </li>

//                     <li>
//                         <NavLink to="/dashboard/manageItems">
//                         <FaList></FaList>
//                          Manage Items</NavLink>
//                     </li>
//                     <li>
//                         <NavLink to="/dashboard/booking">
//                         <FaBook></FaBook>
//                          My Booking</NavLink>
//                     </li>
//                     <li>
//                         <NavLink to="/dashboard/users">
//                         <FaUsers></FaUsers>
//                          All Users</NavLink>
//                     </li>

//                     </> :
//                     <>
//                       <li>
//                         <NavLink to="/dashboard/userHome">
//                         <FaHome></FaHome>
//                          User Home</NavLink>
//                      </li>
//                     <li>
//                         <NavLink to="/dashboard/reservation">
//                         <FaCalendar></FaCalendar>
//                          Reservation</NavLink>
//                      </li>

//                     <li>
//                         <NavLink to="/dashboard/cart">
//                         <FaShoppingCart></FaShoppingCart>
//                          My Cart ({cart.length}) </NavLink>
//                     </li>
//                     <li>
//                         <NavLink to="/dashboard/review">
//                         <FaShoppingCart></FaShoppingCart>
//                          Add a Review</NavLink>
//                     </li>
//                     <li>
//                         <NavLink to="/dashboard/booking">
//                         <FaList></FaList>
//                          My Booking</NavLink>
//                     </li>
                    
//                     </>
//                   }

//                     {/* shared nav links */}
//                     <div className="divider"></div>

//                     <li>
//                         <NavLink to="/">
//                        <FaHome></FaHome>
//                          Home</NavLink>
//                     </li>
//                     <li>
//                         <NavLink to="/order/salad">
//                        <FaSearch></FaSearch>
//                          Menu</NavLink>
//                     </li>
//                     <li>
//                         <NavLink to="/order/contact">
//                        <FaEnvelope></FaEnvelope>
//                          Contact</NavLink>
//                     </li>

//                     </ul>

//             </div>
//             {/* dashboard content */}
//             <div className="flex-1">
//                 <Outlet></Outlet>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;