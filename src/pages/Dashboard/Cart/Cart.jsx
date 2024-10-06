import { FaTrashAlt } from "react-icons/fa";
import useCart from "../../../hook/useCart";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hook/useAxiosSecure";

const Cart = () => {
    const [cart, refetch, isLoading, error] = useCart();
    const axiosSecure = useAxiosSecure();

    if (isLoading) return <div className="text-center mt-8">Loading...</div>;
    if (error) return <div className="text-center mt-8 text-red-500">Error: {error.message}</div>;

    const totalPrice = cart.reduce((total, item) => total + item.price, 0).toFixed(2);

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your item has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    .catch(err => {
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to delete the item.",
                            icon: "error"
                        });
                    });
            }
        });
    }

    if (cart.length === 0) {
        return <div className="text-center mt-8">Your cart is empty.</div>;
    }

    return (
        <div className="bg-slate-100 max-w-4xl mx-auto mt-12 pt-4 px-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <h2 className="text-2xl md:text-3xl uppercase mb-4 md:mb-0">Total Order: {cart.length}</h2>
                <h2 className="text-2xl md:text-3xl uppercase mb-4 md:mb-0">Total Price: ${totalPrice}</h2>
                <button className="btn btn-primary">Pay</button>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th aria-label="Item number">#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((item, index) => (
                            <tr key={item._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img src={item.image} alt={`${item.name} image`} />
                                        </div>
                                    </div>
                                </td>
                                <td>{item.name}</td>
                                <td>${item.price.toFixed(2)}</td>
                                <td>
                                    <button 
                                        onClick={() => handleDelete(item._id)}
                                        className="btn btn-ghost btn-lg"
                                        aria-label={`Delete ${item.name}`}
                                    >
                                        <FaTrashAlt className="text-red-600" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Cart;