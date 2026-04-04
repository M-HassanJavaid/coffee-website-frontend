import { forwardRef } from "react";

const ProcessCard = forwardRef(({ step, index, length }, ref) => (
    <div
        ref={ref}
        className="relative text-zinc-50 border-neutral-700 hover:border-amber-500 border-2 bg-neutral-900 backdrop-blur-md rounded-xl p-6 md:p-8 text-center flex flex-col items-center transition-all duration-300 cursor-pointer group"
    >
        <div className="mb-4 md:mb-6 transform group-hover:scale-110 transition-transform duration-300">
            {step.icon}
        </div>
        <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-amber-50">{step.title}</h3>
        <p className="text-xs md:text-sm leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">{step.desc}</p>

        {index < length - 1 && (
            <div className="hidden lg:block absolute right-[-50px] top-1/2 w-[60px] h-[1px] bg-amber-500/50"></div>
        )}
    </div>
));

export default ProcessCard;
