import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useCart = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    
    const { refetch, data: cart = [], isLoading, error } = useQuery({
        queryKey: ['carts', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure(`/carts?email=${user.email}`);
            return res.data;
        },
    });

    return [cart, refetch, isLoading, error];
};

export default useCart;

