import Image from "next/image";
import prime from "../public/images/prime-logo.png";
import { useAppDispatch } from "@/hooks/redux";
import { addToCart } from "@/redux/cartSlice";
import { useRouter } from "next/navigation";

export default function AddToCardConatainer({
  product,
}: {
  product: { product: any };
}) {
  const dispatch = useAppDispatch();

  const Router = useRouter();
  return (
    <>
      <div className="border border-gray-300 rounded-md h-fit text-sm">
        <div className="p-4">
          <Image src={prime} width={40} height={40} alt="prime logo" />
        </div>
        <div className="p-4">
          <h1>
            <span className="text-[#147C8F]">$26.77</span> Shipping & Import
            Fees Deposit to India{" "}
            <span className="text-[#147C8F]">Details</span>
          </h1>
          <h1>
            Free Delivery{" "}
            <span className="text-[#147C8F]">Thursday, May 9. </span> Order
            within 22 hrs 54 mins
          </h1>
          <p>
            Delivering to{" "}
            <span className="text-[#147C8F]"> Mohali 160055 </span>- Update
            location
          </p>
          <button
            onClick={() => {
              dispatch(addToCart(product));
              Router.push("/cart");
            }}
            className="bg-[#FFD814] w-full rounded-full py-1 "
          >
            Add to cart
          </button>
          <button className="bg-[#FFA41C] w-full rounded-full py-1 my-2 ">
            Buy now
          </button>
        </div>
      </div>
    </>
  );
}
