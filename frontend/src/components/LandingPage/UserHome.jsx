import React from 'react';
import Carousel from './Carousel';
import Footer from './Footer';
import TawkTo from '../../TawkTo';
import Reviews from './Reviews';
import Work from './Work';
import Contact from './Contact';
import useOnScreen from './useOnScreen';

const UserHome = () => {
  const options = { threshold: 0.1 }; 

  const [carouselRef, isCarouselVisible] = useOnScreen(options);
  const [tawkToRef, isTawkToVisible] = useOnScreen(options);
  const [teamRef, isTeamVisible] = useOnScreen(options);
  const [workRef, isWorkVisible] = useOnScreen(options);
  const [contactRef, isContactVisible] = useOnScreen(options);
  const [reviewsRef, isReviewVisible] = useOnScreen(options);
  const [footerRef, isFooterVisible] = useOnScreen(options);
  

  return (
    <div>
     
      <div className={`fade-in ${isCarouselVisible ? 'visible' : ''}`} ref={carouselRef}>
        <Carousel />
      </div>
      <div className={`fade-in ${isTawkToVisible ? 'visible' : ''}`} ref={tawkToRef}>
        <TawkTo />
      </div>
      <div className={`fade-in ${isWorkVisible ? 'visible' : ''}`} ref={workRef}>
        <Work />
      </div>
      <div className={`fade-in ${isReviewVisible ? 'visible' : ''}`} ref={reviewsRef}>
        <Reviews />
      </div>
      <div className={`fade-in ${isContactVisible ? 'visible' : ''}`} ref={contactRef}>
        <Contact />
      </div>
      <div className={`fade-in ${isFooterVisible ? 'visible' : ''}`} ref={footerRef}>
        <Footer />
      </div>
    </div>
  );
};

export default UserHome;
