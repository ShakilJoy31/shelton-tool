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

import CategorizedProducts from '@/Components/CategorizedProducts';
import PauseOnHover from '@/Components/PauseOnHover';

import {
  CategoryWisedProductsStore,
  ProductsStore,
  UserStore,
} from '../../../userStore';

const Page = () => {
    const { user, setUser } = UserStore.useContainer();
    const { products, setProducts } = ProductsStore.useContainer();
    const router = useRouter();
    const pathname = usePathname();
    const [warning, setWarning] = useState(false);
    useEffect(() => {
        if (JSON.parse(localStorage.getItem('beeRawCartSingle'))) {
            localStorage.removeItem('beeRawCartSingle');
        }
        Aos.init({ duration: 500 });
    }, [])

    setTimeout(function () {
        if (warning) {
            document.getElementById('alReadyExistsOnTheCartModal')?.close();
            setWarning(false);
        }
    }, 1800);

    const [cartAddedMessage, setCartAddedMessage] = useState('');
    // Updated one for fetching the data.
    const { catrProducts, setCatrProducts } = CategoryWisedProductsStore.useContainer();
    const handleClickedCategoryForMore = (getCategory) => {
        if (getCategory === 'Building Construction Equipment') {
            router.push('/products/building-construction-equipment');
        }
        else if (getCategory === 'Cleaning Equipment') {
            router.push('/products/cleaning-equipment');
        }
        else if (getCategory === 'Decorating tools') {
            router.push('/decorating-tools');
        }
        else if (getCategory === 'Landscaping tools') {
            router.push('/products/landscaping-tools');
        }
        else if (getCategory === 'Electrical & Heating tools') {
            router.push('/products/electrical-and-heating-tools');
        }
        else if (getCategory === 'Plumbing tools') {
            router.push('/products/plumbing-tools');
        }
        else if (getCategory === 'Automotive Tools') {
            router.push('/products/automotive-tools');

        }
        else if (getCategory === 'Carpentry Equipment') {
            router.push('/products/carpentry-quipment');

        }
        else if (getCategory === 'Painting Tools') {
            router.push('/products/painting-tools');

        }
        else if (getCategory === 'Masonry Tools') {
            router.push('/products/masonry-tools');

        }
        else if (getCategory === 'Woodworking Machinery') {
            router.push('/products/woodworking-machinery');

        }
        else if (getCategory === 'Flooring and Tiling Equipment') {
            router.push('/products/flooring-and-tiling-equipment');

        }
        else if (getCategory === 'Welding and Metalworking Tools') {
            router.push('/products/welding-and-metalworking-tools');

        }
        else if (getCategory === 'Demolition Equipment') {
            router.push('/products/demolition-equipment');

        }
    }
    return (
        <div className='h-full'>
            {
                (products?.length < 1) ? <div className='w-full min-h-screen items-center flex justify-center'>
                    <div>
                        <span style={{ color: 'crimson' }} className="loading loading-ring w-24 h-24 block mx-auto"></span>
                        {/* <span className="loading loading-ring loading-lg"></span> */}
                        <p style={{ fontFamily: 'Lucida Sans Unicode' }} className='text-white flex justify-center'>Loading. Please wait...</p>
                    </div>
                </div> : <div data-aos="zoom-in-up">
                    <PauseOnHover></PauseOnHover>
                </div>
            }

            {
                (catrProducts?.length < 1 && products?.length > 1) ? <div className='w-full items-center flex justify-center mb-4'>
                <div>
                    <span style={{ color: 'crimson' }} className="loading loading-ring w-24 h-24 block mx-auto"></span>
                    {/* <span className="loading loading-ring loading-lg"></span> */}
                    <p style={{ fontFamily: 'Lucida Sans Unicode' }} className='text-white flex justify-center'>Loading. Please wait...</p>
                </div>
            </div> : <div>
            {
                catrProducts?.map((byCategory, index) => <div key={index} data-aos="zoom-in-up">
                    <CategorizedProducts byCategory={byCategory} handleClickedCategoryForMore={handleClickedCategoryForMore}></CategorizedProducts>
                </div>)
            }
            </div>
            }

            {/* The modal... */}
            <dialog id="alReadyExistsOnTheCartModal" className="modal" style={{ maxWidth: '480px', transform: 'translateX(-50%)', left: '50%' }}>
                <div style={{
                    color: 'white',
                    background: (cartAddedMessage === 'Product added successfully!' ? 'green' : '#DC3545'),
                    border: '1px solid white'
                }} className="modal-box">
                    <h3 className="flex justify-center text-white">{cartAddedMessage}</h3>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default Page;