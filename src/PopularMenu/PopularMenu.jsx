import { useEffect, useState } from "react";
import SectionTitle from "../components/SectionTitle/SectionTitle";
import MenuItem from "../pages/Shared/MenuItem/MenuItem";


const PopularMenu = () => {
    // const [menu] = useMenu();
    // const popular = menu.filter(item => item.category === "popular")

    const [menu, setMenu] = useState([])
    useEffect(() => {
        fetch('menu.json')
        .then(res => res.json())
        .then(data => {
            const popularItems = data.filter(item => item.category === 'popular');
            setMenu(popularItems)
        })
    }, [])

    console.log(menu)
    return (



       <section className="mb-12">
        <SectionTitle 
        subHeading={"Check it out"}
        heading={"From our menu"}
        
        ></SectionTitle>
        <div className="grid md:grid-cols-2 gap-4">
            {
                menu.map(item => <MenuItem 
                key={item._id}
                item={item}
    
                
                ></MenuItem> )
            }
        </div>
        <button className="btn btn-outline border-0 border-b-4 mt-4">Order Now</button>
       </section>
    );
};

export default PopularMenu;