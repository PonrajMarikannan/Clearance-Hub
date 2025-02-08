import { useState, useRef, useEffect } from "react";
import ship1 from '../../assets/ship1.jpg';
import ship2 from '../../assets/ship2.jpg';
import ship3 from '../../assets/ship3.jpg';




function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselItems = useRef([]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % carouselItems.current.length;
      showSlide(newIndex);
      return newIndex;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = (prevIndex - 1 + carouselItems.current.length) % carouselItems.current.length;
      showSlide(newIndex);
      return newIndex;
    });
  };

  const showSlide = (index) => {
    carouselItems.current.forEach((item, i) => {
      item.classList.toggle('hidden', i !== index);
    });
  };

  useEffect(() => {
    carouselItems.current = document.querySelectorAll('[data-carousel-item]');
    showSlide(currentIndex);

    const intervalId = setInterval(nextSlide, 5000);

    return () => clearInterval(intervalId);
  }, [currentIndex]);

  useEffect(() => {
    const prevButton = document.querySelector('[data-carousel-prev]');
    const nextButton = document.querySelector('[data-carousel-next]');

    if (prevButton) prevButton.addEventListener('click', prevSlide);
    if (nextButton) nextButton.addEventListener('click', nextSlide);

    return () => {
      if (prevButton) prevButton.removeEventListener('click', prevSlide);
      if (nextButton) nextButton.removeEventListener('click', nextSlide);
    };
  }, []);

  return (
    <div id="image-carousel" className="relative w-full h-[91vh] " data-carousel="slide">
      <div className="relative h-full overflow-hidden rounded-lg">
        

        <div className="hidden duration-1000 ease-in-out" data-carousel-item>
          <img
            src={ship3}
            className="absolute block w-full h-full object-cover"
            alt="Slide 3"
          />
        </div>
        <div className="hidden duration-1000 ease-in-out" data-carousel-item>
          <img
            src={ship1}
            className="absolute block w-full h-full object-cover"
            alt="Slide 1"
          />
        </div>
        <div className="hidden duration-1000 ease-in-out" data-carousel-item>
          <img
            src={ship2}
            className="absolute block w-full h-full object-cover"
            alt="Slide 2"
          />
        </div>
     
       
       
      </div>

      <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        <button type="button" className="w-3 h-3 rounded-full bg-white" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
        <button type="button" className="w-3 h-3 rounded-full bg-white" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
        <button type="button" className="w-3 h-3 rounded-full bg-white" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
      </div>

      <button type="button" className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-700/70 hover:bg-gray-700/90">
          <svg className="w-4 h-4 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>

      <button type="button" className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-700/70 hover:bg-gray-700/90">
          <svg className="w-4 h-4 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
    </div>
  );
}

export default ImageCarousel;
