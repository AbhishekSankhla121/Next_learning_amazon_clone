import ShoppingCart from "./ShoppingCart";

export default function Cart({
  cart,
  total_price,
}: {
  cart: any;
  total_price: number;
}) {
  return (
    <>
      <div className="w-full mx-auto mt-10">
        <div>
          <ShoppingCart cart={cart} total_price={total_price} />
        </div>
      </div>
    </>
  );
}
