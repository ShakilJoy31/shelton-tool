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
  AuthenticUser,
  ProductsStore,
  UserStore,
} from '../../userStore';

const Page = ({ individualProduct, setIndividualProduct }) => {
    ;
    const router = useRouter();
    const pathname = usePathname();
    const { user, setUser } = UserStore.useContainer();
    const { products, setProducts } = ProductsStore.useContainer();

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
    const [reviewerComment, setReviewerComment] = useState('');
    const { authenticatedUser, setAuthenticatedUser } = AuthenticUser.useContainer();
    const handleTargetCommentToReview = (getComment) => {
        setIsReviewFields(true);
        const targetComment = individualProduct.comments.find(comment => comment?.userId === getComment?.userId);
        setSelectedCommentToReply(targetComment);
    }

    function getCurrentDateTime() {
        const currentDate = new Date();
        return currentDate.toLocaleString();
    }
    const handlePostReviewForIndividualComment = () => {
        const reviewTime = getCurrentDateTime();
        const reviewData = {
            reviewerName: authenticatedUser.name,
            reviewerComment: reviewerComment,
            repliedCommentId: selectedCommentToReply?.userId,
            reviewTime: reviewTime
        }
        CustomerAPI.addReviewToComment(individualProduct?._id, reviewData).then(res => {
            const previousReview = individualProduct?.comments.find(review => review.userId === selectedCommentToReply.userId).reviews;
            previousReview.push(reviewData)
            setIndividualProduct({ ...individualProduct })
            setIsReviewFields(false);
        })
    }
    return (
        <div>
            <div className={`${DashboardCSS.commentsContainer}`}>
                {individualProduct.comments.map((comment, index) => (
                    <div style={{borderBottom: `${index + 1 === individualProduct?.comments?.length ? '' : '1px solid crimson'}`}} className={`${DashboardCSS.comment}`} key={index}>
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

                                    <div style={{
                                                borderRadius: verificationFieldsRound,
                                                background: 'white',
                                            }} className='w-full flex items-center'>
                                        <textarea
                                        style={{
                                            borderRadius: verificationFieldsRound,
                                            background: 'white',
                                        }}
                                            onChange={(e) => setReviewerComment(e.target.value)}
                                            placeholder={`Hi ${authenticatedUser.name},  Please type your review here`}
                                            className={`w-full h-[35px] focus:outline-none border-0 pl-1 text-black`}
                                            type="text"
                                            name=""
                                            id=""
                                        />
                                        {
                                        (authenticatedUser?.name || reviewerComment) ? <span className="loading loading-dots loading-sm text-black"></span> : ''
                                    }
                                    </div>

                                    <span onClick={handlePostReviewForIndividualComment} className={`${IndividualCSS.plusCommnet}`}><BiSend size={25}></BiSend></span>

                                </div> : '') : ''

                            }

                            {/* The reviews for the individual comment */}
                            <div className='pl-3 md:pl-4 lg:pl-5'>
                                {
                                    comment?.reviews?.map((review, index) => <div key={index} style={{borderBottom: `${index + 1 === comment?.reviews?.length ? '' : '1px solid #888'}`}} className='mb-1'>
                                        <div className='flex justify-between items-center'>
                                            <p className={`${DashboardCSS.user}`}>{review?.reviewerName}</p>

                                            <p className={`${DashboardCSS.date}`}>{review?.reviewTime}</p>
                                        </div>

                                        <div className='flex justify-between items-center'>
                                            <p className={`${DashboardCSS.commentText}`}>{review.reviewerComment}</p>
                                        </div>
                                    </div>)
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Page;