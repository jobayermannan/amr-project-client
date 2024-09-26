import featuredImg from '../../../assets/home/featured.jpg';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import './Featured.css'
const Featured = () => {
    return (
       <div className='featured-item text-white pt-8 my-20'>
        <SectionTitle
        subHeading={"Check it out"}
        heading={"From our Menu"}
        ></SectionTitle>
         <div className='flex  justify-center bg-slate-500  bg-opacity-40 items-center pb-20 pt-12 px-36'>
            <div>
                <img src={featuredImg} alt="" />
            </div>
            <div className='md:ml-10'>
                <h2 className=''>Aug20, 2028</h2>
                <h1 className='uppercase '>Whare can i get some?</h1>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Expedita illo nostrum minima, sunt repellendus similique inventore reprehenderit asperiores qui eligendi quis tenetur quia placeat minus possimus velit perspiciatis voluptas modi at quasi voluptatum voluptates repellat optio. Blanditiis consectetur laborum dignissimos, excepturi beatae incidunt ullam aperiam soluta tempora iusto, numquam repellendus.</p>
                <button className='btn btn-outline border-0 border-b-4 text-white'>Order Now</button>
            </div>
        </div>
       </div>
    );
};

export default Featured;