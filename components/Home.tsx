"use client";
import useSuperbase from "@/hooks/useSuperbase";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import CategoryWiseProduct from "./CategoryWiseProduct";

export default function Home() {
  const {
    getMensClothing,
    mensProduct,
    getWomensClothing,
    womensProduct,
  } = useSuperbase();

  useEffect(() => {
    getMensClothing();
    getWomensClothing();
  }, []);

  console.log("mensproduct", mensProduct, "womenproduct", womensProduct);
  return (
    <>
      <div>
        <Image
          style={{
            maskImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))",
          }}
          src={
            "https://images-eu.ssl-images-amazon.com/images/G/31/img24/Consumables/GW/Unrec/Baby-PC_GW_Hero_3000x1200_01._CB578900765_.jpg"
          }
          width={10000}
          height={1000}
          alt="banner"
        />
        <div className=" w-[80%] mx-auto grid grid-cols-4 gap-2 relative -top-80 ">
          {mensProduct.map((product: any) => (
            <>
              <div>
                <CategoryWiseProduct product={product} />
              </div>
            </>
          ))}
          {womensProduct.map((product: any) => (
            <>
              <div>
                <CategoryWiseProduct product={product} />
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
