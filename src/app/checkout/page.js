"use client"
import React, {
  useEffect,
  useState,
} from 'react';

import { useRouter } from 'next/navigation';
import { BsArrowLeft } from 'react-icons/bs';

import { CustomerAPI } from '@/APIcalling/customerAPI';
import { verificationFieldsRound } from '@/constants/speceing';
import { useForm } from '@formspree/react';

import MyServiceCSS from '../../../style/MyServiceCSS.module.css';
import { UserStore } from '../../../userStore';

const Page = () => {
    const { setUser } = UserStore.useContainer();
    const [user, setLocalUser] = useState([]);
    const router = useRouter();
    useEffect(() => {
        if (JSON.parse(localStorage.getItem("beeRawCartSingle"))) {
            setLocalUser((JSON.parse(localStorage.getItem("beeRawCartSingle"))))
        } else if (JSON.parse(localStorage.getItem("beeRawCart"))) {
            setLocalUser(JSON.parse(localStorage.getItem("beeRawCart")))
        } else {
            router.push('/products');
        }
    }, [])
    const [selectedOption, setSelectedOption] = useState('quarter');
    const deliveryFee = selectedOption === 'half' ? 60 : 120;
    let totalPrice;
    if (user?.length < 2) {
        totalPrice = parseFloat(user[0]?.price) * parseFloat(user[0]?.quantity) + deliveryFee;
    } else {
        totalPrice = user?.reduce((total, cart) => total + (parseFloat(cart.price) * parseFloat(cart.quantity)), 0) + deliveryFee;
    }
    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [paymentTrId, setPaymentTrId] = useState('');
    const [isDhaka, setIsDhaka] = useState('');


    const [cartAddedMessage, setCartAddedMessage] = useState('');
    const [warning, setWarning] = useState(false);
    setTimeout(function () {
        if (warning) {
            if (cartAddedMessage !== 'Congratulations! Order placed successfully.') {
                document.getElementById('placeOrderModal').close();
                setWarning(false);
            }
        }
    }, 1800);
    console.log(warning);
    const [state, handleSubmit] = useForm("mvojnplv");
    const handlePlaceOrderButton = () => {
        const userDataForPlaceOrder = {
            name: name,
            address: address,
            phoneNumber: phoneNumber,
            email: email,
            paymentTrId: paymentTrId,
            isDhaka: (selectedOption === 'half' ? 'Inside Dhaka' : 'Outside Dhaka'),
            placedOrderForProduct: user,
            totalTakaOrdered: totalPrice
        }
        if (!name || !address || !phoneNumber) {
            document.getElementById('placeOrderModal').showModal();
            setWarning(true)
            setCartAddedMessage('Name, address and phone number are requited!')
        } else {
            CustomerAPI.userInformationForPlacOrderProduct(userDataForPlaceOrder).then(res => {
                if (res.acknowledged === true) {
                    document.getElementById('placeOrderModal')?.showModal();
                    setWarning(true)
                    setCartAddedMessage('Congratulations! Order placed successfully.')

                    // Code for sending the email...........
                    const newEmail = {
                        name: name,
                        email: email,
                        message: `Hey Chotto bondhu Sa'ad. ${name} ordered a product from ${address}. Please note the customer's email and phone number respectivelly ${email} and ${phoneNumber}. ${name} total ordered ${totalPrice} taka. Go to the admin panel to check more information about the receieved order or go to this URL https://bee-raw-izqn.vercel.app/admin/user-order. Have a good day chotto bondhu!`,
                    }
                    fetch('https://formspree.io/f/mvojnplv', {
                        method: 'POST',
                        body: JSON.stringify(newEmail),
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }).then((res) => res.json()).then((result) => {
                        // console.log(result);
                    }).then((res) => { }).then((result) => { }).catch((error) => { });

                    setTimeout(function () {
                        // Removing the data from local storage and sending the user to the home page where they were after the data is deleted fro localstorage.........
                        if (JSON.parse(localStorage.getItem("beeRawCartSingle"))) {
                            localStorage.removeItem('beeRawCartSingle')
                            setUser([]);
                        }
                        if (JSON.parse(localStorage.getItem("beeRawCart"))) {
                            localStorage.removeItem('beeRawCart')
                            setUser([]);
                        }
                        router.push('/products');
                    }, 9999);
                } else {
                    document.getElementById('placeOrderModal')?.showModal();
                    setWarning(true)
                    setCartAddedMessage('OoppS! Failed.');
                }
            });
        }
    }
    return (
        <div>
            <div className='min-h-screen lg:mx-[25px] md:mx-[20px] text-white mx-0'>
                <div className='flex items-center justify-between lg:mx-0 md:mx-0 mx-2'>
                    <div className='flex items-center py-[24px]'>
                        <span onClick={() => router.back()} className='hover:cursor-pointer'>
                            <BsArrowLeft color={'red'}></BsArrowLeft>
                        </span>
                        <p className='text-white ml-2'>Back</p>
                    </div>


                    <div onClick={() => router.push('/products')} className=''>
                    <button className={`btn border-0 btn-sm w-[150px] normal-case ${MyServiceCSS.orderExtraItemButton}`}>Order Extra Item</button>
                        
                    </div>

                </div>


                <div>
                    <div>
                        <h1 className='mb-1'>Receiever Name <span className='text-red-700 text-xl pt-1'> *</span></h1>
                        <div className={`flex items-center ${MyServiceCSS.tableRoomInput}`}>
                            <input onChange={(e) => setName(e.target.value)}
                                style={{
                                    borderRadius: verificationFieldsRound,
                                    background: 'white',
                                }}
                                placeholder="আপনার নামটি লিখুন"
                                className="lg:w-[450px] w-full h-[45px] focus:outline-none border-0 pl-1 text-black"
                                type="text"
                                name=""
                                id=""
                            />
                        </div>
                    </div>


                    <div>
                        <h1 className='mb-1'>Phone number <span className='text-red-700 text-xl pt-1'> *</span></h1>
                        <div className={`flex items-center ${MyServiceCSS.tableRoomInput}`}>

                            <input onChange={(e) => setPhoneNumber(e.target.value)}
                                style={{
                                    borderRadius: verificationFieldsRound,
                                    background: 'white',
                                }}
                                placeholder="আপনার সঠিক মোবাইল নাম্বার দিন"
                                className="lg:w-[450px] w-full h-[45px] focus:outline-none border-0 pl-1 text-black"
                                type="text"
                                name=""
                                id=""
                            />
                        </div>
                    </div>

                    <div className='my-3'>
                        <h1 className='mb-1'>Receiever Address <span className='text-red-700 text-xl pt-1'> *</span></h1>
                        <div className={`flex items-center ${MyServiceCSS.tableRoomInput}`}>
                            <textarea onChange={(e) => setAddress(e.target.value)}
                                style={{
                                    borderRadius: verificationFieldsRound,
                                    background: 'white',
                                }}
                                placeholder="আপনার সম্পুর্ন ঠিকানা লিখুন। যেমন- আপনার এলাকার বা ফ্ল্যাট নাম্বার, গ্রাম/শহর, জেলা, বিভাগ উল্লেখ করবেন"
                                className={`w-full h-[90px] focus:outline-none border-0 pl-1 text-black`}
                                type="text"
                                name=""
                                id=""
                            />
                        </div>
                    </div>

                    {/* ${address.length > 37 ? `${address.length > 74 ? 'h-[85px]' : 'h-[65px]'}` : 'h-[45px]'} */}

                    <div className='my-3'>
                        <h1 className='mb-1'>Email (optional)</h1>
                        <div className={`flex items-center ${MyServiceCSS.tableRoomInput}`}>

                            <input onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    borderRadius: verificationFieldsRound,
                                    background: 'white',
                                }}
                                placeholder="আপনার ই-মেইল এড্রেস টি লিখুন (বাধ্যতামূলক নয়)"
                                className="lg:w-[450px] w-full h-[45px] focus:outline-none border-0 pl-1 text-black"
                                type="text"
                                name=""
                                id=""
                            />
                        </div>
                    </div>


                    <div className='flex gap-x-8 my-3'>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-x-3'>
                                <input
                                    onChange={() => handleOptionChange('half')}
                                    type="checkbox"
                                    className="checkbox checkbox-xs checkbox-accent"
                                    checked={selectedOption === 'half'}
                                />
                                <p onClick={() => handleOptionChange('half')} className='hover:underline hover:cursor-pointer'>ঢাকার ভিতরে</p>
                            </div>
                        </div>


                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-x-3'>
                                <input
                                    onChange={() => handleOptionChange('quarter')}
                                    type="checkbox"
                                    className="checkbox checkbox-xs checkbox-accent"
                                    checked={selectedOption === 'quarter'}
                                />
                                <p onClick={() => handleOptionChange('quarter')} className='hover:underline hover:cursor-pointer'>ঢাকার বাইরে</p>
                            </div>
                        </div>

                    </div>

                    <div style={{ background: 'crimson', borderRadius: '8px' }} className='py-4 px-2'>
                        <h1 style={{ color: 'white' }} className=''>আমাদের ডেলিভারি চার্জ:
                            ঢাকা সিটি করপোরেশনের মধ্যে -      ৬০ টাকা,
                            সারা বাংলাদেশ- (পাঠাও কুরিয়ার)-  ১২০ টাকা,
                            ৬-৭২ ঘন্টার মধ্যে পন্য হাতে পেয়ে যাবেন</h1>
                    </div>
                </div>


                <div className='mt-[48px] lg:flex md:flex justify-between block text-white gap-x-6 mx-2 lg:mx-0 md:mx-0'>

                    <div className="overflow-x-auto w-full">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className='text-white'><span className='flex justify-center'>SL No.</span></th>
                                    <th className='text-white'><span className='flex justify-center'>Image</span></th>
                                    <th className='text-white px-20'><span className='flex justify-center'>Name</span></th>
                                    <th className='text-white'><span className='flex justify-center'>Price</span></th>
                                    <th className='text-white'><span className='flex justify-center'>Quantity</span></th>
                                    <th className='text-white'><span className='flex justify-center'>Color</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    user?.map((product, index) => <tr key={index}>
                                        <th><span className='flex justify-center'>{index + 1}</span></th>
                                        <td> <span className='flex justify-center'><img src={product.productPicture[0]} alt="Product Image" style={{ borderRadius: '0 8px 0 8px' }} className='w-10 h-10' /></span></td>
                                        <td><span className='flex justify-center'>{product.title}</span></td>
                                        <td><span className='flex justify-center'>{parseFloat(product.price) * parseFloat(product?.quantity)}</span></td>
                                        <td><span className='flex justify-center'>{product.quantity}</span></td>
                                        <td><span className='flex justify-center'>{product.color.split(',')[0]}</span></td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>

                    <div style={{ height: '100px', width: '1.5px', border: '1px solid purple' }} className='mt-4 hidden lg:block md:block'></div>

                    <div className='lg:w-72 md:w-50 w-full mt-4'>
                        <div>
                            <h1 style={{ fontSize: '16px' }} className='font-bold mb-[8px] flex justify-center'>Pre-Order Summary</h1>
                            
                            <div className='flex items-center justify-center my-[8px]'>
                                <h1>Delevary Charge</h1>
                            </div>


                            <div style={{color: selectedOption === 'half' ? 'rgb(28,97,231)' : 'white'}} className={`flex items-center justify-between my-[8px] `}>
                                <h1>Inside Dhaka</h1>
                                <p className='ml-2'> 60 Taka</p>
                            </div>


                            <div style={{color: selectedOption === 'quarter' ? 'rgb(28,97,231)' : 'white'}} className={`flex items-center justify-between my-[8px]`}>
                                <h1>Outside Dhaka</h1>
                                <p className='ml-2'> 120 Taka</p>
                            </div>

                            <div className='flex items-center justify-between'>
                                <h1>Item total</h1>
                                <p>{totalPrice}</p>
                            </div>
                        </div>
                    </div>

                </div>



                <div className='flex items-center justify-center lg:justify-end md:justify-end gap-x-[48px] py-[25px] '>
                    <div onClick={() => {
                        localStorage.removeItem('beeRawCartSingle')
                        router.push('/products')
                    }}><button className={`btn border-0 btn-sm w-[150px] normal-case ${MyServiceCSS.IndividualProductBuyNowButton}`}>Cancel</button>
                    </div>

                    <div onClick={handlePlaceOrderButton}>
                    <button className={`btn border-0 btn-sm w-[150px] normal-case ${MyServiceCSS.IndividualProductBuyNowButtonForPlacingOrder}`}>Place Order</button>
                    </div>
                </div>
                
            </div>

            <dialog id="placeOrderModal" className="modal" style={{ maxWidth: '480px', transform: 'translateX(-50%)', left: '50%' }}>
                <div style={{
                    color: 'white',
                    background: (cartAddedMessage === 'Congratulations! Order placed successfully.' ? 'green' : '#DC3545'),
                    border: '1px solid white'
                }} className="modal-box">
                    <h3 className="flex justify-center text-white">{cartAddedMessage}</h3>
                    {
                        cartAddedMessage === 'Congratulations! Order placed successfully.' ? <div>
                            <h3 className="flex justify-center text-white mt-2">Now you will have a call from <span className='font-bold ml-1'> 01761043883</span></h3>
                            <div>
                                <span className='my-2 flex justify-center items-center'>(Around <span className='font-bold mx-1'>7:00 AM</span> to <span className='font-bold ml-1'>11:59 PM</span>)</span>
                            </div>
                            
                        </div> : ''
                    }
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default Page;