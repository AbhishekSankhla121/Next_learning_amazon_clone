import { Superbase } from "@/lib/superbase/product";
import { useState } from "react";

export default function useSuperbase() {
  const [product, setProduct] = useState<any>([]);
  const [filterProduct, setFilterProduct] = useState<any>([]);
  const [fetchSingleProduct, setFetchSingleProduct] = useState<any>([]);
  const [mensProduct, setMensProduct] = useState<any>([]);
  const [womensProduct, setWomensProduct] = useState<any>([]);
  const getDataFromSuperbase = async () => {
    let { data, error } = await Superbase.from("product").select("*");
    if (data) {
      setProduct(data);
      console.log(data);
    }
    if (error) {
      console.log(error);
    }
  };
  const getFilteredDataFromSuperbase = async (query: string) => {
    let { data, error } = await Superbase.from("product")
      .select("*")
      .or(
        `title.ilike.%${query}%, description.ilike.%${query}%, category.ilike.%${query}%`
      );
    if (data) {
      setFilterProduct(data);
      console.log(data);
    }
    if (error) {
      console.log(error);
    }
  };

  const getSingleProduct = async (id: number) => {
    let { data, error } = await Superbase.from("product")
      .select("*")
      .eq("id", id);
    if (data) {
      setFetchSingleProduct(data);
    }
    if (error) {
      console.log(error);
    }
  };

  const getMensClothing = async () => {
    try {
      let { data, error } = await Superbase.from("product")
        .select("*")
        .ilike("category", "men's clothing");

      if (data) {
        setMensProduct(data);
      } else {
        console.log("No men's clothing found.", error);
      }
    } catch (error) {
      console.error("Error fetching men's clothing:", error);
    }
  };

  const getWomensClothing = async () => {
    try {
      const { data, error } = await Superbase.from("product")
        .select("*")
        .ilike("category", "women's clothing");

      if (data) {
        setWomensProduct(data);
      } else {
        console.log("No women's clothing found.", error);
      }
    } catch (error) {
      console.error("Error fetching women's clothing:", error);
    }
  };

  return {
    product,
    getDataFromSuperbase,
    filterProduct,
    getFilteredDataFromSuperbase,
    getSingleProduct,
    fetchSingleProduct,
    getMensClothing,
    mensProduct,
    getWomensClothing,
    womensProduct,
  };
}
