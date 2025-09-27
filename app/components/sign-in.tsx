
"use client"

import { signIn } from "next-auth/react"
 
export default function SignIn() {
  return <button className="cursor-pointer" onClick={() => {signIn("google")}}>Login with Google</button>
}
