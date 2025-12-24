import React, { useEffect, useState, useContext, useRef } from "react";
import { Plus, Minus, Check, X } from "lucide-react";
import Loader from "./Loader";
import { useParams, Link, useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import { validateOptions } from "../util_Function/validateOption";
import Button from "./Button";
import QuantityInput from "./quantityInput";
import { getSelectedOptionsWithPrice } from "../util_Function/getSelectedOptionWithPrice";
import { mergeProductAndOrderOption } from "../util_Function/mergeProductAndOrderOption";
import { CartContext } from "../pages/Cart";
import ProductPageOption from "./ProductPageOption";



const ProductPage = ({ isCartItem }) => {

    const {cartItems, setCartItems , setTotalPrice : setTotalPriceOfWholeCart} = useContext(CartContext) ?? {}
    const [quantity, setQuantity] = useState(1);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const { alertMessage, setAlertMessage } = useContext(AppContext)
    const [product, setProduct] = useState(null)
    const { id } = useParams();
    const [totalPrice, setTotalPrice] = useState(0)
    const [addingInCart, setAddingInCart] = useState(false)
    const [noteInputValue, setNoteInputValue] = useState('');
    const navigate = useNavigate()


    async function saveChanges() {
        try {
            setAddingInCart(true)
            let res = await fetch(`https://coffee-website-backend-gamma.vercel.app/cart/update/${id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    note: noteInputValue,
                    selectedOptions: selectedOptions,
                    quantity: quantity
                })
            });
            res = await res.json();

            if (!res.ok) throw new Error(res.message);

            setAlertMessage('Your Changes have saved successfully')
            setCartItems(res.cart.items);
            setTotalPriceOfWholeCart(res.cart.totalAmount)
            navigate('/cart' )

        } catch (error) {

            setAlertMessage(error.message)

        } finally {
            setAddingInCart(false)
        }
    }

    async function getCartItem() {
        try {
            let res = await fetch(`https://coffee-website-backend-gamma.vercel.app/cart/item/${id}`, {
                credentials: 'include',
                method: 'GET'
            });
            res = await res.json();
            if (!res.ok) {
                setAlertMessage(res.message)
            }
            let selectedOptions = getSelectedOptionsWithPrice(res.item.product.options, res.item.selectedOptions);
            setSelectedOptions(selectedOptions)
            res.item.product.options = mergeProductAndOrderOption(res.item.product.options, selectedOptions)
            setProduct(res.item.product);
            setQuantity(res.item.quantity);
            setNoteInputValue(res.item.note)
        } catch (error) {
            setAlertMessage(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    async function addToCart(orderOptions, productOption, productId) {
        try {
            setAddingInCart(true)
            let result = await validateOptions(orderOptions, productOption);
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
                    note: noteInputValue,
                    selectedOptions: selectedOptions
                })
            });
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
        if (isCartItem) {
            getCartItem()
        } else {
            getProduct()
        }
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
        const totalPrice = (product.discountedPrice + calculateExtras()) * quantity;
        setTotalPrice(totalPrice)
    }, [quantity, selectedOptions])


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

                            <ProductPageOption productOpions={product.options} handleOptionChange={handleOptionChange} /> 

                            {/* QUANTITY */}
                            <div>
                                <p className="font-medium text-neutral-800 mb-2">Quantity</p>
                                <QuantityInput
                                    onIncrement={() => setQuantity(quantity + 1)}
                                    onDecrement={() => quantity > 1 && setQuantity(quantity - 1)}
                                    quantity={quantity}
                                />
                            </div>

                            <textarea
                                value={noteInputValue}
                                placeholder="Any special instruction for this..."
                                className="resize-none bg-white text-black placeholder:text-black/70 rounded-lg p-3 my-2"
                                onChange={(e) => setNoteInputValue(e.target.value)}
                            />
                            <div className="mt-5 bg-neutral-100 p-3 rounded-xl border flex justify-between items-center">
                                <span className="font-semibold text-neutral-700">Total Price:</span>
                                <span className="text-xl font-bold text-rose-600">
                                    Rs. {totalPrice}
                                </span>
                            </div>

                            {/* BUTTON */}
                            <Button title={isCartItem ? 'Save Changes' : 'Add to Cart'} className='my-3 grow-0' isLoading={addingInCart}
                                func={() => {
                                    if (isCartItem) {
                                        saveChanges()
                                    } else {
                                        addToCart(selectedOptions, product.options, product._id)
                                    }
                                }}
                            />

                        </div>
                    </>
                ) : <p className="text-center text-black absolute top-1/2 left-1/2 -translate-1/2 text-xl">Due to some issue product could not load! </p>}

            </div>
        </div>
    );
};

export default ProductPage;
