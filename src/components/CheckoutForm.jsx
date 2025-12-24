import { useEffect, useState, useRef } from 'react'
import { countries } from '../util_Function/conutriesData.json'



const CheckoutForm = ({ register, errors }) => {
    const [country, setCountry] = useState('Pakistan')
    const [state, setState] = useState('')
    const cityInput = useRef(null)


    return (
        <form className="max-w-4xl sticky top-24 w-full p-6 text-zinc-50 rounded-3xl space-y-6">
            <h2 className="text-3xl font-extrabold text-amber-400">Shipping Address</h2>

            {/* Country & State */}
            <div className="flex flex-col md:flex-row gap-4">

                {/* Country */}
                <label className="flex-1 flex flex-col">
                    <span className="mb-1 text-sm font-medium text-zinc-400">Country</span>
                    <select
                        {...register("country")}
                        onChange={(e) => setCountry(e.target.value)}
                        className="px-4 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-50"
                    >
                        {Object.keys(countries).map((c) => (
                            <option key={c} value={c} selected={c === "Pakistan"}>
                                {c}
                            </option>
                        ))}
                    </select>
                    {errors.country && <p className="text-red-800 text-sm mt-1">{errors.country.message}</p>}
                </label>

                {/* State */}
                <label className="flex-1 flex flex-col">
                    <span className="mb-1 text-sm font-medium text-zinc-400">State</span>
                    <select
                        {...register("state")}
                        onChange={(e) => setState(e.target.value)}
                        className="px-4 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-50"
                    >
                        {countries[country] ? (
                            <>
                                <option value="">Select your State</option>
                                {Object.keys(countries[country]).map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </>
                        ) : (
                            <option value="">Select your country first</option>
                        )}
                    </select>
                    {errors.state && <p className="text-red-800 text-sm mt-1">{errors.state.message}</p>}
                </label>

            </div>

            {/* City & Phone */}
            <div className="flex flex-col md:flex-row gap-4">

                {/* City */}
                <label className="flex-1 flex flex-col">
                    <span className="mb-1 text-sm font-medium text-zinc-400">City</span>
                    <select
                        {...register("city")}
                        disabled={!countries?.[country]?.[state]}
                        className="px-4 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-50"
                    >
                        {countries?.[country]?.[state] ? (
                            <>
                                <option value="">Select your city</option>
                                {countries[country][state].map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </>
                        ) : (
                            <option value="">Select your state first</option>
                        )}
                    </select>

                    {errors.city && (
                        <p className="text-red-800 text-sm mt-1">{errors.city.message}</p>
                    )}
                </label>


                {/* Phone */}
                <label className="flex-1 flex flex-col">
                    <span className="mb-1 text-sm font-medium text-zinc-400">Phone Number</span>
                    <input
                        {...register("phone")}
                        type="text"
                        placeholder="+923123456789"
                        className="px-4 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-50"
                    />
                    {errors.phone && <p className="text-red-800 text-sm mt-1">{errors.phone.message}</p>}
                </label>

            </div>

            {/* Street Address */}
            <label className="flex flex-col">
                <span className="mb-1 text-sm font-medium text-zinc-400">Street Address</span>
                <input
                    {...register("streetAddress")}
                    type="text"
                    placeholder="House No. 123, Street 45, Gulberg, Lahore..."
                    className="px-4 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-50"
                />
                {errors.streetAddress && <p className="text-red-800 text-sm mt-1">{errors.streetAddress.message}</p>}
            </label>

            {/* Landmark & Postal Code */}
            <div className="flex flex-col md:flex-row gap-4">

                {/* Landmark */}
                <label className="flex-1 flex flex-col">
                    <span className="mb-1 text-sm font-medium text-zinc-400">Landmark</span>
                    <input
                        {...register("landmark")}
                        type="text"
                        placeholder="Near XYZ place (Optional)"
                        className="px-4 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-50"
                    />
                    {errors.landmark && <p className="text-red-800 text-sm mt-1">{errors.landmark.message}</p>}
                </label>

                {/* Postal Code */}
                <label className="flex-1 flex flex-col">
                    <span className="mb-1 text-sm font-medium text-zinc-400">Postal Code</span>
                    <input
                        {...register("postalCode")}
                        type="text"
                        placeholder="75800"
                        className="px-4 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-50"
                    />
                    {errors.postalCode && <p className="text-red-800 text-sm mt-1">{errors.postalCode.message}</p>}
                </label>

            </div>

            {/* Description */}
            <label className="flex flex-col">
                <span className="mb-1 text-sm font-medium text-zinc-400">Description</span>
                <textarea
                    {...register("description")}
                    placeholder="Any description about this order... (Optional)"
                    className="px-4 py-2 rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-50 h-24 resize-none"
                ></textarea>
                {errors.description && <p className="text-red-800 text-sm mt-1">{errors.description.message}</p>}
            </label>

            {/* Save My Data */}
            <label className="flex items-center gap-3 cursor-pointer select-none max-w-fit">
                <input
                    {...register("saveData")}
                    type="checkbox"
                    className="w-5 h-5 rounded-md accent-amber-400 border border-zinc-700 bg-zinc-800"
                />
                <span className="text-zinc-50 font-medium hover:text-amber-400 transition">
                    Save my data for next time
                </span>
            </label>

        </form>

    )
}

export default CheckoutForm
