import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React, {
  useEffect,
  useState,
} from 'react';

import Aos from 'aos';
import { useRouter } from 'next/navigation';
import Slider from 'react-slick';

import { CustomerAPI } from '@/APIcalling/customerAPI';

import DashboardCSS from '../../style/Dashboard.module.css';

const SimpleSlider = () => {
    const router = useRouter();
    const [onlyBestSeller, setOnlyBestSeller] = useState([]);
    useEffect(() => {
        CustomerAPI.handleGettingProducts(1, 'Building Construction Equipment').then(res => {
            setOnlyBestSeller(res);
        });
        Aos.init({ duration: 500 });
    }, [])

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className='mt-[12px] bg-black'>
            <h1 className='my-2'> <svg className="gradient-text text-3xl font-bold" width="100%" height="38" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: '#FF0078' }} />
                        <stop offset="50%" style={{ stopColor: '#F6EFA7' }} />
                        <stop offset="100%" style={{ stopColor: '#FF0078' }} />
                    </linearGradient>
                </defs>
                <text style={{ fontSize: '20px' }} x="50%" y="30" fill="url(#gradient)" textAnchor="middle">Building Construction Equipmentuipment</text>
            </svg></h1>

            <Slider {...settings}>
                {onlyBestSeller?.map((product, index) => (
                    <div onClick={() => router.push(`/products/${product._id}`)} key={index} className={`w-full px-2 hover:cursor-pointer ${DashboardCSS.carslImgContainer}`}>

                        <div style={{ position: 'absolute', bottom: '10px', zIndex: '3' }} className='px-2 w-full'>
                            <h1 className='h-8 flex justify-center font-bold'>{product.title.length > 35 ? (product.title.slice(0, 35) + '...') : product.title}</h1>

                            <div className='flex justify-around items-center'>
                                <p className='text-slate-400'>{product.hourlyHire}/hour</p>
                                <p className='text-slate-400'>{product.dailyHire}/day</p>
                                <p className='text-slate-400'>{product.longTermHire}/custom</p>
                            </div>
                        </div>

                        <div className={`${DashboardCSS.carslImgContainer}`} style={{border: '3px solid crimson', borderRadius: '8px'}}>
                            <figure><img src={product?.productPicture[0]} alt="Product Image" style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '8px' }} /></figure>
                        </div>

                        <div
                            style={{
                                position: 'absolute',
                                bottom: '0',
                                left: '0',
                                width: '100%',
                                height: '50%',
                                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
                                zIndex: '2',
                            }}
                        ></div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default SimpleSlider;