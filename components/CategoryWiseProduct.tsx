import Image from "next/image";
import Rating from "./Rating";
import { useAppDispatch } from "@/hooks/redux";
import { useRouter } from "next/navigation";
import { addToCart } from "@/redux/cartSlice";

export default function CategoryWiseProduct({ product }: { product: any }) {
  const dispatch = useAppDispatch();
  const Router = useRouter();
  return (
    <>
      <div className=" border border-gray-300 mt-5 p-2 h-[400px] mb-10 bg-white">
        <h1 className="font-bold text-sm text-[#FEBD69]">{product.category}</h1>
        <div className="flex justify-center">
          <Image
            src={product.image}
            width={200}
            height={200}
            alt="product.title"
            className="h-[200px]"
          />
        </div>
        <div>
          <h1>{product.title}</h1>
          <Rating rating={product.rating} />
        </div>
        <div className=" my-2">
          <button
            className="w-full py-2  rounded-md bg-[#FFD814]"
            onClick={() => {
              dispatch(addToCart(product));
              Router.push("/cart");
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
}

//  continue watching from 4:05;30
