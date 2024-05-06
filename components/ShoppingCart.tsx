"use client";
import { useAppDispatch } from "@/hooks/redux";
import {
  clearAllCart,
  decrementQuantity,
  incrementQuantity,
  removeFromTheCart,
} from "@/redux/cartSlice";
import Image from "next/image";
import SubTotal from "./SubTotal";

export default function ShoppingCart({
  cart,
  total_price,
}: {
  cart: any;
  total_price: number;
}) {
  const dispatch = useAppDispatch();
  return (
    <>
      <div>
        <div className=" border-b border-gray-300 ">
          <div className=" border-b border-gray-300 py-5 flex justify-between items-center">
            <h1 className="font-bold text-2xl">Shooping Cart</h1>
            <h1 className="font-medium">Price</h1>
          </div>

          {cart?.map((product: any) => {
            return (
              <>
                <div className="flex justify-between">
                  <div className="flex mt-5">
                    <div>
                      <Image
                        src={product.image}
                        height={100}
                        width={100}
                        alt={product.title}
                      />
                    </div>
                    <div className="ml-4">
                      <h1 className="font-medium">{product.title}</h1>
                      <p className="text-[#007600] my-1  font-bold text-xs">
                        In Stock
                      </p>
                      <h1
                        onClick={() => {
                          dispatch(removeFromTheCart(product.id));
                        }}
                        className="font-bold
                   text-red-600 cursor-pointer"
                      >
                        Remove
                      </h1>
                      <div className="flex items-center justify-between my-4 bg-gray-200 rounded-md px-5 py-2 w-[100px]  text-xl font-medium ">
                        <div
                          onClick={() => {
                            product.quantity > 1 &&
                              dispatch(decrementQuantity(product));
                          }}
                          className=" cursor-pointer "
                        >
                          -
                        </div>
                        <div>{product.quantity}</div>
                        <div
                          onClick={() => {
                            dispatch(incrementQuantity(product));
                          }}
                          className=" cursor-pointer "
                        >
                          +
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h1 className="font-bold text-2xl">{`$${product.price}`}</h1>
                  </div>
                </div>
              </>
            );
          })}
        </div>

        <div className="  mt-5 ">
          <SubTotal length={cart.length} total_price={total_price} />
        </div>
      </div>
      <h1
        className="text-red-600 font-bold cursor-pointer py-2"
        onClick={() => {
          dispatch(clearAllCart());
        }}
      >
        Clear All
      </h1>
    </>
  );
}
