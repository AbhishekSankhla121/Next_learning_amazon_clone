"use client";

import SingleProduct from "@/components/SingleProduct";
import useSuperbase from "@/hooks/useSuperbase";
import { useEffect } from "react";

export default function SingleProductpage({
  params,
}: {
  params: { id: string };
}) {
  const { fetchSingleProduct, getSingleProduct } = useSuperbase();

  useEffect(() => {
    getSingleProduct(Number(params.id));
  }, []);
  console.log(fetchSingleProduct);
  return (
    <>
      <div>
        <SingleProduct singleProduct={fetchSingleProduct} />
      </div>
    </>
  );
}
