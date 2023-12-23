import {
  useEffect,
  useState,
} from 'react';

import { createContainer } from 'unstated-next';

function useUserStore () {
    const [user, setUser] = useState([]); 
    return {user, setUser}; 
}
export const UserStore = createContainer(useUserStore);


function useProductStore () {
    const [products, setProducts] = useState([]); 
    return {products, setProducts}; 
}
export const ProductsStore = createContainer(useProductStore);

// categorywise products....
function useCategoryWiseProductStore () {
    const [catrProducts, setCatrProducts] = useState([]);
    return {catrProducts, setCatrProducts};
}
export const CategoryWisedProductsStore = createContainer(useCategoryWiseProductStore);


// This state is decleared for blur.
function useBlueForSafety () {
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(()=>{
        if (JSON.parse(localStorage.getItem('authenticAdmin')) === 'authenticAdmin') {
            setIsModalOpen(false);
        }else{
            setIsModalOpen(true);
        }
    },[])
    return {isModalOpen, setIsModalOpen};
}
export const BlurForSafety = createContainer(useBlueForSafety);