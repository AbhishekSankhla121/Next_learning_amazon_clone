import Razorpay from "razorpay";

export const instance = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_PUBLISH_KEY,
  key_secret: process.env.NEXT_PUBLIC_RAZORPAY_SECRET_KEY,
});
