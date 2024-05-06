import { useRouter } from "next/navigation";
import SubTotal from "./SubTotal";

export default function ProceedToBuy({
  length,
  total_price,
}: {
  length: number;
  total_price: number;
}) {
  const Navigation = useRouter();
  return (
    <>
      <div className="w-full border border-gray-300 ml-4">
        <div className="p-4">
          <p>
            <span className="text-[#007600] text-sm font-bold">
              Your order is eligible for Free Delivery .{" "}
            </span>{" "}
            Choose Free Delivery option at checkout
          </p>
          <div className="flex justify-start text-sm ">
            <SubTotal length={length} total_price={total_price} />
          </div>
          <button
            onClick={() => {
              Navigation.push("/checkout");
            }}
            className="bg-[#FFD814] w-full p-2 rounded-md shadow-md my-3"
            children={"proceed to buy"}
          />
        </div>
      </div>
    </>
  );
}
