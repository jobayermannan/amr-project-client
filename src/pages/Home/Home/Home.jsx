import { Helmet } from "react-helmet-async";
import PopularMenu from "../../../PopularMenu/PopularMenu";
import Banner from "../Bannaer/Banner";
import Category from "../Category/Category";
import Featured from "../Featured/Featured";
import Testimonials from "../Testimonials/Testimonials";
import BistroBoss from "../BistroBoss/BistroBoss";

const Home = () => {
    return (
        <div>
              <Helmet>
                <title>Bistro Boss | Home</title>
            </Helmet>
           <Banner></Banner>
           <Category></Category>
           <BistroBoss></BistroBoss>
           <PopularMenu></PopularMenu>
           <Featured></Featured>
           <Testimonials></Testimonials>
        </div>
    );
};

export default Home;