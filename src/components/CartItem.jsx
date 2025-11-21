import { Pencil, XCircle, XIcon } from "lucide-react";
import { useState } from "react";
import QuantityInput from "./quantityInput";

const CartItem = ({
    image,
    id,
    title,
    options,
    quantity: originalQty,
    totalPrice,
    note,
}) => {
    const [quantity, setQuantity] = useState(originalQty);

    return (
        <div className="flex gap-4 p-4 bg-neutral-900/60 border border-neutral-800 rounded-xl backdrop-blur-sm shadow-md">

            {/* IMAGE */}
            <img
                src={image}
                alt={title}
                className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl"
            />

            {/* CONTENT */}
            <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start">
                    <h2 className="text-lg sm:text-xl font-semibold text-neutral-100">
                        {title}
                    </h2>

                    <div className="flex gap-3 ">
                        <button className="text-neutral-400 hover:text-neutral-200 transition cursor-pointer">
                            <Pencil size={24}/>
                        </button>
                        <button className="text-neutral-400 hover:text-neutral-200 transition cursor-pointer">
                            <XIcon size={24} />
                        </button>

                    </div>
                </div>

                {/* OPTIONS */}
                <div className="text-sm text-neutral-400 mt-1 space-y-1">
                    {options.map((opt, i) =>
                        !opt.value ? null : (
                            <p key={i}>
                                <span className="text-neutral-300 font-medium">
                                    {opt.name}:
                                </span>{" "}
                                {opt.value}
                            </p>
                        )
                    )}
                </div>

                {/* NOTE */}
                {note && (
                    <p className="text-sm text-neutral-400 mt-1">
                        <span className="font-medium text-neutral-300">Note:</span>{" "}
                        {note}
                    </p>
                )}

                {/* BOTTOM ROW */}
                <div className="mt-3 flex justify-between items-center">
                    <QuantityInput
                        quantity={quantity}
                        onIncrement={() => { }}
                        onDecrement={() => { }}
                        isChanging={false}
                    />

                    <p className="text-lg font-bold text-green-400">
                        Rs. {totalPrice}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
