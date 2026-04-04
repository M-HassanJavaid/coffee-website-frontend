import React from 'react'

function OptionInput({ name, value, handleOptionChange, checked }) {
    return (
        <label
            className="flex items-center gap-2 p-1 rounded cursor-pointer hover:bg-neutral-100"
        >
            <input
                required
                defaultChecked={checked}
                type="radio"
                value={value.label}
                name={name}
                onChange={() =>
                    handleOptionChange(name, value.extraPrice, value.label)
                }
                className="accent-neutral-900"
            />
            <span className="text-neutral-700">
                {value.label || 'None'}{" "}
                {value.extraPrice > 0 && (
                    <span className="text-rose-600 font-medium">
                        + Rs.{value.extraPrice}
                    </span>
                )}
            </span>
        </label>
    )
}

const ProductPageOption = ({ productOpions, handleOptionChange }) => {
    return (
        <div className="mt-4 sm:mt-5 space-y-3 sm:space-y-4 overflow-y-auto pr-2 max-h-[150px] sm:max-h-[250px] md:max-h-[300px] custom-scroll">
            {productOpions.map((opt, i) => (
                <div key={i} className="border rounded-xl p-3 bg-neutral-50">
                    <div className="flex justify-between">
                        <p className="font-medium text-neutral-800">{opt.name}</p>
                        {opt.isRequired && (
                            <span className="text-xs bg-rose-100 text-rose-700 px-2 py-1 rounded-md">
                                Required
                            </span>
                        )}
                    </div>

                    <div className="mt-2 space-y-1">
                        {!opt.isRequired && (
                            <OptionInput value={{ label: '', extraPrice: 0 }} name={opt.name} handleOptionChange={handleOptionChange} checked={true} />
                        )}
                        {opt.values.map((value, i) => (
                            <OptionInput key={i} value={value} name={opt.name} handleOptionChange={handleOptionChange} checked={value.selected === true ? true : false} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};


export default ProductPageOption
