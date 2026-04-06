import { useEffect, useState } from 'react'
import { countries } from '../util_Function/conutriesData.json'
import { User, MapPin, Phone, Globe, Navigation, Info, Save, Mail, Home, Truck, CreditCard, Sparkles } from 'lucide-react'


const CheckoutForm = ({ register, errors, setValue, savedAddress }) => {
    const [country, setCountry] = useState('Pakistan')
    const [state, setState] = useState('')
    const [autoFilled, setAutoFilled] = useState(false)

    // Auto-fill when savedAddress is available
    useEffect(() => {
        if (!savedAddress) return;
        setValue('phone', savedAddress.phone || '');
        setValue('streetAddress', savedAddress.street || '');
        setValue('postalCode', savedAddress.postalCode || '');
        setValue('landmark', savedAddress.landmark !== 'Not Given' ? savedAddress.landmark : '');
        if (savedAddress.country) {
            setValue('country', savedAddress.country);
            setCountry(savedAddress.country);
        }
        if (savedAddress.state) {
            setValue('state', savedAddress.state);
            setState(savedAddress.state);
        }
        if (savedAddress.city) {
            setValue('city', savedAddress.city);
        }
        setAutoFilled(true);
    }, [savedAddress]);

    return (
        <form id="checkoutForm" className="w-full space-y-8 bg-neutral-900/40 backdrop-blur-sm border border-neutral-800 p-8 rounded-[2rem] shadow-2xl">
            <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-amber-400/10 rounded-xl flex items-center justify-center border border-amber-400/20">
                    <MapPin className="w-5 h-5 text-amber-400" />
                </div>
                <h2 className="text-2xl font-bold text-zinc-100">Shipping Details</h2>
            </div>

            {/* Auto-fill notice */}
            {autoFilled && (
                <div className="flex items-center gap-3 px-4 py-3 bg-amber-400/10 border border-amber-400/20 rounded-2xl">
                    <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <p className="text-xs font-semibold text-amber-300">Your saved address has been auto-filled. Review before placing your order.</p>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-zinc-400 ml-1 flex items-center gap-2">
                        <User className="w-3.5 h-3.5" /> Full Name
                    </label>
                    <div className="relative group">
                        <input
                            {...register("fullName")}
                            type="text"
                            placeholder="John Doe"
                            className="w-full px-5 py-3.5 rounded-2xl bg-neutral-800/50 border border-neutral-700 text-zinc-100 focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 outline-none placeholder:text-zinc-600"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500 group-hover:text-amber-400 transition-colors">
                            <User className="w-4 h-4" />
                        </div>
                    </div>
                    {errors.fullName && <p className="text-rose-500 text-xs font-medium mt-1 ml-2">{errors.fullName.message}</p>}
                </div>

                {/* Email (Optional/Derived) */}
                <div className="space-y-2 opacity-50">
                    <label className="text-sm font-semibold text-zinc-400 ml-1 flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5" /> Email Address
                    </label>
                    <div className="relative group">
                        <input
                            type="email"
                            placeholder="Auto-filled from account"
                            disabled
                            className="w-full px-5 py-3.5 rounded-2xl bg-neutral-800/20 border border-neutral-700/50 text-zinc-500 outline-none cursor-not-allowed"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                            <Mail className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Country */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-zinc-400 ml-1 flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5" /> Country
                    </label>
                    <div className="relative group">
                        <select
                            {...register("country")}
                            onChange={(e) => setCountry(e.target.value)}
                            className="w-full px-5 py-3.5 rounded-2xl bg-neutral-800/50 border border-neutral-700 text-zinc-100 focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 outline-none appearance-none cursor-pointer"
                        >
                            {Object.keys(countries).map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500 group-hover:text-amber-400 transition-colors">
                            <Globe className="w-4 h-4" />
                        </div>
                    </div>
                    {errors.country && <p className="text-rose-500 text-xs font-medium mt-1 ml-2">{errors.country.message}</p>}
                </div>

                {/* State */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-zinc-400 ml-1 flex items-center gap-2">
                        <Navigation className="w-3.5 h-3.5" /> State
                    </label>
                    <div className="relative group">
                        <select
                            {...register("state")}
                            onChange={(e) => setState(e.target.value)}
                            className="w-full px-5 py-3.5 rounded-2xl bg-neutral-800/50 border border-neutral-700 text-zinc-100 focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 outline-none appearance-none cursor-pointer"
                        >
                            {countries[country] ? (
                                <>
                                    <option value="">Select State</option>
                                    {Object.keys(countries[country]).map((s) => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </>
                            ) : (
                                <option value="">Select country first</option>
                            )}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500 group-hover:text-amber-400 transition-colors">
                            <Navigation className="w-4 h-4" />
                        </div>
                    </div>
                    {errors.state && <p className="text-rose-500 text-xs font-medium mt-1 ml-2">{errors.state.message}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* City */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-zinc-400 ml-1 flex items-center gap-2">
                        <Home className="w-3.5 h-3.5" /> City
                    </label>
                    <div className="relative group">
                        <select
                            {...register("city")}
                            disabled={!countries?.[country]?.[state]}
                            className="w-full px-5 py-3.5 rounded-2xl bg-neutral-800/50 border border-neutral-700 text-zinc-100 focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 outline-none appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {countries?.[country]?.[state] ? (
                                <>
                                    <option value="">Select City</option>
                                    {countries[country][state].map((c) => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </>
                            ) : (
                                <option value="">Select state first</option>
                            )}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500 group-hover:text-amber-400 transition-colors">
                            <MapPin className="w-4 h-4" />
                        </div>
                    </div>
                    {errors.city && <p className="text-rose-500 text-xs font-medium mt-1 ml-2">{errors.city.message}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-zinc-400 ml-1 flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5" /> Phone Number
                    </label>
                    <div className="relative group">
                        <input
                            {...register("phone")}
                            type="text"
                            placeholder="+92 312 3456789"
                            className="w-full px-5 py-3.5 rounded-2xl bg-neutral-800/50 border border-neutral-700 text-zinc-100 focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 outline-none placeholder:text-zinc-600"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500 group-hover:text-amber-400 transition-colors">
                            <Phone className="w-4 h-4" />
                        </div>
                    </div>
                    {errors.phone && <p className="text-rose-500 text-xs font-medium mt-1 ml-2">{errors.phone.message}</p>}
                </div>
            </div>

            {/* Street Address */}
            <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-400 ml-1 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5" /> Street Address
                </label>
                <div className="relative group">
                    <input
                        {...register("streetAddress")}
                        type="text"
                        placeholder="House No. 123, Street 45, Area..."
                        className="w-full px-5 py-3.5 rounded-2xl bg-neutral-800/50 border border-neutral-700 text-zinc-100 focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 outline-none placeholder:text-zinc-600"
                    />
                </div>
                {errors.streetAddress && <p className="text-rose-500 text-xs font-medium mt-1 ml-2">{errors.streetAddress.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Landmark */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-zinc-400 ml-1 flex items-center gap-2">
                        <Info className="w-3.5 h-3.5" /> Landmark (Optional)
                    </label>
                    <input
                        {...register("landmark")}
                        type="text"
                        placeholder="Near XYZ Place"
                        className="w-full px-5 py-3.5 rounded-2xl bg-neutral-800/50 border border-neutral-700 text-zinc-100 focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 outline-none placeholder:text-zinc-600"
                    />
                </div>

                {/* Postal Code */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-zinc-400 ml-1 flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5" /> Postal Code
                    </label>
                    <input
                        {...register("postalCode")}
                        type="text"
                        placeholder="74500"
                        className="w-full px-5 py-3.5 rounded-2xl bg-neutral-800/50 border border-neutral-700 text-zinc-100 focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 outline-none placeholder:text-zinc-600"
                    />
                    {errors.postalCode && <p className="text-rose-500 text-xs font-medium mt-1 ml-2">{errors.postalCode.message}</p>}
                </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-400 ml-1 flex items-center gap-2">
                    <Info className="w-3.5 h-3.5" /> Special Instructions (Optional)
                </label>
                <textarea
                    {...register("description")}
                    placeholder="E.g. Doorbell doesn't work, please call..."
                    className="w-full px-5 py-3.5 rounded-2xl bg-neutral-800/50 border border-neutral-700 text-zinc-100 focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 outline-none placeholder:text-zinc-600 h-32 resize-none"
                ></textarea>
            </div>

            {/* Payment Method */}
            <div className="space-y-4 pt-4 border-t border-neutral-800/50">
                <label className="text-sm font-semibold text-zinc-400 ml-1 flex items-center gap-2">
                    <CreditCard className="w-3.5 h-3.5" /> Payment Method
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="relative flex items-center gap-4 p-5 rounded-2xl bg-neutral-800/50 border-2 border-amber-400 border-dashed cursor-pointer hover:bg-neutral-800 transition-all group overflow-hidden">
                        <div className="w-10 h-10 bg-amber-400/10 rounded-xl flex items-center justify-center border border-amber-400/20 group-hover:scale-110 transition-transform">
                            <Truck className="w-5 h-5 text-amber-400" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-zinc-100">Cash on Delivery</p>
                            <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-widest">Pay when you receive</p>
                        </div>
                        <input type="radio" checked readOnly className="sr-only" />
                        <div className="absolute top-2 right-2">
                            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-sm shadow-amber-400/50" />
                        </div>
                    </label>

                    <div className="relative flex items-center gap-4 p-5 rounded-2xl bg-neutral-900/20 border-2 border-neutral-800/50 opacity-40 cursor-not-allowed group">
                        <div className="w-10 h-10 bg-neutral-800 rounded-xl flex items-center justify-center border border-neutral-700">
                            <CreditCard className="w-5 h-5 text-zinc-600" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-zinc-500">Card / Online</p>
                            <p className="text-[10px] text-zinc-600 font-medium uppercase tracking-widest">Coming Soon</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Save My Data */}
            <label className="flex items-center gap-4 cursor-pointer select-none group w-fit">
                <div className="relative">
                    <input
                        {...register("saveData")}
                        type="checkbox"
                        className="peer hidden"
                    />
                    <div className="w-6 h-6 rounded-lg bg-neutral-800 border border-neutral-700 peer-checked:bg-amber-400 peer-checked:border-amber-400 transition-all duration-300 flex items-center justify-center">
                        <Save className="w-3.5 h-3.5 text-neutral-900 opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                </div>
                <span className="text-sm font-medium text-zinc-300 group-hover:text-amber-400 transition-colors">
                    Save my information for a faster checkout next time
                </span>
            </label>
        </form>
    )
}

export default CheckoutForm
