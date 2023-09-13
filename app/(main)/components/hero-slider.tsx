/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
export default function HeroSlider() {
  return (
    <Carousel
      className='p-6'
      showThumbs={false}
      showStatus={false}
      transitionTime={900}
      interval={5000}
      autoPlay
      infiniteLoop
      showArrows={false}
      verticalSwipe='natural'
    >
      <div>
        <Image
          height={600}
          width={1200}
          className=' h-[75vh] object-cover w-full'
          src='/images/slide-1.jpg'
          alt='slide'
        />
      </div>
      <div>
        <Image
          height={600}
          width={1200}
          className=' h-[75vh] object-cover w-full'
          src='/images/slide-2.jpg'
          alt='slide'
        />
      </div>
      <div>
        <Image
          height={600}
          width={1200}
          className=' h-[75vh] object-cover w-full'
          src='/images/slide-3.jpg'
          alt='slide'
        />
      </div>
      <div>
        <Image
          height={600}
          width={1200}
          className=' h-[75vh] object-cover w-full'
          src='/images/slide-4.jpg'
          alt='slide'
        />
      </div>
    </Carousel>
  );
}
