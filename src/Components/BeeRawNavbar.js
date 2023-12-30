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
import { FaUserCircle } from 'react-icons/fa';
import { IoLogOut } from 'react-icons/io5';
import { LuMenu } from 'react-icons/lu';

import { CustomerAPI } from '@/APIcalling/customerAPI';
// import { SlMenu } from 'react-icons/si';
import { verificationFieldsRound } from '@/constants/speceing';

import DashboardCSS from '../../style/Dashboard.module.css';
import IndividualCSS from '../../style/Individual.module.css';
import MyServiceCSS from '../../style/MyServiceCSS.module.css';
import {
  AuthenticUser,
  BlurForSafety,
  CategoryWisedProductsStore,
  LoggedInUserStore,
  ProductsStore,
  UserStore,
} from '../../userStore';
import CustomerSidebar from '../Components/CustomerSidebar';
import SheltonLogin from './SheltonLogin';
import SheltonSignup from './SheltonSignup';

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
  const { isLoggedIn, setIsLoggedIn } = LoggedInUserStore.useContainer();
  const { authenticatedUser, setAuthenticatedUser } = AuthenticUser.useContainer();
  useEffect(() => {
    CustomerAPI.handleGettingAllProducts().then(res => {
      setData(res)
      setProducts(res)
    });
    Aos.init({ duration: 500 });
    if (JSON.parse(localStorage.getItem('editable'))) {
      setIsAdmin(true);
    }
    if (JSON.parse(localStorage.getItem('user'))) {
      setIsLoggedIn(true);
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
            <p onClick={handleHomeImage} className={`${MyServiceCSS.sheltonTools} hover:cursor-pointer flex items-center gap-x-2`}>Shelton Tools</p>
          </div>

          {
            (isLoggedIn || authenticatedUser) ? <span onClick={() => {
              setIsAdmin(false)
              localStorage.removeItem('user')
              localStorage.removeItem('editable')
              localStorage.removeItem('AdminUser')
              localStorage.removeItem('authenticAdmin')
              setIsLoggedIn(false);
              setAuthenticatedUser(false);
            }} className={`${IndividualCSS.plusCommnet}`}><IoLogOut size={25}></IoLogOut></span> : <div className="flex items-center ml-2 gap-x-2">
              <label className="flex items-center justify-between" htmlFor="settingsModal"><span className={`${DashboardCSS.date} hover:cursor-pointer`}><FaUserCircle size={25}></FaUserCircle></span></label>

            </div>
          }

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


        {
          (isLoggedIn || authenticatedUser) ? <span onClick={() => {
            setIsAdmin(false)
            localStorage.removeItem('user')
            localStorage.removeItem('editable')
            setIsLoggedIn(false)
            setAuthenticatedUser(false);
            localStorage.removeItem('AdminUser')
            localStorage.removeItem('authenticAdmin')
          }} className={`${IndividualCSS.plusCommnet} lg:flex md:flex hidden`}><IoLogOut size={25}></IoLogOut></span> : <div className="lg:flex md:flex items-center hidden ml-2 gap-x-2">
            <button onClick={() => {
              document.getElementById('loginModal').showModal();
            }} className={`btn border-0 btn-sm w-full lg:w-[100px] normal-case ${DashboardCSS.IndividualProductBuyNowButton}`}>Login</button>

            <button onClick={() => {
              document.getElementById('signupModal').showModal();
            }} className={`btn border-0 btn-sm w-full lg:w-[100px] normal-case ${DashboardCSS.IndividualProductBuyNowButton}`}>Sign up</button>
          </div>
        }

      </div>


      {/* The modal for login */}
      <dialog id="loginModal" className="modal">
        <div style={{
          color: 'white',
          background: 'black',
          border: '2px solid crimson'
        }} className="modal-box">
          <SheltonLogin setIsLoggedIn={setIsLoggedIn}></SheltonLogin>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>


      {/* The modal for signup */}
      <dialog id="signupModal" className="modal">
        <div style={{
          color: 'white',
          background: 'black',
          border: '2px solid crimson'
        }} className="modal-box">
          <SheltonSignup setIsLoggedIn={setIsLoggedIn}></SheltonSignup>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>


      <div>
        <input type="checkbox" id="settingsModal" className="modal-toggle" />
        <div className="modal">
          <div style={{
          color: 'white',
          background: 'black',
          border: '2px solid crimson'
        }} className="relative modal-box">
            <label htmlFor="settingsModal" className="absolute btn btn-sm btn-circle right-2 top-2">✕</label>
            <button onClick={() => {
              document.getElementById('loginModal').showModal();
            }} className={`btn border-0 btn-sm w-full normal-case ${DashboardCSS.IndividualProductBuyNowButton}`}>Login</button>

            <button onClick={() => {
              document.getElementById('signupModal').showModal();
            }} className={`btn border-0 btn-sm w-full normal-case ${DashboardCSS.IndividualProductBuyNowButton}`}>Sign up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;