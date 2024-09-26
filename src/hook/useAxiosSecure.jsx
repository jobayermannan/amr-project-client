import axios from "axios";

// Create a secure axios instance for protected requests
const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
