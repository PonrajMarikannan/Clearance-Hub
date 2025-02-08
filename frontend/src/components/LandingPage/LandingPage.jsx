function LandingPage() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-gray-900 h-screen flex flex-col">
      <header>
        <nav className="items-center pt-5 px-4 mx-auto max-w-screen-xl sm:px-8 flex justify-end">
          {" "}
          <ul className="flex space-x-3 sm:space-x-6 sm:justify-end py-4">
            <li>
              <a
                onClick={() => scrollToSection("work")}
                className="flex items-center text-gray-200 hover:text-white hover:bg-gray-700 transition-colors duration-300 px-2 py-1 rounded"
              >
                Work
              </a>
            </li>
            <li>
              <a
                onClick={() => scrollToSection("review")}
                className="flex items-center text-gray-200 hover:text-white hover:bg-gray-700 transition-colors duration-300 px-2 py-1 rounded"
              >
                Reviews
              </a>
            </li>
            <li>
              <a
                onClick={() => scrollToSection("contact")}
                className="flex items-center text-gray-200 hover:text-white hover:bg-gray-700 transition-colors duration-300 px-2 py-1 rounded"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                role="sign-up"
                href="/register"
                className="flex items-center text-gray-200 hover:text-white hover:bg-gray-700 transition-colors duration-300 px-2 py-1 rounded"
              >
                Sign Up
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <section className="mt-24 mx-auto max-w-screen-xl pb-12 px-4 items-center lg:flex md:px-8">
        <div className="space-y-4 flex-1 sm:text-center lg:text-left">
          <h1
            role="hero-name"
            className="text-white font-bold text-4xl xl:text-5xl"
          >
            Shipping made Simple
            <span className="block text-[#FEB300] mt-4">Quick, Efficient.</span>
          </h1>
          <p
            role="hero-content"
            className="text-gray-300 max-w-xl leading-relaxed sm:mx-auto lg:ml-0"
          >
            Experience seamless shipping with reliable delivery solutions.
            Simplify your logistics and ensure timely arrivals with ease.{" "}
          </p>
          <div className="pt-10 items-center justify-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex lg:justify-start">
            <a
              role="login"
              href="/Login"
              className="px-7 py-3 w-full bg-white text-gray-800 text-center rounded-md shadow-md block sm:w-auto"
            >
              Get started
            </a>
          </div>
        </div>
        <div className="flex-1 text-center mt-7 lg:mt-0 lg:ml-3">
          <img
            role="img"
            src="https://img.freepik.com/free-vector/flat-design-container-ship_23-2149147988.jpg?semt=ais_hybrid"
            className="w-full mx-auto sm:w-10/12  lg:w-full"
          />
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
