"use client";

import Cart from "@/components/Cart";
import ProceedToBuy from "@/components/ProceedToBuy";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getCart } from "@/redux/cartSlice";

export default function CartPage() {
  const cart = useAppSelector(getCart);
  let total_price = 0;
  cart.forEach((element: any) => {
    total_price += element.price * element.quantity;
  });
  return (
    <>
      <div className="flex w-full justify-evenly ">
        <div className="w-[70%]">
          <Cart cart={cart} total_price={total_price} />
        </div>

        <div className="w-[20%] mt-10">
          <ProceedToBuy length={cart.length} total_price={total_price} />
        </div>
      </div>
    </>
  );
}
