import Navbar from "../components/Navbar";
import Footer from "../components/footer"; 
import Homefeature from '../assets/homebg.jpg';
import company from '../assets/company.jpg';
import company2 from '../assets/sachets.jpg';
import Button from "../components/Button";
import Comment from "../components/Comment";
import Product from "../components/Product";
import equip from "../assets/equipe.jpg";

const Home = () => {
  return (
    <div className="font-sans">
      <Navbar />

      {/* Hero Section */}
      <div 
        className="relative md:h-[90vh] sm:h-[80vh] bg-cover bg-center" 
        style={{ backgroundImage: `url(${Homefeature})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50 items-center py-3" />
        <div className="relative h-full text-white flex flex-col mx-6 items-center justify-center">
          <h1 className="md:text-8xl sm:text-6xl font-bold py-4">Beri Soif</h1>
          <h4 className="font-semibold md:py-3 sm:py-2 sm:text-2xl md:text-[30px]">Pure Refreshment, Every Drop Counts</h4>
          <p className="text-base  sm:text-sm md:text-[18px]">
            Discover our range of bottled and sachet water, crafted for your health and well-being.
          </p>
          <Button variant="secondary" className="my-4">Sign Up</Button>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-customColor text-white w-[95%] md:w-[65%] h-[40vh] my-10 mx-auto py-8 flex flex-col">
        <h2 className="text-2xl md:my-5 sm:my-2 text-center font-semibold text-navColor">Welcome To Beri Soif</h2>
        <div className="px-8 text-center">
          <p className="sm:text-sm md:text-xl md:py-4">
            At <span className="text-navColor font-semibold">BERI SOIF</span>, we are dedicated to providing pure
            and refreshing water to our community. Founded with a commitment to quality and sustainability, we offer a range of sachet and
            bottled water products. Our state-of-the-art filtration processes ensure that every drop is clean and safe for you and your family.
          </p>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-8 items-center">
        <h2 className="text-center text-2xl font-semibold text-customColor py-5">Our Services</h2>
        <div className="flex flex-wrap justify-between mx-5 space-x-4">
          <Product
            imageSrc={company} 
            altText="Product 1"
            name="Product 1"
            description="This is a brief description of Product 1."
            buttonLink="/"
          />
          <Product
            imageSrc={company2} 
            altText="Product 2"
            name="Product 2"
            description="This is a brief description of Product 2."
            buttonLink="/"
          />
          <Product
            imageSrc={equip}
            altText="Product 3"
            name="Product 3"
            description="This is a brief description of Product 3."
            buttonLink="/"
          />
        </div>
      </div>

      {/* Contact Section */}
      <div className="newsletter w-[95%] md:w-[65%] md:h-[40vh] bg-customColor items-center justify-center mx-auto my-16 py-8 flex flex-col">
        <h1 className="text-white md:text-5xl sm:text-3xl  font-bold">Get Exclusive Offers On Your Email</h1>
        <p className="text-white md:text-xl">Subscribe to our newsletter and stay updated</p>
        <div className="flex flex-col sm:flex-row mt-4 relative">
          <input 
            type="email" 
            placeholder='Your Email id' 
            className='w-full sm:w-[300px] border border-gray-300 rounded-md outline-none text-gray-700 text-lg px-2 py-2 pr-24' // Adjust padding to make space for the button
          />
          <button className="absolute right-0 top-0 mt-1 mr-1 text-white rounded-full px-4 py-2 cursor-pointer bg-navColor w-24">
            Subscribe
          </button>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="md:h-[40vh] text-center items-center justify-center my-8">
        <h2 className="text-xl my-5 font-semibold text-customColor">Testimonials</h2>
        <div className="md:flex">
          <Comment>"The water quality is exceptional, and the delivery service is always prompt. I highly recommend this company!"</Comment>
          <Comment>"I've tried many brands, but this one stands out. The taste is refreshing, and the customer service is excellent."</Comment>
          <Comment>"Fantastic experience! The ordering process was easy, and my family loves the bottled water. Will definitely order again!"</Comment>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Home;