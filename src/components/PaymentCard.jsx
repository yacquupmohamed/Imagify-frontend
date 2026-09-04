import React, { useContext, useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';

function PaymentCard() {
    const { setShowPayment, plan, user , backendUrl, token, setShowLogin } = useContext(AppContext);
    const [phone, setPhone] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);



    const handlePayment = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

         try {
             if(!user){
                 setShowLogin(true)
             }
            
        if (!phone) {
            toast.error("Phone number is required to continue.");
            return;
        }
        const { data } = await axios.post(
            backendUrl + '/api/user/payment',
            {planId: plan, phone },
            { headers: { token } }
        );

         if(data.success){
            toast.success(data.message || "Credits Puchased Successfully !");
            setTimeout(() => {
                setShowPayment(false);
                location.reload();
            }, 3000);
            // initPay(data.order)

         }
         } catch (error) {
             toast.error(error.response?.data?.message || error.message || "An error occurred during payment.")
         }

        setIsProcessing(false)

    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-50 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
            <motion.form onSubmit={handlePayment}
                initial={{ opacity: 0.2, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className='relative bg-white p-8 rounded-xl text-slate-500 w-full max-w-md'
            >
                <h1 className='text-center text-2xl text-neutral-700 font-bold mb-4'>
                    Complete Your Payment
                </h1>
                

                {/* Phone Input */}
                <div className='mb-6'>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                        Mobile Number (WaafiPay)
                    </label>
                    <div className='relative'>
                        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                            <span className='text-gray-500'>+252</span>
                        </div>
                        <input
                            type='tel'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 9))}
                            className='block w-full pl-14 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500'
                            placeholder='6x xxx xxx'
                            required
                        />
                    </div>
                    <p className='mt-1 text-xs text-gray-500'>
                        Enter your Somali mobile number without +252 prefix
                    </p>
                </div>

                {/* Payment Button */}
                <button
                    type='submit'
                    disabled={isProcessing}
                    className={`w-full py-3 px-4 rounded-lg font-semibold text-white shadow-md
                        ${isProcessing 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-green-600 hover:bg-green-700'}
                        transition-colors duration-300 flex justify-center items-center`}
                >
                    {isProcessing ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing Payment...
                        </>
                    ) : (
                        `Pay  with WaafiPay`
                    )}
                </button>

                {/* Payment Methods Info */}
                <div className='mt-6 flex items-center justify-center'>
                    <div className='flex space-x-4'>
                        <img src={"https://waafipay.net/assets/logos.png"} alt="WaafiPay" className='h-8' />
                        <img src={"https://static.vecteezy.com/system/resources/previews/029/899/733/non_2x/secure-payment-credit-card-icon-with-shield-secure-transaction-stock-illustration-vector.jpg"} alt="Secure Payment" className='h-8' />
                    </div>
                </div>

                <p className='mt-4 text-center text-xs text-gray-500'>
                    Your payment is securely processed by WaafiPay. No card details are stored.
                </p>

                <img 
                    onClick={() => setShowPayment(false)} 
                    src={assets.cross_icon} 
                    alt="Close" 
                    className='absolute top-4 right-4 h-6 w-6 cursor-pointer opacity-70 hover:opacity-100'
                />
            </motion.form>
        </div>
    );
}

export default PaymentCard;