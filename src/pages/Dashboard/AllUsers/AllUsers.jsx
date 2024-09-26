import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
    // Custom Axios hook for secure API requests
    const axiosSecure = useAxiosSecure();

    // Fetch users with react-query. The queryKey is ['users'] and the queryFn is fetching the users data from the secure API endpoint.
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    // Function to make a user an admin. Sends a PATCH request to the backend with the user's ID.
    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)  // PATCH request to update the user's role to 'admin'
        .then(res => {
            console.log(res.data);
            if(res.data.modifiedCount > 0) {  // If the user's role was successfully updated
                refetch();  // Refetch the users to update the list
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is an admin now!`,  // Show success notification
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    };

    // Function to delete a user. Opens a confirmation dialog using SweetAlert before sending a DELETE request.
    const handleDeleteUser = user => {
        Swal.fire({
            title: "Are you sure?",  // Confirmation message
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,  // Show the cancel button in case the user changes their mind
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"  // Confirmation button text
        }).then((result) => {
            if (result.isConfirmed) {
                // Proceed with the deletion if the user confirms
                axiosSecure.delete(`/users/${user._id}`)  // DELETE request to remove the user
                .then(res => {
                    if (res.data.deletedCount > 0) {  // If the user was successfully deleted
                        refetch();  // Refetch the users to update the list
                        Swal.fire({
                            title: "Deleted!",
                            text: "The user has been deleted.",
                            icon: "success"
                        });
                    }
                });
            }
        });
    };

    return (
        <div>
            {/* Display the total number of users */}
            <div className="flex justify-evenly my-4">
                <h2 className="text-3xl">All Users</h2>
                <h2 className="text-3xl">Total Users: {users.length}</h2>
            </div>

            {/* Table to display users */}
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {user.role === 'admin' ? (
                                        'Admin'  // If the user is already an admin, display 'Admin'
                                    ) : (
                                        // Button to make a user admin
                                        <button 
                                            onClick={() => handleMakeAdmin(user)} 
                                            className="btn bg-orange-500 btn-lg">
                                            <FaUsers className="text-white text-2xl" />
                                        </button>
                                    )}
                                </td>
                                <td>
                                    {/* Button to delete a user */}
                                    <button 
                                        onClick={() => handleDeleteUser(user)} 
                                        className="btn btn-ghost btn-lg">
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

export default AllUsers;
