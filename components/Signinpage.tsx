"use client";

import { Superbase } from "@/lib/superbase/product";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
export default function SigninPage() {
  return (
    <>
      <div className="w-[25%] mx-auto">
        <Auth supabaseClient={Superbase} appearance={{ theme: ThemeSupa }} />
      </div>
    </>
  );
}
