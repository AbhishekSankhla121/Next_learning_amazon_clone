"use client";
import Image from "next/image";
import Rating from "./Rating";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }: { product: any }) {
  const router = useRouter();
  return (
    <>
      <div>
        <div
          className="cursor-pointer"
          onClick={() => {
            router.push(`/product/${product.id}`);
          }}
        >
          <div className=" bg-gray-100 flex items-center justify-center rounded-md h-[250px] overflow-hidden">
            <Image
              className=" mix-blend-multiply p-2"
              width={150}
              height={200}
              src={product.image}
              alt={product.title}
            />
          </div>
          <h1 className=" font-bold">{product.title}</h1>
          <p>{`${product.description.substring(0, 50)}...`}</p>
          <Rating rating={product.rating} />
          <p className=" font-bold text-2xl ">{`$${product.price}`}</p>
        </div>
      </div>
    </>
  );
}
