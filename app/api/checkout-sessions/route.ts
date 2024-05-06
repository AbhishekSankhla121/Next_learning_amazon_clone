import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { items, email } = body;
  //  start Stripe payment gateway
  const arranged_Line_items = items.map((item: any) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.title,
        images: [item.image],
      },
      unit_amount: 100,
    },
    quantity: 1,
  }));
  console.log(arranged_Line_items);
  console.log("working1");
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["GB", "US", "CA"],
    },
    line_items: arranged_Line_items,
    mode: "payment",
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email: email,
      images: JSON.stringify(items.map((item: any) => item.image)),
    },
  });
  console.log("working2");
  return NextResponse.json({ id: session.id });
}
