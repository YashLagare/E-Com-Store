import { motion } from "framer-motion";
import { IndianRupee, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

const PurchaseCancelPage = () => {
    return (
        <div className='min-h-screen flex items-center justify-center px-4'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='max-w-md w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden relative z-10'
            >
                <div className='p-6 sm:p-8'>
                    <div className='flex justify-center'>
                        <XCircle className='text-red-400 w-16 h-16 mb-4' />
                    </div>
                    <h1 className='text-2xl sm:text-3xl font-bold text-center text-red-400 mb-2'>
                        Purchase Cancelled
                    </h1>

                    <p className='text-gray-300 text-center mb-6'>
                        Your order has been cancelled. No charges have been made.
                    </p>

                    <div className='space-y-4'>
                        <Link
                            to={"/"}
                            className='w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 flex items-center justify-center'
                        >
                            Continue Shopping
                            <IndianRupee className='ml-2' size={18} />
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default PurchaseCancelPage;
