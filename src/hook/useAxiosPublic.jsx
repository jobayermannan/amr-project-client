import axios from "axios";

// Create a public axios instance for general requests
const axiosPublic = axios.create({
    baseURL: 'http://localhost:5000',
});

const useAxiosPublic = () => {
   return axiosPublic;
};

export default useAxiosPublic;
