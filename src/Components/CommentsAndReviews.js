"use client"
import React, { useState } from 'react';

import {
  usePathname,
  useRouter,
} from 'next/navigation';
import {
  BiSend,
  BiSolidCommentAdd,
} from 'react-icons/bi';

import { CustomerAPI } from '@/APIcalling/customerAPI';
import { verificationFieldsRound } from '@/constants/speceing';

import DashboardCSS from '../../style/Dashboard.module.css';
import IndividualCSS from '../../style/Individual.module.css';
import {
  ProductsStore,
  UserStore,
} from '../../userStore';

const Page = ({ individualProduct }) => {;
    const router = useRouter();
    const pathname = usePathname();
    const { user, setUser } = UserStore.useContainer();
    const { products, setProducts } = ProductsStore.useContainer();
    // setTimeout(function () {
    //     if (warning) {
    //         document.getElementById('alReadyExistsOnTheCartModal')?.close();
    //         setWarning(false);
    //     }
    // }, 1800);

    // const loadMoreProducts = async (page) => {
    //     if (!loading) {
    //         setLoading(true);
    //         const nextPageProducts = await CustomerAPI.handleGettingProducts(page, dataForDynamicComponent[0]);
    //         setProducts([...products, ...nextPageProducts]);
    //         setLoading(false);
    //     }
    // };


    // const handleScroll = () => {
    //     if (
    //         window.innerHeight + document.documentElement.scrollTop ===
    //         document.documentElement.offsetHeight
    //     ) {
    //         const nextPage = products.length / 20 + 1;
    //         loadMoreProducts(nextPage);
    //     }
    // };
    const [isReviewFields, setIsReviewFields] = useState(false);
    const [selectedCommentToReply, setSelectedCommentToReply] = useState(false);
    const [reviewerName, setReviewerName] = useState('');
    const [reviewerComment, setReviewerComment] = useState('');

    const handleTargetCommentToReview = (getComment) => {
        setIsReviewFields(true);
        const targetComment = individualProduct.comments.find(comment => comment?.userId === getComment?.userId);
        setSelectedCommentToReply(targetComment);
    }

    const handlePostReviewForIndividualComment = () => {
        const reviewData = {
            reviewerName: reviewerName,
            reviewerComment: reviewerComment,
            repliedCommentId: selectedCommentToReply?.userId
        }
        CustomerAPI.addReviewToComment(individualProduct?._id, reviewData).then(res => {
            console.log(res);
        })
        console.log(individualProduct);
    }
    return (
        <div>
            <div className={`${DashboardCSS.commentsContainer}`}>
                {individualProduct.comments.map((comment, index) => (
                    <div className={`${DashboardCSS.comment}`} key={index}>
                        <div>
                            <div className='flex justify-between items-center'>
                                <p className={`${DashboardCSS.user}`}>{comment.commentAndRating?.name}</p>
                                <p className={`${DashboardCSS.date}`}>{comment?.timeOfComment}</p>
                            </div>
                        </div>

                        <div>
                            <div className='flex justify-between items-center'>
                                <p className={`${DashboardCSS.commentText}`}>{comment?.commentAndRating?.comment}</p>

                                <span onClick={() => handleTargetCommentToReview(comment)} className={`${IndividualCSS.plusCommnet}`}><BiSolidCommentAdd size={25}></BiSolidCommentAdd></span>
                            </div>
                            {
                            isReviewFields ? (comment?.userId === selectedCommentToReply?.userId ? <div className={`flex justify-between items-center pl-2 md:pl-3 lg:pl-4 w-full my-3`}>
                            {
                                (reviewerName || reviewerComment ) ? <span className="loading loading-dots loading-lg"></span> : ''
                            }
                            
                            <div>
                                <input
                                onChange={(e)=>setReviewerName(e.target.value)}
                                    style={{
                                        borderRadius: verificationFieldsRound,
                                        background: 'white',
                                    }}
                                    placeholder="Please type your name here"
                                    className={`lg:w-[450px] md:w-[350px] w-[250px] pl-1 h-[35px] focus:outline-none border-0 text-black`}
                                    type="text"
                                    name=""
                                    id=""
                                />
                            </div>
                            
                            <div>
                                <input
                                onChange={(e)=>setReviewerComment(e.target.value)}
                                    style={{
                                        borderRadius: verificationFieldsRound,
                                        background: 'white',
                                    }}
                                    placeholder="Please type your comment here"
                                    className={`lg:w-[450px] md:w-[350px] w-[250px] h-[35px] focus:outline-none border-0 pl-1 text-black`}
                                    type="text"
                                    name=""
                                    id=""
                                />
                            </div>

                            <span onClick={handlePostReviewForIndividualComment} className={`${IndividualCSS.plusCommnet}`}><BiSend size={25}></BiSend></span>
                            
                    </div> : '') : ''
                            
                        }
                        </div>

                        {/* The reviews for the comment */}
                        

                    </div>
                ))}
            </div>
        </div>
    );
};

export default Page;