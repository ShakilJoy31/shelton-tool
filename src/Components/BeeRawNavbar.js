"use client"
import 'aos/dist/aos.css';

import React, {
  useEffect,
  useState,
} from 'react';

import Aos from 'aos';
import {
  usePathname,
  useRouter,
} from 'next/navigation';
import { BiSearch } from 'react-icons/bi';
import { LuMenu } from 'react-icons/lu';

import { CustomerAPI } from '@/APIcalling/customerAPI';
// import { SlMenu } from 'react-icons/si';
import { verificationFieldsRound } from '@/constants/speceing';

import MyServiceCSS from '../../style/MyServiceCSS.module.css';
import {
  BlurForSafety,
  CategoryWisedProductsStore,
  ProductsStore,
  UserStore,
} from '../../userStore';
import CustomerSidebar from '../Components/CustomerSidebar';

const Page = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isModalOpen, setIsModalOpen } = BlurForSafety.useContainer();
  const { user, setUser } = UserStore.useContainer();
  const { catrProducts, setCatrProducts } = CategoryWisedProductsStore.useContainer();
  const { products, setProducts } = ProductsStore.useContainer();
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [data, setData] = useState([]);
  useEffect(() => {
    CustomerAPI.handleGettingAllProducts().then(res => {
      setData(res)
      setProducts(res)
    });
    Aos.init({ duration: 500 });
    if (JSON.parse(localStorage.getItem('editable'))) {
      setIsAdmin(true);
    }
  }, [])
  const handleCartFromNavbar = () => {
    if (JSON.parse(localStorage.getItem('beeRawCartSingle'))) {
      localStorage.removeItem('addedProduct');
      localStorage.removeItem('beeRawCartSingle');
    }
    router.push('/cart')
  }
  const [cartItem, setCartItem] = useState(0);
  useEffect(() => {
    if (user?.length === 0) {
      setCartItem((JSON.parse(localStorage.getItem("beeRawCart")))?.length)
    } else {
      setCartItem(user?.length)
    }
  }, [user]);

  const [isInputForTheProduct, setInputForTheProduct] = useState(false);
  const handleSearchProducts = (theValue) => {
    const foundProducts = data.filter((product, index) => (product.title).toLowerCase().match(theValue.toLowerCase()));
    if (!theValue) {
      setProducts(data);
      setInputForTheProduct(false);
    }
    else {
      setProducts(foundProducts);
      setInputForTheProduct(true);
    }
  }
  useEffect(() => {
    CustomerAPI.getCategorizedProductsForCustomer().then(res => {
      setCatrProducts(res);
    })
  }, [])


  const [isBackgroundActive, setIsBackgroundActive] = useState(false);
  const handleHomeImage = () => {
    setIsBackgroundActive(true);
    router.push('/products')
    setTimeout(() => {
      setIsBackgroundActive(false);
    }, 3000);
  };
  const drawer = <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>;
  return (
    <div style={{ filter: `${(isModalOpen && (pathname === '/admin' || pathname === '/admin/user-order')) ? 'blur(3px)' : ''}` }}>
      <div className="lg:flex md:flex justify-between items-center lg:pt-[24px] md:pt-[18px] pt-0">
        {/* For mobile user */}
        <div className='flex items-center lg:hidden md:hidden w-full mb-2'>
          <div>
            <div className="drawer">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content">
                <label htmlFor="my-drawer" className="drawer-button"><span className='hover:cursor-pointer'><LuMenu color={'white'} size={25}></LuMenu></span></label>
              </div>

              <div style={{ zIndex: '4' }} className="drawer-side">
                {drawer}
                <CustomerSidebar drawer={drawer}></CustomerSidebar>
              </div>
            </div>
          </div>

          <div className={`block mx-auto`}>
            <p onClick={handleHomeImage} className={`${MyServiceCSS.sheltonTools} hover:cursor-pointer`}>Shelton Tools</p>
          </div>

        </div>

        <div className={` ${isInputForTheProduct ? MyServiceCSS.inputDisabled : MyServiceCSS.tableRoomInput} w-full`}>
          <div style={{ borderBottom: isInputForTheProduct ? '1px solid crimson' : '' }} className='flex items-center'>
            <span className="mx-3">
              <BiSearch color={'crimson'} size={25}></BiSearch>
            </span>
            <input onChange={(e) => handleSearchProducts(e.target.value)}
              style={{
                borderRadius: verificationFieldsRound,
                background: 'white',
              }}
              placeholder="I am looking for..."
              className="w-full h-[35px] focus:outline-none border-0 pl-1 text-black"
              type="text"
              name=""
              id=""
            />
          </div>


          {
            isInputForTheProduct ? <div style={{ position: 'absolute', zIndex: '1000', background: 'crimson' }} className={`text-white mr-[10px] lg:mr-0 md:mr-0 lg:w-[450px] ${MyServiceCSS.searchResult}`} data-aos="zoom-in-up">
              {
                products?.map((product, index) => <div onClick={() => {
                  router.push(`/products/${product._id}`)
                  setTimeout(function () {
                    setInputForTheProduct(false)
                  }, 600);
                }} key={index} style={{ borderBottom: products.length !== index + 1 ? '1px solid white' : '' }} className={`flex items-center gap-x-2 p-1 ${MyServiceCSS.searchedProduct}`} data-aos="zoom-in-up">
                  <div>
                    <img src={product?.productPicture[0]} alt="Product Image" style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '0 8px 0 8px' }} />
                  </div>

                  <div className='w-full'>
                    <p className='font-bold'>{product?.title}</p>

                    <div className='flex justify-between items-center mt-2'>
                      <p style={{ fontSize: '15px' }} className='text-black'>{product.hourlyHire}/hour</p>
                      <p style={{ fontSize: '15px' }} className='text-black'>{product.dailyHire}/day</p>
                      <p style={{ fontSize: '15px' }} className='text-black'>{product.longTermHire}/custom</p>
                    </div>
                  </div>
                </div>)
              }
            </div> : ''
          }
        </div>
      </div>
    </div>
  );
};

export default Page;