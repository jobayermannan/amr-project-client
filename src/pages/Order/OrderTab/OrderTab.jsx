import OrderFood from "../../../components/OrderFood/OrderFood";

const OrderTab = ({items}) => {
    return (
        <div className='grid md:grid-cols-3 gap-4'>
        {
            items.map(item => <OrderFood
            key={item._id}
            item={item}
            
            ></OrderFood>)
        }
    </div>
    );
};

export default OrderTab;