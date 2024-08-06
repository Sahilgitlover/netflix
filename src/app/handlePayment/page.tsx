'use client'
import React, { useState } from 'react'
import Script from 'next/script'

declare global {
    interface Window {
        Razorpay: any;
    }
}
const page = () => {
    const AMOUNT = 100;
    const [isProcessing, setIsProcessing] = useState(false)
    const handlePayment = async() => {
        setIsProcessing(true)
        try {
            const response = await fetch("/api/create-order",{method: "POST"})
            const data = await response.json()

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: AMOUNT * 100,
                currency: "INR",
                order_id: data.id,
                name: "Netflix",
                description: "Subscription",
                order_id: data.orderId,
                handler : function(response:any) {
                    console.log("Payment successful", response);
                    // handle successful response
                },
                prefill: {
                    name: "John Doe",
                    email: "johndoe@example.com",
                    contact: "+911234567890",
                },
                theme: {
                    color: "#3399cc"
                },
            }
            const rzp1 = new window.Razorpay(options)
            rzp1.open()
        } catch (error) {
            console.log("Payment failed",error);
        } finally {
            setIsProcessing(false)
        }
    }
  return (
    <div className=' flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black'>
        <Script src='https://checkout.razorpay.com/v1/checkout.js' />
        <div className=' p-6 bg-white rounded-lg shadow-md'>
            <p className=' mb-4'>Amount to pay: {AMOUNT} INR</p>
            <button onClick={handlePayment} disabled={isProcessing} className=' px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-600 disabled:bg-gray-400'>
                {isProcessing ? "Processing...": "Pay Now"}
            </button>
        </div>
    </div>
  )
}

export default page