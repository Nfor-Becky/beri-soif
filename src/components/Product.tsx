import Button from "./Button";

interface ProductProps {
    imageSrc: string; // URL for the product image
    altText: string; // Alt text for the image
    name: string; // Product name
    description: string; // Mini description of the product
    buttonLink: string; // Link for the button
    className?: string; 
}

const Product: React.FC<ProductProps> = ({
    imageSrc,
    altText,
    name,
    description,
    buttonLink,
    className = ""
}) => {
    return (
        <div className={`bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 ${className}`}>
            <img src={imageSrc} alt={altText} className="w-full h-40 object-cover" />
            <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{name}</h3>
                <p className="text-gray-600 mb-4">{description}</p>
                <Button onClick={() => window.location.href = buttonLink} className="bg-navColor hover:bg-opacity-80 text-white py-2 px-4 rounded">
                    Order Now
                </Button>
            </div>
        </div>
    );
}

export default Product;