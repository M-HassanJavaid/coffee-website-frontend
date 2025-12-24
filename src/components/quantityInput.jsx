import React from "react";
import { Plus, Minus } from "lucide-react";

const QuantityInput = ({ quantity, onIncrement, onDecrement, isChanging }) => {
    return (
        <div className="flex items-center gap-3">

            {/* Decrement Button */}
            <button
                onClick={onDecrement}
                disabled={isChanging}
                className="w-10 h-10 flex items-center justify-center rounded-lg 
                           border border-neutral-300 bg-neutral-100 hover:bg-neutral-200
                           disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
            >
                <Minus size={18} className="text-neutral-700" />
            </button>

            {/* Quantity Display (Loader Shows Here) */}
            <div className="w-14 h-10 border border-neutral-300 rounded-lg 
                            flex items-center justify-center font-semibold bg-white text-neutral-800">

                {isChanging ? (
                    <span className="w-5 h-5 border-2 border-neutral-700 border-t-transparent rounded-full animate-spin"></span>
                ) : (
                    quantity
                )}
            </div>

            {/* Increment Button */}
            <button
                onClick={onIncrement}
                disabled={isChanging}
                className="w-10 h-10 flex items-center justify-center rounded-lg 
                           border border-neutral-300 bg-neutral-100 hover:bg-neutral-200
                           disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
            >
                <Plus size={18} className="text-neutral-700" />
            </button>
        </div>
    );
};

export default QuantityInput;
