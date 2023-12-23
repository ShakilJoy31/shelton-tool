"use client"
import 'aos/dist/aos.css';

import React from 'react';

import {
  FaFacebook,
  FaFacebookMessenger,
  FaInstagramSquare,
  FaPhone,
  FaTelegram,
  FaYoutube,
} from 'react-icons/fa';
import {
  FaLocationDot,
  FaTiktok,
} from 'react-icons/fa6';
import { IoLogoWhatsapp } from 'react-icons/io';

import MyServiceCSS from '../../../style/MyServiceCSS.module.css';

const Page = () => {
  return (
    <div className=' my-4'>
      <div className='flex justify-center'>
        <h1 className='block mx-auto'>
          <svg className="gradient-text text-2xl font-bold" width="100%" height="38" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#FF0078' }} />
                <stop offset="50%" style={{ stopColor: '#F6EFA7' }} />
                <stop offset="100%" style={{ stopColor: '#FF0078' }} />
              </linearGradient>
            </defs>


            {/* for large screen */}
            <text className='text-3xl' x="10" y="30" fill="url(#gradient)" textAnchor="start">Get in touch with us!</text>

          </svg>
        </h1>
      </div>

      <div className='mt-4'>
        <div className="lg:flex grid md:flex justify-center items-center">
          <figure className='flex items-center'>
            <img className='h-full w-[550px]' src="https://i.ibb.co/ZLz9Qbq/558258bb-f-37a0fb157ee6.png" alt="Album" />
          </figure>

          <div className="lg:p-4 md:p-3 p-2 w-full">
            <div>
              {/* Calling */}
              <a href="tel:+8801606077657"><div className={`${MyServiceCSS.contactOption}`}>
                <h1 className='flex items-center justify-center'>আমাদের সাথে কলে সরাসরি কথা বলতে চাইলে এখানে ক্লিক করুন</h1>
                <span className='flex items-center justify-center mt-1'><FaPhone size={20}></FaPhone> <span className='text-xl ml-2'>01606077657</span></span>
              </div></a>

              {/* Whatsapp */}
              <a target='_blank' href="https://wa.me/message/6CPDT6OUH2SJL1"><div className={`${MyServiceCSS.contactOption}`}>
                <h1 className='flex items-center justify-center'>আমাদের সাথে হোয়াটস এপ এ যোগাযোগ করার জন্য এখানে ক্লিক করুন</h1>
                <span className='flex items-center justify-center mt-1'><IoLogoWhatsapp size={20}></IoLogoWhatsapp> <span className='text-xl ml-2'>+8801716426495</span></span>
              </div></a>

              {/* Facebook */}
              <a target='_blank' href="https://www.facebook.com/beeraw23"><div className={`${MyServiceCSS.contactOption}`}>
                <h1 className='flex items-center justify-center'>আমাদের ফেইসবুক পেইজ ভিজিট করতে এখানে ক্লিক করুন</h1>
                <span className='flex items-center justify-center mt-1'><FaFacebook size={25}></FaFacebook> <span className='text-xl ml-2'>Facebook.com/beeraw23</span></span>
              </div></a>

              {/* Messenger */}
              <a target='_blank' href="https://www.messenger.com/t/101277466406447"><div className={`${MyServiceCSS.contactOption}`}>
                <h1 className='flex items-center justify-center'>আমাদের সাথে মেসেঞ্জারে যোগাযোগ করার জন্য এখানে ক্লিক করুন</h1>
                <span className='flex items-center justify-center mt-1'><FaFacebookMessenger size={20}></FaFacebookMessenger> <span className='text-xl ml-2'>M.me/beeraw23</span></span>
              </div></a>

              {/* Instagram */}
              <a target='_blank' href="https://www.instagram.com/beeraw23/"><div className={`${MyServiceCSS.contactOption}`}>
                <h1 className='flex items-center justify-center'>আমাদের সাথে ইনস্টাগ্রামে যুক্ত হতে এখানে ক্লিক করুন</h1>
                <span className='flex items-center justify-center mt-1'><FaInstagramSquare size={20}></FaInstagramSquare> <span className='text-xl ml-2'>Instagram.com/beeraw23</span></span>
              </div></a>

              {/* Youtube */}
              <a target='_blank' href="https://youtube.com/@BeeRAW23"><div className={`${MyServiceCSS.contactOption}`}>
                <h1 className='flex items-center justify-center'>আমাদের ইউটিউব চ্যানেল সাবস্ক্রাইব করতে এখানে ক্লিক করুন</h1>
                <span className='flex items-center justify-center mt-1'><FaYoutube size={20}></FaYoutube> <span className='text-xl ml-2'>Youtube.com/@BeeRAW23</span></span>
              </div></a>

              {/* Telegram */}
              <a target='_blank' href="https://t.me/beeraw23"><div className={`${MyServiceCSS.contactOption}`}>
                <h1 className='flex items-center justify-center'>আমাদের সাথে টেলিগ্রামে যোগাযোগ করার জন্য এখানে ক্লিক করুন</h1>
                <span className='flex items-center justify-center mt-1'><FaTelegram size={20}></FaTelegram> <span className='text-xl ml-2'>T.me/beeraw23</span></span>
              </div></a>

              {/* Tiktok */}
              <a target='_blank' href="https://www.tiktok.com/@beeraw23"><div className={`${MyServiceCSS.contactOption}`}>
                <h1 className='flex items-center justify-center'>টিকটকে ফলো করতে এখানে ক্লিক করুন</h1>
                <span className='flex items-center justify-center mt-1'><FaTiktok size={20}></FaTiktok> <span className='text-xl ml-2'>tiktok.com/@beeraw23</span></span>
              </div></a>

            </div>
            {/* <div className="flex justify-between items-center mt-4 lg:pl-1">
      <span><FaPhone size={25}></FaPhone></span>
      <span><FaFacebookMessenger size={25}></FaFacebookMessenger></span>
      <span><FaInstagramSquare size={25}></FaInstagramSquare></span>
      <span><IoLogoWhatsapp size={25}></IoLogoWhatsapp></span>
    <button className={`btn border-0 btn-sm w-[150px] normal-case ${MyServiceCSS.orderExtraItemButton}`}>Send</button>
    </div> */}
          </div>

        </div>

      </div>

      <a target='_blank' href="https://maps.app.goo.gl/UZFAXBzwGPNqfRfy9"><div className={`${MyServiceCSS.contactOptionAddress}`}>
        <h1 className='flex items-center justify-center py-1'><span className='flex items-center justify-center mr-3'><FaLocationDot size={20}></FaLocationDot></span> <span>Address : Purbachal American City, Kanchan, Narayanganj, Bangladesh</span></h1>
      </div></a>
    </div>
  );
};

export default Page;


// style={{
//   minHeight: '50vh',
//   backgroundImage: "url('https://static.vecteezy.com/system/resources/thumbnails/007/113/040/small/wood-cube-with-phone-email-and-post-icons-on-white-table-over-blur-bokeh-light-background-copy-space-contact-us-free-photo.jpg')",
//   backgroundSize: 'cover',
//   backgroundPosition: 'center'
// }}