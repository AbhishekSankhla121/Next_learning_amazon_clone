"use client";
import Image from "next/image";
import logo from "../public/images/amazon-logo.png";
import { FaLock } from "react-icons/fa";
import { useAppSelector } from "@/hooks/redux";
import { getCart } from "@/redux/cartSlice";
import OrderSummary from "./OrderSummary";
import { useRouter } from "next/navigation";
export default function CheckOut() {
  const cart = useAppSelector(getCart);
  console.log(cart);
  const Navigation = useRouter();
  return (
    <>
      <div>
        <div className=" border-gray-400 border-b  ">
          <div className="w-[80%] mx-auto flex items-center py-5 justify-between ">
            <div>
              <Image
                src={logo}
                height={150}
                width={150}
                alt="logo"
                onClick={() => Navigation.push("/")}
              />
            </div>
            <div>
              <h1 className="font-bold text-2xl">CheckOut</h1>
            </div>
            <div className="text-gray-400">
              <FaLock size={"30px"} />
            </div>
          </div>
        </div>
        {/* harder end */}
        <div className="flex ">
          <div>
            <div className="w-[70%] mx-auto border-b border-gray-300 my-2 py-2">
              <h1 className="font-bold text-lg">1. Delivery Address</h1>
              <p>
                <span className="font-bold">Abhishek Sankhla</span> #880 D ,
                Bedi house, opposite of back gate of lic colony , n, ijjer
                chowk,mundi kharar, MOHALI, PUNJAB, 140301, India Edit address |
                Add delivery instructions
              </p>
            </div>
            <div className="w-[70%] mx-auto border-b border-gray-300 my-2 py-2">
              <h1 className="font-bold text-lg my-4">2. Items and Delivery</h1>
              <div className="grid grid-cols-3 gap-5">
                {cart?.map((item: any) => (
                  <>
                    <div className="flex justify-center items-center flex-col border border-gray-300 my-4 rounded-md ">
                      <Image
                        src={item.image}
                        height={150}
                        width={150}
                        alt={item.title}
                      />
                      <h1>{item.title}</h1>
                      <p className="font-bold text-2xl">{`$${item.price}`}</p>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
          <div className="w-[30%] m-14">
            <OrderSummary />
          </div>
        </div>
      </div>
    </>
  );
}
