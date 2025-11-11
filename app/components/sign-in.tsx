"use client";
import React from "react";

import { signIn } from "next-auth/react";

export default function SignIn() {
  const [loading, setLoading] = React.useState(false);
  return (
    <button
      className="cursor-pointer hover:bg-neutral-700 bg-neutral-800 py-2 flex items-center justify-center w-full mx-auto py-1 rounded"
      onClick={ async () => {
        try {
          setLoading(true);
          await signIn("google");
          
        } catch (error) {
          setLoading(false);
          console.error("Error during sign-in:", error);
        }
        
      }}
    >
      {loading ?   <div className="w-4 h-4 border-gray-400 border-2 border-t-transparent rounded-full animate-spin"></div>
 : <p className="text-sm ">Login With Google</p>}
    </button>
  );
}
