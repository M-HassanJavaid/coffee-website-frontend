import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { AppContext } from "../App";

function textElipsis(maxlength, text) {
    let newstr = "";
    for (let i = 0; i < text.length; i++) {
        if (i > maxlength) {
            newstr = newstr + "...";
            return newstr;
        }
        newstr = newstr + text[i];
    }
    return newstr;
}

const ProductCard = ({
    className,
    image,
    name,
    category,
    discountedPrice,
    price,
    discount,
    _id,
    description,
    showCategory,
}) => {
    const { user, setAlertMessage } = useContext(AppContext);
    const navigate = useNavigate();

    const handleProductClick = () => {
        if (user) {
            navigate(`/menu/${_id}`);
        } else {
            setAlertMessage("Please login to view product details!");
            navigate("/login");
        }
    };

    return (
    <div
      onClick={handleProductClick}
      className={`group relative bg-white text-neutral-800 rounded-xl overflow-hidden
      border border-neutral-200 shadow-sm transition-all duration-300 ease-out 
      max-w-[160px] sm:max-w-[220px] md:max-w-[260px] w-full cursor-pointer hover:shadow-md ${className}`}
    >
      {/* Product Image */}
      <div className="overflow-hidden h-32 sm:h-40 md:h-44">
        <img
          src={image.url}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-2 sm:p-3 md:p-4 space-y-1 sm:space-y-2 md:space-y-3">
        <h3 className="text-sm sm:text-base md:text-lg font-bold text-neutral-900 leading-tight line-clamp-2 min-h-[2.5rem]">
          {name}
        </h3>
        <p className="text-[10px] sm:text-xs text-neutral-600 leading-tight min-h-[30px] sm:min-h-[40px]">
          {textElipsis(window.innerWidth < 640 ? 40 : 70, description)}
        </p>

        {showCategory && (
          <div className="inline-block text-[9px] md:text-[10px] uppercase tracking-wide text-neutral-700 font-medium bg-amber-100/70 px-1.5 md:px-2 py-0.5 rounded-full">
            {category}
          </div>
        )}

        {/* Price Section */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 pt-1">
          <span className="text-sm sm:text-base md:text-lg font-bold text-neutral-800">
            Rs. {discountedPrice}
          </span>
          {discount > 0 && (
            <span className="text-[10px] sm:text-xs text-neutral-500 line-through">
              Rs. {price}
            </span>
          )}
        </div>

        {/* CTA Button */}
        <div className="pt-2">
          <Button 
            title="Add to Cart" 
            id={_id} 
            invert={true} 
            className='w-full text-[10px] sm:text-xs md:text-sm px-2 py-1' 
            func={(e) => {
                e.stopPropagation();
                handleProductClick();
            }}
          />
        </div>
      </div>
    </div>
    );
};

export default ProductCard;
