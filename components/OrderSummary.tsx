"use client";

import { useAppSelector } from "@/hooks/redux";
import { Superbase } from "@/lib/superbase/product";
import { getCart } from "@/redux/cartSlice";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY!);

export default function OrderSummary() {
  const cart = useAppSelector(getCart);
  let total_price = 0;
  let total_quantity = 0;
  cart.forEach((element: any) => {
    total_price += element.price * element.quantity;
    total_quantity += element.quantity;
  });
  const createStripeSession = async () => {
    const {
      data: { user },
    } = await Superbase.auth.getUser();

    // setup strpie promise
    const strip = await stripePromise;

    const checkoutSession = await axios.post("/api/checkout-sessions", {
      items: cart,
      email: user?.email,
    });

    // redirect to checkout session
    console.log("checkoutSession", checkoutSession);
    const result = await strip?.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    console.log(result);

    if (result?.error) {
      console.log("stripe payment error ", result.error.message);
    }
  };

  const payWithRazorpay = async () => {
    try {
      const {
        data: { order },
      } = await axios.post("/api/checkout-razorpay", {
        items: cart,
        price: total_price,
      });
      console.log("order", order);
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_PUBLISH_KEY!,
        amount: order.amount,
        currency: "INR",
        name: "Abhishek Sankhla",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order.id,
        callback_url: `${process.env.HOST}/api/paymentverification`,
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = (window as any).Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.error("Error while processing payment:", error);
      // Show user-friendly error message
    }
  };

  return (
    <>
      <div className=" border border-gray-300 p-4  items-center ">
        <div>
          <h1 className="font-bold">Order Summary</h1>
          <div className="text-sm">
            <div className="flex justify-between">
              <p>item</p>
              <p>{total_quantity}</p>
            </div>
            <div className="flex justify-between">
              <p>Delivery</p>
              <p>{total_price}</p>
            </div>
            <div className="flex justify-between">
              <p>Total</p>
              <p>{total_price}</p>
            </div>
            <div className="flex justify-between">
              <p>Promotion applied</p>
              <p>{total_price}</p>
            </div>
          </div>
          <div className="flex justify-between font-bold text-2xl text-[#B12704] p-3 border-t border-b border-gray-300 my-2">
            <h1>Order total</h1>
            <h1>{total_price}</h1>
          </div>
          <div>
            <button
              onClick={createStripeSession}
              className="bg-[#FFD814] w-full rounded-md px-4 py-1"
            >
              place your order
            </button>
          </div>
          <div className="my-10">
            <button
              onClick={payWithRazorpay}
              className="bg-[#FFD814] w-full rounded-md px-4 py-1"
            >
              pay with razorpay
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
