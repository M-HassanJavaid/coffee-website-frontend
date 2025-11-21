import React, { useEffect, useState, useContext, useRef } from "react";
import { Plus, Minus, Check, X } from "lucide-react";
import Loader from "./Loader";
import { useParams, Link } from "react-router-dom";
import { AppContext } from "../App";
import { validateOptions } from "../util_Function/validateOption";
import Button from "./Button";
import QuantityInput from "./quantityInput";


const ProductPage = () => {

    const [quantity, setQuantity] = useState(1);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const { alertMessage, setAlertMessage } = useContext(AppContext)
    const [product, setProduct] = useState(null)
    const { id } = useParams()
    const [totalPrice, setTotalPrice] = useState(0)
    const [addingInCart, setAddingInCart] = useState(false)
    const noteInput = useRef(null)

    async function addToCart(orderOptions, productOption, productId) {
        try {
            setAddingInCart(true)
            let result = await validateOptions(orderOptions, productOption);
            console.log(result.message + result.valid)
            if (!result.valid) {
                throw new Error(result.message)
            }
            if (!result.valid) throw new Error(result.message)
            let res = await fetch('https://coffee-website-backend-gamma.vercel.app/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    product: productId,
                    quantity: quantity,
                    note: noteInput.current.value,
                    selectedOptions: selectedOptions
                })
            });
            // if (!res.ok) throw new Error('Server Error!');
            res = await res.json();
            if (!res.ok) throw new Error(res.message)
            setAlertMessage(res.message)
        } catch (error) {
            setAlertMessage(error.message)
        } finally {
            setAddingInCart(false)
        }
    }

    async function getProduct() {
        try {
            let res = await fetch(`https://coffee-website-backend-gamma.vercel.app/product/id/${id}`);
            res = await res.json();
            if (!res.ok) throw new Error(res.message);
            let product = res.product;
            setProduct(product)
            const optionSkeleton = product.options.map((opt) => {
                return {
                    name: opt.name,
                    value: '',
                    price: 0
                }
            });
            setSelectedOptions(optionSkeleton);
            console.log(optionSkeleton)
        } catch (error) {
            setAlertMessage(error.message)
        } finally {
            setIsLoading(false)
        }
    }


    useEffect(() => {
        document.body.style.overflow = "hidden";
        getProduct()
        return () => document.body.style.overflow = "auto";
    }, []);

    const calculateExtras = () => {
        let totalExtraPrice = 0;
        selectedOptions.forEach((opt) => {
            totalExtraPrice += opt.price;
        });
        return totalExtraPrice
    };

    useEffect(() => {
        if (!product) return;
        console.log("Discounted Price =>" + product.discountedPrice)
        const totalPrice = (product.discountedPrice + calculateExtras()) * quantity;
        setTotalPrice(totalPrice)
    }, [product, quantity, selectedOptions])


    const handleOptionChange = (optName, extraPrice, value) => {
        setSelectedOptions((prev) => {
            let newSelectedOption = prev.map((opt) => {
                if (opt.name === optName) {
                    return {
                        name: optName,
                        price: extraPrice,
                        value: value
                    }
                } else {
                    return opt
                }

            })
            return newSelectedOption
        })

        console.dir(selectedOptions, { depth: null })
    };



    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 isolate">
            <div className="w-full max-w-[1100px] rounded-3xl bg-zinc-100 shadow-2xl grid md:grid-cols-2 overflow-hidden border relative min-h-[600px] max-h-[95vh]">
                <Link className="absolute right-2 top-2" to='/menu'>
                    <X size={40} />
                </Link>

                {/* IMAGE SECTION */}
                {isLoading ? <Loader style={{ height: '100%', position: 'absolute', inset: 0, width: '100%' }} /> : product ? (
                    <>
                        <div className="bg-[rgb(254,254,254)] flex items-center justify-center p-5">
                            <img src={product.image.url} className="w-full h-[350px] object-contain" alt="coffee" />
                        </div>

                        {/* DETAILS SECTION */}

                        <div className="p-6 flex flex-col">
                            <h2 className="text-3xl font-bold text-neutral-800">{product.name}</h2>
                            <p className="text-lg font-semibold text-neutral-600 mt-1">
                                {product.discount > 0 ? (
                                    <>
                                        {/* Base Price:{" "} */}
                                        <span className="text-rose-600 line-through mr-2">
                                            Rs. {product.price}
                                        </span>
                                        <span className="text-green-600">
                                            Rs. {product.discountedPrice}
                                        </span>
                                        <span className="text-sm text-blue-600 ml-2">
                                            ({product.discount}% OFF)
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-rose-600">Rs. {product.discountedPrice}</span>
                                    </>
                                )}
                            </p>

                            <p className="text-black text-sm mt-2 leading-relaxed">{product.description}</p>

                            {/* OPTIONS */}
                            <div className="mt-5 space-y-4 overflow-y-auto pr-2 max-h-[150px] custom-scroll">
                                {product.options.map((opt, i) => (
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
                                                <label
                                                    className="flex items-center gap-2 p-1 rounded cursor-pointer hover:bg-neutral-100"
                                                >
                                                    <input
                                                        required
                                                        defaultChecked
                                                        type="radio"
                                                        value={''}
                                                        name={opt.name}
                                                        onChange={() =>
                                                            handleOptionChange(opt.name, 0, '')
                                                        }
                                                        className="accent-neutral-900"
                                                    />
                                                    <span className="text-neutral-700">
                                                        None
                                                    </span>
                                                </label>
                                            )}
                                            {opt.values.map((value, idx) => (
                                                <label
                                                    key={idx}
                                                    className="flex items-center gap-2 p-1 rounded cursor-pointer hover:bg-neutral-100"
                                                >
                                                    <input
                                                        required
                                                        type="radio"
                                                        name={opt.name}
                                                        value={value.label}
                                                        onChange={() =>
                                                            handleOptionChange(opt.name, value.extraPrice, value.label)
                                                        }
                                                        className="accent-neutral-900"
                                                    />
                                                    <span className="text-neutral-700">
                                                        {value.label}{" "}
                                                        {value.extraPrice > 0 && (
                                                            <span className="text-rose-600 font-medium">
                                                                + Rs.{value.extraPrice}
                                                            </span>
                                                        )}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                ))}

                            </div>

                            {/* QUANTITY */}
                            <div>
                                <p className="font-medium text-neutral-800 mb-2">Quantity</p>
                                <QuantityInput
                                    onIncrement={() => setQuantity(quantity + 1)}
                                    onDecrement={() => quantity > 1 && setQuantity(quantity - 1)}
                                    quantity={quantity}
                                />
                            </div>

                            <textarea ref={noteInput} placeholder="Any special instruction for this..." className="resize-none bg-white text-black placeholder:text-black/70 rounded-lg p-3 my-2"></textarea>

                            {/* TOTAL PRICE */}
                            <div className="mt-5 bg-neutral-100 p-3 rounded-xl border flex justify-between items-center">
                                <span className="font-semibold text-neutral-700">Total Price:</span>
                                <span className="text-xl font-bold text-rose-600">
                                    Rs. {totalPrice}
                                </span>
                            </div>

                            {/* BUTTON */}
                            <Button title='Add to Cart' className='my-3 grow-0' isLoading={addingInCart} func={() => addToCart(selectedOptions, product.options, product._id)} />

                        </div>
                    </>
                ) : <p className="text-center text-black absolute top-1/2 left-1/2 -translate-1/2 text-xl">Due to some issue product could not load! </p>}

            </div>
        </div>
    );
};

export default ProductPage;
