"use client"
import 'aos/dist/aos.css';

import React from 'react';

import { BsFacebook } from 'react-icons/bs';
import { FaFacebookMessenger } from 'react-icons/fa';
import { FaTelegram } from 'react-icons/fa6';
import { IoLogoWhatsapp } from 'react-icons/io';
import { RiInstagramFill } from 'react-icons/ri';

const Page = () => {
  return (
    <div className='my-[24px] grid lg:grid-cols-2 grid-cols-1 gap-4'>

      <div style={{ background: 'crimson' }} className="card card-side h-[210px] hover:shadow-2xl">
        <figure><img className='lg:w-[170px] md:w-[155px] w-[95px] h-[210px]' src="https://i.ibb.co/DQppNKv/IMG-20231128-220649.png" alt="Movie" /></figure>
        <div className="ml-2 my-2">
          <h2 className="card-title mb-2">Shoyeb Ahmed Saad</h2>
          <p>Founder -Bee Raw</p>
          <p className='my-2'>Dept. of CSE</p>
          <p>Green University of Bangladesh</p>
          <p className='my-2'>Beeraw1999@gmail.com</p>
          <div className='flex justify-between items-center gap-x-2'>
            <span><FaFacebookMessenger size={25} color={'white'}></FaFacebookMessenger></span>
            <span><BsFacebook size={25} color={'white'}></BsFacebook></span>
            <span><RiInstagramFill size={25} color={'white'}></RiInstagramFill></span>
            <span><IoLogoWhatsapp size={25} color={'white'}></IoLogoWhatsapp></span>
            <span><FaTelegram size={25} color={'white'}></FaTelegram></span>
          </div>
        </div>
      </div>


      <div style={{ background: 'crimson' }} className="card card-side h-[210px] hover:shadow-2xl">
        <figure><img className='lg:w-[170px] md:w-[155px] w-[95px] h-[210px]' src="https://i.ibb.co/LZgy3CB/Photo-Room-20231202-165457.png" alt="Movie" /></figure>
        <div className="ml-2 my-2">
          <h2 className="card-title mb-2">Shakidul Islam Shakil</h2>
          <p>Technical support</p>
          <p className='my-2'>Dept. of CSE</p>
          <p>Green University of Bangladesh</p>
          <p className='my-2'>shakidul31@gmail.com</p>
          <div className='flex justify-between items-center gap-x-2'>
            <span><FaFacebookMessenger size={25} color={'white'}></FaFacebookMessenger></span>
            <span><BsFacebook size={25} color={'white'}></BsFacebook></span>
            <span><RiInstagramFill size={25} color={'white'}></RiInstagramFill></span>
            <span><IoLogoWhatsapp size={25} color={'white'}></IoLogoWhatsapp></span>
            <span><FaTelegram size={25} color={'white'}></FaTelegram></span>
          </div>
        </div>
      </div>



      <div style={{ background: 'crimson' }} className="card card-side h-[210px] hover:shadow-2xl">
        <figure><img className='lg:w-[170px] md:w-[155px] w-[95px] h-[210px]' src="https://i.ibb.co/ZSPc0p1/Photo-Room-20231128-222138.png" alt="Movie" /></figure>
        <div className="ml-2 my-2">
          <h2 className="card-title mb-2">Nafiz Uddin Akand</h2>
          <p>Team Support</p>
          <p className='my-2'>Dept. of CSE</p>
          <p>Green University of Bangladesh</p>
        </div>
      </div>



      <div style={{ background: 'crimson' }} className="card card-side h-[210px] hover:shadow-2xl">
        <figure><img className='lg:w-[170px] md:w-[155px] w-[95px] h-[210px]' src="https://i.ibb.co/tZK565s/Photo-Room-20231128-221834.png" alt="Movie" /></figure>
        <div className="ml-2 my-2">
          <h2 className="card-title mb-2">Sheikh Jannat</h2>
          <p>Team Support</p>
          <p className='my-2'>Dept. of EEE</p>
          <p>Green University of Bangladesh</p>
        </div>
      </div>


      <div style={{ background: 'crimson' }} className="card card-side h-[210px] hover:shadow-2xl">
        <figure><img className='lg:w-[170px] md:w-[155px] w-[95px] h-[210px]' src="https://i.ibb.co/ZB96yjc/Photo-Room-20231128-213317.png" alt="Movie" /></figure>
        <div className="ml-2 my-2">
          <h2 className="card-title mb-2">Sheikh Jabed</h2>
          <p>Financial support</p>
          <p className='my-2'>Dept. of BBA</p>
          <p>Green University of Bangladesh</p>
        </div>
      </div>

    </div>
  );
};

export default Page;

{/* <a href="tel:+8801606077657">Click to Call at 01606077657</a> */ }