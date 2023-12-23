"use client"
import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import { useRouter } from 'next/navigation';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';
import { IoStar } from 'react-icons/io5';
import { TbAlertOctagonFilled } from 'react-icons/tb';

import { AdminAPI } from '@/APIcalling/adminAPI';
import { CustomerAPI } from '@/APIcalling/customerAPI';
import { verificationFieldsRound } from '@/constants/speceing';

import DashboardCSS from '../../style/Dashboard.module.css';
import MyServiceCSS from '../../style/Dashboard.module.css';
import IndividualCSS from '../../style/Individual.module.css';
import {
  ProductsStore,
  UserStore,
} from '../../userStore';
import Button from './button';
import CommentsAndReviews from './CommentsAndReviews';
import Divider from './Divider';

const ProductSlider = ({ individualProduct, setIndividualProduct, clickedFor }) => {
    const { user, setUser } = UserStore.useContainer();
    const { products, setProducts } = ProductsStore.useContainer();
    const router = useRouter();
    const [previewImage, setPreviewImage] = useState('');
    const [warning, setWarning] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    useEffect(() => {
        setPreviewImage(individualProduct?.productPicture[0]);
        if (JSON.parse(localStorage.getItem('editable')) === 'editable') {
            setIsEditable(true);
        }
    }, [])

    setTimeout(function () {
        if (warning) {
            document.getElementById('readyToCommentModal')?.close();
            setWarning(false);
        }
    }, 1800);
    const handleReviewImage = (picture) => {
        setPreviewImage(picture)
    }

    const [message, setMessage] = useState('');
    const [selectedPackage, setSelectedPackage] = useState('');
    const handleHireTool = (tool, getPriceForHiring) => {
        const hiringCost = { ...individualProduct };
        setSelectedPackage(tool);
    }

    const handleEditByAdmin = () => {
        localStorage.setItem("productToEdit", JSON.stringify(individualProduct));
        router.push('/admin');
    }


    const handleDeleteProductByAdmin = () => {
        AdminAPI.handleDeletingProductByAdmin(individualProduct?._id).then(res => {
            if (res) {
                router.push('/products')
                document.getElementById('beforeDelete').close();
            }
        })
    }


    // Functionality for the new project...
    const [hiringHour, setHiringHour] = useState('');
    const [hiringDay, setHiringDay] = useState('');
    const [hiringCustom, setHiringCustom] = useState('');

    const timeInputOfHiring = useRef(null);
    const handleClockIconOpening = () => {
        if (timeInputOfHiring.current) {
            timeInputOfHiring.current.showPicker();
        }
    };

    const handleProcceedToHire = () => {
        if (hiringHour) {

        } else if (hiringDay) {

        } else if (hiringCustom) {

        }
        console.log(individualProduct);
    }

    const handleUserWantsToComment = () => {
        document.getElementById('readyToCommentModal').showModal();
    }

    // States for the stars
    const [equipmentPerformance, setEquipmentPerformance] = useState(0);
    const [customerService, setCustomerService] = useState(0);
    const [supportServices, setSupportServices] = useState(0);
    const [afterSales, setAfterSales] = useState(0);
    const [miscellaneous, setMiscellaneous] = useState(0);

    // States for the comment
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const HandlePostingCommentOnTool = () =>{
        const userComment = {
            name: name,
            comment: comment,
            equipmentPerformance: equipmentPerformance,
            customerService: customerService,
            supportServices: supportServices,
            afterSales: afterSales,
            miscellaneous: miscellaneous
        }
        CustomerAPI.addComment(individualProduct._id, userComment).then(res => {
            if(res){
                document.getElementById('readyToCommentModal').close();
            }
        });
    }
    return (
        <div data-aos="zoom-in-up">
            <div style={{ marginTop: '25px' }} className='text-white'>
                <div className={`${IndividualCSS.container}`}>
                    <div>
                        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                            <div className={`${IndividualCSS.previewImage}`}>
                                <span style={{ zIndex: '1' }} className={`${IndividualCSS.inStockSuggestion}`}>Available to hire</span>
                                <img className={`${IndividualCSS.mainImage} w-full`} src={previewImage} />
                            </div>
                        </div>

                        <div className={`${IndividualCSS.previewImageLittle}`}>
                            {
                                individualProduct?.productPicture?.map((picture, index) => <img className={`${IndividualCSS.littleImageOfProduct} ${previewImage === picture ? IndividualCSS.littleImageOfProductSelected : ''}`} onClick={() => handleReviewImage(picture)} key={index} src={picture} />)
                            }
                        </div>
                    </div>


                    <div className={`${IndividualCSS.headingLeftBorder} lg:pl-3 md:pl-2`}>
                        <h1 style={{ marginBottom: '12px', fontSize: '1.675rem', fontWeight: '700' }}>{individualProduct?.title}</h1>

                        <div className='flex justify-bewteen items-center gap-x-[12px]'>
                            <p onClick={() => handleHireTool('hour', individualProduct?.hourlyHire)} className={`hover:text-white hover:underline hover:cursor-pointer ${selectedPackage === 'hour' ? 'text-white font-bold' : 'text-slate-400'}`}>{individualProduct?.hourlyHire}/hour</p>

                            <p onClick={() => handleHireTool('day', individualProduct?.dailyHire)} className={`text-slate-400 hover:text-white hover:underline hover:cursor-pointer ${selectedPackage === 'day' ? 'text-white font-bold' : 'text-slate-400'}`}>{individualProduct?.dailyHire}/day</p>

                            <p onClick={() => handleHireTool('custom', individualProduct?.longTermHire)} className={`text-slate-400 hover:text-white hover:underline hover:cursor-pointer ${selectedPackage === 'custom' ? 'text-white font-bold' : 'text-slate-400'}`}>{individualProduct?.longTermHire}/custom</p>
                        </div>


                        {/* Taking the input for hourly hiring */}
                        {
                            selectedPackage === 'hour' && <div className='flex items-center gap-x-[15px] my-4'>
                                <div className="flex gap-x-[7px] items-center lg:w-[165px] w-full md:w-[150px]">
                                    <p>Hours: </p>
                                    <div className={`${IndividualCSS.timeInputContainer} w-full`}>
                                        <input
                                            onChange={(e) => {
                                                setHiringHour(e.target.value);
                                            }}
                                            type="number"
                                            placeholder='Type hours'
                                            className={`border-0 pl-[10px] focus:outline-none ${IndividualCSS.customInput} ${IndividualCSS.customInputRedIcon} `}
                                        />
                                    </div>
                                </div>
                            </div>
                        }
                        {/* Taking the input for daily hiring */}
                        {
                            selectedPackage === 'day' && <div className='flex items-center gap-x-[15px] my-4'>
                                <div className="flex gap-x-[7px] items-center lg:w-[165px] w-full md:w-[150px]">
                                    <p>Days: </p>
                                    <div className={`${IndividualCSS.timeInputContainer} w-full`}>
                                        <input
                                            onChange={(e) => {
                                                setHiringDay(e.target.value);
                                            }}
                                            type="number"
                                            placeholder='Type hours'
                                            className={`border-0 pl-[10px] focus:outline-none ${IndividualCSS.customInput} ${IndividualCSS.customInputRedIcon} `}
                                        />
                                    </div>
                                </div>
                            </div>
                        }
                        {/* Taking the input for custom hiring */}
                        {
                            selectedPackage === 'custom' && <div className='lg:flex items-center gap-x-[15px] my-4'>

                                <div className="flex gap-x-[7px] items-center w-full">
                                    <p className='w-[60px] block lg:hidden md:hidden'>From: </p>
                                    <p className='lg:block md:block hidden'>From: </p>
                                    <div className={`${IndividualCSS.timeInputContainer} lg:w-[165px] w-full md:w-[150px]`}>
                                        <input
                                            onChange={(e) => {
                                                setHiringCustom(e.target.value);
                                            }}
                                            type="time"
                                            id="timeInput"
                                            placeholder={new Date()}
                                            ref={timeInputOfHiring}
                                            className={`border-0 pl-[10px] focus:outline-none ${IndividualCSS.customInput} ${IndividualCSS.customInputRedIcon} `}
                                        />
                                        <span
                                            onClick={handleClockIconOpening}
                                            className={IndividualCSS.customClockIcon}
                                        >
                                            <AiOutlineClockCircle
                                                size={25}
                                                color={'crimson'}
                                            ></AiOutlineClockCircle>
                                        </span>
                                    </div>
                                </div>

                                <div className="flex gap-x-[7px] items-center w-full mt-2 md:mt-0 lg:mt-0">
                                    <p className='w-[60px] block lg:hidden md:hidden'>To: </p>
                                    <p className='lg:block md:block hidden'>To: </p>
                                    <div className={`${IndividualCSS.timeInputContainer} g:w-[165px] w-full md:w-[150px]`}>
                                        <input
                                            onChange={(e) => {
                                                setHiringHour(e.target.value);
                                            }}
                                            type="time"
                                            id="timeInput"
                                            placeholder={new Date()}
                                            ref={timeInputOfHiring}
                                            className={`border-0 pl-[10px] focus:outline-none ${IndividualCSS.customInput} ${IndividualCSS.customInputRedIcon} `}
                                        />
                                        <span
                                            onClick={handleClockIconOpening}
                                            className={IndividualCSS.customClockIcon}
                                        >
                                            <AiOutlineClockCircle
                                                size={25}
                                                color={'crimson'}
                                            ></AiOutlineClockCircle>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        }

                        <div className='flex items-center my-4'>
                            <p>Cost for Hiring: </p>
                            <div className='ml-4'>
                                <div className='flex items-center justify-evenly bg-slate-500 text-white hover:cursor-pointer px-[15px]'>
                                    234556456
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className={`${IndividualCSS.theButton}`} onClick={handleProcceedToHire}>
                                <button className={`btn border-0 btn-sm w-full lg:w-[300px] normal-case ${DashboardCSS.IndividualProductBuyNowButton}`}>Procceed to Hire</button>
                            </div>
                            {
                                isEditable && <div className={`${IndividualCSS.theButton} hidden lg:block md:block`} onClick={handleEditByAdmin}>
                                    <button className={`btn border-0 btn-sm w-[150px] normal-case ${DashboardCSS.IndividualProductBuyNowButton}`}>Edit</button>
                                </div>
                            }
                            {
                                isEditable && <div className={`${IndividualCSS.theButton} hidden lg:block md:block`} onClick={() => document.getElementById('beforeDelete').showModal()}>
                                    <button className={`btn border-0 btn-sm w-[150px] normal-case ${DashboardCSS.IndividualProductBuyNowButton}`}>Delete Tool</button>
                                </div>
                            }
                        </div>

                        {
                            isEditable && <div className={`${IndividualCSS.theButton} lg:hidden block md:hidden`} onClick={handleEditByAdmin}>
                                <Button background={'purple'} width='100%'><span className='text-white'>Edit</span></Button>
                            </div>
                        }

                        {
                            isEditable && <div className={`${IndividualCSS.theButton} lg:hidden block md:hidden mt-[24px]`} onClick={() => document.getElementById('beforeDelete').showModal()}>
                                <Button background={'#DC3545'} width='100%'><span className='text-white'>Delete</span></Button>
                            </div>
                        }

                        {/* Description for mobile. */}
                        <div className='lg:hidden block md:hidden my-[12px]'>
                            <p style={{ whiteSpace: 'pre-line' }}>{individualProduct?.description}</p>
                        </div>
                    </div>
                </div>


                {/* Description for computer..... */}
                <div className='lg:flex justify-between hidden md:hidden my-[25px]'>
                    <p style={{ whiteSpace: 'pre-line' }}>{individualProduct?.description}</p>
                </div>
            </div>


            <div>
                <div className='flex justify-between items-center'>
                    <h1 className=''> <svg className="gradient-text lg:text-2xl text-xl font-bold" width="100%" height="38" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" style={{ stopColor: 'white' }} />
                                <stop offset="50%" style={{ stopColor: 'magenta' }} />
                                <stop offset="100%" style={{ stopColor: 'rgb(28,97,231)' }} />
                            </linearGradient>
                        </defs>
                        <text x="50%" y="30" fill="url(#gradient)" textAnchor="middle">Comments and reviews</text>
                    </svg></h1>

                    <span className={`${IndividualCSS.plusCommnet}`} onClick={handleUserWantsToComment}><FaPlus size={25}></FaPlus></span>
                </div>
                <Divider color='crimson'></Divider>
            </div>


            {
                individualProduct.comments ? <div className='mb-8'>
                <CommentsAndReviews individualProduct={individualProduct}></CommentsAndReviews>
            </div> : 'Be the first one to comment'
            }
            


{/* The modal for taking comment and stars of the mentioned field */}
            <dialog id="readyToCommentModal" className="modal">
                <div className={`${IndividualCSS.toCommentModal} modal-box`}>

                    <span onClick={HandlePostingCommentOnTool} style={{ zIndex: '1' }} className={`${IndividualCSS.postingComment} w-[165px]`}><span className='flex justify-center'>Post</span></span>

                    <div>
                        <h1 className='mb-1'>Your Name</h1>
                        <div className={`flex items-center ${MyServiceCSS.tableRoomInput}`}>
                            <input
                            onChange={(e) => setName(e.target.value)}
                                style={{
                                    borderRadius: verificationFieldsRound,
                                    background: 'white',
                                }}
                                placeholder="Please type your name here"
                                className={`w-full pl-1 h-[35px] focus:outline-none border-0 text-black`}
                                type="text"
                                name=""
                                id=""
                            />
                        </div>
                    </div>

                    <div className='mb-3'><Divider color='slategrey'></Divider></div>

                    <div>
                        <h1 className='mb-1'>Leave your comment</h1>
                        <div className={`flex items-center ${MyServiceCSS.tableRoomInput}`}>
                            <textarea
                            onChange={(e) => setComment(e.target.value)}
                                style={{
                                    borderRadius: verificationFieldsRound,
                                    background: 'white',
                                }}
                                placeholder="Please type your comment here"
                                className={`w-full h-[55px] focus:outline-none border-0 pl-1 text-black`}
                                type="text"
                                name=""
                                id=""
                            />
                        </div>
                    </div>

                    <div className='mb-3'><Divider color='crimson'></Divider></div>

                    <div>
                        <h3 className="flex justify-center text-white text-xl">How was the performance if this equipment?</h3>
                        <div className='flex justify-evenly items-center'>
                            {[1, 2, 3, 4, 5].map((value) => (
                                <span
                                    key={value}
                                    onClick={() => setEquipmentPerformance(value)}>
                                    <IoStar size={25} color={`${value <= equipmentPerformance ? 'crimson' : 'white'}`}></IoStar>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className='mb-3'><Divider color='slategrey'></Divider></div>

                    <div>
                        <h3 className="flex justify-center text-white text-xl">How was the customer service?</h3>
                        <div className='flex justify-evenly items-center'>
                            {[1, 2, 3, 4, 5].map((value) => (
                                <span
                                    key={value}
                                    onClick={() => setCustomerService(value)}>
                                    <IoStar size={25} color={`${value <= customerService ? 'crimson' : 'white'}`}></IoStar>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className='mb-3'><Divider color='slategrey'></Divider></div>

                    <div>
                        <h3 className="flex justify-center text-white text-xl">Are you satiesfied with the support services?</h3>
                        <div className='flex justify-evenly items-center'>
                            {[1, 2, 3, 4, 5].map((value) => (
                                <span
                                    key={value}
                                    onClick={() => setSupportServices(value)}>
                                    <IoStar size={25} color={`${value <= supportServices ? 'crimson' : 'white'}`}></IoStar>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className='mb-3'><Divider color='slategrey'></Divider></div>

                    <div>
                        <h3 className="flex justify-center text-white text-xl">How was the support after sales?</h3>
                        <div className='flex justify-evenly items-center'>
                            {[1, 2, 3, 4, 5].map((value) => (
                                <span
                                    key={value}
                                    onClick={() => setAfterSales(value)}>
                                    <IoStar size={25} color={`${value <= afterSales ? 'crimson' : 'white'}`}></IoStar>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className='mb-3'><Divider color='slategrey'></Divider></div>

                    <div>
                        <h3 className="flex justify-center text-white text-xl">Are you satiesfieds with miscellaneous support?</h3>
                        <div className='flex justify-evenly items-center'>
                            {[1, 2, 3, 4, 5].map((value) => (
                                <span
                                    key={value}
                                    onClick={() => setMiscellaneous(value)}>
                                    <IoStar size={25} color={`${value <= miscellaneous ? 'crimson' : 'white'}`}></IoStar>
                                </span>
                            ))}
                        </div>
                    </div>

                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>


            {/* The warning modal to delete the product*/}
            <dialog id="beforeDelete" className="modal" style={{ maxWidth: '480px', transform: 'translateX(-50%)', left: '50%' }}>
                <div style={{
                    color: 'white',
                    background: '#DC3545',
                    border: '1px solid white'
                }} className="modal-box">
                    <div>
                        <h3 className="flex justify-center text-white items-center gap-x-2"><span><TbAlertOctagonFilled size={30} color={'black'}></TbAlertOctagonFilled></span> <span>Hey, Attention please!</span></h3>
                        <h1 className="flex justify-center">Do you want to delete this product?</h1>
                        <h1 className="flex justify-center">This is not reverseable!</h1>
                        <div className='flex justify-between items-center mt-[24px]'>
                            <div onClick={() => document.getElementById('beforeDelete').close()}>
                                <Button background='green' width='150px'><span className='text-white'>Cancel</span></Button>
                            </div>

                            <div onClick={handleDeleteProductByAdmin} className={`${IndividualCSS.theButton}`}>
                                <Button background={'purple'} width='150px'><span className='text-white'>Delete</span></Button>
                            </div>
                        </div>

                    </div>

                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>);
};

export default ProductSlider;