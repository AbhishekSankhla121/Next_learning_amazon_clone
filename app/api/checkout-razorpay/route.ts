import { instance } from "@/RazorpayConfig/Razaorpay";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { price } = body;
  console.log(price);

  const options = {
    amount: Number(price * 100),
    currency: "INR",
  };
  const order = await instance.orders.create(options);
  console.log(order);
  return NextResponse.json({ success: "true", order });
}

// route is checkout-razorpay
