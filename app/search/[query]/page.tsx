"use client";

import SearchResult from "@/components/SearchResult";
import useSuperbase from "@/hooks/useSuperbase";
import { useEffect } from "react";

export default function SearchPage({ params }: { params: { query: string } }) {
  const { filterProduct, getFilteredDataFromSuperbase } = useSuperbase();
  useEffect(() => {
    getFilteredDataFromSuperbase(params.query);
  }, []);
  console.log(filterProduct);
  return (
    <>
      <div>
        <SearchResult filterData={filterProduct} />
      </div>
    </>
  );
}
