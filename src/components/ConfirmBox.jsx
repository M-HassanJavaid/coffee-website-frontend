import { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { AppContext } from "../App";
import Button from "./Button";

const ConfirmBox = () => {

    const [isLoading, setIsLoading] = useState(false)
    const { confirm , setConfirm , setAlertMessage} = useContext(AppContext)

    function onCancel() {
        setConfirm({message: '' , func : ()=> {} })
    }

    async function onConfirm() {
        try {
            setIsLoading(true);
            console.log(confirm.func)
            await confirm.func();
        } catch (error) {
            setAlertMessage(error.message);
        } finally {
            setIsLoading(false);
            onCancel()
        }
    }

    return (
        <AnimatePresence>
            {confirm.message && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* BACKDROP */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                        onClick={onCancel}
                    />

                    {/* MODAL */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="relative z-210 w-[90%] max-w-md bg-neutral-900 text-zinc-100 p-6 rounded-2xl shadow-2xl border border-neutral-700"
                    >
                        {/* CLOSE BUTTON */}

                        
                        <button
                            onClick={onCancel}
                            className="absolute top-3 right-3 text-zinc-400 hover:text-zinc-200"
                        >
                            <X size={20} />
                        </button>

                        {/* TITLE */}
                        <h2 className="text-2xl font-bold mb-2">Are you sure?</h2>

                        {/* MESSAGE */}
                        <p className="text-zinc-300 mb-6 leading-relaxed">
                            {confirm.message}
                        </p>

                        {/* BUTTONS */}
                        <div className="flex gap-3">
                            <Button func={onCancel} title='No' />

                            <Button isLoading={isLoading} func={onConfirm} title='Yes'  />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ConfirmBox;
