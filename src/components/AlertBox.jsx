import { X } from "lucide-react"
import { AppContext } from '../App.jsx'
import { useContext } from "react";


const AlertBox = () => {

    const { alertMessage , setAlertMessage} = useContext(AppContext)

    if (!alertMessage) return null


  return (
    <div
      className='fixed bottom-6 right-6 px-5 py-4 border-l-4 rounded-lg shadow-md flex items-start justify-between gap-3 w-[320px] bg-black text-zinc-50 border-zinc-50 z-60'
    >
      <p className="font-medium">{alertMessage}</p>
      <button
        onClick={()=> setAlertMessage(null)}
        className="font-bold text-lg leading-none hover:opacity-60"
      >
        <X className="cursor-pointer"/>
      </button>
    </div>
  );
};

export default AlertBox;
