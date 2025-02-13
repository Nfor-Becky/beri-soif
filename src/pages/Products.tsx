import Navbar from "../components/Navbar";
import Footer from '../components/footer';
import sachet from '../assets/sachets.jpg';
import bottle from '../assets/bottles.jpg';
import Product from "../components/Product";
import cup from '../assets/cupfeature.jpg';
import productfeature from '../assets/aboutbg.jpg';

const Products = () => {
  return (
    <div>
      <Navbar/>
      <div className="">
      <div className="relative md:h-[40vh] sm:h-[40vh] bg-cover bg-center" style={{ backgroundImage: `url(${productfeature})` }}>
      </div>
      <div className="my-5 md:h-[60vh] sm:h-[60vh]">
        <h2 className="text-center text-2xl font-semibold text-customColor">PRODUCTS</h2>
        <div className="flex flex-wrap justify-between mx-12 my-4">
            <Product
                imageSrc={sachet} 
                altText="Product 1"
                name="Product 1"
                description="This is a brief description of Product 1."
                buttonLink="/"
            />
            <Product
                imageSrc={bottle} 
                altText="Product 2"
                name="Product 2"
                description="This is a brief description of Product 2."
                buttonLink="/"
            />
             <Product
                imageSrc={cup}
                altText="Product 2"
                name="Product 2"
                description="This is a brief description of Product 2."
                buttonLink="/"
            />
        </div>
      </div>
      <Footer/>
    </div>
    </div>
  )
}

export default Products
