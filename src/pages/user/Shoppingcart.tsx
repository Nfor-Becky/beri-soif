import Product from '../../components/Product';
import sachet from '../../assets/sachets.jpg';
import bottle from '../../assets/bottles.jpg';
import cup from '../../assets/cupfeature.jpg';

const ShoppingCart = () => {
  return (
    <div>
      <div className="my-5 md:h-[60vh] sm:h-[60vh]">
        <h2 className="text-center text-2xl font-semibold text-customColor">PRODUCTS</h2>
        <div className="flex flex-wrap justify-between mx-12 my-4">
          <Product
            imageSrc={sachet} 
            altText="Sachet Product"
            name="Sachet"
            description="This is a brief description of the sachet product."
            buttonLink="/user/orderform"
          />
          <Product
            imageSrc={bottle} 
            altText="Bottle Product"
            name="Bottle"
            description="This is a brief description of the bottle product."
            buttonLink="/user/orderform"
          />
          <Product
            imageSrc={cup}
            altText="Cup Product"
            name="Cup"
            description="This is a brief description of the cup product."
            buttonLink="/user/orderform"
          />
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;