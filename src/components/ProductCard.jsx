import { useRef, useEffect , forwardRef} from 'react'
import Button from './Button'

const ProductCard = forwardRef(({image, name, category, discountedPrice, price, discount, _id} , ref)=>{

    return (
        <div className="max-w-[335px] w-[calc(100%-20px)] bg-zinc-100 text-neutral-800 rounded-2xl overflow-hidden shadow-lg border-4 border-neutral-500" ref={ref}>
            <img src={image.url} alt={name} className="w-full h-64 object-cover " />
            <div className="p-3 space-y-3">
                <h3 className="text-2xl font-bold tracking-wide">{name}</h3>
                <div className="flex justify-between text-sm text-black">
                    Category: {category}
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-neutral-500">${discountedPrice}</span>
                    {discount > 0 && <span className="text-lg text-black line-through">{`$${price}`}</span>}
                </div>
                <div className="flex gap-2 pt-3 flex-wrap">
                    <Button title="Add to Cart" id={_id} invert={true} />
                    <Button title="See Details" id={_id} />
                </div>
            </div>
        </div>

    )
});

export default ProductCard