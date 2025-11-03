// import { motion } from "framer-motion";
// import { CheckCircle, HandHeart } from "lucide-react";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "../../lib/axios.js";
// import { useCartStore } from "../../stores/useCartStore.js";

// const PurchaseSuccessPage = () => {
//     const [isProcessing, setIsProcessing] = useState(true);
//     const [error, setError] = useState(null);
//     const { clearCart } = useCartStore();

//     useEffect(() => {
//         const handleCheckoutSuccess = async (sessionId) => {
//             try {
//                 await axios.post("/payments/checkout-success", {
//                     sessionId,
//                 });
//                 clearCart();
//             } catch (error) {
//                 console.error(error);
//                 setError("Failed to process payment. Please contact support.");
//             } finally {
//                 setIsProcessing(false);
//             }
//         };

//         const sessionId = new URLSearchParams(window.location.search).get("session_id");
//         if (sessionId) {
//             handleCheckoutSuccess(sessionId);
//         } else {
//             setIsProcessing(false);
//             setError("No session ID found in the URL");
//         }
//     }, [clearCart]);

//     if (isProcessing) return "Processing...";

//     if (error) return `Error: ${error}`;

//     return (
//         <div className='min-h-screen flex items-center justify-center px-4'>
//             <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className='max-w-md w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden relative z-10'
//             >
//                 <div className='p-6 sm:p-8'>
//                     <div className='flex justify-center'>
//                         <CheckCircle className='text-emerald-400 w-16 h-16 mb-4' />
//                     </div>
//                     <h1 className='text-2xl sm:text-3xl font-bold text-center text-emerald-400 mb-2'>
//                         Purchase Successful!
//                     </h1>

//                     <p className='text-gray-300 text-center mb-2'>
//                         Your order has been successfully placed. {"We'll"} send you a confirmation email shortly.
//                     </p>

//                     <p className='text-emerald-400 text-center text-sm mb-6'>
//                         Order number: #12345
//                     </p>
//                     <p className='text-gray-300 text-center mb-6'>
//                         Check your email for order details and updates.
//                     </p>
//                     <div className='bg-gray-700 p-4 rounded-lg mb-6'>
//                         <div className='flex items-center justify-between flex-wrap gap-4'>
//                             <p className='text-emerald-400 text-sm font-medium'>Order Date</p>
//                             <p className='text-emerald-400 text-sm font-medium'>
//                                 {new Date().toLocaleDateString("en-US", {
//                                     year: "numeric",
//                                     month: "long",
//                                     day: "numeric",
//                                 })}
//                             </p>
//                         </div>
//                         <div className='flex items-center justify-between flex-wrap gap-4'>
//                             <p className='text-emerald-400 text-sm font-medium'>Order Status</p>
//                             <p className='text-orange-400 text-sm font-medium'>Processing</p>
//                         </div>
//                     </div>

//                     <div className='space-y-4'>
//                         <button
//                             className='w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300'
//                         >
//                             <Link to={"/"} className='flex items-center justify-center'>
//                                 Continue Shopping
//                                 <HandHeart className='ml-2' size={18} />
//                             </Link>
//                         </button>
//                     </div>
//                 </div>
//             </motion.div>
//         </div>
//     );
// };

// export default PurchaseSuccessPage;


import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { Link } from "react-router-dom";
import ErrorState from "../../components/ui/ErrorState.jsx";
import LoadingState from "../../components/ui/LoadingState.jsx";
import axios from "../../lib/axios.js";
import { useCartStore } from "../../stores/useCartStore.js";


const PurchaseSuccessPage = () => {

    const [isProcessing, setIsProcessing] = useState(true);
    const { clearCart } = useCartStore();
    const [error, setError] = useState(null);

    useEffect(() => {
        const handleCheckoutSuccess = async (sessionId) => {
            try {
                await axios.post('/payments/checkout-success', {
                    sessionId
                })
                clearCart();
            } catch (error) {
                setError(error.message);
            } finally {
                setIsProcessing(false);
            }
        }

        const sessionId = new URLSearchParams(window.location.search).get('session_id');
        if (sessionId) {
            handleCheckoutSuccess(sessionId);
        } else {
            setIsProcessing(false);
            setError("No session ID found in the URL...🥺");
        }

    },[clearCart]);

    // if (isProcessing) {
    //     return "Processing...😑";
    // }
    // if (error) {
    //     return `Error: ${error}`;
    // }

    if (isProcessing) return <LoadingState message="Processing your payment..." />;
    if (error) return <ErrorState message={error} />;


    return (
        <div className='h-screen flex items-center justify-center px-4'>

            <Confetti
				width={window.innerWidth}
				height={window.innerHeight}
				gravity={0.1}
				style={{ zIndex: 99 }}
				numberOfPieces={700}
				recycle={false}
			/>

            <div className='max-w-md w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden relative z-10'>
                <div className='p-6 sm:p-8'>
                    <div className='flex justify-center'>
                        <CheckCircle className='text-emerald-400 w-16 h-16 mb-4' />
                    </div>

                    <h1 className='text-2xl sm:text-3xl font-bold text-center text-emerald-400 mb-2'>
                        Purchase Successful!
                    </h1>

                    <p className='text-gray-300 text-center mb-2'>
                        Thank you for your order. {"We're"} processing it now.
                    </p>
                    <p className='text-emerald-400 text-center text-sm mb-6'>
                        Check your email for order details and updates.
                    </p>

                    <div className='bg-gray-700 rounded-lg p-4 mb-6'>

                        <div className='flex items-center justify-between mb-2'>
                            <span className='text-sm text-gray-400'>Order number</span>
                            <span className='text-sm font-semibold text-emerald-400'>#79161Eroc</span>
                        </div>

                        <div className='flex items-center justify-between'>
                            <span className='text-sm text-gray-400'>Estimated delivery</span>
                            <span className='text-sm font-semibold text-emerald-400'>3-5 business days</span>
                        </div>
                    </div>

                    <div className='space-y-4'>
                        <button
                            className='w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4
             rounded-lg transition duration-300 flex items-center justify-center'
                        >
                            <HandHeart className='mr-2' size={18} />
                            Thanks for trusting us!😘🤗
                        </button>
                        <Link
                            to={"/"}
                            className='w-full bg-gray-700 hover:bg-gray-600 text-emerald-400 font-bold py-2 px-4 
            rounded-lg transition duration-300 flex items-center justify-center'
                        >
                            Continue Shopping
                            <ArrowRight className='ml-2' size={18} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PurchaseSuccessPage