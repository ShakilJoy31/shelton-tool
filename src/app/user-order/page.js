"use client"
import React, {
  useEffect,
  useState,
} from 'react';

import { useRouter } from 'next/navigation';

import { AdminAPI } from '@/APIcalling/adminAPI';

import AdminCSS from '../../../style/AdminCSS.module.css';
import { LoggedInUserStore } from '../../../userStore';

const Page = () => {
    const { isLoggedIn, setIsLoggedIn } = LoggedInUserStore.useContainer();
    const router = useRouter();
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        AdminAPI.handleGettingOrders().then(res => {
            const onlyArrivedOrders  = res.filter(order => order?.email === isLoggedIn?.email);
            setOrders(onlyArrivedOrders)
        });
    }, [])
    const [seeOrderByAdmin, setSeeOrderByAdmin] = useState(null);
    const [idForTheOrderToDelete, setValue] = useState('');
    const handleCheckOrderByAdmin = (getOrder) => {
        document.getElementById('productDetails').showModal();
        setSeeOrderByAdmin(getOrder);
        setValue(getOrder);
    }
    console.log(orders)
    return (
        <div className='my-[24px] min-h-screen'>
            <p style={{color: 'lightskyblue'}} className='flex justify-center text-2xl font-bold'>Dashboard</p>
            <div>
                {
                    orders?.length < 1 ? <div className='w-full min-h-screen items-center flex justify-center'>
                        <div>
                            <span style={{ color: 'crimson' }} className="loading loading-ring w-24 h-24 block mx-auto"></span>
                            {/* <span className="loading loading-ring loading-lg"></span> */}
                            <p style={{ fontFamily: 'Lucida Sans Unicode' }} className='text-white flex justify-center'>Loading. Please wait...</p>
                        </div>
                    </div> : <div className="overflow-x-auto w-full">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className='text-white'><span className='flex justify-center'>SL No.</span></th>

                                    <th className='text-white'><span className='flex justify-center'>Name</span></th>

                                    <th className='text-white'><span className='flex justify-center'>Email</span></th>

                                    <th className='text-white'><span className='flex justify-center'>Phone</span></th>

                                    <th className='text-white'><span className='flex justify-center'>Address</span></th>

                                    <th className='text-white'><span className='flex justify-center'>Duration</span></th>

                                    <th className='text-white'><span className='flex justify-center'>Cost for hiring</span></th>

                                    <th className='text-white'><span className='flex justify-center'>Ordered time</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders?.map((order, index) => <tr onClick={() => handleCheckOrderByAdmin(order)} key={index} className={`${AdminCSS.orderRow}`}>
                                        <th><span className='flex justify-center'>{index + 1}</span></th>

                                        <td> <span className='flex justify-center'>{order.name}</span></td>

                                        <td className=''><span className='flex justify-center'>{order.email}</span></td>

                                        <td className=''><span className='flex justify-center'>{order.phoneNumber}</span></td>

                                        <td className=''><span className='flex justify-center'>{order.address}</span></td>

                                        <td> <span className='flex justify-center'>{order.hiringDuration}</span></td>

                                        <td> <span className='flex justify-center'>{order.hiringCost}</span></td>

                                        <td><span className='flex justify-center items-center'>{order.hiringTime}</span></td>
                                    </tr>)
                                }

                            </tbody>
                        </table>
                    </div>
                }
            </div>

            <dialog id="productDetails" className="modal">
                <div style={{
                        color: 'white',
                        background: 'black',
                        border: '2px solid crimson'
                    }} className="modal-box">

                    <h1 className='mb-[12px] flex justify-center'>{seeOrderByAdmin?.name} wants to hire {seeOrderByAdmin?.orderedTool?.title}</h1>

                    <div className="overflow-x-auto w-full">
                        <table className="table">
                            <thead>
                                <tr>
                                    
                                    <th className='text-white'><span className='flex justify-center'>Image</span></th>

                                    <th className='text-white px-20'><span className='flex justify-center'>Name</span></th>

                                    <th className='text-white'><span className='flex justify-center'>Category</span></th>
                                </tr>
                            </thead>
                            <tbody>
                             <tr>
                                        <td> <span className='flex justify-center'><img src={seeOrderByAdmin?.orderedTool?.productPicture[0]} alt="Product Image" style={{ borderRadius: '0 8px 0 8px' }} className='w-10 h-10' /></span></td>

                                        <td><span className='flex justify-center'>{seeOrderByAdmin?.orderedTool?.title}</span></td>

                                        <td><span className='flex justify-center'>{seeOrderByAdmin?.orderedTool?.category}</span></td>

                                    </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default Page;