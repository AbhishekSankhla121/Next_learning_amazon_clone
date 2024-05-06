export default function SubTotal({
  length,
  total_price,
}: {
  length: number;
  total_price: number;
}) {
  return (
    <>
      <h1 className="text-right ">
        Subtotal {`(${length} items):`}{" "}
        <span className="font-bold">{`$${total_price}`}</span>
      </h1>
    </>
  );
}
