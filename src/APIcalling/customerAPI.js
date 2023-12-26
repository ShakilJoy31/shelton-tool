import axios from 'axios';

import {
  BASE_URL,
  categorizedProductsAPI,
  gettingAllProductsAPI,
  placedOrderAPI,
  productsGettingAPI,
} from '@/constants/routeConstants';

// Fetching all product for search. 
const handleGettingAllProducts = async () => {
  const axiosInstance = axios.create({
      baseURL: BASE_URL
    });
  try {
    const response = await axiosInstance.get(gettingAllProductsAPI);
    return response.data;
  } catch (error) {
  }
};



// Fetching caterized products.....
const getCategorizedProductsForCustomer = async () => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL
  });
  try {
    const response = await axiosInstance.get(categorizedProductsAPI);
    return response.data;
  } catch (error) {
    console.log(error)
  }
};

// Fetching specific category products.....
const handleGettingProducts = async (pageNumber, category) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL
  });

  try {
    let apiUrl = `${BASE_URL}${productsGettingAPI}?page=${pageNumber}`;
    if (category) {
      apiUrl += `&category=${category}`;
    }
    const response = await axiosInstance.get(apiUrl);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const handleGettingProduct = async (productId) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL
  });

  try {
    const response = await axiosInstance.get(`/get-product/${productId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};



const userInformationForPlacOrderProduct = async (payload) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL
  });
  try {
    const response = await axiosInstance.post(placedOrderAPI, payload);
    return response.data;
  } catch (error) {
    console.log(error)
  }
};

const addComment = async (toolId, comment) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL
  });
  try {
    const response = await axiosInstance.post(`/add-comment/${toolId}`, comment);
    return response.data;
  } catch (error) {
    // console.error(error);
    // throw new Error("Failed to add comment");
  }
};

const addReviewToComment = async (toolId, getReview) => {
  console.log(getReview);
  const axiosInstance = axios.create({
    baseURL: BASE_URL
  });
  try {
    const response = await axiosInstance.post(`/add-review/${toolId}`, getReview);
    return response.data;
  } catch (error) {
    console.error(error);
    // throw new Error("Failed to add review");
  }
};



// Authentication for the user. 
const handleSignin = async (payload) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL
  });
  try {
    const response = await axiosInstance.post('/signup', payload);
    return response.data;
  } catch (error) {
    console.log(error)
  }
};

const handleLoggedInUsers = async () => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL
  });
  try {
    const response = await axiosInstance.get('/loggedin-users');
    return response.data;
  } catch (error) {
    console.log(error)
  }
};




export const CustomerAPI = {
  handleGettingProducts,
  userInformationForPlacOrderProduct,
  handleGettingProduct,
  getCategorizedProductsForCustomer,
  handleGettingAllProducts,
  addComment,
  addReviewToComment,
  handleSignin,
  handleLoggedInUsers
}
