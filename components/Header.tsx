"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { BiCart } from "react-icons/bi";
import { CgSearch } from "react-icons/cg";

import Image from "next/image";
import Link from "next/link";

import amazonLogo from "../public/images/amazon-logo-2.webp";
import { Navitems } from "./Navitems";
import { useAppSelector } from "@/hooks/redux";
import { getCart } from "@/redux/cartSlice";
import { Superbase } from "@/lib/superbase/product";

export default function Header() {
  const cart = useAppSelector(getCart);
  const location = usePathname();
  const [user, setUser] = useState<any>(null);
  const [query, setQuery] = useState<string>("");
  const navigation = useRouter();
  const searchHandler = () => {
    console.log("click");
    navigation.push(`/search/${query}`);
  };

  const getUserData = async () => {
    const {
      data: { user },
    } = await Superbase.auth.getUser();
    if (user) {
      setUser(user);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  console.log(user);
  return (
    <>
      <div
        className={
          location === "/signin" || location === "/checkout" ? "hidden" : ""
        }
      >
        <div className="bg-[#131921] text-white py-1">
          <div className="flex items-center justify-between w-[90%] mx-auto">
            <Link href={"/"} className="w-10%">
              <Image
                src={amazonLogo}
                width={150}
                height={150}
                alt="amazon logo"
              />
            </Link>
            <div className="flex items-center  w-[60%] ">
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                className="w-full px-2 py-2 rounded-l-md text-black outline-none"
                placeholder="Search Amazon .in"
              />
              <div
                onClick={searchHandler}
                className="bg-[#FEBD69] p-2 rounded-r-md"
              >
                <CgSearch className="text-black" size={"24px"} />
              </div>
            </div>
            <div className="flex items-center w-[20%] justify-around">
              <div className="cursor-pointer">
                <h1
                  className="text-xs hover:underline "
                  onClick={() => {
                    navigation.push("/signin");
                  }}
                >
                  {user ? user.identities[0].identity_data.user_name : "signin"}
                </h1>
                <h1 className="font-medium text-sm">Account & list</h1>
              </div>
              <div className="cursor-pointer">
                <p className="text-xs">Returns</p>
                <h1 className="font-medium text-sm">& Orders</h1>
              </div>
              <Link href={"/cart"} className="cursor-pointer">
                <p className="relative top-3 left-5">{cart.length}</p>
                <div className="flex">
                  <div>
                    <BiCart size={"40px"} />
                  </div>
                  <h1 className="mt-4">cart</h1>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-[#232F3E] w-full text-white p-2 flex justify-between items-center">
          <div>
            {Navitems.map((item, index) => {
              return (
                <Link
                  href={`/${item}`}
                  key={index}
                  className="mx-2 border border-transparent hover:border hover:border-white "
                >
                  {item}
                </Link>
              );
            })}
          </div>
          <div className="mr-5">
            <h1
              onClick={async () => {
                const { error } = await Superbase.auth.signOut();
                navigation.push("/signin");
              }}
              className="text-[#FEBD69] font-boldn cursor-pointer hover:underline"
            >
              Sign out
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
