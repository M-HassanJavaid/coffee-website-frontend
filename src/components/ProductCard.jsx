import Button from "./Button";

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
    return (
        <div
            className={`group relative bg-white text-neutral-800 rounded-2xl overflow-hidden
            border border-neutral-200 shadow-sm 
            transition-all duration-300 ease-out max-w-[260px] w-full ${className}`}
        >
            {/* Product Image */}
            <div className="overflow-hidden h-44">
                <img
                    src={image.url}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-500 "
                />
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
                <h3 className="text-lg font-semibold text-neutral-900 leading-tight line-clamp-2">
                    {name}
                </h3>
                <p className="text-xs text-neutral-600 leading-snug min-h-[45px] font-bold">
                    {textElipsis(70, description)}
                </p>

                {showCategory && (
                    <div className="inline-block text-[10px] uppercase tracking-wide text-neutral-700 font-medium bg-amber-100/70 px-2 py-0.5 rounded-full">
                        {category}
                    </div>
                )}

                {/* Price Section */}
                <div className="flex items-center gap-2 pt-1">
                    <span className="text-lg font-bold text-neutral-800">
                        Rs. {discountedPrice}
                    </span>
                    {discount > 0 && (
                        <span className="text-xs text-neutral-500 line-through">
                            Rs. {price}
                        </span>
                    )}
                </div>

                {/* CTA Button */}
                <div className="pt-2">
                    <Button title="Add to Cart" id={_id} invert={true} className='text-sm' path={`/menu/${_id}`} />
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
