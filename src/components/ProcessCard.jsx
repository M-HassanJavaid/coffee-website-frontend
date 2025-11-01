import { forwardRef } from "react";

const ProcessCard = forwardRef(({ step, index, length }, ref) => (
    <div
        ref={ref}
        className="relative text-zinc-50 border-zinc-50 border-4 bg-black backdrop-blur-lg rounded-2xl p-8 text-center flex flex-col 
      items-center transition-all duration-300 cursor-pointer group"
    >
        <div className="mb-6">{step.icon}</div>
        <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
        <p className="text-sm leading-relaxed italic">{step.desc}</p>

        {index < length - 1 && (
            <div className="max-lg:hidden absolute right-[-50px] top-1/2 w-[80px] h-[2px] bg-amber-500"></div>
        )}
    </div>
));

export default ProcessCard;
